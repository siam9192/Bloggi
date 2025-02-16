import { Provider, UserRole } from "@prisma/client";
import AppError from "../../Errors/AppError";
import httpStatus from "../../shared/http-status";
import prisma from "../../shared/prisma";
import { bcryptCompare, bcryptHash } from "../../utils/bycrypt";
import {
  IAuthUser,
  IChangePasswordPayload,
  ILoginData,
  IResetPasswordPayload,
  ISignUpData,
} from "./auth.interface";
import jwtHelpers from "../../shared/jwtHelpers";
import config from "../../config";
import { Request, Response } from "express";
import { JwtPayload } from "jsonwebtoken";
import ejs from "ejs";
import path from "path";
import NodeMailerServices from "../NodeMailer/node-mailer.service";
import { boolean } from "zod";
const SignUp = async (data: ISignUpData) => {
  const user = await prisma.user.findFirst({
    where: {
      email: data.email,
    },
  });
  //  Check user existence
  if (user) {
    throw new AppError(
      httpStatus.NOT_ACCEPTABLE,
      "User us already exist on this email",
    );
  }

  const hashPassword = await bcryptHash(data.password);

  const result = await prisma.$transaction(async (trClient) => {
    const userData = {
      role: UserRole.Reader,
      email: data.email,
      password: hashPassword,
      provider: Provider.Email,
    };

    //   Create user
    const userCreatedData = await trClient.user.create({ data: userData });

    const userProfile = {
      ...data.name,
      user_id: userCreatedData.id,
    };

    //  Create the user(Reader) profile
    const userCreatedProfile = await trClient.reader.create({
      data: userProfile,
    });

    return {
      ...userCreatedData,
      profile: userCreatedProfile,
    };
  });

  return result;
};

const Login = async (data: ILoginData) => {
  const user = await prisma.user.findFirst({
    where: {
      email: data.email,
    },
    include: {
      reader: true,
      author: true,
      staff: true,
    },
  });

  // Checking user existence
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "Account not found");
  }

  // Comparing password
  const isMatched = await bcryptCompare(data.password, user.password!);

  // Checking is password correct
  if (!isMatched) {
    throw new AppError(httpStatus.NOT_ACCEPTABLE, "Wrong password");
  }

  const tokenPayload: IAuthUser = {
    id: user.id,
    role: user.role,
  };

  if (user.role === UserRole.Reader) {
    tokenPayload.readerId = user.reader!.id;
  } else if (user.role === UserRole.Author) {
    tokenPayload.authorId = user.author!.id;
  } else {
    tokenPayload.staffId = user.staff!.id;
  }

  // Generating access token
  const accessToken = await jwtHelpers.generateToken(
    tokenPayload,
    config.jwt.access_secret as string,
    "30d",
  );
  // Generating refresh token
  const refreshToken = await jwtHelpers.generateToken(
    tokenPayload,
    config.jwt.refresh_token_secret as string,
    config.jwt.refresh_token_expire_time as string,
  );
  return {
    accessToken,
    refreshToken,
  };
};

const getAccessTokenUsingRefreshToken = async (req: Request, res: Response) => {
  const refreshToken = req.cookies.refreshToken;
  try {
    if (!refreshToken) {
      throw new Error();
    }

    const decode = jwtHelpers.verifyToken(
      refreshToken,
      config.jwt.refresh_token_secret as string,
    ) as JwtPayload & IAuthUser;

    if (!decode) throw new Error();
    return {
      refreshToken,
    };
  } catch (error) {
    throw new AppError(httpStatus.BAD_REQUEST, "BAD😒 request!");
  }
};

const changePassword = async (
  authUser: IAuthUser,
  payload: IChangePasswordPayload,
) => {
  const user = await prisma.user.findUnique({
    where: {
      id: authUser.id,
    },
  });

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found");
  }

  const isMatched = await bcryptCompare(
    payload.oldPassword,
    payload.newPassword,
  );

  if (isMatched) {
    throw new AppError(httpStatus.NOT_FOUND, "Wrong  password");
  }

  const hashedNewPassword = await bcryptHash(payload.newPassword);

  await prisma.user.update({
    where: {
      id: authUser.id,
    },
    data: {
      password: hashedNewPassword,
    },
  });

  return null;
};

const forgetPassword = async (email: string) => {
  const user = await prisma.user.findFirst({
    where: {
      email,
    },
  });

  if (!user) throw new AppError(httpStatus.NOT_FOUND, "No user found");

  const expiresAt = new Date();
  expiresAt.setMinutes(expiresAt.getMinutes() + 6);

  const session = await prisma.passwordResetRequest.create({
    data: {
      userId: user.id,
      expiresAt,
    },
  });

  const tokenPayload = {
    sessionId: session.id,
    userId: user.id,
    email,
  };

  const token = jwtHelpers.generateToken(
    tokenPayload,
    config.jwt.reset_password_token_secret as string,
    config.jwt.reset_password_token_expire_time as string,
  );

  const resetLink = `${config.origin}/reset-password/${token}`;

  await ejs.renderFile(
    path.join(process.cwd(), "/src/app/templates/reset-password-email.ejs"),
    { link: resetLink },
    async function (err, template) {
      if (err) {
        throw new AppError(400, "Something went wrong");
      } else {
        await NodeMailerServices.sendEmail({
          emailAddress: email,
          subject: "Password reset link",
          template,
        });
      }
    },
  );

  return null;
};

const resetPassword = async (payload: IResetPasswordPayload) => {
  let decode;
  try {
    decode = (await jwtHelpers.verifyToken(
      payload.token,
      config.jwt.reset_password_token_secret as string,
    )) as JwtPayload & {
      sessionId: string;
      userId: number;
      email: string;
    };

    if (!decode) throw new Error();

    const session = await prisma.passwordResetRequest.findUnique({
      where: {
        id: decode.sessionId,
        expiresAt: {
          gt: new Date(),
        },
        isUsed: false,
      },
    });

    if (!session) throw new Error();
  } catch (error) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "Sorry maybe reset link expired,used or something wrong",
    );
  }

  const hashedNewPassword = await bcryptHash(payload.newPassword);

  await prisma.$transaction(async (tx) => {
    await tx.user.update({
      where: {
        id: decode.userId,
      },
      data: {
        password: hashedNewPassword,
        passwordChangedAt: new Date(),
      },
    });
    await tx.passwordResetRequest.update({
      where: {
        id: decode.sessionId,
      },
      data: {
        isUsed: true,
      },
    });
  });

  return null;
};

const getMeFromDB = async (authUser: IAuthUser) => {
  const user = await prisma.user.findUnique({
    where: {
      id: authUser.id,
    },
    select: {
      id: true,
      role: true,
      email: true,
      google_id: true,
      provider: true,
      status: true,
      reader: true,
      author: {
        include: {
          social_links: true,
        },
      },
      staff: true,
      passwordChangedAt: true,
      join_date: true,
      updated_at: true,
    },
  });

  return user;
};

const AuthServices = {
  SignUp,
  Login,
  getAccessTokenUsingRefreshToken,
  changePassword,
  forgetPassword,
  resetPassword,
  getMeFromDB,
};

export default AuthServices;

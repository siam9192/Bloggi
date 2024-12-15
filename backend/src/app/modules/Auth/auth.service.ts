import { Provider, UserRole } from "@prisma/client";
import AppError from "../../Errors/AppError";
import httpStatus from "../../shared/http-status";
import prisma from "../../shared/prisma";
import { bcryptCompare, bcryptHash } from "../../utils/bycrypt";
import { ILoginData, ISignUpData } from "./auth.interface";
import jwtHelpers from "../../shared/jwtHelpers";
import config from "../../config";
import { Response } from "express";

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

  const tokenPayload = {
    id: user.id,
    role: user.role,
  };

  // Generating access token
  const accessToken = await jwtHelpers.generateToken(
    tokenPayload,
    config.jwt_access_secret as string,
    "30d",
  );
  // Generating refresh token
  const refreshToken = await jwtHelpers.generateToken(
    tokenPayload,
    config.jwt_refresh_token_secret as string,
    config.jwt_refresh_token_expire_time as string,
  );
  return {
    accessToken,
    refreshToken,
  };
};

const getAccessToken = async (res: Response) => {
  // const refreshToken = res.cookie['']
};

const AuthServices = {
  SignUp,
  Login,
};

export default AuthServices;

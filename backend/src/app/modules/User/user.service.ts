import { Prisma, Provider, UserRole } from "@prisma/client";
import AppError from "../../Errors/AppError";
import httpStatus from "../../shared/http-status";
import prisma from "../../shared/prisma";
import { bcryptHash } from "../../utils/bycrypt";
import {
  ICreateAuthorData,
  ICreateStaffData,
  IUserFilterRequest,
} from "./user.interface";
import { IPaginationOptions } from "../../interfaces/pagination";
import { calculatePagination } from "../../helpers/paginationHelper";
import { validateDate } from "../../utils/function";

const createStaffIntoDB = async (data: ICreateStaffData) => {
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
      role: data.role,
      email: data.email,
      password: hashPassword,
      provider: Provider.Email,
    };

    //   Create user
    const userCreatedData = await trClient.user.create({ data: userData });

    const userProfile = {
      ...data.name,
      profile_photo: "dee",
      user_id: userCreatedData.id,
    };

    //  Create the user(Staff) profile
    const userCreatedProfile = await trClient.staff.create({
      data: userProfile,
    });

    return {
      ...userCreatedData,
      profile: userCreatedProfile,
    };
  });

  return result;
};

const createAuthorIntoDB = async (data: ICreateAuthorData) => {
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
      role: UserRole.Author,
      email: data.email,
      password: hashPassword,
      provider: Provider.Email,
    };

    //   Create user
    const userCreatedData = await trClient.user.create({ data: userData });

    const userProfile = {
      ...data.name,
      bio: data.bio,
      profile_photo: "dee",
      user_id: userCreatedData.id,
    };

    //  Create the user(Author) profile
    const userCreatedProfile = await trClient.author.create({
      data: userProfile,
    });

    const authorSocialLinks = data.social_links.map((ele) => ({
      ...ele,
      author_id: userCreatedProfile.id,
    }));

    if (authorSocialLinks.length) {
      await trClient.socialLink.createMany({
        data: authorSocialLinks,
      });
    }

    return {
      ...userCreatedData,
      profile: userCreatedProfile,
    };
  });

  return result;
};

const ChangeUserStatusIntoDB = async (data: {
  user_id: number;
  status: "Active" | "Blocked";
}) => {
  await prisma.user.findUniqueOrThrow({
    where: {
      id: data.user_id,
      status: {
        not: "Deleted",
      },
    },
  });

  return await prisma.user.update({
    where: {
      id: data.user_id,
    },
    data: {
      status: data.status,
    },
  });
};

const getUsersFromDB = async (
  query: IUserFilterRequest,
  options: IPaginationOptions,
) => {
  const { searchTerm, startDate, endDate, ...filterData } = query;

  const { limit, skip, page } = calculatePagination(options);

  const andConditions: Prisma.UserWhereInput[] = [];

  if (filterData && Object.keys(filterData).length) {
    andConditions.push({
      AND: Object.keys(filterData).map((key) => ({
        [key]: {
          equals: (filterData as any)[key],
        },
      })),
    });
  }

  if (startDate || endDate) {
    if (
      startDate &&
      validateDate(startDate) &&
      endDate &&
      validateDate(endDate)
    ) {
      andConditions.push({
        join_date: {
          gte: new Date(startDate),
          lte: new Date(endDate),
        },
      });
    } else if (startDate && validateDate(startDate)) {
      andConditions.push({
        join_date: {
          gte: new Date(startDate),
        },
      });
    } else if (endDate && validateDate(endDate)) {
      andConditions.push({
        join_date: {
          lte: new Date(endDate),
        },
      });
    }
  }

  const whereConditions: Prisma.UserWhereInput = {
    AND: andConditions,
  };

  const users = await prisma.user.findMany({
    where: whereConditions,
    skip,
    take: limit,
    orderBy:
      options.sortBy && options.sortOrder
        ? {
            [options.sortBy]: options.sortOrder,
          }
        : {
            join_date: "desc",
          },
    include: {
      reader: true,
      author: true,
      staff: true,
    },
  });

  const total = await prisma.user.count({
    where: whereConditions,
  });

  const meta = {
    page,
    limit,
    total,
  };

  const data = users.map((user) => {
    const role = user.role;
    return {
      id: user.id,
      email: user.email,
      role,
      status: user.status,
      join_date: user.join_date,
      profile:
        role === "Author"
          ? user.author
          : role === "Reader"
            ? user.reader
            : user.staff,
    };
  });

  return {
    data,
    meta,
  };
};




const softDeleteUserIntoDB = async (userId: string) => {
  // Check user existence
  await prisma.user.findUniqueOrThrow({
    where: {
      id: Number(userId),
      status: {
        not: "Deleted",
      },
    },
  });

  // Delete user

  await prisma.user.update({
    where: {
      id: Number(userId),
    },
    data: {
      status: "Deleted",
    },
  });

  return null;
};

const UserServices = {
  createStaffIntoDB,
  createAuthorIntoDB,
  ChangeUserStatusIntoDB,
  getUsersFromDB,
  softDeleteUserIntoDB,
};

export default UserServices;

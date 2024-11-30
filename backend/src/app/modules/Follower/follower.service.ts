import { Follower, Prisma } from "@prisma/client";
import prisma from "../../shared/prisma";
import { IAuthUser } from "../Auth/auth.interface";
import AppError from "../../Errors/AppError";
import httpStatus from "../../shared/http-status";
import { IFollowersFilterRequest } from "./follower.interface";
import { IPaginationOptions } from "../../interfaces/pagination";
import { calculatePagination } from "../../helpers/paginationHelper";

const createFollowerInto = async (user: IAuthUser, data: Follower) => {
  const reader = await prisma.reader.findUnique({
    where: {
      user_id: user.id,
    },
  });

  // Check user (Reader) existence
  if (!reader) {
    throw new AppError(httpStatus.OK, "Reader not found");
  }

  const author = await prisma.author.findUnique({
    where: {
      id: data.author_id,
    },
  });

  // Check user (Author) existence
  if (!author) {
    throw new AppError(httpStatus.OK, "Author not found");
  }

  // Assign reader id as a follower
  data.reader_id = reader.id;

  return await prisma.follower.create({
    data,
  });
};

const deleteFollowerFromDB = async (
  user: IAuthUser,
  author_id: number | string,
) => {
  // Typecase author id string => number
  author_id = Number(author_id);
  const follower = await prisma.follower.findFirst({
    where: {
      reader: {
        user_id: user.id,
      },
      author_id: author_id,
    },
  });

  // Check follower existence
  if (!follower) {
    throw new AppError(httpStatus.NOT_FOUND, "Follower not found");
  }

  await prisma.follower.deleteMany({
    where: {
      reader: {
        user_id: user.id,
      },
      author_id: author_id,
    },
  });

  return null;
};

const getAuthorFollowersFromDB = async (
  authorId: string | number,
  filterData: IFollowersFilterRequest,
  options: IPaginationOptions,
) => {
  // Type cast author id string => number

  authorId = Number(authorId);

  const { limit, skip, page } = calculatePagination(options);

  const whereConditions: Prisma.FollowerWhereInput = {};

  if (filterData.name) {
    whereConditions;
  }

  const data = await prisma.follower.findMany({
    where: whereConditions,
    include: {
      reader: {
        select: {
          first_name: true,
          last_name: true,
          profile_photo: true,
        },
      },
    },
    take: limit,
    skip,
  });

  const total = await prisma.follower.count({ where: whereConditions });

  return {
    data,
    meta: {
      limit,
      page,
      total,
    },
  };
};

const getMyFollowersFromDB = async (
  authUser: IAuthUser,
  filterData: IFollowersFilterRequest,
  options: IPaginationOptions,
) => {
  const { limit, skip, page } = calculatePagination(options);

  const whereConditions: Prisma.FollowerWhereInput = {
    author: {
      user_id: authUser.id,
    },
  };

  const data = await prisma.follower.findMany({
    where: whereConditions,
    include: {
      reader: {
        select: {
          first_name: true,
          last_name: true,
          profile_photo: true,
        },
      },
    },
    take: limit,
    skip,
  });

  const total = await prisma.follower.count({ where: whereConditions });

  return {
    data,
    meta: {
      limit,
      page,
      total,
    },
  };
};

const getMyFollowingAuthorsFromDB = async (
  authUser: IAuthUser,
  paginationOptions: IPaginationOptions,
) => {
  const { limit, skip, page } = calculatePagination(paginationOptions);

  const whereConditions: Prisma.FollowerWhereInput = {
    reader: {
      user_id: authUser.id,
    },
  };

  const data = await prisma.follower.findMany({
    where: whereConditions,
    take: limit,
    skip,
  });

  const total = await prisma.follower.count({ where: whereConditions });

  return {
    data,
    meta: {
      limit,
      page,
      total,
    },
  };
};

const FollowerServices = {
  createFollowerInto,
  deleteFollowerFromDB,
  getAuthorFollowersFromDB,
  getMyFollowersFromDB,
  getMyFollowingAuthorsFromDB,
};

export default FollowerServices;
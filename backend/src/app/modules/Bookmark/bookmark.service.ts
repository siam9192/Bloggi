import { Prisma } from "@prisma/client";
import AppError from "../../Errors/AppError";
import { calculatePagination } from "../../helpers/paginationHelper";
import { IPaginationOptions } from "../../interfaces/pagination";
import httpStatus from "../../shared/http-status";
import prisma from "../../shared/prisma";
import { IAuthUser } from "../Auth/auth.interface";

const createBookmarkIntoDB = async (
  authUser: IAuthUser,
  data: ICreateBookmarkData,
) => {
  const blog = await prisma.blog.findUnique({
    where: {
      id: data.blog_id,
    },
  });

  //    Check blog existence
  if (!blog) {
    throw new AppError(httpStatus.NOT_FOUND, "Blog not found");
  }

  const isAdded = await prisma.bookmark.count({
    where: {
      user_id: authUser.id,
      blog_id: blog.id,
    },
  });
  if (isAdded) {
    throw new AppError(httpStatus.NOT_ACCEPTABLE, "Already added");
  }
  return await prisma.bookmark.create({
    data: {
      user_id: authUser.id,
      blog_id: data.blog_id,
    },
  });
};

const deleteBookmarkFromDB = async (
  authUser: IAuthUser,
  blogId: string | number,
) => {
  // Typecast blog id string => number
  blogId = Number(blogId);
  return await prisma.bookmark.delete({
    where: {
      blog_id_user_id: {
        blog_id: blogId,
        user_id: authUser.id,
      },
    },
  });
};

const getMyBookmarksFromDB = async (
  authUser: IAuthUser,
  options: IPaginationOptions,
) => {
  const { limit, skip, page } = calculatePagination(options);

  const whereConditions: Prisma.BookmarkWhereInput = {
    user_id: authUser.id,
  };

  const data = await prisma.bookmark.findMany({
    where: whereConditions,
    include: {
      blog: {
        select: {
          title: true,
          short_description: true,
          featured_image: true,
          likes_count: true,
          dislikes_count: true,
          views_count: true,
          author: {
            select: {
              first_name: true,
              last_name: true,
              profile_photo: true,
            },
          },
        },
      },
    },
    take: limit,
    skip,
    orderBy: {
      created_at: "desc",
    },
  });
  const total = await prisma.bookmark.count({
    where: whereConditions,
  });
  return {
    data,
    meta: {
      total,
      limit,
      page,
    },
  };
};

const checkBookmarkStatusFromDB = async (
  authUser: IAuthUser,
  blogId: string | number,
) => {
  blogId = parseInt(blogId as string);

  const bookmark = await prisma.bookmark.findFirst({
    where: {
      blog_id: blogId,
      user_id: authUser.id,
    },
  });

  const status = bookmark ? true : false;

  return {
    status,
  };
};

const BookmarkServices = {
  createBookmarkIntoDB,
  deleteBookmarkFromDB,
  getMyBookmarksFromDB,
  checkBookmarkStatusFromDB,
};

export default BookmarkServices;

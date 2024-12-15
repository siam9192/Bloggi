import AppError from "../../Errors/AppError";
import httpStatus from "../../shared/http-status";
import prisma from "../../shared/prisma";
import { IAuthUser } from "../Auth/auth.interface";
import { IUpsertBlogReactionPayload } from "./blog-reaction.interface";

const UpsertBlogReactionIntoDB = async (
  authUser: IAuthUser,
  payload: IUpsertBlogReactionPayload,
) => {
  const reader = await prisma.reader.findFirst({
    where: {
      user_id: authUser.id,
    },
    select: {
      id: true,
    },
  });

  //   Check reader existence
  if (!reader) {
    throw new AppError(httpStatus.NOT_FOUND, "Profile not found");
  }

  const blog = await prisma.blog.findUnique({
    where: {
      id: payload.blog_id,
    },
    select: {
      id: true,
    },
  });

  if (!blog) {
    throw new AppError(httpStatus.NOT_FOUND, "Blog not found");
  }

  let result;

  if (payload.type === null) {
    await prisma.blogReaction.delete({
      where: {
        blog_id_reader_id: {
          reader_id: reader.id,
          blog_id: payload.blog_id,
        },
      },
    });
    result = null;
  } else {
    result = await prisma.blogReaction.upsert({
      where: {
        blog_id_reader_id: {
          blog_id: payload.blog_id,
          reader_id: reader.id,
        },
      },
      update: {
        type: payload.type,
      },
      create: {
        reader_id: reader.id,
        blog_id: payload.blog_id,
        type: payload.type,
      },
    });
  }

  return result;
};

const getMyBlogReactionsFromDB = async (
  authUser: IAuthUser,
  blogId: string | number,
) => {
  // Type cast blogId  string => number
  blogId = Number(blogId);

  const reader = await prisma.reader.findFirst({
    where: {
      user_id: authUser.id,
    },
    select: {
      id: true,
    },
  });

  //   Check reader existence
  if (!reader) {
    throw new AppError(httpStatus.NOT_FOUND, "Profile not found");
  }

  return await prisma.blogReaction.findUnique({
    where: {
      blog_id_reader_id: {
        blog_id: blogId,
        reader_id: reader.id,
      },
    },
    select: {
      blog_id: true,
      type: true,
    },
  });
};

const BlogReactionServices = {
  UpsertBlogReactionIntoDB,
  getMyBlogReactionsFromDB,
};

export default BlogReactionServices;

import { Prisma } from "@prisma/client";
import AppError from "../../Errors/AppError";
import { calculatePagination } from "../../helpers/paginationHelper";
import { IPaginationOptions } from "../../interfaces/pagination";
import httpStatus from "../../shared/http-status";
import prisma from "../../shared/prisma";
import { IAuthUser } from "../Auth/auth.interface";
import {
  ICreateCommentData,
  ICreateCommentReplayData,
  IUpdateCommentData,
} from "./comment.interface";

const createCommentIntoDB = async (
  authUser: IAuthUser,
  data: ICreateCommentData,
) => {
  const blog = await prisma.blog.findUnique({
    where: {
      id: data.blog_id,
    },
  });

  // Check blog existence
  if (!blog) throw new AppError(httpStatus.NOT_FOUND, "Blog not found");

  const reader = await prisma.reader.findUnique({
    where: {
      user_id: authUser.id,
    },
    select: {
      id: true,
    },
  });

  if (!reader) {
    throw new AppError(httpStatus.NOT_FOUND, "Profile not found");
  }

  return await prisma.comment.create({
    data: {
      blog_id: data.blog_id,
      content: data.content,
      reader_id: reader.id,
    },
  });
};

const createCommentReplayIntoDB = async (
  authUser: IAuthUser,
  data: ICreateCommentReplayData,
) => {
  const comment = await prisma.comment.findUnique({
    where: {
      id: data.comment_id,
    },
  });

  const reader = await prisma.reader.findUnique({
    where: {
      user_id: authUser.id,
    },
  });

  if (!reader) {
    throw new AppError(httpStatus.NOT_FOUND, "Profile not found");
  }

  // Check blog existence
  if (!comment) throw new AppError(httpStatus.NOT_FOUND, "Comment not found");

  return await prisma.comment.create({
    data: {
      blog_id: comment.blog_id,
      content: data.content,
      reader_id: reader?.id,
      parent_id: comment.id,
    },
  });
};

const getBlogCommentsFromDB = async (
  blogId: string | number,
  paginationOptions: IPaginationOptions,
) => {
  // Typecast blogId string => number
  blogId = Number(blogId);
  const { limit, skip, page, sortBy, orderBy } =
    calculatePagination(paginationOptions);

  const whereConditions: Prisma.CommentWhereInput = {
    blog_id: blogId,
    parent: null,
  };

  const data = await prisma.comment.findMany({
    where: whereConditions,
    take: limit,
    skip,
    orderBy: {
      [sortBy]: orderBy,
    },
    include: {
      _count: {
        select: {
          replies: true,
          reactions: {
            where: {
              type: "Like",
            },
          },
        },
      },
    },
  });

  // const commentReactions = await prisma.commentReaction.groupBy({
  //   by:['comment_id','type'],
  //   _count:{
  //     comment_id:true
  //   }
  //   });

  //   console.log(commentReactions)

  const total = await prisma.comment.count({
    where: whereConditions,
  });

  return {
    data,
    meta: {
      limit,
      page,
      total,
    },
  };
};

const getBlogCommentRepliesFromDB = async (comment_id: string | number) => {
  // Typecast comment string => number
  comment_id = Number(comment_id);

  const whereConditions: Prisma.CommentWhereInput = {
    parent_id: comment_id,
  };

  const data = await prisma.comment.findMany({
    where: whereConditions,
  });

  return data;
};

const deleteCommentFromDB = async (commentId: string | number) => {
  // Typecase string=>number
  commentId = Number(commentId);
  return await prisma.comment.delete({
    where: {
      id: commentId,
    },
  });
};

const updateCommentIntoDB = async (data: IUpdateCommentData) => {
  return await prisma.comment.update({
    where: {
      id: data.comment_id,
    },
    data: {
      content: data.content,
    },
  });
};

const CommentServices = {
  createCommentIntoDB,
  createCommentReplayIntoDB,
  getBlogCommentsFromDB,
  getBlogCommentRepliesFromDB,
  deleteCommentFromDB,
  updateCommentIntoDB,
};

export default CommentServices;

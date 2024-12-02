import AppError from "../../Errors/AppError";
import httpStatus from "../../shared/http-status";
import prisma from "../../shared/prisma";
import { IAuthUser } from "../Auth/auth.interface";
import { IUpsertCommentReactionData } from "./comment-reaction.interface";

const UpsertCommentReaction = async (
  authUser: IAuthUser,
  data: IUpsertCommentReactionData,
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

  let result;

  if (data.type === null) {
    await prisma.commentReaction.delete({
      where: {
        reader_id_comment_id: {
          reader_id: reader.id,
          comment_id: data.comment_id,
        },
      },
    });
    result = null;
  } else {
    result = await prisma.commentReaction.upsert({
      where: {
        reader_id_comment_id: {
          reader_id: reader.id,
          comment_id: data.comment_id,
        },
      },
      update: {
        type: data.type,
      },
      create: {
        reader_id: reader.id,
        comment_id: data.comment_id,
        type: data.type,
      },
    });
  }

  return result;
};

const getMyCommentReactionsFromDB = async (
  authUser: IAuthUser,
  blogId: string | number,
) => {
  // Type cast blogId  string => number
  blogId = Number(blogId);
  return await prisma.commentReaction.findMany({
    where: {
      comment: {
        reader: {
          user_id: authUser.id,
        },
        blog_id: blogId,
      },
    },
    select: {
      comment_id: true,
      type: true,
    },
  });
};

const CommentReactionServices = {
  UpsertCommentReaction,
  getMyCommentReactionsFromDB,
};

export default CommentReactionServices;

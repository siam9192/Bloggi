import { Request, Response } from "express";
import catchAsync from "../../shared/catchAsync";
import { sendSuccessResponse } from "../../shared/response";
import httpStatus from "../../shared/http-status";
import CommentReactionServices from "./comment-reaction.service";

const upsertCommentReaction = catchAsync(
  async (req: Request, res: Response) => {
    const result = await CommentReactionServices.UpsertCommentReaction(
      req.user,
      req.body,
    );
    sendSuccessResponse(res, {
      statusCode: httpStatus.CREATED,
      message: "Created successfully",
      data: result,
    });
  },
);

const getMyCommentReactions = catchAsync(
  async (req: Request, res: Response) => {
    const result = await CommentReactionServices.getMyCommentReactionsFromDB(
      req.user,
      req.params.blogId,
    );
    sendSuccessResponse(res, {
      statusCode: httpStatus.CREATED,
      message: "retrieved successfully",
      data: result,
    });
  },
);

const CommentReactionControllers = {
  upsertCommentReaction,
  getMyCommentReactions,
};

export default CommentReactionControllers;

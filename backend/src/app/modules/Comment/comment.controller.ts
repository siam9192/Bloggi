import { Request, Response } from "express";
import catchAsync from "../../shared/catchAsync";
import { sendSuccessResponse } from "../../shared/response";
import httpStatus from "../../shared/http-status";
import CommentServices from "./comment.service";
import Pick from "../../utils/pick";
import { paginationOptionKeys } from "../../utils/constant";

const createComment = catchAsync(async (req: Request, res: Response) => {
  const result = await CommentServices.createCommentIntoDB(req.user, req.body);
  sendSuccessResponse(res, {
    statusCode: httpStatus.CREATED,
    message: "Comment created successfully",
    data: result,
  });
});

const createCommentReplay = catchAsync(async (req: Request, res: Response) => {
  const result = await CommentServices.createCommentReplayIntoDB(
    req.user,
    req.body,
  );
  sendSuccessResponse(res, {
    statusCode: httpStatus.CREATED,
    message: "Comment replay created successfully",
    data: result,
  });
});

const updateComment = catchAsync(async (req: Request, res: Response) => {
  const result = await CommentServices.updateCommentIntoDB(req.body);
  sendSuccessResponse(res, {
    statusCode: httpStatus.CREATED,
    message: "Comment updated successfully",
    data: result,
  });
});

const deleteComment = catchAsync(async (req: Request, res: Response) => {
  const result = await CommentServices.deleteCommentFromDB(
    req.params.commentId,
  );
  sendSuccessResponse(res, {
    statusCode: httpStatus.CREATED,
    message: "Comment deleted successfully",
    data: result,
  });
});

const getComments = catchAsync(async (req: Request, res: Response) => {
  const paginationOptions = Pick(req.params, paginationOptionKeys);
  const result = await CommentServices.getBlogCommentsFromDB(
    req.params.blogId,
    paginationOptionKeys as any,
  );

  sendSuccessResponse(res, {
    statusCode: httpStatus.CREATED,
    message: "Blog comments retrieved successfully",
    data: result,
  });
});

const getCommentReplies = catchAsync(async (req: Request, res: Response) => {
  const result = await CommentServices.getBlogCommentRepliesFromDB(
    req.params.commentId,
  );

  sendSuccessResponse(res, {
    statusCode: httpStatus.CREATED,
    message: "Comment replies retrieved successfully",
    data: result,
  });
});

const CommentControllers = {
  createComment,
  createCommentReplay,
  getComments,
  getCommentReplies,
  deleteComment,
  updateComment,
};

export default CommentControllers;

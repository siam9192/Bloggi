import { Request, Response } from "express";
import catchAsync from "../../shared/catchAsync";
import { sendSuccessResponse } from "../../shared/response";
import httpStatus from "../../shared/http-status";
import BlogReactionServices from "./blog-reaction.service";

const upsertBlogReaction = catchAsync(async (req: Request, res: Response) => {
  const result = await BlogReactionServices.UpsertBlogReactionIntoDB(
    req.user,
    req.body,
  );
  sendSuccessResponse(res, {
    statusCode: httpStatus.CREATED,
    message: "Successful",
    data: result,
  });
});

const getMyBlogReaction = catchAsync(async (req: Request, res: Response) => {
  const result = await BlogReactionServices.getMyBlogReactionsFromDB(
    req.user,
    req.params.blogId,
  );
  sendSuccessResponse(res, {
    statusCode: httpStatus.CREATED,
    message: "Blog reaction retrieved successfully",
    data: result,
  });
});

const BlogReactionControllers = {
  upsertBlogReaction,
  getMyBlogReaction,
};

export default BlogReactionControllers;

import { Request, Response } from "express";
import catchAsync from "../../shared/catchAsync";
import { sendSuccessResponse } from "../../shared/response";
import httpStatus from "../../shared/http-status";
import BlogServices from "./blog.service";
import Pick from "../../utils/pick";
import { paginationOptionKeys } from "../../utils/constant";
import { IPaginationOptions } from "../../interfaces/pagination";
import { getPaginationOptions } from "../../utils/function";

const createBlog = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user.id;
  const result = await BlogServices.createBlogIntoDB(userId, req.body);
  sendSuccessResponse(res, {
    statusCode: httpStatus.CREATED,
    message: "Blog created successful",
    data: result,
  });
});

const getBlogs = catchAsync(async (req: Request, res: Response) => {
  const query = Pick(req.query, ["searchTerm", "categories"]);
  const options = Pick(req.query, paginationOptionKeys);
  const result = await BlogServices.getBlogsFromDB(query, options as any);
  sendSuccessResponse(res, {
    statusCode: httpStatus.OK,
    message: "Blogs retrieved successfully",
    meta: result.meta,
    data: result.data,
  });
});

const getMyBlogs = catchAsync(async (req: Request, res: Response) => {
  const query = Pick(req.query, ["searchTerm", "categories", "status"]);
  const options = Pick(req.query, paginationOptionKeys);
  const result = await BlogServices.getMyBlogsFromDB(
    req.user,
    query,
    options as any,
  );
  sendSuccessResponse(res, {
    statusCode: httpStatus.OK,
    message: "Author Blogs retrieved successfully",
    data: result,
  });
});

const getBlogForReadBySlug = catchAsync(async (req: Request, res: Response) => {
  const result = await BlogServices.getBlogForReadBySlugFromDB(
    req.user,
    req.params.slug,
  );
  sendSuccessResponse(res, {
    statusCode: httpStatus.OK,
    message: "Blog retrieved successfully",
    data: result,
  });
});

const getBlogsForManage = catchAsync(async (req: Request, res: Response) => {
  const filter = Pick(req.query, [
    "searchTerm",
    "categories",
    "status",
    "startDate",
    "endDate",
  ]);
  const options = getPaginationOptions(req.query);
  const result = await BlogServices.getBlogsForManageFromDB(filter, options);
  sendSuccessResponse(res, {
    statusCode: httpStatus.OK,
    message: "Blogs retrieved successfully",
    ...result,
  });
});

const getRecentBlogs = catchAsync(async (req: Request, res: Response) => {
  const result = await BlogServices.getRecentBlogsFromDB();
  sendSuccessResponse(res, {
    statusCode: httpStatus.OK,
    message: "Blogs retrieved successfully",
    data: result,
  });
});

const getTrendingBlogs = catchAsync(async (req: Request, res: Response) => {
  const result = await BlogServices.getTrendingBlogsFromDB(
    req.params.categoryId,
  );
  sendSuccessResponse(res, {
    statusCode: httpStatus.OK,
    message: "Blogs retrieved successfully",
    data: result,
  });
});

const deleteBlogById = catchAsync(async (req: Request, res: Response) => {
  const result = await BlogServices.deleteBlogByIdFromDB(req.params.id);
  sendSuccessResponse(res, {
    statusCode: httpStatus.OK,
    message: "Blog deleted successfully",
    data: result,
  });
});

const updateBlogById = catchAsync(async (req: Request, res: Response) => {
  const result = await BlogServices.deleteBlogByIdFromDB(req.params.id);
  sendSuccessResponse(res, {
    statusCode: httpStatus.OK,
    message: "Blog deleted successfully",
    data: result,
  });
});

const BlogControllers = {
  createBlog,
  getBlogs,
  getRecentBlogs,
  getTrendingBlogs,
  getMyBlogs,
  getBlogsForManage,
  getBlogForReadBySlug,
  deleteBlogById,
  updateBlogById,
};

export default BlogControllers;

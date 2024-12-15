import { Request, Response } from "express";
import catchAsync from "../../shared/catchAsync";
import { sendSuccessResponse } from "../../shared/response";
import httpStatus from "../../shared/http-status";
import BlogService from "./blog.service";
import Pick from "../../utils/pick";
import { paginationOptionKeys } from "../../utils/constanat";

const createBlog = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user.id;
  const result = await BlogService.createBlogIntoDB(userId, req.body);

  sendSuccessResponse(res, {
    statusCode: httpStatus.CREATED,
    message: "Blog created successful",
    data: result,
  });
});

const getBlogs = catchAsync(async (req: Request, res: Response) => {
  const query = Pick(req.query, ["searchTerm", "categories"]);
  const options = Pick(req.query, paginationOptionKeys);
  const result = await BlogService.getBlogsFromDB(query, options as any);

  sendSuccessResponse(res, {
    statusCode: httpStatus.OK,
    message: "Blogs retrieved successfully",
    meta: result.meta,
    data: result.data,
  });
});

const getAuthorAllBlogs = catchAsync(async (req: Request, res: Response) => {
  const query = Pick(req.query, ["searchTerm", "categories", "status"]);
  const options = Pick(req.query, paginationOptionKeys);
  const result = await BlogService.getAuthorAllBlogsFromDB(
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

const getBlogForReadById = catchAsync(async (req: Request, res: Response) => {
  const result = await BlogService.getBlogForReadBySlugFromDB(req.user,req.params.slug);
  sendSuccessResponse(res, {
    statusCode: httpStatus.OK,
    message: "Blog retrieved successfully",
    data: result,
  });
});

const getRecentBlogs = catchAsync(async (req: Request, res: Response) => {
  const result = await BlogService.getRecentBlogsFromDB();
  sendSuccessResponse(res, {
    statusCode: httpStatus.OK,
    message: "Blogs retrieved successfully",
    data: result,
  });
});

const getTrendingBlogs = catchAsync(async (req: Request, res: Response) => {
  const result = await BlogService.getTrendingBlogsFromDB(
    req.params.categoryId,
  );
  sendSuccessResponse(res, {
    statusCode: httpStatus.OK,
    message: "Blogs retrieved successfully",
    data: result,
  });
});

const deleteBlogById = catchAsync(async (req: Request, res: Response) => {
  const result = await BlogService.deleteBlogByIdFromDB(req.params.id);
  sendSuccessResponse(res, {
    statusCode: httpStatus.OK,
    message: "Blog deleted successfully",
    data: result,
  });
});

const updateBlogById = catchAsync(async (req: Request, res: Response) => {
  const result = await BlogService.deleteBlogByIdFromDB(req.params.id);
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
  getAuthorAllBlogs,
  getBlogForReadById,
  deleteBlogById,
  updateBlogById,
};

export default BlogControllers;

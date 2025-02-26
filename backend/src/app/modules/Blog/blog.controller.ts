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
  const query = Pick(req.query, [
    "searchTerm",
    "categories",
    "type",
    "startDate",
    "endDate",
  ]);
  const options = Pick(req.query, paginationOptionKeys);
  const result = await BlogServices.getBlogsFromDB(
    req.user,
    query,
    options as any,
  );
  sendSuccessResponse(res, {
    statusCode: httpStatus.OK,
    message: "Blogs retrieved successfully",
    meta: result.meta,
    data: result.data,
  });
});

const getMyBlogs = catchAsync(async (req: Request, res: Response) => {
  const query = Pick(req.query, [
    "searchTerm",
    "categories",
    "status",
    "startDate",
    "endDate",
    "type",
  ]);

  const options = Pick(req.query, paginationOptionKeys);
  const result = await BlogServices.getMyBlogsFromDB(
    req.user,
    query,
    options as any,
  );
  sendSuccessResponse(res, {
    statusCode: httpStatus.OK,
    message: "Author Blogs retrieved successfully",
    ...result,
  });
});

const getBlogById = catchAsync(async (req: Request, res: Response) => {
  const result = await BlogServices.getBlogByIdFromDB(req.user, req.params.id);
  sendSuccessResponse(res, {
    statusCode: httpStatus.OK,
    message: "Blog retrieved successfully",
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
  const paginationOptions = Pick(req.query,paginationOptionKeys)
  const result = await BlogServices.getRecentBlogsFromDB(req.user,paginationOptions as any);
  sendSuccessResponse(res, {
    statusCode: httpStatus.OK,
    message: "Blogs retrieved successfully",
    ...result
  });
});

const getPopularBlogs = catchAsync(async (req: Request, res: Response) => {
  const paginationOptions = Pick(req.query,paginationOptionKeys)
  const result = await BlogServices.getPopularBlogsFromDB(req.user,paginationOptions as any);
  sendSuccessResponse(res, {
    statusCode: httpStatus.OK,
    message: "Blogs retrieved successfully",
    ...result
  });
});

const getTrendingBlogs = catchAsync(async (req: Request, res: Response) => {
  const result = await BlogServices.getTrendingBlogsFromDB(
    req.params.categoryId,
  );
  sendSuccessResponse(res, {
    statusCode: httpStatus.OK,
    message: "Blogs retrieved successfully",
    ...result
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
  const result = await BlogServices.updateBlogByIdFromDB(
    req.params.id,
    req.body,
  );
  sendSuccessResponse(res, {
    statusCode: httpStatus.OK,
    message: "Blog deleted successfully",
    data: result,
  });
});

const getBlogStates = catchAsync(async (req: Request, res: Response) => {
  const result = await BlogServices.getBlogStatesFromDB(req.params.id);
  sendSuccessResponse(res, {
    statusCode: httpStatus.OK,
    message: "Blog states retrieved successfully",
    data: result,
  });
});

const getRelatedBlogs = catchAsync(async (req: Request, res: Response) => {
  const result = await BlogServices.getRelatedBlogsFromDB(req.params.slug);
  sendSuccessResponse(res, {
    statusCode: httpStatus.OK,
    message: "Blogs retrieved successfully",
    data: result,
  });
});

const BlogControllers = {
  createBlog,
  getBlogs,
  getPopularBlogs,
  getRecentBlogs,
  getTrendingBlogs,
  getMyBlogs,
  getBlogsForManage,
  getBlogById,
  getBlogForReadBySlug,
  getRelatedBlogs,
  deleteBlogById,
  updateBlogById,
  getBlogStates,
};

export default BlogControllers;

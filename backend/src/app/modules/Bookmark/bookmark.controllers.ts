import { Request, Response } from "express";
import catchAsync from "../../shared/catchAsync";
import httpStatus from "../../shared/http-status";
import { sendSuccessResponse } from "../../shared/response";
import Pick from "../../utils/pick";
import { paginationOptionKeys } from "../../utils/constanat";
import BookmarkServices from "./bookmark.service";

const createBookmark = catchAsync(async (req: Request, res: Response) => {
  const result = await BookmarkServices.createBookmarkIntoDB(
    req.user,
    req.body,
  );

  sendSuccessResponse(res, {
    statusCode: httpStatus.OK,
    message: "Blog added on bookmark successfully",
    data: result,
  });
});

const deleteBookmark = catchAsync(async (req: Request, res: Response) => {
  const result = await BookmarkServices.deleteBookmarkFromDB(
    req.user,
    req.params.blogId,
  );

  sendSuccessResponse(res, {
    statusCode: httpStatus.OK,
    message: "Blog deleted from bookmark bookmark successfully",
    data: result,
  });
});

const getMyBookmarksFromDB = catchAsync(async (req: Request, res: Response) => {
  const paginationOptions = Pick(req.query, paginationOptionKeys);
  const result = await BookmarkServices.getMyBookmarksFromDB(
    req.user,
    paginationOptions as any,
  );

  sendSuccessResponse(res, {
    statusCode: httpStatus.OK,
    message: "Bookmark blogs fetched successfully",
    data: result,
  });
});

const BookmarkControllers = {
  createBookmark,
  deleteBookmark,
  getMyBookmarksFromDB,
};

export default BookmarkControllers;

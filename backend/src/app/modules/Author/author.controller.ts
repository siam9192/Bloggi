import { Request, Response } from "express";
import catchAsync from "../../shared/catchAsync";
import { sendSuccessResponse } from "../../shared/response";
import httpStatus from "../../shared/http-status";
import AuthorServices from "./author.service";

const getPopularAuthors = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthorServices.getPopularAuthorsFromDB(req.user);
  sendSuccessResponse(res, {
    statusCode: httpStatus.OK,
    message: "Successfully Retrieved",
    data: result,
  });
});

const AuthorsControllers = {
  getPopularAuthors,
};

export default AuthorsControllers;

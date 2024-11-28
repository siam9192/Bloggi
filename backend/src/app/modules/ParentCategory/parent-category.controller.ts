import { Request, Response } from "express";
import catchAsync from "../../shared/catchAsync";
import { sendSuccessResponse } from "../../shared/response";
import httpStatus from "../../shared/http-status";
import ParentCategoryServices from "./parent-category.service";

const createParentCategory = catchAsync(async (req: Request, res: Response) => {
  const result = await ParentCategoryServices.createParentCategoryIntoDB(
    req.body,
  );

  sendSuccessResponse(res, {
    statusCode: httpStatus.CREATED,
    message: "Parent category  successful",
    data: result,
  });
});

const getParentCategories = catchAsync(async (req: Request, res: Response) => {
  const result = await ParentCategoryServices.getParentCategoriesFromDB();

  sendSuccessResponse(res, {
    statusCode: httpStatus.CREATED,
    message: "Parent categories retrieved  successful",
    data: result,
  });
});

const ParentCategoryControllers = {
  createParentCategory,
  getParentCategories,
};

export default ParentCategoryControllers;

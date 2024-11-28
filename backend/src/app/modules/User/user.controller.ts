import { Request, Response } from "express";
import catchAsync from "../../shared/catchAsync";
import { sendSuccessResponse } from "../../shared/response";
import httpStatus from "../../shared/http-status";
import UserServices from "./user.service";
import Pick from "../../utils/pick";
import { paginationOptionKeys } from "../../utils/constanat";

const createStaff = catchAsync(async (req: Request, res: Response) => {
  const result = await UserServices.createStaffIntoDB(req.body);
  sendSuccessResponse(res, {
    statusCode: httpStatus.CREATED,
    message: "Staff created successfully",
    data: result,
  });
});

const createAuthor = catchAsync(async (req: Request, res: Response) => {
  const result = await UserServices.createAuthorIntoDB(req.body);
  sendSuccessResponse(res, {
    statusCode: httpStatus.CREATED,
    message: "Author created successfully3",
    data: result,
  });
});

const changeUserStatus = catchAsync(async (req: Request, res: Response) => {
  const result = await UserServices.ChangeUserStatusIntoDB(req.body);
  sendSuccessResponse(res, {
    statusCode: httpStatus.OK,
    message: "User status changed successfully",
    data: result,
  });
});

const getAllUsers = catchAsync(async (req: Request, res: Response) => {
  const filters = Pick(req.query, [
    "searchTerm",
    "name",
    "email",
    "status",
    "role",
  ]);
  const options = Pick(req.query, paginationOptionKeys);
  const result = await UserServices.getAllUsersFromDB(filters, options as any);
  sendSuccessResponse(res, {
    statusCode: httpStatus.OK,
    message: "Users retrieved successfully",
    meta: result.meta,
    data: result.data,
  });
});

const softDeleteUser = catchAsync(async (req: Request, res: Response) => {
  const result = await UserServices.softDeleteUserIntoDB(req.params.userId);
  sendSuccessResponse(res, {
    statusCode: httpStatus.OK,
    message: "User deleted successfully",
    data: result,
  });
});

const UserControllers = {
  createStaff,
  createAuthor,
  changeUserStatus,
  getAllUsers,
  softDeleteUser,
};

export default UserControllers;

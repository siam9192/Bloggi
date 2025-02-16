import { Request, Response } from "express";
import catchAsync from "../../shared/catchAsync";
import { sendSuccessResponse } from "../../shared/response";
import httpStatus from "../../shared/http-status";
import StaffServices from "./staff.service";
import Pick from "../../utils/pick";
import { paginationOptionKeys } from "../../utils/constant";

const getStaffs = catchAsync(async (req: Request, res: Response) => {
  const paginationOptions = Pick(req.query, paginationOptionKeys);
  const result = await StaffServices.getStaffsFromDB(paginationOptions as any);
  sendSuccessResponse(res, {
    statusCode: httpStatus.OK,
    message: "Staffs retrieved successfully",
    data: result,
  });
});

const StaffControllers = {
  getStaffs,
};

export default StaffControllers;

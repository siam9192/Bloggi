import { Request, Response } from "express";
import catchAsync from "../../shared/catchAsync";
import { sendSuccessResponse } from "../../shared/response";
import httpStatus from "../../shared/http-status";
import PackageServices from "./package.service";

const createPackage = catchAsync(async (req: Request, res: Response) => {
  const result = await PackageServices.createPackageIntoDB(req.body);
  sendSuccessResponse(res, {
    statusCode: httpStatus.CREATED,
    message: "Package created successfully",
    data: result,
  });
});

const getPackages = catchAsync(async (req: Request, res: Response) => {
  const result = await PackageServices.getPackagesFromDB();
  sendSuccessResponse(res, {
    statusCode: httpStatus.OK,
    message: "Packages retrieved successfully",
    data: result,
  });
});



const PackageControllers = {
    createPackage,
    getPackages
}

export default PackageControllers
import { Request, Response } from "express";
import catchAsync from "../../shared/catchAsync";
import { sendSuccessResponse } from "../../shared/response";
import httpStatus from "../../shared/http-status";
import PlanServices from "./plan.service";

const createPlan = catchAsync(async (req: Request, res: Response) => {
  const result = await PlanServices.createPlanIntoDB(req.body);
  sendSuccessResponse(res, {
    statusCode: httpStatus.CREATED,
    message: "Plan created successfully",
    data: result,
  });
});

const getPlans = catchAsync(async (req: Request, res: Response) => {
  const result = await PlanServices.getPlansFromDB();
  sendSuccessResponse(res, {
    statusCode: httpStatus.OK,
    message: "Packages retrieved successfully",
    data: result,
  });
});

const  PlanControllers = {
  createPlan,
  getPlans
};

export default PlanControllers;

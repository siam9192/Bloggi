import { Request, Response } from "express";
import catchAsync from "../../shared/catchAsync";
import httpStatus from "../../shared/http-status";
import { sendSuccessResponse } from "../../shared/response";
import SubscriptionServices from "./subscription.service";


const purchasePackage = catchAsync(async (req: Request, res: Response) => {
  const result = await SubscriptionServices.purchasePackage(req.user,req.body);
  sendSuccessResponse(res, {
    statusCode: httpStatus.OK,
    message: "Payment url retrieved successfully",
    data: result,
  });
});



const subscriptionControllers = {
    purchasePackage
}


export default subscriptionControllers
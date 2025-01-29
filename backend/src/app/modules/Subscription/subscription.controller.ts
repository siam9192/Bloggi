import { Request, Response } from "express";
import catchAsync from "../../shared/catchAsync";
import httpStatus from "../../shared/http-status";
import { sendSuccessResponse } from "../../shared/response";
import SubscriptionServices from "./subscription.service";
import Pick from "../../utils/pick";
import { paginationOptionKeys } from "../../utils/constant";

const purchasePackage = catchAsync(async (req: Request, res: Response) => {
  const result = await SubscriptionServices.initPlanSubscription(
    req.user,
    req.body,
  );
  sendSuccessResponse(res, {
    statusCode: httpStatus.OK,
    message: "Payment url retrieved successfully",
    data: result,
  });
});

const getSubscriptionsFromDB = catchAsync(
  async (req: Request, res: Response) => {
    const filter = Pick(req.query, [
      "startDate",
      "endDate",
      "status",
      "userId",
    ]);

    const paginationOptions = Pick(req.query, paginationOptionKeys);

    const result = await SubscriptionServices.getSubscriptionsFromDB(
      filter,
      paginationOptions as any,
    );
    sendSuccessResponse(res, {
      statusCode: httpStatus.OK,
      message: "Subscriptions  retrieved successfully",
      ...result,
    });
  },
);

const getMyCurrentSubscription = catchAsync(
  async (req: Request, res: Response) => {
    const result = await SubscriptionServices.getMyCurrentSubscription(
      req.user,
    );
    sendSuccessResponse(res, {
      statusCode: httpStatus.OK,
      message: "Current Subscription retrieved successfully",
      data: result,
    });
  },
);

const subscriptionControllers = {
  purchasePackage,
  getSubscriptionsFromDB,
  getMyCurrentSubscription,
};

export default subscriptionControllers;

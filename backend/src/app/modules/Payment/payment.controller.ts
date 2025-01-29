import { Request, Response } from "express";
import catchAsync from "../../shared/catchAsync";
import { sendSuccessResponse } from "../../shared/response";
import httpStatus from "../../shared/http-status";
import PaymentServices from "./payment.service";
import Pick from "../../utils/pick";
import { paginationOptionKeys } from "../../utils/constant";

const validateSSLSubscriptionPayment = catchAsync(
  async (req: Request, res: Response) => {
    const result = await PaymentServices.validateSSLSubscriptionPayment(
      req.query,
    );
    sendSuccessResponse(res, {
      statusCode: httpStatus.OK,
      message: "Payment Validation successful!",
      data: result,
    });
  },
);

const validateStripeSubscriptionPayment = catchAsync(
  async (req: Request, res: Response) => {
    const result = await PaymentServices.validateStripeSubscriptionPayment(
      req.body,
    );
    sendSuccessResponse(res, {
      statusCode: httpStatus.OK,
      message: "Payment Validation successful!",
      data: result,
    });
  },
);

const getMyPayments = catchAsync(async (req: Request, res: Response) => {
  const paginationOptions = Pick(req.query, paginationOptionKeys);
  const result = await PaymentServices.getMyPaymentsFromDB(
    req.user,
    paginationOptions as any,
  );
  sendSuccessResponse(res, {
    statusCode: httpStatus.CREATED,
    message: "Payments retrieved successfully",
    data: result,
  });
});

const getPayments = catchAsync(async (req: Request, res: Response) => {
  const filter = Pick(req.query, [
    "minAmount",
    "maxAmount",
    "startDate",
    "endDate",
    "status",
    "customerId",
  ]);
  const paginationOptions = Pick(req.query, paginationOptionKeys);
  const result = await PaymentServices.getPaymentsFromDB(
    filter,
    paginationOptions as any,
  );
  sendSuccessResponse(res, {
    statusCode: httpStatus.OK,
    message: "Payments retrieved successful",
    data: result,
  });
});

const PaymentControllers = {
  validateSSLSubscriptionPayment,
  validateStripeSubscriptionPayment,
  getMyPayments,
  getPayments,
};

export default PaymentControllers;

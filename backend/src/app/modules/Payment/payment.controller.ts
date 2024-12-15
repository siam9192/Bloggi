import { Request, Response } from "express";
import catchAsync from "../../shared/catchAsync";
import { sendSuccessResponse } from "../../shared/response";
import httpStatus from "../../shared/http-status";
import PaymentServices from "./payment.service";
import Pick from "../../utils/pick";
import { paginationOptionKeys } from "../../utils/constanat";

const packageSubscriptionPaymentSuccess = catchAsync(
  async (req: Request, res: Response) => {
    const result = await PaymentServices.paymentPackageSubscriptionSuccess(
      res,
      req.params.paymentId,
    );
  },
);

const packageSubscriptionPaymentCancel = catchAsync(
  async (req: Request, res: Response) => {
    const result = await PaymentServices.paymentPackageSubscriptionSuccess(
      res,
      req.params.paymentId,
    );
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

const PaymentControllers = {
  packageSubscriptionPaymentCancel,
  packageSubscriptionPaymentSuccess,
  getMyPayments,
};

export default PaymentControllers;

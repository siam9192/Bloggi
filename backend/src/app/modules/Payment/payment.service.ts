import AppError from "../../Errors/AppError";
import httpStatus from "../../shared/http-status";
import prisma from "../../shared/prisma";

import { IPaginationOptions } from "../../interfaces/pagination";
import { IAuthUser } from "../Auth/auth.interface";
import { calculatePagination } from "../../helpers/paginationHelper";
import { PaymentMethod, PaymentStatus, Prisma } from "@prisma/client";
import {
  IFilterPayments,
  IInitSubscriptionPaymentPayload,
} from "./payment.interface";
import { generateTransactionId } from "./payment.function";
import StripeServices from "../Stripe/stripe.service";
import SSLServices from "../SSL/ssl.service";

const initSubscriptionPayment = async (
  tx: Prisma.TransactionClient,
  payload: IInitSubscriptionPaymentPayload,
) => {
  const transaction_id = await generateTransactionId();
  const createdPayment = await tx.payment.create({
    data: {
      transaction_id,
      amount: payload.amount,
      method: payload.method,
      user_id: payload.user_id,
      status: PaymentStatus.Pending,
    },
  });
  let paymentUrl;

  switch (payload.method) {
    case PaymentMethod.Stripe:
      const res = await StripeServices.createCheckoutSession({
        planName: payload.planeName,
        amount: payload.amount,
        transactionId: transaction_id,
      });
      paymentUrl = res.url;
      break;
    case PaymentMethod.SSLCommerz:
      const response = await SSLServices.createPaymentSession({
        transactionId: transaction_id,
        amount: payload.amount,
        customer: payload.customer,
      });
      paymentUrl = response.GatewayPageURL;
      break;
    default:
      null;
  }

  return {
    paymentId: createdPayment.id,
    transactionId: transaction_id,
    paymentUrl,
  };
};

const validateSSLSubscriptionPayment = async (payload: any) => {
  if (!payload || !payload.status) {
    return {
      message: "Invalid Payment!",
    };
  }

  if (payload.status === "VALID") {
    const response = await SSLServices.validatePayment(payload);

    if (response?.status !== "VALID") {
      return {
        message: "Payment Failed!",
      };
    }
    const payment = await prisma.payment.findUnique({
      where: {
        transaction_id: payload.tran_id,
      },
    });

    if (!payment)
      throw new AppError(httpStatus.BAD_REQUEST, "Invalid payment!");
    await prisma.payment.update({
      where: {
        id: payment.id,
      },
      data: {
        status: PaymentStatus.Success,
      },
    });
  } else {
    PaymentServices.manageCanceledOrFailedPayment(
      payload.tran_id,
      payload.status,
    );
  }
};

const validateStripeSubscriptionPayment = async (event: any) => {
  if (!event || event.type)
    throw new AppError(httpStatus.BAD_GATEWAY, "Bad request");
  const session = event.data.object;
  const metaData = session.metaData;
  switch (event.type) {
    case "checkout.session.completed":
      const payment = await prisma.payment.findUnique({
        where: {
          transaction_id: metaData.transactionId,
        },
      });

      if (!payment) {
        throw new AppError(httpStatus.BAD_REQUEST, "Invalid payment");
      }
      await prisma.payment.update({
        where: {
          id: payment.id,
        },
        data: {
          status: PaymentStatus.Success,
        },
      });

    case "checkout.session.async_payment_failed":
      await PaymentServices.manageCanceledOrFailedPayment(
        metaData.transactionId,
        "FAILED",
      );
    case "checkout.session.async_payment_failed":
      await PaymentServices.manageCanceledOrFailedPayment(
        metaData.transactionId,
        "FAILED",
      );
    case "checkout.session.expired":
      await PaymentServices.manageCanceledOrFailedPayment(
        metaData.transactionId,
        "EXPIRED",
      );

    default:
      throw new AppError(httpStatus.BAD_REQUEST, "Bad request");
  }
};

const manageCanceledOrFailedPayment = async (
  transactionId: string,
  status: "FAILED" | "CANCELED" | "EXPIRED" | "UNATTEMPTED",
) => {
  const payment = await prisma.payment.findUnique({
    where: {
      transaction_id: transactionId,
      status: PaymentStatus.Pending,
    },
  });

  if (!payment) {
    throw new AppError(httpStatus.BAD_REQUEST, "Bad request");
  }
  let pStatus;
  switch (status) {
    case "CANCELED":
      pStatus = PaymentStatus.Canceled;
    case "FAILED":
      pStatus = PaymentStatus.Failed;
    case "EXPIRED":
      pStatus = PaymentStatus.Failed;
    case "UNATTEMPTED":
      pStatus = PaymentStatus.Failed;
  }

  await prisma.payment.update({
    where: {
      transaction_id: transactionId,
    },
    data: {
      status: pStatus,
    },
  });
};

const getMyPaymentsFromDB = async (
  authUser: IAuthUser,
  paginationOptions: IPaginationOptions,
) => {
  const { skip, limit, page, sortBy, sortOrder } =
    calculatePagination(paginationOptions);

  const whereConditions: Prisma.PaymentWhereInput = {
    user_id: authUser.id,
    status: PaymentStatus.Success,
  };
  const data = await prisma.payment.findMany({
    where: whereConditions,
    skip,
    take: limit,
    orderBy: {
      [sortBy]: sortOrder,
    },
  });
  const total = await prisma.payment.count({
    where: whereConditions,
  });

  const meta = {
    page,
    limit,
    total,
  };
  return {
    data,
    meta,
  };
};

const getPaymentsFromDB = async (
  filter: IFilterPayments,
  paginationOptions: IPaginationOptions,
) => {
  const { skip, limit, page, sortBy, sortOrder } =
    calculatePagination(paginationOptions);

  const andConditions: Prisma.PaymentWhereInput[] = [];

  const { minAmount, maxAmount, startDate, endDate, status } = filter;

  if (minAmount || maxAmount) {
    const validate = (amount: string) => {
      return !isNaN(parseInt(amount));
    };

    if (minAmount && validate(minAmount) && maxAmount && validate(maxAmount)) {
      andConditions.push({
        amount: {
          gte: parseInt(minAmount),
          lte: parseInt(maxAmount),
        },
      });
    } else if (minAmount && validate(minAmount)) {
      andConditions.push({
        amount: {
          gte: parseInt(minAmount),
        },
      });
    } else if (maxAmount && validate(maxAmount)) {
      andConditions.push({
        amount: {
          lte: parseInt(maxAmount),
        },
      });
    }
  }

  if (startDate || endDate) {
    const validate = (date: string) => {
      return !isNaN(new Date(date).getTime());
    };

    if (startDate && validate(startDate) && endDate && validate(endDate)) {
      andConditions.push({
        created_at: {
          gte: new Date(startDate),
          lte: new Date(endDate),
        },
      });
    } else if (startDate && validate(startDate)) {
      andConditions.push({
        created_at: {
          gte: new Date(startDate),
        },
      });
    } else if (endDate && validate(endDate)) {
      andConditions.push({
        created_at: {
          lte: new Date(endDate),
        },
      });
    }
  }

  if (status) {
    andConditions.push({
      status,
    });
  }

  const whereConditions: Prisma.PaymentWhereInput = {
    AND: andConditions,
  };

  const data = await prisma.payment.findMany({
    where: whereConditions,
    skip,
    take: limit,
    orderBy: {
      [sortBy]: sortOrder,
    },
  });
  const total = await prisma.payment.count({
    where: whereConditions,
  });

  const meta = {
    page,
    limit,
    total,
  };
  return {
    data,
    meta,
  };
};

const PaymentServices = {
  initSubscriptionPayment,
  getMyPaymentsFromDB,
  getPaymentsFromDB,
  manageCanceledOrFailedPayment,
  validateStripeSubscriptionPayment,
  validateSSLSubscriptionPayment,
};

export default PaymentServices;

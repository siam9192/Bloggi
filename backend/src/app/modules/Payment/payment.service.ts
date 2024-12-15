import { text } from "stream/consumers";
import AppError from "../../Errors/AppError";
import httpStatus from "../../shared/http-status";
import prisma from "../../shared/prisma";
import { Response } from "express";
import { IPaginationOptions } from "../../interfaces/pagination";
import { IAuthUser } from "../Auth/auth.interface";
import { calculatePagination } from "../../helpers/paginationHelper";
import { Prisma } from "@prisma/client";

const paymentPackageSubscriptionSuccess = async (
  res: Response,
  paymentId: string | number,
) => {
  // Typecast paymentId string to number
  paymentId = Number(paymentId);
  const payment = await prisma.payment.findUnique({
    where: {
      id: paymentId,
    },
  });

  if (!payment) {
    throw new AppError(httpStatus.BAD_REQUEST, "Something went wrong");
  }

  await prisma.$transaction(async (tx) => {
    await tx.payment.update({
      where: {
        id: paymentId,
      },
      data: {
        status: "Success",
      },
    });
    await tx.subscription.update({
      where: {
        payment_id: paymentId,
      },
      data: {
        status: "Active",
      },
    });
  });
  res.redirect("https://vidtube-six.vercel.app/?page=1");
};

const paymentPackageSubscriptionCancel = async (
  res: Response,
  paymentId: string | number,
) => {
  // Typecast paymentId string to number
  paymentId = Number(paymentId);
  const payment = await prisma.payment.findUnique({
    where: {
      id: paymentId,
    },
  });

  if (!payment) {
    throw new AppError(httpStatus.BAD_REQUEST, "Something went wrong");
  }

  await prisma.$transaction(async (tx) => {
    await tx.payment.update({
      where: {
        id: paymentId,
      },
      data: {
        status: "Canceled",
      },
    });
  });

  res.redirect("https://vidtube-six.vercel.app/?page=2");
};

const getMyPaymentsFromDB = async (
  authUser: IAuthUser,
  paginationOptions: IPaginationOptions,
) => {
  const { limit, skip, page, sortBy, orderBy } =
    calculatePagination(paginationOptions);

  const whereConditions: Prisma.PaymentWhereInput = {
    user_id: authUser.id,
    status: "Success",
  };

  const data = await prisma.payment.findMany({
    where: whereConditions,
    skip,
    take: limit,
    orderBy: {
      [sortBy]: orderBy,
    },
    select: {
      user_id: false,
      id: true,
      amount: true,
      method: true,
      status: true,
      created_at: true,
    },
  });

  const total = await prisma.payment.count({
    where: whereConditions,
  });

  const meta = {
    total,
    limit,
    page,
  };

  return {
    data,
    meta,
  };
};

const getPaymentsFromDB = (paginationOptions: IPaginationOptions) => {
  const whereConditions: Prisma.PaymentWhereInput = {
    status: "Success",
  };
};

const PaymentServices = {
  paymentPackageSubscriptionSuccess,
  paymentPackageSubscriptionCancel,
  getMyPaymentsFromDB,
};

export default PaymentServices;

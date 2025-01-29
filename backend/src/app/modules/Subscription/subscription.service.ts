import { PaymentStatus, Prisma, SubscriptionStatus } from "@prisma/client";
import AppError from "../../Errors/AppError";
import httpStatus from "../../shared/http-status";
import prisma from "../../shared/prisma";
import { IAuthUser } from "../Auth/auth.interface";
import {
  IFilterSubscriptions,
  IPurchasePackagePayload,
} from "./subscription.interface";
import { IInitSubscriptionPaymentPayload } from "../Payment/payment.interface";
import PaymentServices from "../Payment/payment.service";
import { IPaginationOptions } from "../../interfaces/pagination";
import { calculatePagination } from "../../helpers/paginationHelper";

const initPlanSubscription = async (
  authUser: IAuthUser,
  payload: IPurchasePackagePayload,
) => {
  const plan = await prisma.plan.findUnique({
    where: {
      id: payload.plan_id,
    },
  });

  // Checking package existence
  if (!plan) {
    throw new AppError(httpStatus.NOT_FOUND, "Subscription Package not found");
  }

  const readerSubscriptions = await prisma.subscription.findMany({
    where: {
      status: {
        not: "Expired",
      },
      end_at: {
        gt: new Date(),
      },
    },
    orderBy: {
      end_at: "desc",
    },
  });

  const latestSubscription = readerSubscriptions[0];

  //   Check is the user have any  active subscription
  // If active subscription then throw error otherwise go next steps
  let hoursDif = 0;
  if (latestSubscription) {
    const subscriptionExpireTime = new Date(
      latestSubscription.end_at,
    ).getTime();
    const currentTime = new Date().getTime();
    const timeDiff = Math.abs(subscriptionExpireTime - currentTime);
    hoursDif = timeDiff / (1000 * 60 * 60); // Convert milliseconds to hours
    if (hoursDif > 48) {
      throw new AppError(
        httpStatus.NOT_ACCEPTABLE,
        "Sorry.you can't purchase any subscription now",
      );
    }
  }

  //   Calculate package price
  const planPrice =
    plan.price -
    (plan.discount_type === "Fixed"
      ? plan.discount
      : (plan.discount / 100) * plan.price);

  const result = await prisma.$transaction(async (tx) => {
    const reader = await tx.reader.findUnique({
      where: {
        id: authUser.readerId,
      },
      include: {
        user: true,
      },
    });

    if (!reader)
      throw new AppError(
        httpStatus.BAD_REQUEST,
        "Bad request something went wrong",
      );

    const paymentPayload: IInitSubscriptionPaymentPayload = {
      planeName: plan.name,
      amount: planPrice,
      method: payload.method,
      user_id: authUser.id,
      customer: {
        name: reader.first_name + " " + reader.last_name,
        phone: null,
        email: reader.user.email,
      },
    };

    const { transactionId, paymentId, paymentUrl } =
      await PaymentServices.initSubscriptionPayment(tx, paymentPayload);

    const start_at = new Date();
    const end_at = new Date(new Date().getTime() + hoursDif * 60 * 60 * 1000);

    await tx.subscription.create({
      data: {
        reader_id: authUser.readerId!,
        payment_id: paymentId,
        plan_id: plan.id,
        status:
          hoursDif > 48
            ? SubscriptionStatus.Inactive
            : SubscriptionStatus.Active,
        start_at,
        end_at,
        validity_days: plan.validity_days,
      },
    });

    return {
      transactionId,
      paymentId,
      paymentUrl,
    };
  });

  return {
    paymentUrl: result.paymentUrl,
  };
};

const getMyCurrentSubscription = async (authUser: IAuthUser) => {
  const subscriptions = await prisma.subscription.findMany({
    where: {
      reader_id: authUser.readerId!,
      status: SubscriptionStatus.Active,
      payment: {
        status: PaymentStatus.Success,
      },
      end_at: {
        lte: new Date(),
      },
    },
    orderBy: {
      end_at: "desc",
    },
  });
  const currentSubscription = subscriptions[0];
  return currentSubscription;
};

const getSubscriptionsFromDB = async (
  filter: IFilterSubscriptions,
  paginationOptions: IPaginationOptions,
) => {
  const { skip, limit, page, sortBy, sortOrder } =
    calculatePagination(paginationOptions);

  const { startDate, endDate, status, readerId } = filter;

  const andConditions: Prisma.SubscriptionWhereInput[] = [];
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

  if (readerId) {
    andConditions.push({
      reader_id: parseInt(readerId),
    });
  }

  const whereConditions: Prisma.SubscriptionWhereInput = {
    AND: andConditions,
  };

  const data = await prisma.subscription.findMany({
    where: whereConditions,
    skip,
    take:limit,
    orderBy:{
      [sortBy]:sortOrder
    }
  });

  const total = await prisma.subscription.count({
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

const SubscriptionServices = {
  initPlanSubscription,
  getMyCurrentSubscription,
  getSubscriptionsFromDB,
};

export default SubscriptionServices;

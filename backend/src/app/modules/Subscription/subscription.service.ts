import {
  PaymentMethod,
  PaymentStatus,
  SubscriptionStatus,
} from "@prisma/client";
import AppError from "../../Errors/AppError";
import httpStatus from "../../shared/http-status";
import prisma from "../../shared/prisma";
import { IAuthUser } from "../Auth/auth.interface";
import { stripePayment } from "../../PaymentMethod/stripePayment";
import { IPaymentMethodData } from "../../PaymentMethod/payment-method.interface";
import { IPurchasePackagePayload } from "./subscription.interface";
import config from "../../config";
import { sslcommerzPayment } from "../../PaymentMethod/sslCommez";

const purchasePackage = async (
  authUser: IAuthUser,
  payload: IPurchasePackagePayload,
) => {
  const packageData = await prisma.package.findUnique({
    where: {
      id: payload.package_id,
    },
  });

  // Checking package existence
  if (!packageData) {
    throw new AppError(httpStatus.NOT_FOUND, "Package not found");
  }

  const reader = await prisma.reader.findUnique({
    where: {
      id: authUser.id,
    },
    include: {
      subscriptions: {
        where: {
          payment: {
            status: "Success",
          },
          end_at: {
            gt: new Date(),
          },
        },

        orderBy: {
          created_at: "desc",
        },
        take: 1,
      },
    },
  });

  //   Check user existence
  if (!reader) {
    throw new AppError(httpStatus.BAD_REQUEST, "Something went wrong");
  }
  const latestSubscription = reader?.subscriptions[0];

  //   Check is the user have any  active subscription
  // If active subscription then throw error otherwise go next steps

  if (latestSubscription) {
    const subscriptionExpireAt = new Date(latestSubscription.end_at).getTime();
    const today = new Date().getTime();
    if (subscriptionExpireAt >= today) {
      throw new AppError(httpStatus.NOT_ACCEPTABLE, "Something went wrong");
    }
  }

  //   Calculate package price
  const packagePrice =
    packageData.price -
    (packageData.discount_type === "Fixed"
      ? packageData.discount
      : (packageData.discount / 100) * packageData.price);

  const today = new Date();

  //    Generate transactionId
  const transaction_id = `${payload.method.toUpperCase()}-${today.getFullYear()}${today.getMonth()}${today.getHours()}${today.getMinutes()}${today.getSeconds()}${today.getMilliseconds()}`;

  const result = await prisma.$transaction(async (tx) => {
    const createdPayment = await tx.payment.create({
      data: {
        transaction_id,
        amount: packagePrice,
        method: payload.method,
        status: PaymentStatus.Pending,
        user_id: authUser.id,
      },
    });

    const start_at = new Date();
    const end_at = new Date();
    // Add validity days
    end_at.setDate(new Date().getDate() + packageData.validity_days);

    await tx.subscription.create({
      data: {
        reader_id:reader.id,
        payment_id: createdPayment.id,
        package_id: packageData.id,
        status: SubscriptionStatus.Inactive,
        start_at,
        end_at,
      },
    });
    return {
      paymentId: createdPayment.id,
      subscriptionId: createdPayment.id,
      transaction_id,
    };
  });

  const paymentMethodData: IPaymentMethodData = {
    service_name: packageData.name,
    transaction_id,
    amount: packagePrice,
    success_url: `${config.backend_base_api}/payments/package-purchase/${result.paymentId}/success`,
    cancel_url: `${config.backend_base_api}/payments/package-purchase/${result.paymentId}/cancel`,
  };

  let paymentUrl;

  switch (payload.method) {
    case PaymentMethod.Stripe:
      paymentUrl = await stripePayment(paymentMethodData);
      break;
    case PaymentMethod.SSL:
      paymentUrl = await sslcommerzPayment(paymentMethodData);
    default:
      break;
  }

  return {
    paymentUrl,
  };
};

const SubscriptionServices = {
  purchasePackage,
};

export default SubscriptionServices;

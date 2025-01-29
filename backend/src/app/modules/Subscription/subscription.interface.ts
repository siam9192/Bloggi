import { PaymentMethod, SubscriptionStatus } from "@prisma/client";

export interface IPurchasePackagePayload {
  method: `${PaymentMethod}`;
  plan_id: number;
}

export interface IFilterSubscriptions {
  startDate?: string;
  endDate?: string;
  readerId?: string;
  status?: `${SubscriptionStatus}`;
}

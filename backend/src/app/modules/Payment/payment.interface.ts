import { PaymentMethod, PaymentStatus } from "@prisma/client";

export interface IInitSubscriptionPaymentPayload {
  method: `${PaymentMethod}`;
  user_id: number;
  planeName: string;
  amount: number;
  customer: {
    name: string;
    email: string | null;
    phone: string | null;
  };
}

export interface IInitPaymentPayload {
  method: `${PaymentMethod}`;
  orderId: string;
  amount: number;
  customer: {
    name: string;
    email: string | null;
    phone: string | null;
  };
  shippingAddress: string;
}

export interface IFilterPayments {
  minAmount?: string;
  maxAmount?: string;
  startDate?: string;
  endDate?: string;
  status?: `${PaymentStatus}`;
}

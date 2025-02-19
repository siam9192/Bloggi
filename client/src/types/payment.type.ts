import { IUser } from "./user.type";

export interface IPayment {
  id: number;
  transaction_id: string;
  user_id: number;
  amount: number;
  method: TPaymentMethod;
  status: TPaymentStatus;
  user: IUser;
  created_at: string;
  updated_at: string;
}

export type TPaymentMethod = `${EPaymentMethod}`;
export type TPaymentStatus = `${EPaymentStatus}`;

export enum EPaymentMethod {
  Stripe = "Stripe",
  Paypal = "Payment",
  SSLCommerz = "SSLCommerz",
  Bkash = "Bkash",
  Nagad = "Nagad",
}

export enum EPaymentStatus {
  Pending = "Pending",
  Success = "Success",
  Failed = "Failed",
  Canceled = "Canceled",
  Expired = "Expired",
  Timeout = "Timeout",
}

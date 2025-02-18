import { number } from "zod";
import { IReader } from "./user.type";
import { IPlan } from "./plan.type";

export interface ISubscription {
  id: number;
  reader_id: number;
  payment_id: number;
  plan_id: number;
  status: `${ESubscriptionStatus}`;
  start_at: string;
  end_at: string;
  validity_days: number;
  reader: IReader;
  plan: IPlan;
  planData: JSON;
  created_at: string;
}

enum ESubscriptionStatus {
  Active,
  Inactive,
  Expired,
}

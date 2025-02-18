import { ISubscription } from "./subscription.interface";

export interface IPlan {
  id: number;
  name: string;
  price: number;
  discount: number;
  discount_type: `${EPlanDiscountType}`;
  features: IPlanFeature[];
  validity_days: number;
  created_at: string;
  updated_at: string;
  subscriptions: ISubscription[];
}

export interface IPlanFeature {
  id: number;
  plane_id: number;
  name: string;
  status: `${EPlanFeatureStatus}`;
  plan: IPlan;
}

export enum EPlanDiscountType {
  Percentage = "Percentage",
  Fixed = "Fixed",
}

export enum EPlanFeatureStatus {
  Included = "Included",
  NotIncluded = " Not_Included",
}

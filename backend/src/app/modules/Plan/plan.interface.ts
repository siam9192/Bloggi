import { PlanDiscountType, PlanFeatureStatus } from "@prisma/client";


interface IFeature {
  name: string;
  status: `${PlanFeatureStatus}`;
}

export interface ICreatePlanPayload {
  name: string;
  price: number;
  discount: number;
  discount_type: `${PlanDiscountType}`;
  validity_days: number;
  features: IFeature[];
}

import { PlanDiscountType, PlanFeatureStatus } from "@prisma/client";
import { z } from "zod";

const CreateFeature = z.object({
  name: z.string(),
  status: z.enum(Object.values(PlanFeatureStatus) as [string, ...string[]]),
});

const CreatePlanValidation = z.object({
  name: z.string(),
  price: z.number(),
  discount: z.number(),
  discount_type: z.enum(
    Object.values(PlanDiscountType) as [string, ...string[]],
  ),
  validity_days: z.number(),
  features: z.array(CreateFeature),
});

const UpdatePlanValidation = z.object({
  name: z.string().optional(),
  price: z.number().optional(),
  discount: z.number().optional(),
  discount_type: z
    .enum(Object.values(PlanDiscountType) as [string, ...string[]])
    .optional(),
  validity_days: z.number().min(7).optional(),
  new_features: z.array(CreateFeature).optional(),
  updated_features: z
    .array(
      z.object({
        id: z.string(),
        name: z.string().optional(),
        status: z
          .enum(Object.values(PlanFeatureStatus) as [string, ...string[]])
          .optional(),
      }),
    )
    .optional(),
  deleted_featuresId: z.array(z.string()).optional(),
});

const PlanValidations = {
  CreatePlanValidation,
  UpdatePlanValidation,
};

export default PlanValidations;

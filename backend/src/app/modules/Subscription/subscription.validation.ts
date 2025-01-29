import { PaymentMethod } from "@prisma/client";
import { z } from "zod";

const PurchasePlanValidation = z.object({
  plan_id: z.number(),
  method: z.enum(Object.values(PaymentMethod) as [string, ...string[]]),
});


const SubscriptionValidations = {
  PurchasePlanValidation,
};

export default SubscriptionValidations;

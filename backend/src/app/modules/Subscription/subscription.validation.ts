import { PaymentMethod } from "@prisma/client";
import { z } from "zod";

const PurchasePackageValidation = z.object({
  package_id: z.number(),
  method: z.enum(Object.values(PaymentMethod) as [string, ...string[]]),
});

const SubscriptionValidations = {
  PurchasePackageValidation,
};

export default SubscriptionValidations;

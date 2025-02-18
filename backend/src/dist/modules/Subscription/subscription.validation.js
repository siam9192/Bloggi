"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const zod_1 = require("zod");
const PurchasePlanValidation = zod_1.z.object({
  plan_id: zod_1.z.number(),
  method: zod_1.z.enum(Object.values(client_1.PaymentMethod)),
});
const SubscriptionValidations = {
  PurchasePlanValidation,
};
exports.default = SubscriptionValidations;

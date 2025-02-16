"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const zod_1 = require("zod");
const CreateFeature = zod_1.z.object({
    name: zod_1.z.string(),
    status: zod_1.z.enum(Object.values(client_1.PlanFeatureStatus)),
});
const CreatePlanValidation = zod_1.z.object({
    name: zod_1.z.string(),
    price: zod_1.z.number(),
    discount: zod_1.z.number(),
    discount_type: zod_1.z.enum(Object.values(client_1.PlanDiscountType)),
    validity_days: zod_1.z.number(),
    features: zod_1.z.array(CreateFeature),
});
const UpdatePlanValidation = zod_1.z.object({
    name: zod_1.z.string().optional(),
    price: zod_1.z.number().optional(),
    discount: zod_1.z.number().optional(),
    discount_type: zod_1.z
        .enum(Object.values(client_1.PlanDiscountType))
        .optional(),
    validity_days: zod_1.z.number().min(7).optional(),
    new_features: zod_1.z.array(CreateFeature).optional(),
    updated_features: zod_1.z
        .array(zod_1.z.object({
        id: zod_1.z.string(),
        name: zod_1.z.string().optional(),
        status: zod_1.z
            .enum(Object.values(client_1.PlanFeatureStatus))
            .optional(),
    }))
        .optional(),
    deleted_featuresId: zod_1.z.array(zod_1.z.string()).optional(),
});
const PlanValidations = {
    CreatePlanValidation,
    UpdatePlanValidation,
};
exports.default = PlanValidations;

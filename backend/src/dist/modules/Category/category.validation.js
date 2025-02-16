"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const CreateCategoryValidationSchema = zod_1.z.object({
    name: zod_1.z.string().min(1).max(50),
    parent_id: zod_1.z.number().optional(),
    is_featured: zod_1.z.boolean().default(false),
    image_url: zod_1.z.string().url().optional(),
    children: zod_1.z
        .array(zod_1.z.object({
        name: zod_1.z.string(),
        image_url: zod_1.z.string().url().optional(),
        is_featured: zod_1.z.boolean(),
    }))
        .optional(),
});
const UpdateCategoryValidationSchema = zod_1.z.object({
    id: zod_1.z.string(),
    name: zod_1.z.string().optional(),
    image_url: zod_1.z.string().url().optional(),
    is_featured: zod_1.z.boolean().optional(),
});
const CategoryValidations = {
    CreateCategoryValidationSchema,
    UpdateCategoryValidationSchema,
};
exports.default = CategoryValidations;

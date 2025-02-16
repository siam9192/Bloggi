"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const zod_1 = require("zod");
const CreateBlogValidation = zod_1.z.object({
    title: zod_1.z.string(),
    content: zod_1.z.string(),
    short_description: zod_1.z.string(),
    category_id: zod_1.z.number(),
    featured_image: zod_1.z.string().url(),
    is_premium: zod_1.z.boolean(),
    tags: zod_1.z.array(zod_1.z.string()).optional(),
    publish_date: zod_1.z
        .string()
        .datetime({ precision: 3 })
        .default(new Date().toISOString()),
    privacy_status: zod_1.z.enum(Object.values(client_1.BlogPrivacyStatus)),
    status: zod_1.z
        .enum(Object.values(client_1.BlogStatus))
        .default(client_1.BlogStatus.Published),
});
const UpdateTagValidation = zod_1.z.object({
    new_tags: zod_1.z.array(zod_1.z.string()).optional(),
    deleted_tags: zod_1.z.array(zod_1.z.number()).optional(),
});
const UpdateBlogValidation = zod_1.z
    .object({
    title: zod_1.z.string(),
    content: zod_1.z.string(),
    short_description: zod_1.z.string(),
    category_id: zod_1.z.number(),
    featured_image: zod_1.z.string().url(),
    is_premium: zod_1.z.boolean(),
    tags: UpdateTagValidation.optional(),
    publish_date: zod_1.z
        .string()
        .datetime({ precision: 3 })
        .default(new Date().toISOString()),
    privacy_status: zod_1.z.enum(Object.values(client_1.BlogPrivacyStatus)),
    status: zod_1.z.enum(Object.values(client_1.BlogStatus)),
})
    .partial();
const BlogValidations = {
    CreateBlogValidation,
    UpdateBlogValidation,
};
exports.default = BlogValidations;

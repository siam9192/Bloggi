"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const zod_1 = require("zod");
const UpdateStaffProfileValidation = zod_1.z
    .object({
    first_name: zod_1.z.string(),
    last_name: zod_1.z.string(),
    profile_photo: zod_1.z.string().url().optional(),
})
    .partial();
const UpdateReaderProfileValidation = zod_1.z
    .object({
    first_name: zod_1.z.string(),
    last_name: zod_1.z.string(),
    profile_photo: zod_1.z.string().url().optional(),
})
    .partial();
const UpdateSocialLinkValidation = zod_1.z.object({
    platform: zod_1.z.enum(Object.values(client_1.SocialPlatform)),
    url: zod_1.z.string().url(),
    is_deleted: zod_1.z.boolean().default(false),
    is_new_added: zod_1.z.boolean().default(false),
});
const UpdateAuthorProfileValidation = zod_1.z
    .object({
    first_name: zod_1.z.string(),
    last_name: zod_1.z.string(),
    profile_photo: zod_1.z.string().url().optional(),
    social_links: zod_1.z.array(UpdateSocialLinkValidation),
})
    .partial();
const ProfileValidations = {
    UpdateStaffProfileValidation,
    UpdateReaderProfileValidation,
    UpdateAuthorProfileValidation,
};
exports.default = ProfileValidations;

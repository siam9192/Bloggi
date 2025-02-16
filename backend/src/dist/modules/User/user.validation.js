"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const validation_1 = require("../../reuse/validation");
const client_1 = require("@prisma/client");
const CreateStaffValidation = zod_1.z.object({
    name: validation_1.NameValidationSchema,
    email: zod_1.z.string(),
    password: validation_1.PasswordValidation,
    profile_photo: zod_1.z.string().url().optional(),
    role: zod_1.z.enum(Object.values(Object.values(client_1.UserRole).filter((role) => role !== client_1.UserRole.Reader || role !== client_1.UserRole.Reader))),
});
const SocialLinkValidation = zod_1.z.object({
    platform: zod_1.z.enum(Object.values(client_1.SocialPlatform)),
    url: zod_1.z.string().url(),
});
const CreateAuthorValidation = zod_1.z.object({
    name: validation_1.NameValidationSchema,
    email: zod_1.z.string(),
    password: validation_1.PasswordValidation,
    profile_photo: zod_1.z.string().url(),
    bio: zod_1.z.string().min(20).max(2000),
    social_links: zod_1.z.array(SocialLinkValidation).default([]),
});
const ChangeUserStatusValidation = zod_1.z.object({
    user_id: zod_1.z.number(),
    status: zod_1.z.enum(["Active", "Blocked"]),
});
const UserValidations = {
    CreateStaffValidation,
    CreateAuthorValidation,
    ChangeUserStatusValidation,
};
exports.default = UserValidations;

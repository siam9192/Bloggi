"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const validation_1 = require("../../reuse/validation");
const SignUpValidationSchema = zod_1.z.object({
    name: validation_1.NameValidationSchema,
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(6).max(32),
});
const LoginValidationSchema = zod_1.z.object({
    email: zod_1.z.string().email(),
    password: zod_1.z.string(),
});
const ChangePasswordValidationSchema = zod_1.z.object({
    newPassword: zod_1.z.string(),
    oldPassword: zod_1.z.string(),
});
const ResetPasswordValidation = zod_1.z.object({
    token: zod_1.z.string().nonempty(),
    newPassword: zod_1.z.string().nonempty().min(6),
});
const AuthValidations = {
    SignUpValidationSchema,
    LoginValidationSchema,
    ResetPasswordValidation,
    ChangePasswordValidationSchema,
};
exports.default = AuthValidations;

import { NameValidationSchema } from "@/utils/validation.schema";
import { z } from "zod";

const signupValidationSchema = z.object({
  name: NameValidationSchema.required(),
  email: z.string({ required_error: "Email is required" }).email("Enter an valid email"),
  password: z
    .string({ required_error: "Password is required" })
    .min(6, "Password must be at least 6 character"),
  confirmPassword: z
    .string({ required_error: "Confirm Password is required" })
    .min(6, "Password must be at least 6 character"),
});

const loginValidationSchema = z.object({
  email: z.string({ required_error: "Email is required" }).email("Enter an valid email"),
  password: z
    .string({ required_error: "Password is required" })
    .min(6, "Password must be at least 6 character"),
});

const changePasswordValidation = z
  .object({
    oldPassword: z.string().min(6, "Old password must be at least 6 characters long"),
    newPassword: z.string().min(6, "New password must be at least 8 characters long"),
    // .regex(/[A-Z]/, "New password must contain at least one uppercase letter")
    // .regex(/[a-z]/, "New password must contain at least one lowercase letter")
    // .regex(/[0-9]/, "New password must contain at least one number")
    // .regex(/[\W_]/, "New password must contain at least one special character"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

const AuthValidations = {
  loginValidationSchema,
  signupValidationSchema,
  changePasswordValidation,
};

export default AuthValidations;

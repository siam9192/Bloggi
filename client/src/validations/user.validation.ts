import { NameValidationSchema } from "@/utils/validation.schema";
import { z } from "zod";

const createStaffValidation = z.object({
  name: NameValidationSchema.required(),
  email: z.string({ required_error: "Email is required" }).email("Enter an valid email"),
  role:z.string(),
  password: z
    .string({ required_error: "Password is required" })
    .min(6, "Password must be at least 6 character"),
  confirmPassword: z
    .string({ required_error: "Confirm Password is required" })
    .min(6, "Password must be at least 6 character"),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });;


const createAuthorValidation = z.object({
    name: NameValidationSchema.required(),
    email: z.string({ required_error: "Email is required" }).email("Enter an valid email"),
    password: z
      .string({ required_error: "Password is required" })
      .min(6, "Password must be at least 6 character"),
    confirmPassword: z
      .string({ required_error: "Confirm Password is required" })
      .min(6, "Password must be at least 6 character"),
  }) .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
;
  


const UserValidations = {
    createStaffValidation,
    createAuthorValidation
}

export default UserValidations

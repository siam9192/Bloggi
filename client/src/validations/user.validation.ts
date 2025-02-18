import { NameValidationSchema } from "@/utils/validation.schema";
import { z } from "zod";
const createStaffValidation = z
  .object({
    name: NameValidationSchema.required(),
    email: z.string({ required_error: "Email is required" }).email("Enter an valid email"),
    role: z.string(),
    password: z
      .string({ required_error: "Password is required" })
      .min(6, "Password must be at least 6 character"),
    confirmPassword: z
      .string({ required_error: "Confirm Password is required" })
      .min(6, "Password must be at least 6 character"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

const createAuthorValidation = z
  .object({
    name: NameValidationSchema.required(),
    email: z.string({ required_error: "Email is required" }).email("Enter an valid email"),
    bio: z
      .string({ required_error: "Bio is required" })
      .nonempty()
      .min(20, "At least Minimum 20 character")
      .max(1500, "Max 1500 character"),
    profilePhoto: z
      .any()
      .refine((files) => {
        return files?.length > 0;
      }, "File is required")
      .refine((files) => {
        return files?.[0]?.size < 5 * 1024 * 1024;
      }, "Max file size is 5MB")
      .refine(
        (files) => ["image/png", "image/jpeg"].includes(files?.[0]?.type),
        "Only JPG/PNG files are allowed",
      ),

    password: z
      .string({ required_error: "Password is required" })
      .min(6, "Password must be at least 6 character"),
    confirmPassword: z
      .string({ required_error: "Confirm Password is required" })
      .min(6, "Password must be at least 6 character"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
const UserValidations = {
  createStaffValidation,
  createAuthorValidation,
};

export default UserValidations;

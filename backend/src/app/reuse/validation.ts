import { z } from "zod";

export const NameValidationSchema = z.object({
  first_name: z.string(),
  last_name: z.string(),
});

export const PasswordValidation = z.string().min(6).max(32);

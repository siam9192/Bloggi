import { z } from "zod";

export const NameValidationSchema = z.object({
  first_name: z.string({ required_error: "First Name is required" }).max(15).min(2),
  last_name: z.string({ required_error: "Last Name is required" }).max(15).min(2),
});

export const AddressValidationSchema = z.object({
  street: z.string({ required_error: "Street is required" }),
  city: z.string({ required_error: "City is required" }),
  state: z.string().optional(),
  zip_code: z.string().optional(),
  country: z.string({ required_error: "Country is required" }),
});

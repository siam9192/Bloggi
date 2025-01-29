import { z } from "zod";

const CreateCategoryValidationSchema = z.object({
  name: z.string().min(1).max(50),
  parent_id: z.string().optional(),
  is_featured: z.boolean().default(false),
  image_url: z.string().url().optional(),
  children: z.array(
    z.object({
      name: z.string(),
      image_url: z.string().url().optional(),
      is_featured: z.boolean(),
    }),
  ),
});

const UpdateCategoryValidationSchema = z.object({
  id: z.string(),
  name: z.string().optional(),
  image_url: z.string().url().optional(),
  is_featured: z.boolean().optional(),
});

const CategoryValidations = {
  CreateCategoryValidationSchema,
  UpdateCategoryValidationSchema,
};

export default CategoryValidations;

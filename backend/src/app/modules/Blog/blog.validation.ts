import { BlogPrivacyStatus, BlogStatus } from "@prisma/client";
import { optional, z } from "zod";

const CreateBlogValidation = z.object({
  title: z.string(),
  content: z.string(),
  short_description: z.string(),
  category_id: z.number(),
  featured_image: z.string().url(),
  is_premium: z.boolean(),
  tags: z.array(z.string()).optional(),
  publish_date: z
    .string()
    .datetime({ precision: 3 })
    .default(new Date().toISOString()),
  privacy_status: z.enum(
    Object.values(BlogPrivacyStatus) as [string, ...string[]],
  ),
  status: z
    .enum(Object.values(BlogStatus) as [string, ...string[]])
    .default(BlogStatus.Published),
});

const UpdateTagValidation = z.object({
  new_tags: z.array(z.string()).optional(),
  deleted_tags: z.array(z.number()).optional(),
});

const UpdateBlogValidation = z
  .object({
    title: z.string(),
    content: z.string(),
    short_description: z.string(),
    category_id: z.number(),
    featured_image: z.string().url(),
    is_premium: z.boolean(),
    tags: UpdateTagValidation.optional(),
    publish_date: z
      .string()
      .datetime({ precision: 3 })
      .default(new Date().toISOString()),
    privacy_status: z.enum(
      Object.values(BlogPrivacyStatus) as [string, ...string[]],
    ),
    status: z.enum(Object.values(BlogStatus) as [string, ...string[]]),
  })
  .partial();

const BlogValidations = {
  CreateBlogValidation,
  UpdateBlogValidation,
};

export default BlogValidations;

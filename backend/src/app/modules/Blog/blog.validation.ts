import { BlogPrivacyStatus, BlogStatus } from "@prisma/client";
import { z } from "zod";

const CreateBlogValidation = z.object({
  title: z.string(),
  content: z.string(),
  short_description: z.string(),
  category_id: z.number(),
  featured_image: z.string().url(),
  is_premium: z.boolean(),
  tags: z.array(z.string()),
  publish_date: z.string().date(),
  privacy_status: z.enum(
    Object.values(BlogPrivacyStatus) as [string, ...string[]],
  ),
  status: z.enum(Object.values(BlogStatus) as [string, ...string[]]),
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
    tag: UpdateTagValidation,
    publish_date: z.string().date(),
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

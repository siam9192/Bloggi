import { z } from "zod";
import { ReactionTypeValidation } from "../../reuse/validation";

const UpsertBlogReactionValidation = z.object({
  blog_id: z.number(),
  type: ReactionTypeValidation,
});

const BlogReactionValidations = {
  UpsertBlogReactionValidation,
};

export default BlogReactionValidations;

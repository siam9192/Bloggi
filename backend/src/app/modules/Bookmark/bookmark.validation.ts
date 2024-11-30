import { z } from "zod";

const CreateBookmarkValidation = z.object({
  blog_id: z.number(),
});

const BookmarkValidations = {
  CreateBookmarkValidation,
};

export default BookmarkValidations;

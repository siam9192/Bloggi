import { z } from "zod";

const CreateCommentData = z.object({
  blog_id: z.number(),
  content: z.string(),
});

const CreateCommentReplayData = z.object({
  comment_id: z.number(),
  content: z.string(),
});

const UpdateCommentData = z.object({
  comment_id: z.number(),
  content: z.string(),
});

const CommentValidations = {
  CreateCommentData,
  CreateCommentReplayData,
  UpdateCommentData,
};

export default CommentValidations;

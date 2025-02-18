"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const CreateCommentData = zod_1.z.object({
  blog_id: zod_1.z.number(),
  content: zod_1.z.string(),
});
const CreateCommentReplayData = zod_1.z.object({
  comment_id: zod_1.z.number(),
  content: zod_1.z.string(),
});
const UpdateCommentData = zod_1.z.object({
  comment_id: zod_1.z.number(),
  content: zod_1.z.string(),
});
const CommentValidations = {
  CreateCommentData,
  CreateCommentReplayData,
  UpdateCommentData,
};
exports.default = CommentValidations;

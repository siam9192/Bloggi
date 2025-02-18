"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const CreateBookmarkValidation = zod_1.z.object({
  blog_id: zod_1.z.number(),
});
const BookmarkValidations = {
  CreateBookmarkValidation,
};
exports.default = BookmarkValidations;

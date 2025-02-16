"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const validation_1 = require("../../reuse/validation");
const UpsertBlogReactionValidation = zod_1.z.object({
    blog_id: zod_1.z.number(),
    type: validation_1.ReactionTypeValidation,
});
const BlogReactionValidations = {
    UpsertBlogReactionValidation,
};
exports.default = BlogReactionValidations;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReactionTypeValidation =
  exports.PasswordValidation =
  exports.NameValidationSchema =
    void 0;
const zod_1 = require("zod");
exports.NameValidationSchema = zod_1.z.object({
  first_name: zod_1.z.string(),
  last_name: zod_1.z.string(),
});
exports.PasswordValidation = zod_1.z.string().min(6).max(32);
exports.ReactionTypeValidation = zod_1.z.enum(["Like", "Dislike"]).nullable();

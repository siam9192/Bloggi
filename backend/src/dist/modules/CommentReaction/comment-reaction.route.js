"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const comment_reaction_controller_1 = __importDefault(
  require("./comment-reaction.controller"),
);
const auth_1 = __importDefault(require("../../middlewares/auth"));
const client_1 = require("@prisma/client");
const router = (0, express_1.Router)();
router.post(
  "/",
  (0, auth_1.default)(client_1.UserRole.Reader),
  comment_reaction_controller_1.default.upsertCommentReaction,
);
router.get(
  "/:blogId",
  (0, auth_1.default)(client_1.UserRole.Reader),
  comment_reaction_controller_1.default.getMyCommentReactions,
);
const CommentReactionRouter = router;
exports.default = CommentReactionRouter;

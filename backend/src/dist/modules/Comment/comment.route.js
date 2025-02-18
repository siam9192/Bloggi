"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const client_1 = require("@prisma/client");
const validateRequest_1 = __importDefault(
  require("../../middlewares/validateRequest"),
);
const comment_validation_1 = __importDefault(require("./comment.validation"));
const comment_controller_1 = __importDefault(require("./comment.controller"));
const router = (0, express_1.Router)();
router.post(
  "/",
  (0, auth_1.default)(client_1.UserRole.Reader),
  (0, validateRequest_1.default)(
    comment_validation_1.default.CreateCommentData,
  ),
  comment_controller_1.default.createComment,
);
router.post(
  "/replay",
  (0, auth_1.default)(client_1.UserRole.Reader),
  (0, validateRequest_1.default)(
    comment_validation_1.default.CreateCommentReplayData,
  ),
  comment_controller_1.default.createCommentReplay,
);
router.get("/:blogId", comment_controller_1.default.getBlogComments);
router.get(
  "/:commentId/replies",
  comment_controller_1.default.getCommentReplies,
);
router.patch("/", comment_controller_1.default.updateComment);
router.delete("/:commentId", comment_controller_1.default.deleteComment);
const CommentRouter = router;
exports.default = CommentRouter;

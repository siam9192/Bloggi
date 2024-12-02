import { Router } from "express";
import CommentReactionControllers from "./comment-reaction.controller";
import auth from "../../middlewares/auth";
import { UserRole } from "@prisma/client";

const router = Router();

router.post(
  "/",
  auth(UserRole.Reader),
  CommentReactionControllers.upsertCommentReaction,
);

router.get(
  "/:blogId",
  auth(UserRole.Reader),
  CommentReactionControllers.getMyCommentReactions,
);

const CommentReactionRouter = router;

export default CommentReactionRouter;

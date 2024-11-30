import { Router } from "express";
import auth from "../../middlewares/auth";
import { UserRole } from "@prisma/client";
import validateRequest from "../../middlewares/validateRequest";
import CommentValidations from "./comment.validation";
import CommentControllers from "./comment.controller";

const router = Router();

router.post("/",auth(UserRole.Reader),validateRequest(CommentValidations.CreateCommentData),CommentControllers.createComment)

router.post("/replay",auth(UserRole.Reader),validateRequest(CommentValidations.CreateCommentReplayData),CommentControllers.createCommentReplay)


router.get("/:blogId",CommentControllers.getComments)

router.get("/:commentId",CommentControllers.getCommentReplies)


router.patch("/",CommentControllers.updateComment)

router.delete("/:commentId",CommentControllers.deleteComment)

const CommentRouter = router;

export default CommentRouter;

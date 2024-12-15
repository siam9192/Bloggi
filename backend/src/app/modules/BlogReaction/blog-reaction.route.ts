import { Router } from "express";
import auth from "../../middlewares/auth";
import { UserRole } from "@prisma/client";
import validateRequest from "../../middlewares/validateRequest";
import BlogReactionValidations from "./blog-reaction.validation";
import BlogReactionControllers from "./blog-reaction.controller";

const router = Router();

router.post(
  "/",
  auth(UserRole.Reader),
  validateRequest(BlogReactionValidations.UpsertBlogReactionValidation),
  BlogReactionControllers.upsertBlogReaction,
);

router.get(
  "/blogId",
  auth(UserRole.Reader),
  BlogReactionControllers.getMyBlogReaction,
);

const BlogReactionRouter = router;

export default BlogReactionRouter;

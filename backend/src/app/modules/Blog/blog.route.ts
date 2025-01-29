import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import BlogValidations from "./blog.validation";
import BlogControllers from "./blog.controller";
import auth from "../../middlewares/auth";
import { UserRole } from "@prisma/client";
import authProvider from "../../middlewares/authProvider";

const router = Router();

router.post(
  "/",
  auth(UserRole.Author),
  validateRequest(BlogValidations.CreateBlogValidation),
  BlogControllers.createBlog,
);

router.get("/", BlogControllers.getBlogs);
router.get("/recent", BlogControllers.getRecentBlogs);
router.get("/trending/:categoryId", BlogControllers.getTrendingBlogs);
router.get("/my", auth(UserRole.Author), BlogControllers.getBlogs);
router.get(
  "/manage",
  auth(UserRole.SuperAdmin, UserRole.Admin, UserRole.Moderator),
  BlogControllers.getBlogsForManage,
);
router.get(
  "/:slug",
  authProvider(...Object.values(UserRole)),
  BlogControllers.getBlogForReadBySlug,
);
router.delete("/:id", BlogControllers.deleteBlogById);

const BlogRouter = router;

export default BlogRouter;

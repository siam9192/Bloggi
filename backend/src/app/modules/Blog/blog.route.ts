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
router.get("/recent",authProvider(),BlogControllers.getRecentBlogs);
router.get("/popular",authProvider(),BlogControllers.getRecentBlogs);
router.get("/trending/:categoryId", BlogControllers.getTrendingBlogs);
router.get("/my", auth(UserRole.Author), BlogControllers.getMyBlogs);
router.get(
  "/manage",
  auth(UserRole.SuperAdmin, UserRole.Admin, UserRole.Moderator),
  BlogControllers.getBlogsForManage,
);

router.get(
  "/:id/states",
  auth(UserRole.SuperAdmin, UserRole.Admin, UserRole.Author),
  BlogControllers.getBlogStates,
);

router.get(
  "/:id",
  authProvider(UserRole.SuperAdmin, UserRole.Admin, UserRole.Author),
  BlogControllers.getBlogById,
);

router.get(
  "/read/:slug",
  authProvider(...Object.values(UserRole)),
  BlogControllers.getBlogForReadBySlug,
);
router.get("/:slug/related", BlogControllers.getRelatedBlogs);

router.put(
  "/:id",
  authProvider(UserRole.Author),
  validateRequest(BlogValidations.UpdateBlogValidation),
  BlogControllers.updateBlogById,
);

router.delete("/:id", BlogControllers.deleteBlogById);

const BlogRouter = router;

export default BlogRouter;

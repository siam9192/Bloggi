import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import BlogValidations from "./blog.validation";
import BlogControllers from "./blog.controller";
import auth from "../../middlewares/auth";
import { UserRole } from "@prisma/client";

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
router.get("/author", auth(UserRole.Author), BlogControllers.getAuthorAllBlogs);
router.get("/:id", BlogControllers.getBlogForReadById);
router.delete("/:id", BlogControllers.deleteBlogById);

const BlogRouter = router;

export default BlogRouter;

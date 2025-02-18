"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validateRequest_1 = __importDefault(
  require("../../middlewares/validateRequest"),
);
const blog_validation_1 = __importDefault(require("./blog.validation"));
const blog_controller_1 = __importDefault(require("./blog.controller"));
const auth_1 = __importDefault(require("../../middlewares/auth"));
const client_1 = require("@prisma/client");
const authProvider_1 = __importDefault(
  require("../../middlewares/authProvider"),
);
const router = (0, express_1.Router)();
router.post(
  "/",
  (0, auth_1.default)(client_1.UserRole.Author),
  (0, validateRequest_1.default)(
    blog_validation_1.default.CreateBlogValidation,
  ),
  blog_controller_1.default.createBlog,
);
router.get("/", blog_controller_1.default.getBlogs);
router.get("/recent", blog_controller_1.default.getRecentBlogs);
router.get("/trending/:categoryId", blog_controller_1.default.getTrendingBlogs);
router.get(
  "/my",
  (0, auth_1.default)(client_1.UserRole.Author),
  blog_controller_1.default.getMyBlogs,
);
router.get(
  "/manage",
  (0, auth_1.default)(
    client_1.UserRole.SuperAdmin,
    client_1.UserRole.Admin,
    client_1.UserRole.Moderator,
  ),
  blog_controller_1.default.getBlogsForManage,
);
router.get(
  "/:id/states",
  (0, auth_1.default)(
    client_1.UserRole.SuperAdmin,
    client_1.UserRole.Admin,
    client_1.UserRole.Author,
  ),
  blog_controller_1.default.getBlogStates,
);
router.get(
  "/:id",
  (0, authProvider_1.default)(
    client_1.UserRole.SuperAdmin,
    client_1.UserRole.Admin,
    client_1.UserRole.Author,
  ),
  blog_controller_1.default.getBlogById,
);
router.get(
  "/read/:slug",
  (0, authProvider_1.default)(...Object.values(client_1.UserRole)),
  blog_controller_1.default.getBlogForReadBySlug,
);
router.get("/:slug/related", blog_controller_1.default.getRelatedBlogs);
router.put(
  "/:id",
  (0, authProvider_1.default)(client_1.UserRole.Author),
  (0, validateRequest_1.default)(
    blog_validation_1.default.UpdateBlogValidation,
  ),
  blog_controller_1.default.updateBlogById,
);
router.delete("/:id", blog_controller_1.default.deleteBlogById);
const BlogRouter = router;
exports.default = BlogRouter;

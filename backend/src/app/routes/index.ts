import { IRouter, Router } from "express";
import AuthRouter from "../modules/Auth/auth.route";
import UserRouter from "../modules/User/user.route";
import ProfileRouter from "../modules/Profile/profile.route";
import BlogRouter from "../modules/Blog/blog.route";
import ParentCategoryRouter from "../modules/ParentCategory/parent-category.route";
import CategoryRouter from "../modules/Category/category.route";
import FollowerRouter from "../modules/Follower/follower.route";
import BookmarkRouter from "../modules/Bookmark/bookmark.route";
import CommentRouter from "../modules/Comment/comment.route";
import CommentReactionRouter from "../modules/CommentReaction/comment-reaction.route";
import PackageRouter from "../modules/Package/package.route";
import SubscriptionRouter from "../modules/Subscription/subscription.route";
import PaymentRouter from "../modules/Payment/payment.route";
import BlogReactionRouter from "../modules/BlogReaction/blog-reaction.route";

const router = Router();

type TModuleRoutes = { path: string; router: IRouter }[];

const moduleRoutes: TModuleRoutes = [
  {
    path: "/auth",
    router: AuthRouter,
  },
  {
    path: "/users",
    router: UserRouter,
  },
  {
    path: "/profile",
    router: ProfileRouter,
  },
  {
    path: "/blogs",
    router: BlogRouter,
  },
  {
    path: "/parent-categories",
    router: ParentCategoryRouter,
  },
  {
    path: "/categories",
    router: CategoryRouter,
  },
  {
    path: "/followers",
    router: FollowerRouter,
  },
  {
    path: "/bookmarks",
    router: BookmarkRouter,
  },
  {
    path: "/comments",
    router: CommentRouter,
  },
  {
    path: "/comments-reaction",
    router: CommentReactionRouter,
  },
  {
    path: "/blogs-reaction",
    router: BlogReactionRouter,
  },
  {
    path: "/packages",
    router: PackageRouter,
  },
  {
    path: "/subscriptions",
    router: SubscriptionRouter,
  },
  {
    path: "/payments",
    router: PaymentRouter,
  },
];

const routes = moduleRoutes.map((route) =>
  router.use(route.path, route.router),
);

export default routes;

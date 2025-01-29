import { IRouter, Router } from "express";
import AuthRouter from "../modules/Auth/auth.route";
import UserRouter from "../modules/User/user.route";
import ProfileRouter from "../modules/Profile/profile.route";
import BlogRouter from "../modules/Blog/blog.route";
import CategoryRouter from "../modules/Category/category.route";
import FollowerRouter from "../modules/Follower/follower.route";
import BookmarkRouter from "../modules/Bookmark/bookmark.route";
import CommentRouter from "../modules/Comment/comment.route";
import CommentReactionRouter from "../modules/CommentReaction/comment-reaction.route";
import SubscriptionRouter from "../modules/Subscription/subscription.route";
import PaymentRouter from "../modules/Payment/payment.route";
import BlogReactionRouter from "../modules/BlogReaction/blog-reaction.route";
import StaffRouter from "../modules/Staff/staff.route";
import OverviewRouter from "../modules/Overview/overview.route";
import PlanRouter from "../modules/Plan/plan.route";

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
    path:"/plans",
    router:PlanRouter
  },
  {
    path: "/subscriptions",
    router: SubscriptionRouter,
  },
  {
    path: "/payments",
    router: PaymentRouter,
  },
  {
    path: "/staffs",
    router: StaffRouter,
  },
  {
    path: "/profile",
    router: ProfileRouter,
  },
  {
    path: "/overview",
    router: OverviewRouter,
  },
];

const routes = moduleRoutes.map((route) =>
  router.use(route.path, route.router),
);

export default routes;

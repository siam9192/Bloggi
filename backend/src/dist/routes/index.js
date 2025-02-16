"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_route_1 = __importDefault(require("../modules/Auth/auth.route"));
const user_route_1 = __importDefault(require("../modules/User/user.route"));
const profile_route_1 = __importDefault(require("../modules/Profile/profile.route"));
const blog_route_1 = __importDefault(require("../modules/Blog/blog.route"));
const category_route_1 = __importDefault(require("../modules/Category/category.route"));
const follower_route_1 = __importDefault(require("../modules/Follower/follower.route"));
const bookmark_route_1 = __importDefault(require("../modules/Bookmark/bookmark.route"));
const comment_route_1 = __importDefault(require("../modules/Comment/comment.route"));
const comment_reaction_route_1 = __importDefault(require("../modules/CommentReaction/comment-reaction.route"));
const subscription_route_1 = __importDefault(require("../modules/Subscription/subscription.route"));
const payment_route_1 = __importDefault(require("../modules/Payment/payment.route"));
const blog_reaction_route_1 = __importDefault(require("../modules/BlogReaction/blog-reaction.route"));
const staff_route_1 = __importDefault(require("../modules/Staff/staff.route"));
const overview_route_1 = __importDefault(require("../modules/Overview/overview.route"));
const plan_route_1 = __importDefault(require("../modules/Plan/plan.route"));
const router = (0, express_1.Router)();
const moduleRoutes = [
    {
        path: "/auth",
        router: auth_route_1.default,
    },
    {
        path: "/users",
        router: user_route_1.default,
    },
    {
        path: "/profile",
        router: profile_route_1.default,
    },
    {
        path: "/blogs",
        router: blog_route_1.default,
    },
    {
        path: "/categories",
        router: category_route_1.default,
    },
    {
        path: "/followers",
        router: follower_route_1.default,
    },
    {
        path: "/bookmarks",
        router: bookmark_route_1.default,
    },
    {
        path: "/comments",
        router: comment_route_1.default,
    },
    {
        path: "/comments-reaction",
        router: comment_reaction_route_1.default,
    },
    {
        path: "/blogs-reaction",
        router: blog_reaction_route_1.default,
    },
    {
        path: "/plans",
        router: plan_route_1.default,
    },
    {
        path: "/subscriptions",
        router: subscription_route_1.default,
    },
    {
        path: "/payments",
        router: payment_route_1.default,
    },
    {
        path: "/staffs",
        router: staff_route_1.default,
    },
    {
        path: "/profile",
        router: profile_route_1.default,
    },
    {
        path: "/overview",
        router: overview_route_1.default,
    },
];
const routes = moduleRoutes.map((route) => router.use(route.path, route.router));
exports.default = routes;

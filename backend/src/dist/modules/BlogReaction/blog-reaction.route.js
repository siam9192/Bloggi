"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const client_1 = require("@prisma/client");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const blog_reaction_validation_1 = __importDefault(require("./blog-reaction.validation"));
const blog_reaction_controller_1 = __importDefault(require("./blog-reaction.controller"));
const router = (0, express_1.Router)();
router.post("/", (0, auth_1.default)(client_1.UserRole.Reader), (0, validateRequest_1.default)(blog_reaction_validation_1.default.UpsertBlogReactionValidation), blog_reaction_controller_1.default.upsertBlogReaction);
router.get("/:blogId", (0, auth_1.default)(client_1.UserRole.Reader), blog_reaction_controller_1.default.getMyBlogReaction);
const BlogReactionRouter = router;
exports.default = BlogReactionRouter;

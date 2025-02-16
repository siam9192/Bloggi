"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const client_1 = require("@prisma/client");
const bookmark_controllers_1 = __importDefault(require("./bookmark.controllers"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const bookmark_validation_1 = __importDefault(require("./bookmark.validation"));
const router = (0, express_1.Router)();
router.post("/", (0, auth_1.default)(...Object.values(client_1.UserRole)), (0, validateRequest_1.default)(bookmark_validation_1.default.CreateBookmarkValidation), bookmark_controllers_1.default.createBookmark);
router.get("/", (0, auth_1.default)(...Object.values(client_1.UserRole)), bookmark_controllers_1.default.getMyBookmarksFromDB);
router.delete("/:blogId", (0, auth_1.default)(...Object.values(client_1.UserRole)), bookmark_controllers_1.default.deleteBookmark);
const BookmarkRouter = router;
exports.default = BookmarkRouter;

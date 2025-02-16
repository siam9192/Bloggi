"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const profile_controller_1 = __importDefault(require("./profile.controller"));
const auth_1 = __importDefault(require("../../middlewares/auth"));
const client_1 = require("@prisma/client");
const router = (0, express_1.Router)();
router.get("/my", (0, auth_1.default)(...Object.values(client_1.UserRole)), profile_controller_1.default.getMyProfile);
router.get("/:id", (0, auth_1.default)(client_1.UserRole.Admin, client_1.UserRole.Moderator, client_1.UserRole.SuperAdmin), profile_controller_1.default.getUserProfileById);
router.put("/my", (0, auth_1.default)(...Object.values(client_1.UserRole)), profile_controller_1.default.updateMyProfile);
const ProfileRouter = router;
exports.default = ProfileRouter;

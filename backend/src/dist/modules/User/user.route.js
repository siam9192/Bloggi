"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const user_validation_1 = __importDefault(require("./user.validation"));
const user_controller_1 = __importDefault(require("./user.controller"));
const auth_1 = __importDefault(require("../../middlewares/auth"));
const client_1 = require("@prisma/client");
const router = (0, express_1.Router)();
router.post("/create-staff", (0, auth_1.default)(client_1.UserRole.SuperAdmin), (0, validateRequest_1.default)(user_validation_1.default.CreateStaffValidation), user_controller_1.default.createStaff);
router.post("/create-author", (0, validateRequest_1.default)(user_validation_1.default.CreateAuthorValidation), user_controller_1.default.createAuthor);
router.patch("/change-status", (0, validateRequest_1.default)(user_validation_1.default.ChangeUserStatusValidation), user_controller_1.default.changeUserStatus);
router.get("/", user_controller_1.default.getUsers);
router.delete("/:userId", user_controller_1.default.softDeleteUser);
const UserRouter = router;
exports.default = UserRouter;

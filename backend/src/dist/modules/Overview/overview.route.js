"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const overview_controller_1 = __importDefault(require("./overview.controller"));
const auth_1 = __importDefault(require("../../middlewares/auth"));
const client_1 = require("@prisma/client");
const router = (0, express_1.Router)();
router.get("/", overview_controller_1.default.getAllOverviewData);
router.get("/author", (0, auth_1.default)(client_1.UserRole.Author), overview_controller_1.default.getAuthorOverviewData);
const OverviewRouter = router;
exports.default = OverviewRouter;

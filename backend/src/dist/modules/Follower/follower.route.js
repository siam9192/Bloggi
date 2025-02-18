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
const auth_1 = __importDefault(require("../../middlewares/auth"));
const client_1 = require("@prisma/client");
const follower_validation_1 = __importDefault(require("./follower.validation"));
const follower_controllers_1 = __importDefault(
  require("./follower.controllers"),
);
const router = (0, express_1.Router)();
router.post(
  "/",
  (0, auth_1.default)(client_1.UserRole.Reader),
  (0, validateRequest_1.default)(
    follower_validation_1.default.CreateFollowerValidation,
  ),
  follower_controllers_1.default.createFollower,
);
router.get(
  "/author/:authorId",
  (0, auth_1.default)(...Object.values(client_1.UserRole)),
  follower_controllers_1.default.getAuthorFollowers,
);
router.get(
  "/author",
  (0, auth_1.default)(client_1.UserRole.Author),
  follower_controllers_1.default.getMyFollowers,
);
router.get(
  "/following/my",
  (0, auth_1.default)(client_1.UserRole.Reader),
  follower_controllers_1.default.getMyFollowingAuthors,
);
router.get(
  "/author/:authorId",
  follower_controllers_1.default.getAuthorFollowers,
);
router.delete(
  "/:authorId",
  (0, auth_1.default)(client_1.UserRole.Reader),
  follower_controllers_1.default.deleteFollower,
);
router.patch(
  "/change-status",
  (0, auth_1.default)(client_1.UserRole.Author),
  (0, validateRequest_1.default)(
    follower_validation_1.default.ChangeFollowerStatusValidation,
  ),
  follower_controllers_1.default.changeFollowerStatus,
);
const FollowerRouter = router;
exports.default = FollowerRouter;

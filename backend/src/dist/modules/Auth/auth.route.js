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
const auth_validation_1 = __importDefault(require("./auth.validation"));
const auth_controller_1 = __importDefault(require("./auth.controller"));
const client_1 = require("@prisma/client");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const router = (0, express_1.Router)();
router.post(
  "/signup",
  (0, validateRequest_1.default)(
    auth_validation_1.default.SignUpValidationSchema,
  ),
  auth_controller_1.default.handelSignUp,
);
router.post(
  "/login",
  (0, validateRequest_1.default)(
    auth_validation_1.default.LoginValidationSchema,
  ),
  auth_controller_1.default.handelLogin,
);
router.patch(
  "/change-password",
  (0, auth_1.default)(...Object.values(client_1.UserRole)),
  (0, validateRequest_1.default)(
    auth_validation_1.default.ChangePasswordValidationSchema,
  ),
  auth_controller_1.default.changePassword,
);
router.post(
  "/forget-password/:email",
  auth_controller_1.default.forgetPassword,
);
router.post(
  "/reset-password",
  (0, validateRequest_1.default)(
    auth_validation_1.default.ResetPasswordValidation,
  ),
  auth_controller_1.default.resetPassword,
);
router.get(
  "/accessToken",
  (0, auth_1.default)(...Object.values(client_1.UserRole)),
  auth_controller_1.default.getAccessTokenUsingRefreshToken,
);
router.get(
  "/me",
  (0, auth_1.default)(...Object.values(client_1.UserRole)),
  auth_controller_1.default.getMe,
);
const AuthRouter = router;
exports.default = AuthRouter;

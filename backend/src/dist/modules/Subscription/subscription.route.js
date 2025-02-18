"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const subscription_controller_1 = __importDefault(
  require("./subscription.controller"),
);
const validateRequest_1 = __importDefault(
  require("../../middlewares/validateRequest"),
);
const subscription_validation_1 = __importDefault(
  require("./subscription.validation"),
);
const auth_1 = __importDefault(require("../../middlewares/auth"));
const client_1 = require("@prisma/client");
const router = (0, express_1.Router)();
router.post(
  "/subscribe-plan",
  (0, auth_1.default)(client_1.UserRole.Reader),
  (0, validateRequest_1.default)(
    subscription_validation_1.default.PurchasePlanValidation,
  ),
  subscription_controller_1.default.purchasePackage,
);
router.get(
  "/",
  (0, auth_1.default)(
    client_1.UserRole.Moderator,
    client_1.UserRole.Admin,
    client_1.UserRole.SuperAdmin,
  ),
  subscription_controller_1.default.getSubscriptionsFromDB,
);
router.get(
  "/my/current",
  (0, auth_1.default)(client_1.UserRole.Reader),
  subscription_controller_1.default.getMyCurrentSubscription,
);
const SubscriptionRouter = router;
exports.default = SubscriptionRouter;

"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const payment_controller_1 = __importDefault(require("./payment.controller"));
const auth_1 = __importDefault(require("../../middlewares/auth"));
const client_1 = require("@prisma/client");
const router = (0, express_1.Router)();
router.get(
  "/ispn/stripe",
  payment_controller_1.default.validateStripeSubscriptionPayment,
);
router.get(
  "/ispn/ssl",
  payment_controller_1.default.validateSSLSubscriptionPayment,
);
router.get(
  "/my",
  (0, auth_1.default)(client_1.UserRole.Reader),
  payment_controller_1.default.getMyPayments,
);
const PaymentRouter = router;
exports.default = PaymentRouter;

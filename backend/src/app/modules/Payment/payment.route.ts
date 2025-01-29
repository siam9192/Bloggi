import { Router } from "express";
import PaymentControllers from "./payment.controller";
import auth from "../../middlewares/auth";
import { UserRole } from "@prisma/client";

const router = Router();
router.get(
  "/ispn/stripe",
  PaymentControllers.validateStripeSubscriptionPayment,
);
router.get("/ispn/ssl", PaymentControllers.validateSSLSubscriptionPayment);
router.get("/my", auth(UserRole.Reader), PaymentControllers.getMyPayments);

const PaymentRouter = router;

export default PaymentRouter;

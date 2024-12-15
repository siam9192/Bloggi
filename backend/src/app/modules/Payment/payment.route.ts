import { Router } from "express";
import PaymentControllers from "./payment.controller";
import auth from "../../middlewares/auth";
import { UserRole } from "@prisma/client";

const router = Router();

router.get(
  "/package-purchase/:paymentId/success",
  PaymentControllers.packageSubscriptionPaymentSuccess,
);
router.get(
  "/package-purchase/:paymentId/cancel",
  PaymentControllers.packageSubscriptionPaymentCancel,
);
router.get("/my", auth(UserRole.Reader), PaymentControllers.getMyPayments);

const PaymentRouter = router;

export default PaymentRouter;

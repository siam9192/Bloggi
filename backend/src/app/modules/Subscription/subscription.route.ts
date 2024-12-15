import { Router } from "express";
import subscriptionControllers from "./subscription.controller";
import validateRequest from "../../middlewares/validateRequest";
import SubscriptionValidations from "./subsciption.validation";
import auth from "../../middlewares/auth";
import { UserRole } from "@prisma/client";

const router = Router();

router.post(
  "/purchase-package",
  auth(UserRole.Reader),
  validateRequest(SubscriptionValidations.PurchasePackageValidation),
  subscriptionControllers.purchasePackage,
);

const SubscriptionRouter = router;

export default SubscriptionRouter;

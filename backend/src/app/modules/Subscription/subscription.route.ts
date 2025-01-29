import { Router } from "express";
import subscriptionControllers from "./subscription.controller";
import validateRequest from "../../middlewares/validateRequest";
import SubscriptionValidations from "./subscription.validation";
import auth from "../../middlewares/auth";
import { UserRole } from "@prisma/client";

const router = Router();

router.post(
  "/subscribe-plan",
  auth(UserRole.Reader),
  validateRequest(SubscriptionValidations.PurchasePlanValidation),
  subscriptionControllers.purchasePackage,
);

router.get(
  "/",
  auth(UserRole.Moderator, UserRole.Admin, UserRole.SuperAdmin),
  subscriptionControllers.getSubscriptionsFromDB,
);

router.get(
  "/my/current",
  auth(UserRole.Reader),
  subscriptionControllers.getMyCurrentSubscription,
);

const SubscriptionRouter = router;

export default SubscriptionRouter;

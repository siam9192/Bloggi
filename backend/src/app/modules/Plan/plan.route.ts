import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import PlanControllers from "./plan.controller";
import PlanValidations from "./plan.validation";
import auth from "../../middlewares/auth";
import { UserRole } from "@prisma/client";

const router = Router();

router.post(
  "/",
  validateRequest(PlanValidations.CreatePlanValidation),
  PlanControllers.createPlan,
);

router.get("/", PlanControllers.getPlans);
router.get("/manage",auth(UserRole.Admin,UserRole.Moderator,UserRole.SuperAdmin),PlanControllers.getPlansForManage);

const PlanRouter = router;

export default PlanRouter;

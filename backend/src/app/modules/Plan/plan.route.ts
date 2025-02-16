import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import PlanControllers from "./plan.controller";
import PlanValidations from "./plan.validation";

const router = Router();

router.post(
  "/",
  validateRequest(PlanValidations.CreatePlanValidation),
  PlanControllers.createPlan,
);

router.get("/", PlanControllers.getPlans);

const PlanRouter = router;

export default PlanRouter;

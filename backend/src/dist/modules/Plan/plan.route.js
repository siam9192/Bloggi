"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const plan_controller_1 = __importDefault(require("./plan.controller"));
const plan_validation_1 = __importDefault(require("./plan.validation"));
const router = (0, express_1.Router)();
router.post("/", (0, validateRequest_1.default)(plan_validation_1.default.CreatePlanValidation), plan_controller_1.default.createPlan);
router.get("/", plan_controller_1.default.getPlans);
const PlanRouter = router;
exports.default = PlanRouter;

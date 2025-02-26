"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const staff_controller_1 = __importDefault(require("./staff.controller"));
const router = (0, express_1.Router)();
router.get("/", staff_controller_1.default.getStaffs);
const StaffRouter = router;
exports.default = StaffRouter;

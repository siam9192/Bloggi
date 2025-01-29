import { Router } from "express";
import StaffControllers from "./staff.controller";

const router = Router();

router.get("/", StaffControllers.getStaffs);

const StaffRouter = router;

export default StaffRouter;

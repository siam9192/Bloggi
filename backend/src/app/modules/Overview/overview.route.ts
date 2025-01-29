import { Router } from "express";
import OverviewControllers from "./overview.controller";

const router = Router();

router.get("/", OverviewControllers.getAllOverviewData);

const OverviewRouter = router;

export default OverviewRouter;

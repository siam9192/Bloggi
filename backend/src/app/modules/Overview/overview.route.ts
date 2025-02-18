import { Router } from "express";
import OverviewControllers from "./overview.controller";
import auth from "../../middlewares/auth";
import { UserRole } from "@prisma/client";

const router = Router();

router.get("/", OverviewControllers.getAllOverviewData);
router.get(
  "/author",
  auth(UserRole.Author),
  OverviewControllers.getAuthorOverviewData,
);

const OverviewRouter = router;

export default OverviewRouter;

import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import PackageValidations from "./package.validation";
import PackageControllers from "./package.controller";

const router = Router();

router.post("/",validateRequest(PackageValidations.CreatePackage),PackageControllers.createPackage)

router.get("/",PackageControllers.getPackages)

const PackageRouter = router;

export default PackageRouter;


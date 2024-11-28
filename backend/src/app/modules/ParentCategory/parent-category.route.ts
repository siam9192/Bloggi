import { Router } from "express";
import ParentCategoryControllers from "./parent-category.controller";

const router = Router();

router.post("/", ParentCategoryControllers.createParentCategory);

router.get("/", ParentCategoryControllers.getParentCategories);

const ParentCategoryRouter = router;

export default ParentCategoryRouter;

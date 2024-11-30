import { Router } from "express";
import CategoryControllers from "./category.controller";

const router = Router();

router.post("/", CategoryControllers.createCategory);
router.get("/", CategoryControllers.getCategories);
router.get("/popular", CategoryControllers.getPopularCategories);
const CategoryRouter = router;

export default CategoryRouter;

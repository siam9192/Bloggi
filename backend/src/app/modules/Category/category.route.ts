import { Router } from "express";
import CategoryControllers from "./category.controller";

const router = Router();

router.post("/", CategoryControllers.createCategory);

const CategoryRouter = router;

export default CategoryRouter;

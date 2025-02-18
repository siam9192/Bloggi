import { Router } from "express";
import authProvider from "../../middlewares/authProvider";
import AuthorsControllers from "./author.controller";

const router = Router();

router.get("/popular", authProvider(), AuthorsControllers.getPopularAuthors);

const AuthorRouter = router;

export default AuthorRouter;

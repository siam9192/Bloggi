import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import AuthValidations from "./auth.validation";
import AuthControllers from "./auth.controller";

const router = Router();

router.post(
  "/signup",
  validateRequest(AuthValidations.SignUpValidationSchema),
  AuthControllers.handelSignUp,
);

router.post(
  "/login",
  validateRequest(AuthValidations.LoginValidationSchema),
  AuthControllers.handelLogin,
);

const AuthRouter = router;

export default AuthRouter;

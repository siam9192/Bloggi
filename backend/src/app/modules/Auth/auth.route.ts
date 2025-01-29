import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import AuthValidations from "./auth.validation";
import AuthControllers from "./auth.controller";
import { UserRole } from "@prisma/client";
import auth from "../../middlewares/auth";

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

router.patch(
  "/change-password",
  auth(...Object.values(UserRole)),
  validateRequest(AuthValidations.ChangePasswordValidationSchema),
  AuthControllers.changePassword,
);

router.post("/forget-password/:email", AuthControllers.forgetPassword);
router.post(
  "/reset-password",
  validateRequest(AuthValidations.ResetPasswordValidation),
  AuthControllers.resetPassword,
);

router.get(
  "/accessToken",
  auth(...Object.values(UserRole)),
  AuthControllers.getAccessTokenUsingRefreshToken,
);

const AuthRouter = router;

export default AuthRouter;

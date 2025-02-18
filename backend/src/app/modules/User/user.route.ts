import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import UserValidations from "./user.validation";
import UserControllers from "./user.controller";
import auth from "../../middlewares/auth";
import { UserRole } from "@prisma/client";

const router = Router();

router.post(
  "/create-staff",
  auth(UserRole.SuperAdmin),
  validateRequest(UserValidations.CreateStaffValidation),
  UserControllers.createStaff,
);

router.post(
  "/create-author",
  validateRequest(UserValidations.CreateAuthorValidation),
  UserControllers.createAuthor,
);

router.patch(
  "/change-status",
  validateRequest(UserValidations.ChangeUserStatusValidation),
  UserControllers.changeUserStatus,
);

router.get("/", UserControllers.getUsers);
router.get("/overview",UserControllers.getUsersOverviewData)
router.delete("/:userId", UserControllers.softDeleteUser);
const UserRouter = router;

export default UserRouter;

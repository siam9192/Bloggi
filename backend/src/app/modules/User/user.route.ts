import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import UserValidations from "./user.validation";
import UserControllers from "./user.controller";

const router = Router();

router.post(
  "/create-staff",
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

router.get("/", UserControllers.getAllUsers);

router.delete("/:userId", UserControllers.softDeleteUser);
const UserRouter = router;

export default UserRouter;

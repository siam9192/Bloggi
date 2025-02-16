import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import auth from "../../middlewares/auth";
import { UserRole } from "@prisma/client";
import FollowerValidations from "./follower.validation";
import FollowerControllers from "./follower.controllers";

const router = Router();

router.post(
  "/",
  auth(UserRole.Reader),
  validateRequest(FollowerValidations.CreateFollowerValidation),
  FollowerControllers.createFollower,
);
router.get(
  "/author/:authorId",
  auth(...Object.values(UserRole)),
  FollowerControllers.getAuthorFollowers,
);

router.get(
  "/author",
  auth(UserRole.Author),
  FollowerControllers.getMyFollowers,
);

router.get(
  "/following/my",
  auth(UserRole.Reader),
  FollowerControllers.getMyFollowingAuthors,
);

router.get("/author/:authorId", FollowerControllers.getAuthorFollowers);

router.delete(
  "/:authorId",
  auth(UserRole.Reader),
  FollowerControllers.deleteFollower,
);

router.patch(
  "/change-status",
  auth(UserRole.Author),
  validateRequest(FollowerValidations.ChangeFollowerStatusValidation),
  FollowerControllers.changeFollowerStatus,
);

const FollowerRouter = router;

export default FollowerRouter;

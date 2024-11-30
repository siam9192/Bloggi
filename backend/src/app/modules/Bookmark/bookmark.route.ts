import { Router } from "express";
import auth from "../../middlewares/auth";
import { UserRole } from "@prisma/client";
import BookmarkControllers from "./bookmark.controllers";
import validateRequest from "../../middlewares/validateRequest";
import BookmarkValidations from "./bookmark.validation";

const router = Router();

router.post(
  "/",
  auth(...Object.values(UserRole)),
  validateRequest(BookmarkValidations.CreateBookmarkValidation),
  BookmarkControllers.createBookmark,
);

router.get(
  "/",
  auth(...Object.values(UserRole)),
  BookmarkControllers.getMyBookmarksFromDB,
);

router.delete(
  "/:blogId",
  auth(...Object.values(UserRole)),
  BookmarkControllers.deleteBookmark,
);

const BookmarkRouter = router;

export default BookmarkRouter;

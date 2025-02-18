"use client";
import { addToBookmark, removeFromBookmark } from "@/services/bookmark.service";
import React, { ReactNode, useState } from "react";
import { IoBookmark, IoBookmarkOutline } from "react-icons/io5";
import errorToast from "../toast/ErrorToast";

interface IProps {
  blogId: number;
  bookmarkedStatus: boolean;
}

const BookmarkToggleButton = ({ blogId, bookmarkedStatus }: IProps) => {
  const [isBookmarked, setIsBookmarked] = useState(bookmarkedStatus);

  const handelAddToBookmark = async () => {
    try {
      const res = await addToBookmark({ blog_id: blogId });
      if (res.success) setIsBookmarked(true);
    } catch (error) {
      errorToast("Something went wrong");
    }
  };

  const handelRemoveFromBookMark = async () => {
    try {
      const res = await removeFromBookmark(blogId);
      if (res.success) setIsBookmarked(false);
    } catch (error) {
      errorToast("Something went wrong");
    }
  };

  return (
    <div onClick={(e) => e.stopPropagation()} className="w-fit">
      {isBookmarked ? (
        <button onClick={handelRemoveFromBookMark} className=" md:text-3xl text-xl ">
          <IoBookmark />
        </button>
      ) : (
        <button onClick={handelAddToBookmark} className=" md:text-3xl text-xl">
          <IoBookmarkOutline />
        </button>
      )}
    </div>
  );
};

export default BookmarkToggleButton;

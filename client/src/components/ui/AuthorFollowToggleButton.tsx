"use client";
import { FollowAuthor, unFollowAuthor } from "@/services/follower.service";
import React, { useState } from "react";
import errorToast from "../toast/ErrorToast";

interface IProps {
  authorId: number;
  followingStatus: boolean;
}

const AuthorFollowToggleButton = ({ authorId, followingStatus }: IProps) => {
  const [isFollowing, setIsFollowing] = useState(followingStatus);
  const handelFollow = async () => {
    try {
      const res = await FollowAuthor({ author_id: authorId });
      if (!res.success) {
        throw new Error();
      }
      setIsFollowing(true);
    } catch (error) {
      errorToast("Something went wrong");
    }
  };

  const handelUnFollow = async () => {
    try {
      const res = await unFollowAuthor(authorId);
      if (!res.success) {
        throw new Error();
      }
      setIsFollowing(false);
    } catch (error) {
      errorToast("Something went wrong");
    }
  };
  return (
    <>
      {isFollowing ? (
        <button
          onClick={handelUnFollow}
          className="mt-3 bg-red-500 w-full py-2 text-white font-jost rounded-full"
        >
          Unfollow
        </button>
      ) : (
        <button
          onClick={handelFollow}
          className="mt-3 bg-primary_color w-full py-2 text-white font-jost rounded-full"
        >
          Follow
        </button>
      )}
    </>
  );
};

export default AuthorFollowToggleButton;

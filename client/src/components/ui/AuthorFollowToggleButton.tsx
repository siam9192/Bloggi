"use client";
import { FollowAuthor, unFollowAuthor } from "@/services/follower.service";
import React, { useState } from "react";
import errorToast from "../toast/ErrorToast";

interface IProps {
  authorId: number;
  followingStatus: boolean;
  onFollow?(): void;
  onUnFollow?(): void;
  followButtonClassName?: string;
  unFollowButtonClassName?: string;
}

const AuthorFollowToggleButton = ({
  authorId,
  followingStatus,
  onFollow,
  onUnFollow,
  followButtonClassName,
  unFollowButtonClassName,
}: IProps) => {
  const [isFollowing, setIsFollowing] = useState(followingStatus);
  const handelFollow = async () => {
    try {
      const res = await FollowAuthor({ author_id: authorId });
      if (!res.success) {
        throw new Error();
      }
      setIsFollowing(true);
      onFollow && onFollow();
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
      onUnFollow && onUnFollow();
    } catch (error) {
      errorToast("Something went wrong");
    }
  };
  return (
    <>
      {isFollowing ? (
        <button
          onClick={handelUnFollow}
          className={
            unFollowButtonClassName ||
            "mt-3 bg-red-500 w-full py-2 text-white font-jost rounded-full"
          }
        >
          Unfollow
        </button>
      ) : (
        <button
          onClick={handelFollow}
          className={
            followButtonClassName ||
            "mt-3 bg-primary_color w-full py-2 text-white font-jost rounded-full"
          }
        >
          Follow
        </button>
      )}
    </>
  );
};

export default AuthorFollowToggleButton;

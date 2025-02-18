"use client";
import React, { useState } from "react";
import { AiOutlineDislike, AiOutlineLike } from "react-icons/ai";
import { BsBookmark } from "react-icons/bs";
import BookmarkToggleButton from "../ui/BookmarkToggleButton";
import { TReactionType } from "@/types/blog-reaction.type";
import { upsertBlogReaction } from "@/services/blog-reaction.service";

interface IProps {
  blogId: number;
  isBookmarked: boolean;
  reactionType: TReactionType | null;
  count: {
    likes: number;
    dislikes: number;
  };
}

const BlogReactions = ({ blogId, isBookmarked, count, reactionType }: IProps) => {
  const [currentReactionType, setCurrentReactionType] = useState<TReactionType | null>(
    reactionType,
  );
  const [likesCount, setLikesCount] = useState(count.likes);
  const [dislikesCount, setDislikesCount] = useState(count.dislikes);

  const handleUpsertReaction = async (type: TReactionType) => {
    const isSameReaction = type === currentReactionType;
    const newReactionType = isSameReaction ? null : type;

    const payload = {
      blog_id: blogId,
      type: newReactionType,
    };

    try {
      const res = await upsertBlogReaction(payload);
      if (res.success) {
        setCurrentReactionType(newReactionType);

        if (type === "Like") {
          setLikesCount((prev) => prev + (isSameReaction ? -1 : 1));
          if (currentReactionType === "Dislike") {
            setDislikesCount((prev) => prev - 1);
          }
        } else if (type === "Dislike") {
          setDislikesCount((prev) => prev + (isSameReaction ? -1 : 1));
          if (currentReactionType === "Like") {
            setLikesCount((prev) => prev - 1);
          }
        } else if (type === currentReactionType) {
          if (type === "Like") {
            setLikesCount((prev) => prev - 1);
          } else {
            setDislikesCount((prev) => prev - 1);
          }
        }
      } else throw new Error();
    } catch (error) {
      console.error("Error updating reaction:", error);
    }
  };

  return (
    <div className="mt-5 flex justify-between items-center">
      <div className="flex  items-center gap-4">
        <button
          onClick={() => handleUpsertReaction("Like")}
          className={`text-4xl ${currentReactionType === "Like" ? " text-red-600" : "text-primary_color"}  rounded-full flex items-center gap-2`}
        >
          <AiOutlineLike />
          <span className="text-xl font-semibold  ">{likesCount}</span>
        </button>
        <button
          onClick={() => handleUpsertReaction("Dislike")}
          className={`text-4xl ${currentReactionType === "Dislike" ? " text-red-600" : "text-primary_color"}  rounded-full flex items-center gap-2`}
        >
          <AiOutlineDislike />
          <span className="text-xl font-semibold  ">{dislikesCount}</span>
        </button>
      </div>
      <div>
        <BookmarkToggleButton blogId={blogId} bookmarkedStatus={isBookmarked} />
      </div>
    </div>
  );
};

export default BlogReactions;

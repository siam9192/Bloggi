"use client";
import { usePostCommentMutation } from "@/redux/features/comment/comment.api";
import React, { useRef, useState } from "react";
import successToast from "../toast/SuccessToast";
import errorToast from "../toast/ErrorToast";

interface IProps {
  blogId: number;
}

const CommentWriteBox = ({ blogId }: IProps) => {
  const [errorMessage, setErrorMessage] = useState("");
  const [content, setContent] = useState("");
  const contentTextareaRef = useRef<HTMLTextAreaElement>(null);
  const [post, { isLoading }] = usePostCommentMutation();

  const handelPostComment = async () => {
    try {
      if (!content.trim()) throw new Error("Comment is required");
      const payload = {
        blog_id: blogId,
        content,
      };
      const res = await post(payload);
      const textarea = contentTextareaRef.current;
      if (res.data.success) {
        if (textarea) textarea.value = "";
        successToast("Comment posted successfully");
      }
    } catch (error: any) {
      setErrorMessage(error.message);
      errorToast(error.message);
    }
  };
  return (
    <div className="p-5 bg-gray-100 space-y-4">
      <textarea
        ref={contentTextareaRef}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Write comment here.."
        className="p-2 bg-white h-40 md:h-52 resize-none w-full border-none outline-none"
      ></textarea>
      <div className="text-end">
        <button
          disabled={isLoading}
          onClick={handelPostComment}
          className="px-6  py-2 text-xl bg-primary_color text-white"
        >
          {isLoading ? "Posting.." : "Post"}
        </button>
      </div>
      {errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>}
    </div>
  );
};

export default CommentWriteBox;

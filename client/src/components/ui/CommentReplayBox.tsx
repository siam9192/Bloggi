"use client";
import { useCurrentUser } from "@/provider/CurrentUserProvider";
import { usePostCommentReplayMutation } from "@/redux/features/comment/comment.api";
import React, { use, useEffect, useRef, useState } from "react";
import { FaRegCommentDots } from "react-icons/fa";
import successToast from "../toast/SuccessToast";
import errorToast from "../toast/ErrorToast";

interface IProps {
  commentId: number;
  commentAuthor: {
    id: number;
    full_name: string;
    profile_photo: string;
  };
  onReplay?: () => void;
}

const CommentReplayBox = ({ commentId, commentAuthor, onReplay }: IProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const contentTextareaRef = useRef<HTMLTextAreaElement>(null);
  const { user } = useCurrentUser();

  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
  }, [isOpen]);

  const [postReplay, { isLoading }] = usePostCommentReplayMutation();

  const handelPostReplay = async () => {
    try {
      const contentTextArea = contentTextareaRef.current;

      if (!contentTextArea) {
        throw new Error("Something went wrong");
      }

      const content = contentTextArea.value;
      if (!content.trim().length) {
        throw new Error("Content is required");
      }
      const payload = {
        comment_id: commentId,
        content,
      };
      const res = await postReplay(payload);
      if (res.data?.success) {
        successToast("Replay posted successfully");
        setIsOpen(false);
        onReplay && onReplay();
      }
    } catch (error: any) {
      errorToast(error.message);
      setErrorMessage(error.message);
    }
  };
  return (
    <>
      <button onClick={() => setIsOpen(true)} className="w-fit flex items-center gap-1">
        <span className="text-2xl text-gray-800">
          <FaRegCommentDots />
        </span>
        <span className="text-primary_color">Replay</span>
      </button>
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed h-full w-full inset-0  bg-primary_color bg-opacity-40 flex items-center justify-center z-50 p-2"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="lg:w-1/3 md:w-1/2 w-full p-8 min-h-60 bg-white"
          >
            <p className="text-gray-600">
              Replaying.. to{" "}
              <span className="text-gray-900">
                {commentAuthor.id === user?.reader?.id ? "My self" : commentAuthor.full_name}
              </span>
            </p>
            <div className="mt-5">
              <textarea
                ref={contentTextareaRef}
                className="h-52 w-full border-2 p-2 resize-none border-secondary_color rounded-md outline-none bg-gray-50 b"
              ></textarea>
              <div className="text-end">
                <button
                  disabled={isLoading}
                  onClick={handelPostReplay}
                  className="mt-3 px-4 py-2 bg-primary_color text-white"
                >
                  {isLoading ? "Posting.." : "Post Replay"}
                </button>
              </div>
              {errorMessage && <p className="mt-1 text-red-500">{errorMessage}</p>}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CommentReplayBox;

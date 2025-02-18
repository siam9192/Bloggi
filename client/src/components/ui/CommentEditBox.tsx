"use client";
import { IComment } from "@/types/comment.type";
import React, { useEffect, useRef, useState } from "react";
import { FaRegCommentDots } from "react-icons/fa";
import { MdModeEdit } from "react-icons/md";
import successToast from "../toast/SuccessToast";
import errorToast from "../toast/ErrorToast";
import { useUpdateCommentMutation } from "@/redux/features/comment/comment.api";

interface IProps {
  comment: IComment;
}

const CommentEditBox = ({ comment }: IProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const [errorMessage, setErrorMessage] = useState("");
  const contentTextareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
  }, [isOpen]);

  const [update, { isLoading }] = useUpdateCommentMutation();

  const handelSave = async () => {
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
        comment_id: comment.id,
        content,
      };
      const res = await update(payload);
      if (res.data?.success) {
        successToast("Comment updated successfully");
        setIsOpen(false);
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
          <MdModeEdit />
        </span>
        <span className="text-primary_color">Edit</span>
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
            <div className="mt-5">
              <textarea
                defaultValue={comment.content}
                ref={contentTextareaRef}
                className="h-52 w-full border-2 p-2 resize-none border-secondary_color rounded-md outline-none bg-gray-50 b"
              ></textarea>
              <div className="text-end">
                <button onClick={handelSave} className="mt-3 px-4 py-2 bg-primary_color text-white">
                  Save
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

export default CommentEditBox;

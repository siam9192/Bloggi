"use state";
import { getTimeAgo } from "@/utils/func";
import React, { useState } from "react";
import { AiOutlineDislike, AiOutlineLike } from "react-icons/ai";
import { IoCaretDownSharp } from "react-icons/io5";
import CommentReplayBox from "../ui/CommentReplayBox";
import { IComment } from "@/types/comment.type";
import CommentReplies from "../sections/CommentReplies";

import CommentDeleteButton from "../ui/CommentDeleteButton";
import CommentEditBox from "../ui/CommentEditBox";
import { useCurrentUser } from "@/provider/CurrentUserProvider";

interface IProps {
  comment: IComment;
}

const CommentCard = ({ comment }: IProps) => {
  const [showReplies, setShowReplies] = useState(false);

  const [isViewFullContent, setIsViewFullContent] = useState(false);

  const { user } = useCurrentUser();

  const toggleShowReplies = () => setShowReplies(!showReplies);

  const defaultContentViewLength = 200;

  let content = comment.content;
  content.length > defaultContentViewLength && !isViewFullContent
    ? content.slice(0, defaultContentViewLength) + "..."
    : content;

  const onReplay = () => {
    setShowReplies(true);
  };

  return (
    <div className="space-y-2">
      <div className="flex  gap-4">
        <img
          src={comment.reader.profile_photo}
          className=" md:size-14 size-10 rounded-full"
          alt="profile"
        />
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <h2 className="font-semibold text-[1.1rem]">{comment.reader.full_name}</h2>
            <p>{getTimeAgo(comment.created_at)}</p>
          </div>
          <div
            onClick={() => setIsViewFullContent(!isViewFullContent)}
            className=" hover:cursor-pointer text-gray-800 md:text-[1rem] text-[0.9rem]"
            dangerouslySetInnerHTML={{ __html: content }}
          />

          <div className="flex items-center gap-2">
            <div className="w-fit flex items-center gap-1">
              <span className="text-2xl text-gray-400">
                <AiOutlineLike />
              </span>
              <span className="text-primary_color">20</span>
            </div>
            <div className="w-fit flex items-center gap-1">
              <span className="text-2xl text-gray-400">
                <AiOutlineDislike />
              </span>
              <span className="text-primary_color">20</span>
            </div>

            <CommentReplayBox
              commentId={comment.id}
              commentAuthor={comment.reader}
              onReplay={onReplay}
            />
            {comment.reader_id === user?.reader?.id ? (
              <>
                <CommentEditBox comment={comment} />
                <CommentDeleteButton commentId={comment.id} />
              </>
            ) : null}
          </div>
          {!showReplies && comment._count.replies ? (
            <button
              onClick={toggleShowReplies}
              className="flex items-center gap-2 text-purple-600 font-semibold font-jost"
            >
              <span className={`text-xl ${showReplies ? "rotate-180" : "rotate-0"} duration-75`}>
                <IoCaretDownSharp />
              </span>
              <span>See {comment._count.replies} Replies</span>
            </button>
          ) : null}
          {showReplies && <CommentReplies commentId={comment.id} />}
        </div>
      </div>
    </div>
  );
};

export default CommentCard;

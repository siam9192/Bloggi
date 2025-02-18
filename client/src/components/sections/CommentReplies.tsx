import { useGetCommentRepliesQuery } from "@/redux/features/comment/comment.api";
import React from "react";
import CommentCard from "../cards/CommentCard";

interface IProps {
  commentId: number;
}
const CommentReplies = ({ commentId }: IProps) => {
  const { data, isLoading } = useGetCommentRepliesQuery(commentId);

  const comments = data?.data;

  if (isLoading) return <p>Replies is loading..</p>;
  return (
    <div>
      <h2 className="font-medium">Showing {comments?.length} Replies:</h2>
      <div className=" mt-3 space-y-3">
        {comments?.map((comment, index) => (
          <CommentCard comment={comment} key={"replies" + (1 + index)} />
        ))}
      </div>
    </div>
  );
};

export default CommentReplies;

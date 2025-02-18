"use client";
import React from "react";
import ManageCommentCard from "../cards/ManageCommentCard";
import { useGetBlogCommentsQuery } from "@/redux/features/comment/comment.api";

interface IProps {
  id: number;
}

const BlogStatesComments = ({ id }: IProps) => {
  const { data, isLoading } = useGetBlogCommentsQuery(id);
  const blogs = data?.data;
  const meta = data?.meta;

  if (isLoading)
    return (
      <div className="space-y-5">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            className="h-52 bg-gray-400  animate-pulse rounded-md"
            key={"comment-loading" + (index + 1)}
          ></div>
        ))}
      </div>
    );

  return (
    <div className="space-y-5">
      <p className="md:text-xl  font-medium">{meta?.total} Comments</p>
      {blogs?.map((comment, index) => <ManageCommentCard comment={comment} key={index} />)}
    </div>
  );
};

export default BlogStatesComments;

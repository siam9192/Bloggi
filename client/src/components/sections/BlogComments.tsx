"use client";
import React from "react";
import CommentCard from "../cards/CommentCard";
import CommentWriteBox from "../ui/CommentWriteBox";
import { useGetBlogCommentsQuery } from "@/redux/features/comment/comment.api";
import DefaultPagination from "../pagination/DefaultPagination";

export const BlogComments = ({ blogId }: { blogId: number }) => {
  const { data, isLoading } = useGetBlogCommentsQuery(blogId);
  const comments = data?.data;
  const meta = data?.meta;
  return (
    <div>
      <h1 className="text-3xl font-semibold text-primary_color">Comments</h1>
      <div className="mt-5">
        <CommentWriteBox blogId={blogId} />
      </div>
      {isLoading ? (
        <p>Loading..</p>
      ) : comments?.length ? (
        <div className="mt-5 lg:px-10 md:px-5 px-2 space-y-5">
          {comments?.map((comment, index) => <CommentCard comment={comment} key={index} />)}
        </div>
      ) : (
        <div className="h-52 flex justify-center items-center">
          <h1 className="text-gray-700 font-medium text-xl">This blog have no comments</h1>
        </div>
      )}
      {meta && comments?.length ? (
        <div className="mt-5 flex justify-center items-center">
          <DefaultPagination {...meta} onPageChange={() => {}} />
        </div>
      ) : null}
    </div>
  );
};

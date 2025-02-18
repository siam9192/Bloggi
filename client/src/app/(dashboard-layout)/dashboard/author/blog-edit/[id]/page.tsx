"use client";
import BlogEditForm from "@/components/forms/BlogEditForm";
import React from "react";
import { PageProps } from "../../../../../../../.next/types/app/layout";
import { useParams } from "next/navigation";
import { useGetBlogByIdQuery } from "@/redux/features/blog/blog.api";
import LoadingPopup from "@/components/popup/LoadingPopup";
import { IBlog } from "@/types/blog.type";

function page() {
  const { id } = useParams();
  if (!id) throw new Error("Something went wrong");

  const { data, isLoading } = useGetBlogByIdQuery(id as string);

  const blog = data?.data;

  if (isLoading) return <LoadingPopup status />;
  if (!isLoading && !blog) throw new Error("Something went wrong");
  return (
    <div className="py-5 h-[90%]">
      <div className="h-full">
        <BlogEditForm blog={blog as IBlog} />
      </div>
    </div>
  );
}

export default page;

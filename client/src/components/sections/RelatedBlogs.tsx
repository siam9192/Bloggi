"use client";
import React from "react";
import BlogCard from "../cards/BlogCard";
import { useGetRelatedBlogsQuery } from "@/redux/features/blog/blog.api";

interface IProps {
  slug: string;
}

const RelatedBlogs = ({ slug }: IProps) => {
  const { data, isLoading } = useGetRelatedBlogsQuery(slug);
  const blogs = data?.data;

  if (isLoading) return <p>Related blogs is loading</p>;

  return (
    <div className="py-20">
      <h1 className="text-3xl md:text-4xl font-jost font-extrabold uppercase">Related Posts</h1>
      {blogs?.length ? (
        <div className="mt-10 grid lg:grid-cols-4 md:grid-cols-3  grid-cols-2 gap-2 md:gap-5 lg:gap-10">
          {blogs?.map((blog, index) => <BlogCard blog={blog} key={"recent-blog" + (index + 1)} />)}
        </div>
      ) : (
        <div className="h-52 text-gray-100 flex justify-center items-center text-center">
          <h1>No Related posts found</h1>
        </div>
      )}
    </div>
  );
};

export default RelatedBlogs;

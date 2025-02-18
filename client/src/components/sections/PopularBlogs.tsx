"use client";
import React, { useState } from "react";
import BlogCard from "../cards/BlogCard";
import { GoArrowRight } from "react-icons/go";
import { useGetPopularBlogsQuery } from "@/redux/features/blog/blog.api";
import BlogLoadingCard from "../cards/BlogLoadingCard";

function PopularBlogs() {
  const [page, setPage] = useState(1);

  const params = [
    {
      name: "page",
      value: page,
    },
  ];

  const { data, isLoading } = useGetPopularBlogsQuery(params);

  const blogs = data?.data;
  const meta = data?.meta;

  const isNextPageAvailable = meta ? Math.ceil(meta.total / meta.limit) > page : false;

  const handelLoadMore = () => {
    isNextPageAvailable && setPage((prev) => prev + 1);
  };

  return (
    <div className="py-20">
      <h1 className="text-3xl md:text-4xl font-jost font-extrabold">Popular Blogs</h1>
      {isLoading ? (
        <div className="grid grid-cols-2 lg:grid-cols-2 md:gap-5 gap-3 bg-white md:p-5 p-2">
          {Array.from({ length: 10 })?.map((blog, index) => (
            <BlogLoadingCard key={"blog-loading" + index} />
          ))}
        </div>
      ) : (
        <div className="mt-10 grid lg:grid-cols-3   grid-cols-2 gap-2 md:gap-5 gap-3">
          {blogs?.map((blog, index) => <BlogCard blog={blog} key={"recent-blog" + (index + 1)} />)}
        </div>
      )}

      {isNextPageAvailable && (
        <div className="mt-20 text-center">
          <button
            onClick={handelLoadMore}
            className=" px-8 py-3 bg-primary_color text-white rounded-md"
          >
            Load more
          </button>
        </div>
      )}
    </div>
  );
}

export default PopularBlogs;

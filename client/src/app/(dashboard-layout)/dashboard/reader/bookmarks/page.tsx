"use client";
import BlogCard from "@/components/cards/BlogCard";
import { useGetMyBookmarksQuery } from "@/redux/features/bookmark/bookmark.api";
import React from "react";

const page = () => {
  const { data } = useGetMyBookmarksQuery([]);
  const bookmarks = data?.data;
  const meta = data?.meta;
  return (
    <div className="py-10">
      <div className="bg-white  p-10">
        <h1 className="text-3xl font-bold font-jost">
          Bookmarks{" "}
          <span className=" bg-orange-500 text-white px-2 py-2 text-[1.1rem] rounded-full">
            {meta?.total}
          </span>
        </h1>
        <div className="grid lg:grid-cols-3  grid-cols-2 md:gap-5 gap-3  bg-white">
          {bookmarks?.map((item, index) => {
            const blog = { ...item.blog };
            blog.is_bookmarked = true;

            return <BlogCard blog={blog} key={index} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default page;

import { IBlog } from "@/types/blog.type";
import { getTimeAgo } from "@/utils/func";
import React from "react";
import BookmarkToggleButton from "../ui/BookmarkToggleButton";
import Link from "next/link";

type TProps = {
  blog: IBlog;
};

const BlogCard = ({ blog }: TProps) => {
  return (
    <Link href={blog.is_premium ? "/pricing" : `/blogs/read/${blog.slug}`}>
      <div className="mt-5 bg-white  flex flex-col h-full  gap-2   md:p-3 p-2 ">
        <img src={blog.featured_image} alt="" className="rounded-lg" />
        <div className="relative flex-grow">
          <div className=" space-y-2 ">
            <div className="absolute right-2 top-1">
              <BookmarkToggleButton
                blogId={blog.id}
                bookmarkedStatus={blog.is_bookmarked || false}
              />
            </div>
            {/* Premium icon image */}
            <img
              src="https://cdn-icons-png.flaticon.com/512/5223/5223460.png"
              className="w-4 "
              alt=""
            />
            <p className=" bg-primary_color  text-white md:px-4 p-2  w-fit uppercase md:text-[0.9rem] text-[0.5rem]">
              {blog.category.name}
            </p>

            <h1 className=" text-[1.2rem] md:text-2xl font-bold text-primary_color font-jost">
              {blog.title}
            </h1>
            <p className=" text-[.8rem] md:text-[0.9rem] text-gray-700 font-poppins">
              {blog.short_description}
            </p>
          </div>
        </div>
        <div className="md:flex items-center justify-between">
          <div className="mt-4 flex items-center gap-2 ">
            <img src={blog.author.profile_photo} alt="" className="size-10 rounded-full border" />
            <h4 className="text-primary_color font-poppins font-bold text-[.6rem] md:text-[.8rem]">
              {blog.author.full_name}
            </h4>
          </div>
          <p className="text-gray-700 text-end md:text-[1rem] text-[0.6rem]">
            Posted {getTimeAgo(blog?.publish_date || new Date().toString())}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default BlogCard;

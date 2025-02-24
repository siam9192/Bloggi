import { IBlog } from "@/types/blog.type";
import { getTimeAgo } from "@/utils/func";
import React from "react";
import { IoBookmarkOutline } from "react-icons/io5";
import BookmarkToggleButton from "../ui/BookmarkToggleButton";
import Link from "next/link";
import ReadMoreButton from "../ui/ReadMoreButton";

type TProps = {
  blog: IBlog;
};

const BlogListCard = ({ blog }: TProps) => {
  return (
    <div className="mt-5 bg-white  flex md:gap-5 gap-2  relative ">
      <img src={blog.featured_image} alt="" className="w-[40%]" />
      <div>
        <div className=" space-y-2">
          <div onClick={(e) => e.stopPropagation()} className="absolute right-2 top-1">
            <BookmarkToggleButton blogId={blog.id} bookmarkedStatus={blog.is_bookmarked || false} />
          </div>
          {blog.is_premium && (
            <img
              src="https://cdn-icons-png.flaticon.com/512/5223/5223460.png"
              className="w-4 "
              alt=""
            />
          )}
          <p className=" bg-primary_color  text-white md:px-4 p-2 w-fit uppercase md:text-[0.9rem] text-[0.8rem]">
            {blog.category.name}
          </p>

          <h1 className=" text-[18px] md:text-2xl font-bold text-primary_color font-jost">
            {blog.title}
          </h1>
          <p className=" text-[.8rem] md:text-[0.9rem] text-gray-700 font-poppins">
            {blog.short_description}
          </p>
        </div>
        <div className="mt-3 flex justify-end">
          <ReadMoreButton slug={blog.slug} is_premium={blog.is_premium} authorId={blog.author_id} />
        </div>
        <div className="ms:flex items-center justify-between">
          <div className="mt-4 flex items-center gap-2">
            <img src={blog.author.profile_photo} alt="" className="size-10 rounded-full border" />
            <h4 className="text-primary_color font-poppins font-bold text-[.6rem] md:text-[.8rem]">
              {blog.author.full_name}
            </h4>
          </div>
          <p className="text-gray-700 text-end text-[0.9rem]">
            Posted {getTimeAgo(blog?.publish_date || new Date().toString())}
          </p>
        </div>
      </div>
    </div>
  );
};

export default BlogListCard;

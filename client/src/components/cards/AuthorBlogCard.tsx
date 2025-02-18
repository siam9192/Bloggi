import { EBlogStatus, IAuthorBlog } from "@/types/blog.type";
import { getTimeAgo } from "@/utils/func";
import Link from "next/link";
import React from "react";
import { AiOutlineDislike, AiOutlineLike } from "react-icons/ai";
import { FaRegCommentDots, FaRegEdit } from "react-icons/fa";
import { PiEyeLight } from "react-icons/pi";
import { RiDeleteBin6Line } from "react-icons/ri";
import BlogDeleteButton from "../ui/BlogDeleteButton";
import ViewBlogStatesButton from "../ui/ViewBlogStatesButton";
import { IoAnalytics, IoAnalyticsSharp } from "react-icons/io5";

interface IProps {
  blog: IAuthorBlog;
}
const AuthorBlogCard = ({ blog }: IProps) => {
  const options: Intl.DateTimeFormatOptions = {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  };

  const publishDateString = new Date(blog.publish_date)
    .toLocaleString("en-US", options)
    .replace(",", "")
    .replace("at", "-");

  return (
    <div className="mt-5 px-3 py-5 rounded-lg bg-white flex flex-col">
      {/* Featured Image */}
      <img src={blog.featured_image} alt="" className="rounded-md" />
      {/* Title and short description */}
      <div className="mt-4 space-y-2 flex-grow">
        <div className="text-end">
          <p className="p-2 rounded-full w-fit bg-blue-100 text-[0.8rem]">{blog.category.name}</p>
        </div>
        <h1 className=" text-xl  font-bold text-primary_color font-jost">{blog.title}</h1>

        <p className=" text-[.8rem] md:text-[0.9rem] text-gray-700 font-poppins">
          {blog.short_description}
        </p>
      </div>
      {/* Counts and crud button */}
      <div className="mt-4 space-y-3">
        <div className=" flex items-center justify-between">
          {/* Counts */}
          <div className="flex items-center gap-2">
            <div className="w-fit flex items-center gap-1">
              <span className=" bg-gray-50 p-1 rounded-full">
                <AiOutlineLike />
              </span>
              <span>{blog._count.likes}</span>
            </div>
            <div className="w-fit flex items-center gap-1">
              <span className=" bg-gray-50 p-1 rounded-full">
                <AiOutlineDislike />
              </span>
              <span>{blog._count.dislikes}</span>
            </div>
            <div className="w-fit flex items-center gap-1">
              <span className=" bg-gray-50 p-1 rounded-full">
                <PiEyeLight />
              </span>
              <span>{blog._count.views}</span>
            </div>
            <div className="w-fit flex items-center gap-1">
              <span className=" bg-gray-50 p-1 rounded-full">
                <FaRegCommentDots />
              </span>
              <span>{blog._count.comments}</span>
            </div>
          </div>

          {/* If blog is premium then show premium icon */}
          {blog.is_premium ? (
            <img
              src="https://cdn-icons-png.flaticon.com/512/5223/5223460.png"
              className="w-5 "
              alt=""
            />
          ) : null}
        </div>

        {/* Crud buttons */}
        <div className="flex justify-between items-center">
          <div className="flex items-center  gap-2">
            <Link href={`/dashboard/author/blog-edit/${blog.id}`}>
              <button className="p-2 bg-green-200 rounded-full">
                <FaRegEdit />
              </button>
            </Link>
            <BlogDeleteButton id={blog.id}>
              <div className="p-2 bg-red-200 rounded-full">
                <RiDeleteBin6Line />
              </div>
            </BlogDeleteButton>
            <ViewBlogStatesButton id={blog.id}>
              <div className="p-2 bg-amber-200 rounded-full">
                <IoAnalyticsSharp />
              </div>
            </ViewBlogStatesButton>
          </div>
          <div className="text-[0.8rem]">
            {blog.status === EBlogStatus.Published || new Date() >= new Date(blog.publish_date) ? (
              <p>
                <span className="px-2 py-1 bg-red-200 rounded-full ">Published</span> :{" "}
                {getTimeAgo(blog.publish_date)}
              </p>
            ) : (
              <p>
                <span className="px-2 py-1 bg-red-200 rounded-full  my-2">Scheduled</span> <br />{" "}
                {publishDateString}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthorBlogCard;

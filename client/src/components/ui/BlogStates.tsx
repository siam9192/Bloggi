import React, { useState } from "react";
import { AiOutlineDislike, AiOutlineLike } from "react-icons/ai";
import { FaRegCommentDots } from "react-icons/fa";
import { IoIosEye } from "react-icons/io";
import "@/styles/BlogStates.css";
import BlogStatesComments from "./BlogStatesComments";
import BlogStatesReactions from "./BlogStatesReactions";
import { useGetBlogStatesQuery } from "@/redux/features/blog/blog.api";
import "@/styles/Spinner.css";
interface IProps {
  id: number;
}
const tabs = ["Comments", "Reactions"];

const BlogStates = ({ id }: IProps) => {
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const { data, isLoading } = useGetBlogStatesQuery(id);
  const states = data?.data;
  try {
    if (isLoading)
      return (
        <div className=" h-full flex justify-center items-center flex-col gap-2 ">
          <div className="spinner" />
          <p className="text-center">Loading..</p>
        </div>
      );
    if (!states) throw new Error();
    return (
      <div className="p-5 space-y-8">
        {/* Info */}
        <div className="space-y-2">
          <p className=" md:p-2 p-1 bg-blue-200 w-fit rounded-md md:text-[1rem] text-[0.8rem]">
            {states.category.name}
          </p>
          <h1 className=" md:text-2xl text-xl text-primary_color font-medium ">{states.title}</h1>
        </div>

        {/* Count states */}
        <div className=" grid  lg:grid-cols-4 md:grid-cols-2 grid-cols-1  gap-2">
          <div className="px-3 py-5  border rounded-md flex items-center justify-between">
            <h1 className="text-blue-600 font-extrabold md:text-4xl text-3xl">
              {states.total_views}
            </h1>
            <h2 className="md:text-2xl text-xl font-jost font-bold">Views</h2>
            <div className="p-2 w-fit bg-gray-100 rounded-md md:text-4xl text-3xl">
              <IoIosEye />
            </div>
          </div>
          <div className="px-3 py-5  border rounded-md flex items-center justify-between">
            <h1 className="text-blue-600 font-extrabold md:text-4xl text-3xl">
              {states.total_likes}
            </h1>
            <h2 className="md:text-2xl text-xl font-jost font-bold">Likes</h2>
            <div className="p-2 w-fit bg-gray-100 rounded-md md:text-4xl text-3xl">
              <AiOutlineLike />
            </div>
          </div>
          <div className="px-3 py-5  border rounded-md flex items-center justify-between">
            <h1 className="text-blue-600 font-extrabold md:text-4xl text-3xl">
              {states.total_dislikes}
            </h1>
            <h2 className="md:text-2xl text-xl font-jost font-bold">Dislikes</h2>
            <div className="p-2 w-fit bg-gray-100 rounded-md md:text-4xl text-3xl">
              <AiOutlineDislike />
            </div>
          </div>
          <div className="px-3 py-5  border rounded-md flex items-center justify-between">
            <h1 className="text-blue-600 font-extrabold md:text-4xl text-3xl">
              {states.total_comments}
            </h1>
            <h2 className="md:text-2xl text-xl font-jost font-bold">Comments</h2>
            <div className="p-2 w-fit bg-gray-100 rounded-md md:text-4xl text-3xl">
              <FaRegCommentDots />
            </div>
          </div>
        </div>

        <div className="space-y-3">
          {/* Tabs */}
          <div className="flex justify-end">
            {tabs.map((tab) => (
              <button
                onClick={() => setActiveTab(tab)}
                key={tab}
                className={`md:px-6 md:py-3 px-5 py-2 ${activeTab === tab ? "bg-blue-200 text-blue-600" : "text-primary_color"} rounded-full border-2 border-white ml-2  font-medium `}
              >
                {tab}
              </button>
            ))}
          </div>

          <div>
            {activeTab === "Comments" ? <BlogStatesComments id={id} /> : <BlogStatesReactions />}
          </div>
        </div>
      </div>
    );
  } catch (error) {
    return (
      <div className="p-5">
        <h2 className="text-2xl font-medium">Something went wrong!</h2>
      </div>
    );
  }
};

export default BlogStates;

"use client";

import BlogCard from "@/components/cards/BlogCard";
import OverviewCountCard from "@/components/cards/OverviewCountCard";
import BlogsAnalysis from "@/components/sections/BlogsAnalysis";
import { useGetReaderOverviewDataQuery } from "@/redux/features/overview/overview.api";
import React from "react";
import { FaRegEdit } from "react-icons/fa";
import { IoBookmark } from "react-icons/io5";
import { MdGroups, MdPayments } from "react-icons/md";
import { PiEye } from "react-icons/pi";
import { TiGroup } from "react-icons/ti";

function page() {
  const { data, isLoading } = useGetReaderOverviewDataQuery(undefined);
  const retrievedData = data?.data;

  const overViewData = [
    {
      title: "Following",
      count: retrievedData?.totalFollowing || 0,
      icon: TiGroup,
      color: "#16C47F",
    },
    {
      title: "Total Bookmarked",
      count: retrievedData?.totalBookmarked || 0,
      icon: IoBookmark,
      color: "#A1E3F9",
    },
  ];

  const currentSubscription = retrievedData?.currentSubscription;

  if (isLoading) return null;
  if (!retrievedData) return <h1>Something went wrong</h1>;

  return (
    <div className="py-5 ">
      <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5">
        {overViewData.map((data, index) => {
          return <OverviewCountCard data={data} key={"overview_count_card-" + (index + 1)} />;
        })}
        <div className="bg-white p-5 min-h-44  shadow-xl space-y-2 rounded-[25px] ">
          <div className="flex items-center gap-2">
            <div className="w-fit h-fit p-2  bg-purple-100 rounded-full text-2xl bg-opacity-60">
              <MdPayments />
            </div>
            <h1 className=" text-xl font-semibold font-jost">{"Subscription"}</h1>
          </div>
          {currentSubscription ? (
            <div className="mt-2 space-y-2">
              <p>
                Stated At {new Date(currentSubscription.start_at).toDateString()}-
                {new Date(currentSubscription.start_at).toLocaleTimeString()}
              </p>
              <p>
                End At {new Date(currentSubscription.end_at).toDateString()}-
                {new Date(currentSubscription.end_at).toLocaleTimeString()}
              </p>
            </div>
          ) : (
            <div className="space-y-1 mt-3">
              <h1 className="text-2xl font-bold text-center">No Active Subscription</h1>
            </div>
          )}
        </div>
      </div>
      <div className="mt-10  gap-5 ">
        <div className="  p-5 shadow-primary bg-white h-fit min-h-[40vh] rounded-xl ">
          <h1 className="text-2xl font-semibold font-jost text-primary_color">
            You Recently Viewed
          </h1>
          {retrievedData.recentlyReadBlogs.length ? (
            <div className="mt-5  grid grid-cols-3  gap-4">
              {retrievedData.recentlyReadBlogs.map((blog) => (
                <BlogCard blog={blog} key={blog.slug} />
              ))}
            </div>
          ) : (
            <div className="h-60 text-center text-3xl flex justify-center items-center">
              <h1>No blogs</h1>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default page;

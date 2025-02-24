"use client";

import OverviewCountCard from "@/components/cards/OverviewCountCard";
import BlogsAnalysis from "@/components/sections/BlogsAnalysis";
import { useGetAllOverviewDataQuery } from "@/redux/features/overview/overview.api";
import React from "react";
import { FaRegEdit } from "react-icons/fa";
import { GiTimeTrap } from "react-icons/gi";
import { MdGroups } from "react-icons/md";
import { PiEye } from "react-icons/pi";
import { RiMoneyDollarCircleLine } from "react-icons/ri";

function page() {
  const { data, isLoading } = useGetAllOverviewDataQuery(undefined);
  const retrievedData = data?.data;

  const overViewData = [
    {
      title: "Blog Posts",
      count: retrievedData?.totalBlogs || 0,
      icon: FaRegEdit,
      color: "#16C47F",
    },
    {
      title: "Total Users",
      count: retrievedData?.totalUsers || 0,
      icon: MdGroups,
      color: "#A1E3F9",
    },
    {
      title: "Blocked Users",
      count: retrievedData?.totalBlockedUsers || 0,
      icon: PiEye,
      color: "#E8C5E5",
    },
    {
      title: "Revenue",
      count: retrievedData?.totalRevenue || 0,
      icon: RiMoneyDollarCircleLine,
      color: "#FBFFDC",
    },
  ];
  if (isLoading) return null;
  if (!retrievedData) return <h1>Something went wrong</h1>;
  return (
    <div className="py-5 ">
      <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-5">
        {overViewData.map((data, index) => {
          return <OverviewCountCard data={data} key={"overview_count_card-" + (index + 1)} />;
        })}
      </div>
      <div className="mt-10  gap-5 grid grid-cols-2">
        <div className="  p-5 shadow-primary bg-white h-fit min-h-[40vh] rounded-xl ">
          <h1 className="text-2xl font-semibold font-jost text-primary_color">
            Blog Posts last 12 Months
          </h1>
          <div className="mt-5 ">
            <BlogsAnalysis data={retrievedData.postingBlogsAnalyze} />
          </div>
        </div>
        <div className="  p-5 shadow-primary bg-white h-fit min-h-[40vh] rounded-xl ">
          <h1 className="text-2xl font-semibold font-jost text-primary_color">
            Blog Posts last 12 Months
          </h1>
          <div className="mt-5 ">
            <BlogsAnalysis data={retrievedData.postingBlogsAnalyze} />
          </div>
        </div>
        <div className="  p-5 shadow-primary bg-white h-fit min-h-[40vh] rounded-xl ">
          <h1 className="text-2xl font-semibold font-jost text-primary_color">New Users</h1>
          <div className="mt-5 "></div>
        </div>
        <div className="  p-5 shadow-primary bg-white h-fit min-h-[40vh] rounded-xl ">
          <h1 className="text-2xl font-semibold font-jost text-primary_color">Popular Posts</h1>
          <div className="mt-5 "></div>
        </div>
      </div>
    </div>
  );
}

export default page;

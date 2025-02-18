"use client";

import AuthorBlogCard from "@/components/cards/AuthorBlogCard";
import FollowerCard from "@/components/cards/FollowerCard";
import OverviewCountCard from "@/components/cards/OverviewCountCard";
import { useGetAuthorOverviewDataQuery } from "@/redux/features/overview/overview.api";
import React from "react";
import { FaRegEdit } from "react-icons/fa";
import { GiTimeTrap } from "react-icons/gi";
import { MdGroups } from "react-icons/md";
import { PiEye } from "react-icons/pi";

function page() {
  const { data, isLoading } = useGetAuthorOverviewDataQuery(undefined);
  const retrievedData = data?.data;

  const overViewData = [
    {
      title: "Posts",
      count: retrievedData?.totalBlogs || 0,
      icon: FaRegEdit,
      color: "#16C47F",
    },
    {
      title: "Scheduled Posts",
      count: retrievedData?.totalScheduledBlogs || 0,
      icon: GiTimeTrap,
      color: "#A1E3F9",
    },
    {
      title: "Views",
      count: retrievedData?.totalBlogViews || 0,
      icon: PiEye,
      color: "#E8C5E5",
    },
    {
      title: "Followers",
      count: retrievedData?.totalFollowers || 0,
      icon: MdGroups,
      color: "#FBFFDC",
    },
  ];
  if (isLoading) return null;
  if (!retrievedData) return <h1>Something went wrong</h1>;
  return (
    <div className="py-5">
      <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-5">
        {overViewData.map((data, index) => {
          return <OverviewCountCard data={data} key={"overview_count_card-" + (index + 1)} />;
        })}
      </div>
      <div className="mt-10 grid md:grid-cols-2 grid-cols-1 gap-5">
        <div className="p-5 shadow-primary bg-white h-fit min-h-[40vh] rounded-xl ">
          <h1 className="text-2xl font-semibold font-jost text-primary_color">Popular Blogs</h1>
          <div className="mt-5 grid md:grid-cols-2 grid-cols-1 gap-3">
            {retrievedData.popularBlogs.map((blog, index) => (
              <AuthorBlogCard blog={blog} key={blog.slug} />
            ))}
          </div>
        </div>
        <div className="p-5 shadow-primary bg-white h-fit min-h-[40vh] rounded-xl ">
          <h1 className="text-2xl font-semibold font-jost text-primary_color">New Followers</h1>
          {retrievedData.newFollowers.length ? (
            <div className="mt-5 grid grid-cols-2 gap-3">
              {retrievedData.newFollowers.map((follower, index) => (
                <FollowerCard follower={follower} key={"new_follower-" + (index + 1)} />
              ))}
            </div>
          ) : (
            <div className="mt-20">
              <h1 className="text-center text-2xl font-semibold text-gray-600">No New Followers</h1>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default page;

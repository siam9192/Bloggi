"use client";
import { useCurrentUser } from "@/provider/CurrentUserProvider";
import { EUserRole } from "@/types/user.type";

import React from "react";
import { IoSearchOutline } from "react-icons/io5";
import DashboardResponsiveSidebar from "../sidebar/DashboardResponsiveSidebar";
import NotificationBar from "../ui/NotificationBar";

function DashboardHeader() {
  const { user } = useCurrentUser();
  let profile;
  if (user) {
    if (user.role === EUserRole.Reader) profile = user.reader;
    else if (user.role === EUserRole.Author) profile = user.author;
    else profile = user.staff;
  }

  return (
    <header>
      <div className="flex justify-between items-center gap-5 mb-2 lg:hidden block">
        <DashboardResponsiveSidebar />
        <div className="flex items-center gap-2 border rounded-full bg-gray-50 p-2  ">
          <span className="text-2xl">
            <IoSearchOutline />
          </span>
          <input
            type="text"
            placeholder="Search Here..."
            className="w-full border-none outline-none bg-transparent font-medium placeholder:font-normal placeholder:text-gray-700"
          />
        </div>
      </div>
      <div className=" flex justify-between items-center">
        <h1 className=" md:text-3xl text-xl font-semibold font-jost">
          Welcome {profile?.first_name}😱
        </h1>
        <div className="flex items-center gap-4">
          <div className="md:flex items-center gap-2 border rounded-full bg-gray-50 p-2  md:block hidden">
            <span className="text-2xl">
              <IoSearchOutline />
            </span>
            <input
              type="text"
              placeholder="Search Here..."
              className="w-60  border-none outline-none bg-transparent font-medium placeholder:font-normal placeholder:text-gray-700"
            />
          </div>
          <NotificationBar />
          <img src={profile?.profile_photo} alt="" className="size-12 rounded-full  border-2" />
        </div>
      </div>
    </header>
  );
}

export default DashboardHeader;

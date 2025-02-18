"use client";
import ManageUserTableCard from "@/components/cards/ManageUserTableCard";
import DashboardPagination from "@/components/pagination/DashboardPagination";
import Users from "@/components/sections/Users";
import UsersOverview from "@/components/sections/UsersOverview";
import React from "react";
import { GrSearch } from "react-icons/gr";
import { IoFilterOutline } from "react-icons/io5";

const page = () => {
  return (
    <div className="pt-14">
      {/* <div>
         <UsersOverview/>
     </div> */}

      <div className="col-span-4">
        <div className=" flex justify-between items-center p-5 bg-white rounded-md">
          <div className="flex items-center gap-2 p-2 border rounded-full w-1/3">
            <span className="text-2xl font-medium text-primary_color">
              <GrSearch />
            </span>
            <input
              type="text"
              placeholder="Enter name or email"
              className=" w-full border-none outline-none"
            />
          </div>
          <button className="text-2xl p-3 bg-gray-50 rounded-full text-primary_color">
            <IoFilterOutline />
          </button>
        </div>

        <Users />
      </div>
    </div>
  );
};

export default page;

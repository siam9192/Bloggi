"use client";
import ManageUserTableCard from "@/components/cards/ManageUserTableCard";
import DashboardPagination from "@/components/pagination/DashboardPagination";
import Users from "@/components/sections/Users";
import UsersOverview from "@/components/sections/UsersOverview";
import UsersFilterBox from "@/components/ui/UsersFilterBox";
import UsersSearchTermInput from "@/components/ui/UsersSearchTermInput";
import React from "react";

const page = () => {
  return (
    <div className="pt-14">
      {/* <div>
         <UsersOverview/>
     </div> */}

      <div className="col-span-4">
        <div className=" flex justify-between items-center md:p-5 p-3 bg-white rounded-md">
          <UsersSearchTermInput />
          <UsersFilterBox />
        </div>

        <Users />
      </div>
    </div>
  );
};

export default page;

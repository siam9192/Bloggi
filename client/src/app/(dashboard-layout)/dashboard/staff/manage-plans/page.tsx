"use client";
import ManagePlans from "@/components/sections/ManagePlans";
import ManagePaymentsFilterBox from "@/components/ui/ManagePaymentsFilterBox";
import UsersSearchTermInput from "@/components/ui/UsersSearchTermInput";
import React from "react";

const page = () => {
  return (
    <div className="pt-14">
      <div>
        <div className=" flex justify-between items-center md:p-5 p-3 bg-white rounded-md">
          <UsersSearchTermInput />
          <ManagePaymentsFilterBox />
        </div>

        <ManagePlans />
      </div>
    </div>
  );
};

export default page;

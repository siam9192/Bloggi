"use client";
import ManageCategories from "@/components/sections/ManageCategories";
import ManageBlogsFilterBox from "@/components/ui/ManageBlogsFilterBox";
import UsersSearchTermInput from "@/components/ui/UsersSearchTermInput";

import React, { useEffect, useRef, useState } from "react";

function page() {
  return (
    <div className="py-10">
      <div className=" flex justify-between items-center md:p-5 p-3 bg-white rounded-md">
        <UsersSearchTermInput />
        <ManageBlogsFilterBox />
      </div>
      <ManageCategories />
    </div>
  );
}

export default page;

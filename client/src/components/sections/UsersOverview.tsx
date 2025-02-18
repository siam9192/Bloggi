"use client";
import { useGetUsersOverviewDataQuery } from "@/redux/features/user/user.api";
import React from "react";

const UsersOverview = () => {
  const { data: resData, isLoading } = useGetUsersOverviewDataQuery(undefined);
  const data = resData?.data;

  return (
    <div className="space-y-5 grid grid-cols-3">
      {" "}
      <div className="p-10  bg-white space-y-2">
        <h1 className="text-4xl font-bold text-center text-blue-600">{data?.totalUsers}</h1>
        <p className="text-center text-primary_color font-medium">Users</p>
      </div>
      <div className="p-10 bg-white space-y-2">
        <h1 className="text-4xl font-bold text-center text-blue-600">{data?.totalBlockedUsers}</h1>
        <p className="text-center text-primary_color font-medium">Blocked Users</p>
      </div>
      <div className="p-10 bg-white space-y-2">
        <h1 className="text-4xl font-bold text-center text-blue-600">{data?.totalRecentUsers}</h1>
        <p className="text-center text-primary_color font-medium">Recent Users</p>
      </div>
      {/* <div className="p-10 bg-white space-y-2">
    <h1 className="text-4xl font-bold text-center text-blue-600">20</h1>
    <p className="text-center text-primary_color font-medium">Total Users</p>
  </div> */}
    </div>
  );
};

export default UsersOverview;

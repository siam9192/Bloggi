"use client";
import ManagePayments from "@/components/sections/ManagePayments";
import ManagePaymentsFilterBox from "@/components/ui/ManagePaymentsFilterBox";
import React from "react";

const page = () => {
  return (
    <div className="pt-14">
      <div>
        <ManagePaymentsFilterBox />

        <ManagePayments />
      </div>
    </div>
  );
};

export default page;

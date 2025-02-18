import DashboardSidebar from "@/components/shared/DashboardSidebar";
import React from "react";
import { LayoutProps } from "../../../.next/types/app/layout";
import DashboardHeader from "@/components/shared/DashboardHeader";
import { HiOutlineMenu } from "react-icons/hi";
import { IoSearchOutline } from "react-icons/io5";
import DashboardLoadingController from "@/components/ui/DashboardLoadingController";
import DashboardResponsiveSidebar from "@/components/sidebar/DashboardResponsiveSidebar";
function layout({ children }: LayoutProps) {
  return (
    <DashboardLoadingController>
      <div className=" lg:flex bg-[#F7F7F5] h-screen  ">
        <div className="w-[20%] p-5 lg:block hidden">
          <DashboardSidebar />
        </div>
        <div className=" lg:w-[80%] md:p-5 p-3   h-full overflow-y-auto  no-scrollbar">
          <DashboardHeader />

          {children}
        </div>
      </div>
    </DashboardLoadingController>
  );
}

export default layout;

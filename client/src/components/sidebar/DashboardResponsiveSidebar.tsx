"use client";
import React, { useEffect, useState } from "react";
import { HiOutlineMenu } from "react-icons/hi";
import DashboardSidebar from "../shared/DashboardSidebar";

const DashboardResponsiveSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const sidebar = document.getElementById("dashboard-sidebar");
    const handler = (event: MouseEvent) => {
      if (!sidebar) return;
      const target = event.target;
      if (!sidebar.contains(target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("click", handler);
    return () => {
      document.removeEventListener("click", handler);
    };
  }, [isOpen]);
  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="text-3xl  font-medium p-2 bg-primary_color text-white rounded-full"
      >
        <HiOutlineMenu />
      </button>

      <div
        className={`fixed w-full h-full top-0 p-10 bg-primary_color bg-opacity-30  ${isOpen ? "left-0" : "-left-[200%]"} duration-150 `}
      >
        <DashboardSidebar />
      </div>
    </>
  );
};

export default DashboardResponsiveSidebar;

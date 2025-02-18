"use client";
import React from "react";
import Logo from "../ui/Logo";
import authorDashboardRoutes from "@/routes/author.dashboard.route";
import Link from "next/link";
import { usePathname } from "next/navigation";
import dashboardDefaultRoutes from "@/routes/default.dashboard.route";
import { CiLogout } from "react-icons/ci";
import { useCurrentUser } from "@/provider/CurrentUserProvider";
import { EUserRole } from "@/types/user.type";
import superAdminDashboardRoutes from "@/routes/super-admin.dashboard.route";

type TProps = {
  role: "SuperAdmin" | "Admin" | "Author";
};
function DashboardSidebar() {
  const { user, isLoading } = useCurrentUser();
  const role = user!.role;
  const pathName = usePathname();
  let routes: any[];
  if (user?.role === EUserRole.Author) {
    routes = authorDashboardRoutes;
  } else if (user?.role === EUserRole.SuperAdmin) {
    routes = superAdminDashboardRoutes;
  } else {
    routes = [];
  }

  return (
    <div
      id="dashboard-sidebar"
      className="h-full bg-primary_color rounded-[20px] p-5 flex flex-col justify-between "
    >
      <div>
        <Logo textColor="white" />
        <div className="mt-5 space-y-5">
          {routes.concat(dashboardDefaultRoutes).map((route) => {
            const routePath = "/dashboard/" + role.toLocaleLowerCase() + route.path;
            if (route.path === "/notifications") route.count = 10;
            return (
              <Link
                href={routePath}
                key={route.path}
                className={` flex items-center justify-between px-4 py-2 rounded-full transition-all  hover:-translate-y-1 ${pathName === routePath ? "bg-secondary_color text-black" : "text-white hover:bg-gray-800"}`}
              >
                <div className="flex items-center gap-2">
                  <span className="text-3xl ">
                    <route.icon />
                  </span>
                  <span className="text-xl  font-jost ">{route.name}</span>
                </div>
                {route.count ? (
                  <div className="size-8 p-2 rounded-full  bg-orange-500  flex justify-center items-center">
                    {route.count}
                  </div>
                ) : null}
              </Link>
            );
          })}
        </div>
      </div>
      <button className="flex items-center gap-2 text-xl text-red-700 font-medium">
        <span className="text-3xl">
          <CiLogout />
        </span>
        <span>Logout</span>
      </button>
    </div>
  );
}

export default DashboardSidebar;

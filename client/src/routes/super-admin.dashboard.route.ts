import { IRoute } from "@/types/route.type";
import { CgProfile } from "react-icons/cg";
import { LuBellRing } from "react-icons/lu";
import { RxDashboard } from "react-icons/rx";
import { TbBrandBlogger } from "react-icons/tb";
import { TiGroup } from "react-icons/ti";

const superAdminDashboardRoutes: IRoute[] = [
  {
    name: "Overview",
    path: "",
    icon: RxDashboard,
  },
  {
    name: "Blogs",
    path: "/blogs",
    icon: TbBrandBlogger,
  },
  {
    name: "Users",
    path: "/manage-users",
    icon: TiGroup,
  },
  {
    name: "Notifications",
    path: "/notifications",
    icon: LuBellRing,
  },
  {
    name: "Profile",
    path: "/profile",
    icon: CgProfile,
  },
];

export default superAdminDashboardRoutes;

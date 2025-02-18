import { IRoute } from "@/types/route.type";
import { CgProfile } from "react-icons/cg";
import { LuBellRing } from "react-icons/lu";
import { RxDashboard } from "react-icons/rx";
import { TbBrandBlogger } from "react-icons/tb";
import { TiGroup } from "react-icons/ti";

const authorDashboardRoutes: IRoute[] = [
  {
    name: "Overview",
    path: "",
    icon: RxDashboard,
  },
  {
    name: "My Blogs",
    path: "/my-blogs",
    icon: TbBrandBlogger,
  },
  {
    name: "Followers",
    path: "/followers",
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

export default authorDashboardRoutes;

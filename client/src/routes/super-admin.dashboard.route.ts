import { IRoute } from "@/types/route.type";
import { BsPersonCheck } from "react-icons/bs";
import { CgProfile } from "react-icons/cg";
import { LuBellRing } from "react-icons/lu";
import { MdOutlineCategory, MdOutlineWorkspacePremium, MdPayments } from "react-icons/md";
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
    path: "/manage-blogs",
    icon: TbBrandBlogger,
  },
  {
    name: "Users",
    path: "/manage-users",
    icon: TiGroup,
  },
  {
    name: "Payments",
    path: "/manage-payments",
    icon: MdPayments,
  },
  // {
  //   name: "Subscriptions",
  //   path: "/manage-subscriptions",
  //   icon: BsPersonCheck,
  // },
  {
    name: "Categories",
    path: "/manage-categories",
    icon: MdOutlineCategory,
  },
  {
    name: "Plans",
    path: "/manage-plans",
    icon: MdOutlineWorkspacePremium,
  },
  // {
  //   name: "Notifications",
  //   path: "/notifications",
  //   icon: LuBellRing,
  // },
  {
    name: "Profile",
    path: "/profile",
    icon: CgProfile,
  },
];

export default superAdminDashboardRoutes;

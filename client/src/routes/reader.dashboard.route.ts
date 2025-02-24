import { IRoute } from "@/types/route.type";
import { CgProfile } from "react-icons/cg";
import { FaRegAddressCard } from "react-icons/fa";
import { RxDashboard } from "react-icons/rx";
import { TbBrandBlogger } from "react-icons/tb";
import { TiGroup } from "react-icons/ti";

const readerDashboardRoutes: IRoute[] = [
  {
    name: "Overview",
    path: "",
    icon: RxDashboard,
  },
  {
    name: "Bookmarks",
    path: "/bookmarks",
    icon: TbBrandBlogger,
  },
  {
    name: "Following",
    path: "/following",
    icon: TiGroup,
  },
  {
    name: "Subscription",
    path: "/subscription",
    icon: FaRegAddressCard,
  },
  {
    name: "Profile",
    path: "/profile",
    icon: CgProfile,
  },
];

export default readerDashboardRoutes;

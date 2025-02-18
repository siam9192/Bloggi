import { IRoute } from "@/types/route.type";
import { CiLock } from "react-icons/ci";
import { IoSettingsOutline } from "react-icons/io5";

const dashboardDefaultRoutes: IRoute[] = [
  {
    name: "Setting",
    path: "/setting",
    icon: IoSettingsOutline,
  },
  {
    name: "Change Password",
    path: "/change-password",
    icon: CiLock,
  },
];

export default dashboardDefaultRoutes;

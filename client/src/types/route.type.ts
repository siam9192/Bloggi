import { IconType } from "react-icons";

export interface IRoute {
  name: string;
  path: string;
  icon: IconType;
  count?: number;
}

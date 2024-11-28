import { UserRole } from "@prisma/client";
import { IName } from "../../reuse/types";

export interface ICreateStaffData {
  name: IName;
  role: `${UserRole}`;
  email: string;
  password: string;
}

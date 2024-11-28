import { UserRole } from "@prisma/client";
import { IName } from "../../reuse/types";

export interface ISignUpData {
  name: IName;
  email: string;
  password: string;
}

export interface ILoginData {
  email: string;
  password: string;
}

export interface IAuthUser {
  id: number;
  role: `${UserRole}`;
}
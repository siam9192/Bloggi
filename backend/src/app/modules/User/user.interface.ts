import { SocialPlatform, UserRole } from "@prisma/client";
import { IName } from "../../reuse/types";

export interface ICreateStaffData {
  name: IName;
  role: `${UserRole}`;
  email: string;
  password: string;
  profile_photo?: string;
}

interface ISocialLink {
  url: string;
  platform: `${SocialPlatform}`;
}

export interface ICreateAuthorData {
  name: IName;
  email: string;
  password: string;
  profile_photo: string;
  bio: string;
  social_links: ISocialLink[];
}

export interface IUserFilterRequest {
  searchTerm?: string;
  name?: string;
  email?: string;
  status?: string;
  role?: string;
  startDate?: string;
  endDate?: string;
}

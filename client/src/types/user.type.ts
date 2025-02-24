import { IFollower } from "./follower.type";
import { IBlog } from "./blog.type";
import { IComment } from "./comment.type";
import { ISubscription } from "./subscription.interface";
import { IBookmark } from "./bookmark.type";

export interface IUser {
  id: number;
  role: TUserRole;
  email: string;
  password: string;
  google_id?: string;
  provider: `${EProvider}`;
  status: `${EUserStatus}`;
  profile?: IProfile;
  author?: IAuthor;
  reader?: IReader;
  staff?: IStaff;
  passwordChangedAt: string;
  join_date: string;
  updated_at: string;
  bookmarks?: IBookmark[];
  _count?: {
    bookmarks: number;
  };
}

export type IProfile = IAuthor | IReader | IStaff;

export interface IAuthor {
  id: number;
  first_name: string;
  last_name: string;
  full_name?: string;
  profile_photo: string;
  bio: string;
  social_links: ISocialLink[];
  followers?: IFollower[];
  blogs?: IBlog[];
  is_following?: string;
  _count?: {
    followers: number;
    blogs: number;
  };
}

export interface IAuthorShortProfile {
  id: number;
  full_name?: string;
  profile_photo: string;
  is_following: boolean;
  _count: {
    followers: number;
    blogs: number;
  };
}

export interface IReader {
  id: number;
  first_name: string;
  last_name: string;
  profile_photo?: string;
  following?: IFollower[];
  comments?: IComment[];
  _count?: {
    following: number;
    comments: number;
  };
  subscriptions?: ISubscription[];
}

export interface IUsersOverviewData {
  totalUsers: number;
  totalBlockedUsers: number;
  totalRecentUsers: number;
}

export interface IStaff {
  id: number;
  first_name: string;
  last_name: string;
  profile_photo?: string;
  created_at: string;
  updated_at: string;
}

export interface ISocialLink {
  platform: `${ESocialPlatform}`;
  url: string;
}

export type TUserRole = `${EUserRole}`;

export enum EUserStatus {
  Active = "Active",
  Blocked = "Blocked",
  Deleted = "Deleted",
}

export enum ESocialPlatform {
  Facebook = "Facebook",
  Instagram = "Instagram",
  Twitter = "Twitter",
  Linkedin = "Linkedin",
  Youtube = "Youtube",
}

export enum EUserRole {
  Reader = "Reader",
  Author = "Author",
  Admin = "Admin",
  SuperAdmin = "SuperAdmin",
}

export enum EProvider {
  Google = "Google",
  Email = "Email",
}

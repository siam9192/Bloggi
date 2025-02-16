import { Author, Reader, SocialPlatform, Staff } from "@prisma/client";

interface ISocialLinkUpdate {
  platform: `${SocialPlatform}`;
  url: string;
  is_deleted?: boolean;
  is_new_added?: boolean;
}

export interface IUpdateAuthorProfileData extends Author {
  social_links: ISocialLinkUpdate[];
}

export interface IUpdateReaderProfileData extends Reader {}

export interface IUpdateStaffProfileData extends Staff {}

import { BlogPrivacyStatus, BlogStatus } from "@prisma/client";

export interface ICreateBlogData {
  title: string;
  content: string;
  short_description: string;
  category_id: number;
  featured_image: string;
  is_premium: boolean;
  tags: string[];
  publish_date: Date;
  privacy_status: `${BlogPrivacyStatus}`;
  status: `${BlogStatus}`;
}

export interface IUpdateBlogData {
  title: string;
  content: string;
  short_description: string;
  category_id: number;
  featured_image: string;
  is_premium: boolean;
  new_tags: string[];
  deleted_tags: number[];
  publish_date: Date;
  privacy_status: `${BlogPrivacyStatus}`;
  status: `${BlogStatus}`;
}

export interface IBlogFilterOptions {
  searchTerm?: string;
  categories?: string;
}

export interface IAuthorBlogsFilter {
  searchTerm?: string;
  categories?: string;
  status?: `${BlogStatus}`;
}
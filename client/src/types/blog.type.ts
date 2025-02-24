import { TReactionType } from "./blog-reaction.type";
import { ICategory, IRetrieveCategory } from "./category.type";

export interface IAuthorBlog {
  id: number;
  title: string;
  short_description: string;
  featured_image: string;
  slug: string;
  category: {
    id: number;
    name: string;
    slug: string;
  };
  author: Author;
  status: EBlogStatus;
  is_premium: boolean;
  publish_date: string;
  created_at: string;
  _count: {
    views: number;
    likes: number;
    dislikes: number;
    comments: number;
  };
}

export interface Author {
  id: number;
  full_name: string;
  profile_photo: string;
  followers_count: number;
  is_following: boolean;
}

export interface IBlog {
  id: number;
  author_id: number;
  author: Author;
  title: string;
  content: string;
  short_description: string;
  category_id: number;
  category: ICategory;
  featured_image: string;
  is_premium: boolean;
  tags: IBlogTag[];
  slug: string;
  publish_date: string;
  privacy_status: `${EBlogPrivacyStatus}`;
  status: `${EBlogStatus}`;
  views_count: number;
  likes_count: number;
  dislikes_count: number;
  created_at: Date;
  updated_at: Date;
  reaction_type: TReactionType;
  is_bookmarked?: boolean;
  comments: Comment[];
}

export interface IBlogTag {
  id: number;
  blog_id: number;
  name: string;
}

export interface IBlogStates {
  id: number;
  title: string;
  slug: string;
  category: IRetrieveCategory;
  total_views: number;
  total_likes: number;
  total_dislikes: number;
  total_comments: number;
}

export enum EBlogStatus {
  Published = "Published",
  Scheduled = "Scheduled",
}

export enum EBlogPrivacyStatus {
  Public = "Public",
  Private = "Private",
}

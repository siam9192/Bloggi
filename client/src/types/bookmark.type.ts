import { IBlog } from "./blog.type";

export interface IBookmark {
  blog_id: number;
  blog: IBlog;
  user_id: number;
  is_starred: boolean;
  created_at: string;
}

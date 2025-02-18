import { IBlog } from "./blog.type";
import { IReader } from "./user.type";

export interface IComment {
  id: number;
  content: string;
  reader_id: number;
  blog: IBlog;
  parent_id?: number;
  parent?: IComment;
  replies?: IComment[];
  reader: {
    id: number;
    full_name: string;
    profile_photo: string;
  };
  created_at: string;
  updated_at: string;
  _count: {
    replies: number;
    reactions: number;
  };
}

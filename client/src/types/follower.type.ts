import { IAuthor, IReader } from "./user.type";

export interface IFollower {
  reader_id: number;
  author_id: number;
  reader: IReader;
  author: IAuthor;
}

export interface IMyFollower {
  reader_id: number;
  full_name: string;
  profile_photo: string;
  status: `${EFollowerStatus}`;
  created_at: string;
}

export enum EFollowerStatus {
  Active = "Active",
  Blocked = "Blocked",
}

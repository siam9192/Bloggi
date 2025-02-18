import { IAuthorBlog } from "./blog.type";
import { IMyFollower } from "./follower.type";

export interface IAuthorOverviewData {
  totalBlogs: number;
  totalScheduledBlogs: number;
  totalBlogViews: number;
  totalFollowers: number;
  popularBlogs: IAuthorBlog[];
  newFollowers: IMyFollower[];
}

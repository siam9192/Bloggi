import { IAuthorBlog, IBlog } from "./blog.type";
import { IMyFollower } from "./follower.type";
import { ISubscription } from "./subscription.type";
import { IUser } from "./user.type";

export interface IAuthorOverviewData {
  totalBlogs: number;
  totalScheduledBlogs: number;
  totalBlogViews: number;
  totalFollowers: number;
  popularBlogs: IAuthorBlog[];
  newFollowers: IMyFollower[];
}

export interface IAllOverviewData {
  totalUsers: number;
  totalReaders: number;
  totalStaffs: number;
  totalBlockedUsers: number;
  totalBlogs: number;
  recentBlogs: IBlog[];
  recentUsers: IUser;
  totalRevenue: number;
  postingBlogsAnalyze: { month: number; year: number; count: number }[];
}

export interface IReaderOverviewData {
  totalFollowing: number;
  totalBookmarked: number;
  currentSubscription: ISubscription;
  recentlyReadBlogs: IBlog[];
}

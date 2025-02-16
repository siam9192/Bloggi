import { FollowerStatus } from "@prisma/client";

interface ICreateFollowerData {}

export interface IFollowersFilterRequest {
  searchTerm?: string;
  followerSince?: string;
  status?: `${FollowerStatus}`;
}

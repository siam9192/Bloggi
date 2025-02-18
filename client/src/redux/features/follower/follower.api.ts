import { baseApi } from "@/redux/api/baseApi";
import { IMyFollower } from "@/types/follower.type";
import { IParam, IResponse } from "@/types/response.type";
import { paramsToString } from "@/utils/func";

const followerApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMyFollowers: builder.query({
      query: (params: IParam[]) => {
        const paramsString = paramsToString(params);
        return {
          url: `/followers/author?${paramsString}`,
          method: "GET",
        };
      },
      transformResponse: (response: IResponse<IMyFollower[]>) => {
        return response;
      },
    }),
  }),
});

export const { useGetMyFollowersQuery } = followerApi;

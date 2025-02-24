import { baseApi } from "@/redux/api/baseApi";
import { IFollowingAuthor, IMyFollower } from "@/types/follower.type";
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
    getMyFollowingAuthors: builder.query({
      query: (params: IParam[]) => {
        const paramsString = paramsToString(params);
        return {
          url: `/followers/following/my?${paramsString}`,
          method: "GET",
        };
      },
      transformResponse: (response: IResponse<IFollowingAuthor[]>) => {
        return response;
      },
      providesTags: ["following-authors"],
    }),
    unFollowAuthor: builder.mutation({
      query: (authorId: number) => {
        return {
          url: `/followers/${authorId}`,
          method: "DELETE",
        };
      },
      transformResponse: (response: IResponse<IFollowingAuthor[]>) => {
        return response;
      },
      invalidatesTags: ["following-authors"],
    }),
  }),
});

export const { useGetMyFollowersQuery, useGetMyFollowingAuthorsQuery, useUnFollowAuthorMutation } =
  followerApi;

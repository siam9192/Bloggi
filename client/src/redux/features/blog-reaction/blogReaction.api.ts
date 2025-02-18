import { baseApi } from "@/redux/api/baseApi";
import { IComment } from "@/types/comment.type";
import { IMyFollower } from "@/types/follower.type";
import { IParam, IResponse } from "@/types/response.type";
import { paramsToString } from "@/utils/func";

const blogReactionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getBlogReactions: builder.query({
      query: (id: number) => {
        return {
          url: `/blog/reactions/${id}`,
          method: "GET",
        };
      },
      transformResponse: (response: IResponse<IComment[]>) => {
        return response;
      },
    }),
  }),
});

export const { useGetBlogReactionsQuery } = blogReactionApi;

import { baseApi } from "@/redux/api/baseApi";
import { IAuthorBlog, IBlog, IBlogStates } from "@/types/blog.type";
import { IBookmark } from "@/types/bookmark.type";
import { IParam, IResponse } from "@/types/response.type";
import { paramsToString } from "@/utils/func";

const blogApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMyBookmarks: builder.query({
      query: (params: IParam[]) => {
        const paramsString = paramsToString(params);
        return {
          url: `/bookmarks?${paramsString}`,
        };
      },
      transformResponse: (response: IResponse<IBookmark[]>) => {
        return response;
      },
    }),
  }),
});

export const { useGetMyBookmarksQuery } = blogApi;

import { baseApi } from "@/redux/api/baseApi";
import { IAuthorBlog, IBlog, IBlogStates } from "@/types/blog.type";
import { IMyFollower } from "@/types/follower.type";
import { IParam, IResponse } from "@/types/response.type";
import { paramsToString } from "@/utils/func";

const blogApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getBlogs: builder.query({
      query: (params: IParam[]) => {
        const paramsString = paramsToString(params);
        return {
          url: `/blogs?${paramsString}`,
        };
      },
      transformResponse: (response: IResponse<IBlog[]>) => {
        return response;
      },
    }),
    getBlogsForManage: builder.query({
      query: (params: IParam[]) => {
        const paramsString = paramsToString(params);
        return {
          url: `/blogs/manage?${paramsString}`,
        };
      },
      transformResponse: (response: IResponse<IBlog[]>) => {
        return response;
      },
    }),
    getMyBlogs: builder.query({
      query: (params: IParam[]) => {
        const paramsString = paramsToString(params);
        return {
          url: `/blogs/my?${paramsString}`,
          method: "GET",
        };
      },
      transformResponse: (response: IResponse<IAuthorBlog[]>) => {
        return response;
      },
      providesTags: ["my-blogs"],
    }),
    getRelatedBlogs: builder.query({
      query: (slug: string) => {
        return {
          url: `/blogs/${slug}/related`,
          method: "GET",
        };
      },
      transformResponse: (response: IResponse<IBlog[]>) => {
        return response;
      },
    }),

    getRecentBlogs: builder.query({
      query: (params: IParam[]) => {
        const paramsString = paramsToString(params);
        return {
          url: `/blogs/recent?${paramsString}`,
          method: "GET",
        };
      },
      transformResponse: (response: IResponse<IBlog[]>) => {
        return response;
      },
    }),
    getPopularBlogs: builder.query({
      query: (params: IParam[]) => {
        const paramsString = paramsToString(params);
        return {
          url: `/blogs/popular?${paramsString}`,
          method: "GET",
        };
      },
      transformResponse: (response: IResponse<IBlog[]>) => {
        return response;
      },
    }),
    getBlogById: builder.query({
      query: (id: string) => {
        return {
          url: `/blogs/${id}`,
          method: "GET",
        };
      },
      transformResponse: (response: IResponse<IBlog>) => {
        return response;
      },
    }),
    getBlogStates: builder.query({
      query: (id: number) => {
        return {
          url: `/blogs/${id}/states`,
          method: "GET",
        };
      },
      transformResponse: (response: IResponse<IBlogStates>) => {
        return response;
      },
    }),
    deleteBlogById: builder.mutation({
      query: (id: number) => {
        return {
          url: `/blogs/${id}`,
          method: "DELETE",
        };
      },
      transformResponse: (response: IResponse<IBlog>) => {
        return response;
      },
      invalidatesTags: ["my-blogs"],
    }),
  }),
});

export const {
  useGetBlogsQuery,
  useGetBlogsForManageQuery,
  useGetRelatedBlogsQuery,
  useGetPopularBlogsQuery,
  useGetMyBlogsQuery,
  useGetBlogByIdQuery,
  useGetBlogStatesQuery,
  useDeleteBlogByIdMutation,
  useGetRecentBlogsQuery,
} = blogApi;

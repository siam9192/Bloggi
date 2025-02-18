import { baseApi } from "@/redux/api/baseApi";
import { IComment } from "@/types/comment.type";
import { IMyFollower } from "@/types/follower.type";
import { IParam, IResponse } from "@/types/response.type";
import { paramsToString } from "@/utils/func";

const commentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getBlogComments: builder.query({
      query: (blogId: number) => {
        return {
          url: `/comments/${blogId}`,
          method: "GET",
        };
      },
      transformResponse: (response: IResponse<IComment[]>) => {
        return response;
      },
      providesTags: ["blog-comments"],
    }),
    getCommentReplies: builder.query({
      query: (commentId: number) => {
        return {
          url: `/comments/${commentId}/replies`,
          method: "GET",
        };
      },
      transformResponse: (response: IResponse<IComment[]>) => {
        return response;
      },
      providesTags: ["blog-comments-replies"],
    }),
    postComment: builder.mutation({
      query: (payload: any) => {
        return {
          url: "/comments",
          method: "POST",
          body: payload,
        };
      },
      invalidatesTags: ["blog-comments"],
    }),

    postCommentReplay: builder.mutation({
      query: (payload: any) => {
        return {
          url: "/comments/replay",
          method: "POST",
          body: payload,
        };
      },
      invalidatesTags: ["blog-comments-replies"],
      transformResponse: (response: IResponse<null>) => response,
    }),
    updateComment: builder.mutation({
      query: (payload: any) => {
        return {
          url: "/comments",
          method: "PATCH",
          body: payload,
        };
      },
      invalidatesTags: ["blog-comments-replies", "blog-comments"],
    }),
    deleteComment: builder.mutation({
      query: (commentId: number) => {
        return {
          url: `/comments/${commentId}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["blog-comments-replies", "blog-comments"],
    }),
  }),
});

export const {
  useGetBlogCommentsQuery,
  useGetCommentRepliesQuery,
  usePostCommentMutation,
  usePostCommentReplayMutation,
  useUpdateCommentMutation,
  useDeleteCommentMutation,
} = commentApi;

import { baseApi } from "@/redux/api/baseApi";
import { IAuthorOverviewData } from "@/types/overview.type";
import { IParam, IResponse } from "@/types/response.type";
import { IUser, IUsersOverviewData } from "@/types/user.type";
import { paramsToString } from "@/utils/func";

const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: (params: IParam[]) => {
        const paramsString = paramsToString(params);
        return {
          url: `/users?${paramsString}`,
        };
      },
      transformResponse: (response: IResponse<IUser[]>) => {
        return response;
      },
      providesTags: ["users"],
    }),
    createAuthor: builder.mutation({
      query: (payload: any) => {
        return {
          method: "POST",
          url: "/users/create-author",
          body: payload,
        };
      },
      transformResponse: (response: IResponse<IUser[]>) => {
        return response;
      },
    }),
    changeUserStatus: builder.mutation({
      query: (payload: any) => {
        return {
          method: "PATCH",
          url: "/users/change-status",
          body: payload,
        };
      },
      transformResponse: (response: IResponse<null>) => {
        return response;
      },
      invalidatesTags: ["users"],
    }),
    deleteUser: builder.mutation({
      query: (userId: number) => {
        return {
          method: "DELETE",
          url: `/users/${userId}`,
        };
      },
      transformResponse: (response: IResponse<null>) => {
        return response;
      },
      invalidatesTags: ["users"],
    }),
    getUsersOverviewData: builder.query({
      query: () => {
        return {
          url: "/users/overview",
          method: "GET",
        };
      },
      transformResponse: (response: IResponse<IUsersOverviewData>) => {
        return response;
      },
    }),
  }),
});

export const {
  useGetUsersQuery,
  useGetUsersOverviewDataQuery,
  useDeleteUserMutation,
  useChangeUserStatusMutation,
} = userApi;

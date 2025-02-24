import { baseApi } from "@/redux/api/baseApi";
import { IAllOverviewData, IAuthorOverviewData, IReaderOverviewData } from "@/types/overview.type";
import { IParam, IResponse } from "@/types/response.type";

const overviewApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAuthorOverviewData: builder.query({
      query: () => {
        return {
          url: "/overview/author",
          method: "GET",
        };
      },
      transformResponse: (response: IResponse<IAuthorOverviewData>) => {
        return response;
      },
    }),
    getAllOverviewData: builder.query({
      query: () => {
        return {
          url: "/overview",
          method: "GET",
        };
      },
      transformResponse: (response: IResponse<IAllOverviewData>) => {
        return response;
      },
    }),
    getReaderOverviewData: builder.query({
      query: () => {
        return {
          url: "/overview/reader",
          method: "GET",
        };
      },
      transformResponse: (response: IResponse<IReaderOverviewData>) => {
        return response;
      },
    }),
  }),
});

export const {
  useGetAuthorOverviewDataQuery,
  useGetAllOverviewDataQuery,
  useGetReaderOverviewDataQuery,
} = overviewApi;

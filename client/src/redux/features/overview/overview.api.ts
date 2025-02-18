import { baseApi } from "@/redux/api/baseApi";
import { IAuthorOverviewData } from "@/types/overview.type";
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
  }),
});

export const { useGetAuthorOverviewDataQuery } = overviewApi;

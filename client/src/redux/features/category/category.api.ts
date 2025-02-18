import { baseApi } from "@/redux/api/baseApi";
import { ICategory } from "@/types/category.type";
import { IParam, IResponse } from "@/types/response.type";
import { paramsToString } from "@/utils/func";

const categoryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getPopularCategories: builder.query({
      query: () => {
        return {
          url: `/categories/popular`,
          method: "GET",
        };
      },
      transformResponse: (response: IResponse<ICategory[]>) => {
        return response;
      },
    }),
    getFeaturedCategories: builder.query({
      query: () => {
        return {
          url: `/categories/featured`,
          method: "GET",
        };
      },
      transformResponse: (response: IResponse<ICategory[]>) => {
        return response;
      },
    }),
  }),
});

export const { useGetPopularCategoriesQuery, useGetFeaturedCategoriesQuery } = categoryApi;

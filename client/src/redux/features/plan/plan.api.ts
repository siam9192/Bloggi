import { baseApi } from "@/redux/api/baseApi";
import { IPlan } from "@/types/plan.type";
import { IParam, IResponse } from "@/types/response.type";
import { paramsToString } from "@/utils/func";

const planApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getPlansForManage: builder.query({
      query: (params: IParam[]) => {
        const paramsString = paramsToString(params);
        return {
          url: `/plans/manage?${paramsString}`,
        };
      },
      transformResponse: (response: IResponse<IPlan[]>) => {
        return response;
      },
    }),
  }),
});

export const { useGetPlansForManageQuery } = planApi;

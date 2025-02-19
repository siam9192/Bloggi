import { baseApi } from "@/redux/api/baseApi";
import { IPayment } from "@/types/payment.type";
import { IParam, IResponse } from "@/types/response.type";
import { paramsToString } from "@/utils/func";

const paymentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getPaymentsForManage: builder.query({
      query: (params: IParam[]) => {
        const paramsString = paramsToString(params);
        return {
          url: `/payments/manage?${paramsString}`,
        };
      },
      transformResponse: (response: IResponse<IPayment[]>) => {
        return response;
      },
    }),
  }),
});

export const { useGetPaymentsForManageQuery } = paymentApi;

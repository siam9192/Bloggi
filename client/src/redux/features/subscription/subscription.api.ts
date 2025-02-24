import { baseApi } from "@/redux/api/baseApi";
import { IResponse } from "@/types/response.type";
import { ISubscription } from "@/types/subscription.type";

const subscriptionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMyCurrentSubscription: builder.query({
      query: () => {
        return {
          url: "/subscriptions/my/current",
          method: "GET",
        };
      },
      transformResponse: (response: IResponse<ISubscription>) => {
        return response;
      },
    }),
  }),
});

export const { useGetMyCurrentSubscriptionQuery } = subscriptionApi;

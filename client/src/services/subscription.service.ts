"use server";

import axiosInstance from "@/axios-instance";
import { IPlan } from "@/types/plan.type";
import { IResponse } from "@/types/response.type";
import { ISubscription } from "@/types/subscription.interface";

export const subscribePlan = async (payload: any) => {
  try {
    const res = await axiosInstance.post("/subscriptions/subscribe-plan", payload);
    return res.data as IResponse<{ paymentUrl: string }>;
  } catch (error: any) {
    return error?.response as IResponse<null>;
  }
};

export const getCurrentSubscription = async () => {
  try {
    const res = await axiosInstance.get("/subscriptions/my/current");
    return res.data as IResponse<ISubscription>;
  } catch (error: any) {
    return error?.response as IResponse<null>;
  }
};

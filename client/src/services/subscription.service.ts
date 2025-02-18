"use server";

import axiosInstance from "@/axios-instance";
import { IPlan } from "@/types/plan.type";
import { IResponse } from "@/types/response.type";

export const subscribePlan = async (payload: any) => {
  try {
    const res = await axiosInstance.post("/subscriptions/subscribe-plan", payload);
    return res.data as IResponse<{ paymentUrl: string }>;
  } catch (error: any) {
    return error?.response as IResponse<null>;
  }
};

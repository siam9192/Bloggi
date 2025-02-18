"use server";

import axiosInstance from "@/axios-instance";
import { IPlan } from "@/types/plan.type";
import { IResponse } from "@/types/response.type";

export const getPlans = async () => {
  try {
    const res = await axiosInstance.get("/plans");
    return res.data as IResponse<IPlan[]>;
  } catch (error: any) {
    return error?.response as IResponse<null>;
  }
};

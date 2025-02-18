"use server";

import axiosInstance from "@/axios-instance";
import { IResponse } from "@/types/response.type";
import { IUser } from "@/types/user.type";
import { cookies } from "next/headers";

export const getAccessToken = async () => {
  return (await cookies()).get("accessToken")?.value || null;
};

export const updateMyProfile = async (payload: any) => {
  try {
    const response = await axiosInstance.put("/profile/my", payload);

    return response.data as IResponse<null>;
  } catch (error: any) {
    return error?.response as IResponse<null>;
  }
};

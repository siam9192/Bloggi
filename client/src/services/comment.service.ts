"use server";
import axiosInstance from "@/axios-instance";
import { EFollowerStatus } from "@/types/follower.type";
import { IResponse } from "@/types/response.type";

export const getBlogComments = async (payload: {
  reader_id: number;
  status: `${EFollowerStatus}`;
}) => {
  try {
    const response = await axiosInstance.patch("/followers/change-status", payload);
    return response.data as IResponse<null>;
  } catch (error: any) {
    return error?.response as IResponse<null>;
  }
};

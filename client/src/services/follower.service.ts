"use server";
import axiosInstance from "@/axios-instance";
import { EFollowerStatus } from "@/types/follower.type";
import { IResponse } from "@/types/response.type";

export const changeFollowerStatus = async (payload: {
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

export const FollowAuthor = async (payload: { author_id: number }) => {
  try {
    const response = await axiosInstance.patch("/followers", payload);
    return response.data as IResponse<null>;
  } catch (error: any) {
    return error?.response as IResponse<null>;
  }
};

export const unFollowAuthor = async (authorId: number) => {
  try {
    const response = await axiosInstance.delete(`/followers/${authorId}`);
    return response.data as IResponse<null>;
  } catch (error: any) {
    return error?.response as IResponse<null>;
  }
};

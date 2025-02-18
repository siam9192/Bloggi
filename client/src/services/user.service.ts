"use server";

import axiosInstance from "@/axios-instance";
import { IResponse } from "@/types/response.type";
import { IUser } from "@/types/user.type";
import { cookies } from "next/headers";

export const createAuthor = async (payload: any) => {
  try {
    const response = await axiosInstance.post("/users/create-author", payload);
    return response.data as IResponse<null>;
  } catch (error: any) {
    return error?.response as IResponse<null>;
  }
};

export const createStaff = async (payload: any) => {
  try {
    const response = await axiosInstance.post("/users/create-staff", payload);
    return response.data as IResponse<null>;
  } catch (error: any) {
    return error?.response as IResponse<null>;
  }
};

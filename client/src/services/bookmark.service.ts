"use server";

import axiosInstance from "@/axios-instance";
import { IBookmark } from "@/types/bookmark.type";
import { IResponse } from "@/types/response.type";

export const addToBookmark = async (payload: { blog_id: number }) => {
  try {
    const res = await axiosInstance.post("/bookmarks", payload);
    return res.data as IResponse<IBookmark>;
  } catch (error: any) {
    return error?.response as IResponse<null>;
  }
};

export const removeFromBookmark = async (blogId: number) => {
  try {
    const res = await axiosInstance.delete(`/bookmarks/${blogId}`);

    return res.data as IResponse<null>;
  } catch (error: any) {
    return error?.response as IResponse<null>;
  }
};

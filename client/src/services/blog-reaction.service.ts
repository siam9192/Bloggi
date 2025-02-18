"use server";
import axiosInstance from "@/axios-instance";
import { TReactionType } from "@/types/blog-reaction.type";
import { IResponse } from "@/types/response.type";

export const upsertBlogReaction = async (payload: { blog_id: number; type: TReactionType }) => {
  try {
    const res = await axiosInstance.post("/blogs-reaction", payload);
    return res.data as IResponse<null>;
  } catch (error: any) {
    return error?.response as IResponse<null>;
  }
};

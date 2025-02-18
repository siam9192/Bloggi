"use server";

import axiosInstance from "@/axios-instance";
import { IBlog } from "@/types/blog.type";
import { IParam, IResponse } from "@/types/response.type";
import { paramsToString } from "@/utils/func";

export const createBlog = async (payload: any) => {
  try {
    const res = await axiosInstance.post("/blogs", payload);
    return res.data as IResponse<IBlog>;
  } catch (error: any) {
    return error?.response.data as IResponse<null>;
  }
};

export const updateBlog = async (id: number, payload: any) => {
  try {
    const res = await axiosInstance.put(`/blogs/${id}`, payload);
    return res.data as IResponse<IBlog>;
  } catch (error: any) {
    console.log(error.response);
    return error?.response.data as IResponse<null>;
  }
};

export const getBlogs = async (params: IParam[]) => {
  try {
    const paramsString = paramsToString(params);
    const res = await axiosInstance.put("/blogs?" + paramsString);
    return res.data as IResponse<IBlog[]>;
  } catch (error: any) {
    return error?.response.data as IResponse<null>;
  }
};

export const getBlogBySlugForRead = async (slug: string) => {
  try {
    const res = await axiosInstance.get("/blogs/read/" + slug);

    return res.data as IResponse<IBlog>;
  } catch (error: any) {
    return error?.response.data as IResponse<null>;
  }
};

export const getRelatedBlogs = async (slug: string) => {
  try {
    const res = await axiosInstance.get(`/blogs/${slug}/related`);
    return res.data as IResponse<IBlog[]>;
  } catch (error: any) {
    return error?.response.data as IResponse<null>;
  }
};

export const getRecentBlogs = async (slug: string) => {
  try {
    const res = await axiosInstance.get(`/blogs/${slug}/related`);
    return res.data as IResponse<IBlog[]>;
  } catch (error: any) {
    return error?.response.data as IResponse<null>;
  }
};

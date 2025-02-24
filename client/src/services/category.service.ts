"use server";

import axiosInstance from "@/axios-instance";
import { ICategory, IRetrieveCategory } from "@/types/category.type";
import { IParam, IResponse } from "@/types/response.type";
import { paramsToString } from "@/utils/func";

export const getCategories = async (params: IParam[]) => {
  try {
    const res = await axiosInstance.get("/categories?" + paramsToString(params));
    return res.data as IResponse<IRetrieveCategory[]>;
  } catch (error: any) {
    return error?.response as IResponse<null>;
  }
};

export const getFeaturedCategories = async () => {
  try {
    const res = await axiosInstance.get("/categories/featured");
    return res.data as IResponse<ICategory[]>;
  } catch (error: any) {
    return error?.response as IResponse<null>;
  }
};

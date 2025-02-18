import axiosInstance from "@/axios-instance";
import { IResponse } from "@/types/response.type";
import { IAuthor, IAuthorShortProfile } from "@/types/user.type";

export const getPopularAuthors = async () => {
  try {
    const res = await axiosInstance.get(`/authors/popular`);

    return res.data as IResponse<IAuthorShortProfile[]>;
  } catch (error: any) {
    return error?.response.data as IResponse<null>;
  }
};

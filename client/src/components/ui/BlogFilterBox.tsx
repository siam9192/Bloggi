"use client";
import React from "react";
import SelectCategory from "./SelectCategory";
import { useForm } from "react-hook-form";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { getSearchUrl } from "@/utils/func";
import { IParam } from "@/types/response.type";
import { IRetrieveCategory } from "@/types/category.type";

const BlogFilterBox = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const onSubmit = (values: any) => {
    const params: IParam[] = Object.entries(values).map(([key, value]) => ({
      name: key,
      value: value as any,
    }));
    const acceptableParamsName = [
      "searchTerm",
      "from",
      "to",
      "type",
      "page",
      "sortBy",
      "sortOrder",
    ];
    const url = getSearchUrl(pathname, searchParams, params, acceptableParamsName);
    router.push(url);
  };
  let defaultValues: Record<string, string> = {};
  searchParams.forEach((value, key) => {
    defaultValues[key] = value;
  });

  const { register, handleSubmit } = useForm({
    defaultValues,
  });

  return (
    <form
      id="blog-filterBox"
      onSubmit={handleSubmit(onSubmit)}
      className=" rounded-md shadow  p-5 space-y-4 bg-white"
    >
      <div className="space-y-2">
        <label className="font-medium text-xl ">Search Keyword:</label>
        <input
          type="text"
          {...register("searchTerm")}
          className="w-full border p-2 rounded-md bg-white"
        />
      </div>
      <div className="space-y-2">
        <label className="font-medium text-xl ">Select Category:</label>
        <SelectCategory />
      </div>
      <div className="space-y-2">
        <label className="font-medium text-xl ">Post From:</label>
        <input
          type="date"
          {...register("startDate")}
          className="w-full border p-2 rounded-md bg-white"
        />
      </div>

      <div className="space-y-2">
        <label className="font-medium text-xl ">Post To:</label>
        <input
          type="date"
          {...register("endDate")}
          className="w-full border p-2 rounded-md bg-white"
        />
      </div>
      <div className="space-y-2">
        <h3 className="text-xl font-semibold">Type:</h3>
        <div className="flex flex-wrap items-center gap-4">
          <div className=" flex items-center space-x-1">
            <input
              {...register("type")}
              type="radio"
              value=""
              defaultChecked
              className="w-4 h-4 accent-black"
            />
            <label className="font-medium text-gray-700">Any</label>
          </div>

          <div className=" flex items-center space-x-1">
            <input
              {...register("type")}
              type="radio"
              value="free"
              className="w-4 h-4 accent-black"
            />
            <label className="font-medium text-gray-700">Free</label>
          </div>

          <div className=" flex items-center space-x-1">
            <input
              {...register("type")}
              type="radio"
              value="premium"
              className="w-4 h-4 accent-black"
            />
            <label htmlFor="" className="font-medium text-gray-700">
              Premium
            </label>
          </div>
        </div>
      </div>
      <div className="space-y-2">
        <h3 className="text-xl font-semibold">Sort By:</h3>
        <div className="flex flex-wrap items-center gap-4">
          <div className=" flex items-center space-x-1">
            <input
              {...register("sortBy")}
              type="radio"
              name="sortBy"
              value=""
              defaultChecked
              className="w-4 h-4 accent-black"
            />
            <label className="font-medium text-gray-700">Date</label>
          </div>
          <div className=" flex items-center space-x-1">
            <input
              {...register("sortBy")}
              type="radio"
              name="sortBy"
              value="views_count"
              className="w-4 h-4 accent-black"
            />
            <label htmlFor="" className="font-medium text-gray-700">
              Views
            </label>
          </div>
          <div className=" flex items-center space-x-1">
            <input
              {...register("sortBy")}
              type="radio"
              name="sortBy"
              value="likes_count"
              className="w-4 h-4 accent-black"
            />
            <label htmlFor="" className="font-medium text-gray-700">
              Likes
            </label>
          </div>
        </div>
      </div>
      <div className="space-y-2">
        <h3 className="text-xl font-semibold">Sort Order:</h3>
        <div className="flex flex-wrap items-center gap-4">
          <div className=" flex items-center space-x-1">
            <input
              {...register("sortOrder")}
              type="radio"
              name="sortOrder"
              value="asc"
              className="w-4 h-4 accent-black"
            />
            <label className="font-medium text-gray-700">Ascending</label>
          </div>
          <div className=" flex items-center space-x-1">
            <input
              {...register("sortOrder")}
              type="radio"
              name="sortOrder"
              value=""
              defaultChecked
              className="w-4 h-4 accent-black"
            />
            <label htmlFor="" className="font-medium text-gray-700">
              Descending
            </label>
          </div>
        </div>
      </div>
      <div className=" grid grid-cols-2 ">
        <button type="reset" className="px-4 py-3 bg-red-500 text-white  w-full">
          Reset
        </button>
        <button type="submit" className="px-6 py-3 bg-primary_color text-white  w-full">
          Search
        </button>
      </div>
    </form>
  );
};

export default BlogFilterBox;

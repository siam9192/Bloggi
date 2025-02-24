"use client";
import React, { useState } from "react";
import { CiGrid41 } from "react-icons/ci";
import { FaListUl } from "react-icons/fa";
import BlogsPagePagination from "@/components/ui/BlogsPagePagination";
import BlogCard from "../cards/BlogCard";
import ResponsiveBlogFilterBox from "../ui/ResponsiveBlogFilterBox";
import BlogListCard from "../cards/BlogListCard";
import { useGetBlogsQuery } from "@/redux/features/blog/blog.api";
import { useSearchParams } from "next/navigation";
import { IParam } from "@/types/response.type";
import BlogLoadingListCard from "../cards/BlogLoadingListCard";
import BlogLoadingCard from "../cards/BlogLoadingCard";

const Blogs = () => {
  const [viewType, setViewType] = useState<"grid" | "list">("grid");

  const searchParams = useSearchParams();
  const params: IParam[] = [];

  searchParams.forEach((value, key) => {
    params.push({
      name: key,
      value,
    });
  });

  const { data, isLoading } = useGetBlogsQuery(params);
  const blogs = data?.data;
  const meta = data?.meta;

  if (!isLoading && (!meta || !blogs)) throw new Error();

  const showingFrom = meta && meta.total ? (meta.page - 1) * meta.limit + 1 : 0;
  const showingTo = meta ? Math.min(meta.page * meta.limit, meta.total) : 0;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center  bg-white shadow md:p-5 p-2 ">
        <div className="lg:hidden block">
          <ResponsiveBlogFilterBox />
        </div>
        <div>
          <p>
            Showing {showingFrom} of {showingTo} results
          </p>
        </div>
        <div className="md:text-3xl text-2xl space-x-2 md:block hidden ">
          <button
            onClick={() => setViewType("list")}
            className={`p-2 ${viewType === "list" ? "bg-secondary_color" : "bg-white"} rounded-md text-black  border `}
          >
            <FaListUl />
          </button>
          <button
            onClick={() => setViewType("grid")}
            className={`p-2 ${viewType === "grid" ? "bg-secondary_color" : "bg-white"} rounded-md text-black  border `}
          >
            <CiGrid41 />
          </button>
        </div>
      </div>
      {isLoading ? (
        <>
          {viewType === "grid" ? (
            <div className="grid grid-cols-2 lg:grid-cols-2 md:gap-5 gap-2 bg-white md:p-5 p-2">
              {Array.from({ length: 10 })?.map((blog, index) => (
                <BlogLoadingCard key={"blog-loading" + index} />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:gap-5 gap-3 bg-white md:p-5 p-2">
              {Array.from({ length: 10 })?.map((_, index) => (
                <BlogLoadingListCard key={"blog-loading" + index} />
              ))}
            </div>
          )}
          {meta && <BlogsPagePagination meta={meta} />}
        </>
      ) : blogs?.length ? (
        <>
          {viewType === "grid" ? (
            <div className="grid grid-cols-2 lg:grid-cols-2 md:gap-5 gap-3 bg-white md:p-5 p-2">
              {blogs?.map((blog, index) => <BlogCard blog={blog} key={"blog-" + index} />)}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:gap-5 gap-3 bg-white md:p-5 p-2">
              {blogs?.map((blog, index) => <BlogListCard blog={blog} key={"blog-" + index} />)}
            </div>
          )}
          {meta && <BlogsPagePagination meta={meta} />}
        </>
      ) : (
        <div className="flex flex-col gap-2 justify-center items-center">
          <img src="/images/no-result.png" alt="" />
          <h1 className="text-3xl font-semibold text-primary_color">No results found</h1>
        </div>
      )}
    </div>
  );
};

export default Blogs;

"use client";
import AuthorBlogCard from "@/components/cards/AuthorBlogCard";
import DashboardPagination from "@/components/pagination/DashboardPagination";
import MyBlogsFilterBox from "@/components/ui/MyBlogsFilterBox";
import authorBlogs from "@/data/author-blogs.data";
import { useGetMyBlogsQuery } from "@/redux/features/blog/blog.api";
import { IParam } from "@/types/response.type";
import useBounce from "@/useBounce";
import { getSearchParamsToString } from "@/utils/func";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { IoSearchOutline } from "react-icons/io5";

function page() {
  const router = useRouter();

  const searchParams = useSearchParams();
  const acceptableParamsName = ["startDate", "endDate", "status", "type", "sortBy", "sortOrder"];
  const isFirstRender = useRef(true);
  const pathname = usePathname();
  const params: IParam[] = [];
  searchParams.forEach((value, key) => {
    if (acceptableParamsName.includes(key)) {
      params.push({
        name: key,
        value,
      });
    }
  });

  const { data, isLoading, isError } = useGetMyBlogsQuery(params);
  const blogs = data?.data;
  const meta = data?.meta;

  const [searchTermInputValue, setSearchTermInputValue] = useState<string | null>(null);

  const searchTerm = useBounce(searchTermInputValue || "");

  useEffect(() => {
    const urlSearchParams = new URLSearchParams(searchParams);

    if (isFirstRender.current) {
      isFirstRender.current = false;
    } else {
      urlSearchParams.set("searchTerm", searchTerm);
    }

    const stringParams = getSearchParamsToString(
      urlSearchParams,
      { searchTerm },
      acceptableParamsName,
      { disableReset: true },
    );

    router.push(pathname + "?" + stringParams.toString());
  }, [searchTerm]);

  const onPageChange = (page: number) => {
    const urlSearchParams = new URLSearchParams();
    for (const param of searchParams) {
      const [key, value] = param;
      if (acceptableParamsName.includes(key)) {
        urlSearchParams.set(key, value);
      }
    }
    urlSearchParams.set("page", page.toString()); // Set changed page
    router.push(pathname + "?" + urlSearchParams.toString());
  };
  return (
    <div>
      <div className="my-5 flex md:flex-row flex-col gap-2 md:gap-0 md:justify-between items-center">
        <div className="flex items-center gap-2 px-2 py-3  rounded-full lg:w-1/3 md:w-1/2 w-full bg-white">
          <span className="text-2xl">
            <IoSearchOutline />
          </span>
          <input
            onChange={(e) => setSearchTermInputValue(e.target.value)}
            type="text"
            placeholder="Search by Keyword.."
            className="bg-transparent border-none outline-none w-full placeholder:text-gray-700"
          />
        </div>
        <MyBlogsFilterBox />
      </div>
      <div className="mt-5 grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-5">
        {!isLoading
          ? blogs?.map((blog, index) => {
              return <AuthorBlogCard blog={blog} key={"blog-" + (index + 1)} />;
            })
          : Array.from({ length: 10 }).map((_, index) => (
              <div className="h-80 bg-gray-300 animate-pulse rounded-md" key={index}></div>
            ))}
      </div>
      {meta && (
        <div className="mt-10 flex justify-center items-center">
          <DashboardPagination {...meta} onPageChange={onPageChange} />
        </div>
      )}
      <button
        onClick={() => router.push("/dashboard/author/blog-post")}
        className="absolute  right-5 bottom-10 p-3 text-3xl bg-blue-600 text-white rounded-full hover:scale-90"
      >
        <FaPlus />
      </button>
    </div>
  );
}

export default page;

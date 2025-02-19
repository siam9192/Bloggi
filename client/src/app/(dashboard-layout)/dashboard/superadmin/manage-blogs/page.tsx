"use client";
import ManageBlogs from "@/components/sections/ManageBlogs";
import ManageBlogsFilterBox from "@/components/ui/ManageBlogsFilterBox";
import UsersSearchTermInput from "@/components/ui/UsersSearchTermInput";

import { useGetBlogsForManageQuery } from "@/redux/features/blog/blog.api";
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

  const { data, isLoading, isError } = useGetBlogsForManageQuery(params);
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
    <div className="py-10">
      <div className=" flex justify-between items-center md:p-5 p-3 bg-white rounded-md">
        <UsersSearchTermInput />
        <ManageBlogsFilterBox />
      </div>

      <ManageBlogs />

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

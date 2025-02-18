"use client";
import React from "react";
import DefaultPagination from "../pagination/DefaultPagination";
import { IMeta } from "@/types/response.type";
import { getSearchParamsToString } from "@/utils/func";

import { useRouter, useSearchParams } from "next/navigation";

interface IProps {
  meta: IMeta;
}

const BlogsPagePagination = ({ meta }: IProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handelPageChange = (page: number) => {
    const acceptableParamsName = [
      "searchTerm",
      "from",
      "to",
      "type",
      "page",
      "sortBy",
      "sortOrder",
    ];
    const newParams = {
      name: "page",
      value: page.toString(),
    };

    const url = getSearchParamsToString(searchParams, newParams, acceptableParamsName);
    router.push(url);
  };
  return (
    <div className="mt-10">
      <DefaultPagination {...meta} onPageChange={handelPageChange} />
    </div>
  );
};

export default BlogsPagePagination;

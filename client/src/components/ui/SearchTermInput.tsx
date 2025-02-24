"use client";
import useBounce from "@/useBounce";
import { getSearchUrl } from "@/utils/func";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { GrSearch } from "react-icons/gr";

interface IProps {
  placeholder?: string;
}

const SearchTermInput = ({ placeholder }: IProps) => {
  const pathname = usePathname();
  const router = useRouter();
  const [searchTermInputValue, setSearchTermInputValue] = useState<string | null>(null);

  const searchTerm = useBounce(searchTermInputValue || "");
  const searchParams = useSearchParams();

  useEffect(() => {
    const acceptableParamsName = ["startDate", "endDate", "status", "role", "sortBy", "sortOrder"];
    const url = getSearchUrl(
      pathname,
      searchParams,
      [{ name: "searchTerm", value: searchTerm }],
      acceptableParamsName,
    );

    router.push(url);
  }, [searchTerm]);
  return (
    <div className="flex items-center gap-2 p-2 border-2 rounded-full md:w-1/3 w-10/12">
      <span className="text-2xl font-medium text-primary_color">
        <GrSearch />
      </span>
      <input
        type="text"
        placeholder={placeholder}
        className=" w-full border-none outline-none"
        onChange={(e) => setSearchTermInputValue(e.target.value)}
      />
    </div>
  );
};

export default SearchTermInput;

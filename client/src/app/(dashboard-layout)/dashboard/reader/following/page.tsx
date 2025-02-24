"use client";
import DashboardPagination from "@/components/pagination/DashboardPagination";
import { useGetMyFollowingAuthorsQuery } from "@/redux/features/follower/follower.api";
import React from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { IParam } from "@/types/response.type";
import FollowingAuthorCard from "@/components/cards/FollowingAuthorCard";
import SearchTermInput from "@/components/ui/SearchTermInput";
import FollowingAuthorLoadingCard from "@/components/cards/FollowingAuthorLoadingCard";

function page() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const acceptableParams = ["searchTerm", "status", "followingSince", "sortBy", "sortOrder"];

  const params: IParam[] = [];
  searchParams.forEach((value, key) => {
    if (acceptableParams.includes(key)) {
      params.push({
        name: key,
        value,
      });
    }
  });
  const { data, isLoading } = useGetMyFollowingAuthorsQuery(params);
  const followingAuthors = data?.data;
  const meta = data?.meta;

  const onPageChange = (page: number) => {
    const urlSearchParams = new URLSearchParams();
    for (const param of searchParams) {
      const [key, value] = param;
      if (acceptableParams.includes(key)) {
        urlSearchParams.set(key, value);
      }
    }
    urlSearchParams.set("page", page.toString()); // Set changed page
    router.push(pathname + "?" + urlSearchParams.toString());
  };

  return (
    <div className="md:p-10 p-5  mt-10 bg-white">
      <div className="md:text-2xl text-xl font-medium text-primary_color flex items-center gap-2">
        <h1>Following</h1>
        <div className="md:size-10 size-8 rounded-full bg-orange-500 text-[0.9rem] flex justify-center items-center">
          {meta?.total || 0}
        </div>
      </div>
      <div className="my-5 flex md:flex-row flex-col md:justify-between md:items-center gap-2">
        <SearchTermInput placeholder="Search by name.." />
      </div>
      <div className="mt-10">
        <div className="grid lg:grid-cols-5 md:grid-cols-3 grid-cols-2 gap-5 ">
          {isLoading
            ? Array.from({ length: 10 }).map((f_, index) => (
                <FollowingAuthorLoadingCard key={index} />
              ))
            : followingAuthors?.map((followingAuthor, index) => (
                <FollowingAuthorCard
                  followingAuthor={followingAuthor}
                  key={`follower-` + (index + 1)}
                />
              ))}
        </div>

        {!isLoading && !followingAuthors?.length && (
          <div className="text-center h-[50vh] flex justify-center items-center">
            <h1 className="text-3xl font-bold text-primary_color font-jost">
              Currently you are not following anyone
            </h1>
          </div>
        )}
      </div>

      <div className="mt-5 flex justify-center">
        {meta && followingAuthors?.length ? (
          <DashboardPagination {...meta} onPageChange={onPageChange} />
        ) : null}
      </div>
    </div>
  );
}

export default page;

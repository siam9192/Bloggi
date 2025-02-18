"use client";
import FollowerCard from "@/components/cards/FollowerCard";
import DashboardPagination from "@/components/pagination/DashboardPagination";
import MyFollowersFilterBox from "@/components/ui/MyFollowersFilterBox";
import { myFollowers } from "@/data/follower.data";
import { useGetMyFollowersQuery } from "@/redux/features/follower/follower.api";
import React, { useEffect, useRef, useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
import { PageProps } from "../../../../../../.next/types/app/layout";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { IParam } from "@/types/response.type";
import FollowerLoadingCard from "@/components/cards/FollowerLoadingCard";
import useBounce from "@/useBounce";
import { getSearchParamsToString } from "@/utils/func";

function page() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const acceptableParams = ["searchTerm", "status", "followingSince", "sortBy", "sortOrder"];
  const isFirstRender = useRef(true);

  const params: IParam[] = [];
  searchParams.forEach((value, key) => {
    if (acceptableParams.includes(key)) {
      params.push({
        name: key,
        value,
      });
    }
  });
  const { data, refetch, isLoading } = useGetMyFollowersQuery(params);
  const followers = data?.data || [];
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
      acceptableParams,
      { disableReset: true },
    );

    router.push(pathname + "?" + stringParams.toString());
  }, [searchTerm]);

  return (
    <div className="py-5">
      <div className="my-5 flex md:flex-row flex-col md:justify-between md:items-center gap-2">
        <div className="flex items-center gap-2 p-2 rounded-full lg:w-1/3 md:w-1/2 w-full border border-primary_color ">
          <span className="text-2xl">
            <IoSearchOutline />
          </span>
          <input
            onChange={(e) => setSearchTermInputValue(e.target.value)}
            defaultValue={searchParams.get("searchTerm") || ""}
            type="text"
            placeholder="Search by Name.."
            className="bg-transparent border-none outline-none w-full placeholder:text-gray-700"
          />
        </div>
        <MyFollowersFilterBox />
      </div>
      <div className="mt-5">
        <h3 className=" md:text-xl font-medium text-end">
          Total Followers: <span className="font-normal">12763</span>
        </h3>
      </div>
      {isLoading ? (
        <div className=" md:mt-10 mt-5 grid lg:grid-cols-5 md:grid-cols-3 grid-cols-2 md:gap-5 gap-3">
          {[...Array(20)].map((_, index) => (
            <FollowerLoadingCard key={"loading-" + (index + 1)} />
          ))}
        </div>
      ) : (
        <>
          {followers.length === 0 ? (
            <div className="h-[30vh] flex justify-center items-center text-center">
              <h1 className="text-3xl font-medium ">No Followers Found</h1>
            </div>
          ) : (
            <div className=" md:mt-10 mt-5 grid lg:grid-cols-5 md:grid-cols-3 grid-cols-2 md:gap-5 gap-3 min-h-[60vh]">
              {followers.map((follower, index) => (
                <FollowerCard
                  follower={follower}
                  refetch={refetch}
                  key={`follower-` + (index + 1)}
                />
              ))}
            </div>
          )}
        </>
      )}
      <div className="mt-5 flex justify-center">
        {meta && followers.length ? (
          <DashboardPagination {...meta} onPageChange={onPageChange} />
        ) : null}
      </div>
    </div>
  );
}

export default page;

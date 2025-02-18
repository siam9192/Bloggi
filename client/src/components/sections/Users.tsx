import React from "react";
import DashboardPagination from "../pagination/DashboardPagination";
import ManageUserTableCard from "../cards/ManageUserTableCard";
import { useGetUsersQuery } from "@/redux/features/user/user.api";
import ManageUserLoadingTableCard from "../cards/ManageUserLoadingTableCard";
import { CreateAuthorButton } from "../ui/CreateAuthorButton";
import { CreateStaffButton } from "../ui/CreateStaffButton";
import { useRouter, useSearchParams } from "next/navigation";
import { IParam } from "@/types/response.type";
import { getSearchParamsToString } from "@/utils/func";
const heads = ["Id", "Name", "Email", "Role", "Join Date", "Status", "Actions"];

const Users = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const params: IParam[] = [];

  searchParams.forEach((value, key) => {
    params.push({
      name: key,
      value,
    });
  });

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

  const { data, isLoading, isFetching } = useGetUsersQuery(params);
  const users = data?.data;
  const meta = data?.meta;

  const showingFrom = meta ? (meta.page - 1) * meta.limit + 1 : 0;
  const showingTo = meta ? Math.min(meta.page * meta.limit, meta.total) : 0;

  return (
    <div className="md:mt-10 mt-6 md:p-5 p-3 bg-white overflow-y-auto ">
      <div className="py-4  flex md:flex-row flex-col-reverse  gap-4 justify-between md:items-center">
        <p>
          Showing {showingFrom}-{showingTo} of {meta?.total} results
        </p>
        <div className="flex items-center gap-2">
          <CreateAuthorButton />
          <CreateStaffButton />
        </div>
      </div>
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            {heads.map((head) => (
              <th key={head} scope="col" className="px-6 py-3">
                {head}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {!isLoading || !isFetching
            ? users?.map((user, index) => <ManageUserTableCard user={user} key={index} />)
            : Array.from({ length: 12 }).map((_, index) => (
                <ManageUserLoadingTableCard key={index} />
              ))}
        </tbody>
      </table>
      {!isLoading && !users?.length && (
        <div className="h-[30vh] text-center">
          <h1 className="text-3xl text-gray-700 font-medium mt-20">No Users Found</h1>
        </div>
      )}
      <div className="mt-10 pl-10">
        {!isLoading && meta && users?.length ? (
          <DashboardPagination {...meta} onPageChange={handelPageChange} />
        ) : null}
      </div>
    </div>
  );
};

export default Users;

import React from "react";
import DashboardPagination from "../pagination/DashboardPagination";
import ManageUserTableCard from "../cards/ManageUserTableCard";
import { useGetUsersQuery } from "@/redux/features/user/user.api";
import ManageUserLoadingTableCard from "../cards/ManageUserLoadingTableCard";
import { CreateAuthorButton } from "../ui/CreateAuthorButton";
import { CreateStaffButton } from "../ui/CreateStaffButton";
const heads = ["Id", "Name", "Email", "Role", "Join Date", "Status", "Actions"];

const Users = () => {
  const { data, isLoading } = useGetUsersQuery([]);
  const users = data?.data;
  const meta = data?.meta;

  return (
    <div className="mt-10 p-5 bg-white">
      <div className="py-4  flex justify-between items-center">
        <p>Showing 39 of 333 results</p>
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
          {!isLoading
            ? users?.map((user, index) => <ManageUserTableCard user={user} key={index} />)
            : Array.from({ length: 12 }).map((_, index) => (
                <ManageUserLoadingTableCard key={index} />
              ))}
        </tbody>
      </table>
      <div className="mt-10 pl-10">
        {!isLoading && meta && users?.length ? (
          <DashboardPagination {...meta} onPageChange={() => {}} />
        ) : null}
      </div>
    </div>
  );
};

export default Users;

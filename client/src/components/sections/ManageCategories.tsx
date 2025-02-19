import { IParam } from "@/types/response.type";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React from "react";
import ManageBlogTableCard from "../cards/ManageBlogTableCard";
import DashboardPagination from "../pagination/DashboardPagination";
import { getSearchParamsToString } from "@/utils/func";
import ManageBlogTableCardLoading from "../cards/ManageBlogTableCardLoading";
import { useGetCategoriesForManageQuery } from "@/redux/features/category/category.api";
import ManageCategoryTableCard from "../cards/ManageCategoryTableCard";
import AddCategoryButton from "../cards/AddCategoryButton";

const ManageCategories = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const params: IParam[] = [];
  searchParams.forEach((value, key) => {
    params.push({
      name: key,
      value,
    });
  });
  const { data, isLoading } = useGetCategoriesForManageQuery(params);
  const categories = data?.data;
  const meta = data?.meta;

  const showingFrom = meta ? (meta.page - 1) * meta.limit + 1 : 0;
  const showingTo = meta ? Math.min(meta.page * meta.limit, meta.total) : 0;
  const heads = ["Id", "Basic", "Name", "Dates", "Actions"];

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
    <div className="md:mt-10 mt-6 md:p-5 p-3 bg-white overflow-y-auto ">
      <div className="py-4  flex md:flex-row flex-col-reverse  gap-4 justify-between md:items-center">
        <p>
          Showing {showingFrom}-{showingTo} of {meta?.total} results
        </p>
        <div>
          <AddCategoryButton />
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
            ? categories?.map((category, index) => (
                <ManageCategoryTableCard category={category} key={category.id} />
              ))
            : Array.from({ length: 10 }).map((_, index) => (
                <ManageBlogTableCardLoading key={"Loading-" + (index + 1)} />
              ))}
        </tbody>
      </table>
      {!isLoading && !categories?.length && (
        <div className="h-[30vh] text-center">
          <h1 className="text-3xl text-gray-700 font-medium mt-20">No Blogs Found</h1>
        </div>
      )}

      {meta && meta.total && !isLoading && (
        <div className="mt-10 pl-10">
          <DashboardPagination {...meta} onPageChange={handelPageChange} />
        </div>
      )}
    </div>
  );
};

export default ManageCategories;

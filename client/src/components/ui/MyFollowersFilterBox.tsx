"use client";
import { getSearchParamsToString } from "@/utils/func";
import { SearchParams } from "next/dist/server/request/search-params";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { IoFilterOutline } from "react-icons/io5";

type TDefaultValues = {
  followingSince: string | null;
  status: string;
  sortBy: string;
  sortOrder: string;
};

type TProps = {
  refetch: () => void | any;
};

function MyFollowersFilterBox() {
  const searchParams = useSearchParams();

  const defaultValues: TDefaultValues = {
    followingSince: searchParams.get("followingSince"),
    status: searchParams.get("status") || "",
    sortBy: searchParams.get("sortBy") || "",
    sortOrder: searchParams.get("sortOrder") || "",
  };

  const { register, handleSubmit, reset } = useForm({
    defaultValues,
  });

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const router = useRouter();
  const pathname = usePathname();
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [isOpen]);

  const acceptableParamsName = ["searchTerm", "status", "followingSince", "sortBy", "sortOrder"];

  const onSubmit = async (values: TDefaultValues) => {
    const stringParams = getSearchParamsToString(searchParams, values, acceptableParamsName, {
      disableReset: false,
    });

    router.push(pathname + "?" + stringParams);
    setIsOpen(false);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="px-4 py-2 bg-gray-100 hover:bg-primary_color hover:text-white flex items-center shadow justify-between  font-jost rounded-full"
      >
        <span>Filters</span>
        <IoFilterOutline />
      </button>
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="absolute inset-0  bg-primary_color bg-opacity-40 flex items-center justify-center"
        >
          {/* Box */}
          <div
            onClick={(e) => e.stopPropagation()}
            className=" lg:w-1/3 md:w-1/2 w-[90%] p-5   lg:min-h-60 bg-white "
          >
            <form onSubmit={handleSubmit(onSubmit)}>
              {/* Filter  */}
              <div className="space-y-4">
                {/* Start Date and End Date */}
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold">Date:</h3>
                  <div className="md:flex items-center justify-between md:space-y-0 space-y-2">
                    <div className="md:space-x-2">
                      <label htmlFor="" className="font-medium">
                        Following Since:
                      </label>
                      <input
                        {...register("followingSince")}
                        type="date"
                        name="followingSince"
                        id=""
                        className="border-2 p-2 rounded-md"
                      />
                    </div>
                  </div>
                </div>
                {/* Status */}
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold">Status:</h3>
                  <div className="flex flex-wrap items-center gap-4">
                    <div className=" space-x-1">
                      <input
                        {...register("status")}
                        type="radio"
                        name="status"
                        value=""
                        defaultChecked
                        className="w-4 h-4 accent-black"
                      />
                      <label htmlFor="" className="font-medium text-gray-700">
                        Any
                      </label>
                    </div>
                    <div className=" space-x-1">
                      <input
                        {...register("status")}
                        type="radio"
                        name="status"
                        value="Active"
                        className="w-4 h-4 accent-black"
                      />
                      <label htmlFor="" className="font-medium text-gray-700">
                        Active
                      </label>
                    </div>
                    <div className=" space-x-1">
                      <input
                        {...register("status")}
                        type="radio"
                        name="status"
                        value="Blocked"
                        className="w-4 h-4 accent-black"
                      />
                      <label htmlFor="" className="font-medium text-gray-700">
                        Blocked
                      </label>
                    </div>
                  </div>
                </div>
                {/* Sort By */}
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold">Sort By:</h3>
                  <div className="flex flex-wrap items-center gap-4">
                    <div className=" space-x-1">
                      <input
                        {...register("sortBy")}
                        type="radio"
                        name="sortBy"
                        value=""
                        defaultChecked
                        className="w-4 h-4 accent-black"
                      />
                      <label className="font-medium text-gray-700">Date</label>
                    </div>
                    <div className=" space-x-1">
                      <input
                        {...register("sortBy")}
                        type="radio"
                        name="sortBy"
                        value="name"
                        className="w-4 h-4 accent-black"
                      />
                      <label htmlFor="" className="font-medium text-gray-700">
                        Name
                      </label>
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold">Sort Order:</h3>
                  <div className="flex flex-wrap items-center gap-4">
                    <div className=" space-x-1">
                      <input
                        {...register("sortOrder")}
                        type="radio"
                        name="sortOrder"
                        value="asc"
                        className="w-4 h-4 accent-black"
                      />
                      <label className="font-medium text-gray-700">Ascending</label>
                    </div>
                    <div className=" space-x-1">
                      <input
                        {...register("sortOrder")}
                        type="radio"
                        name="sortOrder"
                        value=""
                        defaultChecked
                        className="w-4 h-4 accent-black"
                      />
                      <label htmlFor="" className="font-medium text-gray-700">
                        Descending
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              {/* Buttons */}
              <div className="mt-5 flex justify-end gap-4">
                <button
                  type="button"
                  onClick={() => reset()}
                  className=" bg-red-500 hover:bg-red-600 px-6 py-2 text-white rounded-md"
                >
                  Reset All
                </button>
                <button
                  type="submit"
                  className="bg-primary_color hover:bg-secondary_color hover:text-primary_color px-6 py-2 text-white rounded-md"
                >
                  Apply
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default MyFollowersFilterBox;

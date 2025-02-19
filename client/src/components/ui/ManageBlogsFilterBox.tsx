"use client";
import { getSearchParamsToString } from "@/utils/func";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { IoFilterOutline } from "react-icons/io5";

function ManageBlogsFilterBox() {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const defaultValues = {
    startDate: searchParams.get("startDate") || "",
    endDate: searchParams.get("endDate") || "",
    status: searchParams.get("status") || "",
    type: searchParams.get("type") || "",
    sortBy: searchParams.get("sortBy") || "",
    sortOrder: searchParams.get("sortOrder") || "",
  };

  const { register, reset, handleSubmit } = useForm({
    defaultValues,
  });

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [isOpen]);

  const submit = (values: any) => {
    const acceptableParamsName = ["startDate", "endDate", "status", "type", "sortBy", "sortOrder"];
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
        className="text-2xl p-3 bg-gray-50 rounded-full text-primary_color"
      >
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
            <form onSubmit={handleSubmit(submit)}>
              {/* Filter  */}
              <div className="space-y-4">
                {/* Start Date and End Date */}
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold">Date:</h3>
                  <div className="md:flex items-center justify-between md:space-y-0 space-y-2">
                    <div className=" space-x-2">
                      <label htmlFor="" className="font-medium">
                        Start Date:
                      </label>
                      <input type="date" {...register("startDate")} id="" />
                    </div>
                    <div className=" space-x-2">
                      <label htmlFor="" className="font-medium">
                        End Date:
                      </label>
                      <input type="date" {...register("endDate")} name="endDate" id="" />
                    </div>
                  </div>
                </div>
                {/* Status */}
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold">Status:</h3>
                  <div className="flex flex-wrap items-center gap-4">
                    <div className=" flex items-center space-x-1">
                      <input
                        type="radio"
                        {...register("status")}
                        value=""
                        className="w-4 h-4 accent-black"
                      />
                      <label htmlFor="" className="font-medium text-gray-700">
                        Any
                      </label>
                    </div>
                    <div className=" flex items-center space-x-1">
                      <input
                        type="radio"
                        {...register("status")}
                        value="Published"
                        className="w-4 h-4 accent-black"
                      />
                      <label htmlFor="" className="font-medium text-gray-700">
                        Published
                      </label>
                    </div>
                    <div className=" flex items-center space-x-1">
                      <input
                        type="radio"
                        {...register("status")}
                        value="Scheduled"
                        className="w-4 h-4 accent-black"
                      />
                      <label htmlFor="" className="font-medium text-gray-700">
                        Scheduled
                      </label>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="text-xl font-semibold">Type:</h3>
                  <div className="flex flex-wrap items-center gap-4">
                    <div className=" flex items-center space-x-1">
                      <input
                        {...register("type")}
                        type="radio"
                        value=""
                        className="w-4 h-4 accent-black"
                      />
                      <label className="font-medium text-gray-700">Any</label>
                    </div>

                    <div className=" flex items-center space-x-1">
                      <input
                        {...register("type")}
                        type="radio"
                        value="free"
                        className="w-4 h-4 accent-black"
                      />
                      <label className="font-medium text-gray-700">Free</label>
                    </div>

                    <div className=" flex items-center space-x-1">
                      <input
                        {...register("type")}
                        type="radio"
                        value="premium"
                        className="w-4 h-4 accent-black"
                      />
                      <label htmlFor="" className="font-medium text-gray-700">
                        Premium
                      </label>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="text-xl font-semibold">Sort By:</h3>
                  <div className="flex flex-wrap items-center gap-4">
                    <div className=" flex items-center space-x-1">
                      <input
                        {...register("sortBy")}
                        type="radio"
                        name="sortBy"
                        value=""
                        className="w-4 h-4 accent-black"
                      />
                      <label className="font-medium text-gray-700">Date</label>
                    </div>
                    <div className=" flex items-center space-x-1">
                      <input
                        {...register("sortBy")}
                        type="radio"
                        name="sortBy"
                        value="views_count"
                        className="w-4 h-4 accent-black"
                      />
                      <label htmlFor="" className="font-medium text-gray-700">
                        Views
                      </label>
                    </div>
                    <div className=" flex items-center space-x-1">
                      <input
                        {...register("sortBy")}
                        type="radio"
                        name="sortBy"
                        value="likes_count"
                        className="w-4 h-4 accent-black"
                      />
                      <label htmlFor="" className="font-medium text-gray-700">
                        Likes
                      </label>
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold">Sort Order:</h3>
                  <div className="flex flex-wrap items-center gap-4">
                    <div className=" flex items-center space-x-1">
                      <input
                        {...register("sortOrder")}
                        type="radio"
                        name="sortOrder"
                        value="asc"
                        className="w-4 h-4 accent-black"
                      />
                      <label className="font-medium text-gray-700">Ascending</label>
                    </div>
                    <div className=" flex items-center space-x-1">
                      <input
                        {...register("sortOrder")}
                        type="radio"
                        name="sortOrder"
                        value=""
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
                  onClick={reset}
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

export default ManageBlogsFilterBox;

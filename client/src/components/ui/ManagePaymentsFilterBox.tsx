"use client";
import { EPaymentMethod, EPaymentStatus } from "@/types/payment.type";
import { getSearchParamsToString } from "@/utils/func";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { IoFilterOutline } from "react-icons/io5";

function ManagePaymentsFilterBox() {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const [error, setError] = useState<Record<string, string>>({});

  const defaultValues = {
    startDate: searchParams.get("startDate") || "",
    endDate: searchParams.get("endDate") || "",
    minAmount: searchParams.get("minAmount") || "",
    maxAmount: searchParams.get("maxAmount") || "",
    status: searchParams.get("status") || "",
    method: searchParams.get("type") || "",
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
    if (values.minAmount || values.maxAmount) {
      let minAmount;
      let maxAmount;
      if (!isNaN(parseInt(values.minAmount))) {
        minAmount = parseInt(values.minAmount);
      }
      if (!isNaN(parseInt(values.maxAmount))) {
        maxAmount = parseInt(values.maxAmount);
      }
      if (minAmount && maxAmount) {
        if (minAmount > maxAmount)
          return setError({
            amount: "Min amount can not be getter than max amount",
          });
      }
    }
    const acceptableParamsName = [
      "startDate",
      "endDate",
      "minAmount",
      "maxAmount",
      "status",
      "method",
      "sortBy",
      "sortOrder",
    ];

    const stringParams = getSearchParamsToString(searchParams, values, acceptableParamsName, {
      disableReset: false,
    });
    router.push(pathname + "?" + stringParams);
    setIsOpen(false);
  };

  const status = Object.values(EPaymentStatus);
  const method = Object.values(EPaymentMethod);
  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="px-4 py-2 md:w-fit w-full bg-gray-50 hover:bg-primary_color hover:text-white flex items-center shadow justify-between  font-jost rounded-full"
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
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold">Amount:</h3>
                  <div className="grid grid-cols-2 gap-5">
                    <div className="space-y-2  flex flex-col">
                      <label htmlFor="" className="font-medium">
                        Min:
                      </label>
                      <input
                        type="number"
                        {...register("minAmount")}
                        id=""
                        className="px-2  py-3 border-2 rounded-md outline-none"
                      />
                    </div>
                    <div className="space-y-2 flex flex-col">
                      <label htmlFor="" className="font-medium">
                        Max:
                      </label>
                      <input
                        type="number"
                        {...register("maxAmount")}
                        id=""
                        className="px-2 py-3 border-2 rounded-md outline-none"
                      />
                    </div>
                  </div>
                  {error.amount && <p className="text-red-500">{error.amount}</p>}
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
                    {status.map((item) => (
                      <div key={item} className=" flex items-center space-x-1">
                        <input
                          type="radio"
                          {...register("status")}
                          value={item}
                          className="w-4 h-4 accent-black"
                        />
                        <label htmlFor="" className="font-medium text-gray-700">
                          {item}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold">Method:</h3>
                  <div className="flex flex-wrap items-center gap-4">
                    <div className=" flex items-center space-x-1">
                      <input
                        type="radio"
                        {...register("method")}
                        value=""
                        className="w-4 h-4 accent-black"
                      />
                      <label htmlFor="" className="font-medium text-gray-700">
                        Any
                      </label>
                    </div>
                    {method.map((item) => (
                      <div key={item} className=" flex items-center space-x-1">
                        <input
                          type="radio"
                          {...register("status")}
                          value={item}
                          className="w-4 h-4 accent-black"
                        />
                        <label htmlFor="" className="font-medium text-gray-700">
                          {item}
                        </label>
                      </div>
                    ))}
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
                        defaultChecked
                        className="w-4 h-4 accent-black"
                      />
                      <label className="font-medium text-gray-700">Date</label>
                    </div>
                    <div className=" flex items-center space-x-1">
                      <input
                        {...register("sortBy")}
                        type="radio"
                        name="sortBy"
                        value="amount"
                        className="w-4 h-4 accent-black"
                      />
                      <label htmlFor="" className="font-medium text-gray-700">
                        Amount
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
                  type="reset"
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

export default ManagePaymentsFilterBox;

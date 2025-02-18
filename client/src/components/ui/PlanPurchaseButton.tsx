"use client";
import { IComment } from "@/types/comment.type";
import React, { useEffect, useRef, useState } from "react";
import { FaRegCommentDots } from "react-icons/fa";
import { MdModeEdit } from "react-icons/md";
import successToast from "../toast/SuccessToast";
import errorToast from "../toast/ErrorToast";
import { useUpdateCommentMutation } from "@/redux/features/comment/comment.api";
import { subscribePlan } from "@/services/subscription.service";

interface IProps {
  planId: number;
}

const PlanPurchaseButton = ({ planId }: IProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const [errorMessage, setErrorMessage] = useState("");
  const [selectedMethodIndex, setSelectedMethodIndex] = useState<number | null>(null);

  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
  }, [isOpen]);

  const paymentMethods = [
    {
      name: "SSLCommerze",
      logoUrl: "/images/ssl-logo.png",
      value: "SSLCommerz",
    },
    {
      name: "Stripe",
      logoUrl: "/images/stripe-logo.png",
      value: "Stripe",
    },
  ];

  const handleSubscribePlan = async () => {
    try {
      if (!planId) throw new Error("Plan ID is required.");

      const method = paymentMethods[selectedMethodIndex ?? 0]?.value;
      if (!method) throw new Error();
      const payload = { plan_id: planId, method };
      const res = await subscribePlan(payload);

      if (!res?.success) throw new Error(res?.message || "Subscription failed.");

      const paymentUrl = res.data?.paymentUrl;
      if (!paymentUrl) throw new Error("Payment URL is missing.");

      window.location.href = paymentUrl;

      setTimeout(() => {
        window.location.href = window.location.origin;
      }, 10_000);
    } catch (error: any) {
      const errorMsg = error?.message || "An unexpected error occurred.";
      errorToast(errorMsg);
      setErrorMessage(errorMsg);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="px-8 py-5 bg-blue-600 hover:bg-primary_color duration-75 text-white rounded-md"
      >
        Subscribe
      </button>
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed h-full w-full inset-0   bg-primary_color bg-opacity-40 flex items-center justify-center z-50 p-2"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="lg:w-1/3 md:w-1/2 w-full p-5 space-y-5 min-h-60 bg-white rounded-md"
          >
            <h1 className="text-2xl font-semibold font-jost">Chose Payment Method:</h1>
            <div className=" grid grid-cols-2 gap-4 ">
              {paymentMethods.map((method, index) => (
                <div
                  onClick={() => setSelectedMethodIndex(index)}
                  key={method.value}
                  className={`p-3  flex justify-center items-center rounded-md ${selectedMethodIndex === index ? " border-2 border-secondary_color" : "border"} hover:cursor-pointer`}
                >
                  <img src={method.logoUrl} alt="" />
                </div>
              ))}

              {errorMessage && <p className="mt-1 text-red-500">{errorMessage}</p>}
            </div>
            <div>
              <button
                onClick={handleSubscribePlan}
                disabled={selectedMethodIndex === null}
                className="w-full py-2 bg-primary_color disabled:bg-gray-500 rounded-md text-white"
              >
                Go To Pay
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PlanPurchaseButton;

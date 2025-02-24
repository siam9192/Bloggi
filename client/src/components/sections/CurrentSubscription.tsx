"use client";
import { useGetMyCurrentSubscriptionQuery } from "@/redux/features/subscription/subscription.api";
import React from "react";
import CountdownTimer from "../ui/CountDownTimer";

const CurrentSubscription = () => {
  const { data, isLoading } = useGetMyCurrentSubscriptionQuery(undefined);
  const currentSubscription = data?.data;

  const timeLeft = CountdownTimer({ targetDate: currentSubscription?.end_at });
  const startAt = currentSubscription?.start_at;
  const endAt = currentSubscription?.end_at;

  if (isLoading) {
    return <div className="mt-4  rounded-xl p-6 h-60 bg-gray-300 animate-pulse"></div>;
  }

  if (!isLoading && !currentSubscription) {
    return (
      <div className="mt-4 p-6 text-center h-52  flex justify-center items-center flex-col gap-2  text-gray-600 bg-gray-50 border rounded-xl">
        <p className="text-lg font-medium">You don’t have an active subscription.</p>
      </div>
    );
  }

  return (
    <div className="mt-4 border rounded-xl p-6 bg-gray-50">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-bold text-gray-900">{currentSubscription?.plan.name}</h3>
        <p>
          Status: <span className="text-blue-500">Active</span>
        </p>
      </div>

      <div className="mt-6 flex flex-col items-center text-center">
        <p className="text-gray-600">Ends In</p>
        <p className="text-4xl font-bold text-blue-600 mt-1">{timeLeft?.days} Days</p>
        <p className="mt-1 text-gray-700">
          <span className="text-blue-600"> {timeLeft?.hours}</span> hours {timeLeft?.minutes}{" "}
          minutes {timeLeft?.seconds} seconds
        </p>
      </div>

      {startAt && endAt ? (
        <div className="mt-6 flex justify-between text-gray-600 text-sm">
          <p>
            <span className="font-medium">Started At:</span> {new Date(startAt).toDateString()}-
            {new Date(startAt).toLocaleTimeString()}
          </p>
          <p>
            <span className="font-medium">Expire At:</span> {new Date(endAt).toDateString()}-
            {new Date(endAt).toLocaleTimeString()}
          </p>
        </div>
      ) : null}
    </div>
  );
};

export default CurrentSubscription;

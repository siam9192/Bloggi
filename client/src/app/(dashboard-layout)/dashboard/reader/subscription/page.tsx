import CurrentSubscription from "@/components/sections/CurrentSubscription";
import Pricing from "@/components/sections/Pricing";
import { useGetMyCurrentSubscriptionQuery } from "@/redux/features/subscription/subscription.api";
import React from "react";

const page = () => {
  return (
    <div className="md:p-10 p-5  mt-10 bg-white">
      <div className="md:text-3xl text-xl font-medium text-primary_color flex items-center gap-2">
        <h1>My Subscription</h1>
      </div>

      <CurrentSubscription />
      <Pricing />
    </div>
  );
};

export default page;

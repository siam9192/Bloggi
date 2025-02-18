import React from "react";
import PricingCard from "../cards/PricingCard";
import { getPlans } from "@/services/plan.service";

const Pricing = async () => {
  const res = await getPlans();
  if (!res.success || !res.data) throw new Error(res?.message || "Something went wrong!");
  const plans = res.data;
  return (
    <div className="my-14 grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5">
      {plans.map((plan, index) => (
        <PricingCard plan={plan} key={"plan-" + (index + 1)} />
      ))}
    </div>
  );
};

export default Pricing;

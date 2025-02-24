"use client";
import { EPlanFeatureStatus, IPlan } from "@/types/plan.type";
import React from "react";
import { MdCheck } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import PlanPurchaseButton from "../ui/PlanPurchaseButton";

interface IProps {
  plan: IPlan;
  disableButton?: boolean;
}

const PricingCard = ({ plan, disableButton }: IProps) => {
  return (
    <div className="p-5 bg-white space-y-4 font-jost  shadow rounded-md">
      <div className="space-y-3">
        <h1 className="text-4xl font-semibold text-primary_color">{plan.name}</h1>
        <p className="text-[0.9rem] text-gray-600">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus ipsum ex asperiores
          repudiandae eius exercitationem mollitia officiis velit harum. Ipsam.
        </p>
        <h1 className="text-4xl text-primary_color font-bold">
          ${plan.price}/<span className="text-xl text-blue-500">{plan.validity_days} Days</span>
        </h1>
        {!plan.is_active ? (
          <PlanPurchaseButton disabled={disableButton} planId={plan.id} />
        ) : (
          <button disabled className="px-6 py-3 rounded-md bg-primary_color text-white">
            Already activate
          </button>
        )}
      </div>

      <div className="mt-5 space-y-2">
        <h3 className="text-xl font-medium">Features</h3>
        <ul className="space-y-2">
          {plan.features.map((feature, index) => (
            <li key={index} className="flex items-center gap-2">
              {feature.status === EPlanFeatureStatus.Included ? (
                <span className="text-2xl text-green-600">
                  <MdCheck />
                </span>
              ) : (
                <span className="text-2xl text-red-600">
                  <RxCross2 />
                </span>
              )}
              <p className="text-gray-700">{feature.name}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PricingCard;

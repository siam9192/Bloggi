import { IPayment } from "@/types/payment.type";
import { EPlanDiscountType, IPlan } from "@/types/plan.type";
import React from "react";
import { HiOutlineDotsVertical } from "react-icons/hi";

interface IProps {
  plan: IPlan;
}

const ManagePlanTableCard = ({ plan }: IProps) => {
  const created = new Date(plan.created_at);
  const updated = new Date(plan.updated_at);
  const createdStr = `${created.toDateString()}-${created.toLocaleTimeString()}`;
  const updateStr = `${updated.toDateString()}-${updated.toLocaleTimeString()}`;
  return (
    <tr>
      <td className="px-6 py-4 text-primary_color text-[0.9rem]">
        <span className="text-blue-500 font-medium">#</span>
        {plan.id}
      </td>
      <th
        scope="row"
        className="px-6 py-4 flex items-center gap-2 font-medium text-gray-900 whitespace-nowrap dark:text-white"
      >
        {plan.name}
      </th>
      <td className="px-6 py-4 text-green-600 font-semibold">{plan.price}</td>
      <td className="px-6 py-4 text-primary_color">
        {plan.discount}
        {plan.discount_type === EPlanDiscountType.Percentage ? "%" : null}
      </td>

      <td className="px-6 py-4 text-primary_color space-y-2 ">{plan.validity_days}</td>
      <td className="px-6 py-4 text-primary_color space-y-2 ">{plan.status}</td>
      <td className="px-6 py-4 text-primary_color space-y-2 ">{plan._count.subscriptions}</td>
      <td className="px-6 py-4 text-primary_color">{createdStr}</td>
      <td className="px-6 py-4 text-primary_color">{updateStr}</td>
      <td className="px-6 py-4 flex items-center gap-2 text-primary_color">
        <button className="p-2 bg-blue-50 rounded-md text-primary_color hover:text-blue-500">
          <HiOutlineDotsVertical />
        </button>
      </td>
    </tr>
  );
};

export default ManagePlanTableCard;

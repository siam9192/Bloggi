import { IPayment } from "@/types/payment.type";
import React from "react";

interface IProps {
  payment: IPayment;
}

const ManagePaymentTableCard = ({ payment }: IProps) => {
  const created = new Date(payment.created_at);
  const createdStr = `${created.toDateString()}-${created.toLocaleTimeString()}`;

  return (
    <tr>
      <td className="px-6 py-4 text-primary_color text-[0.9rem]">
        <span className="text-blue-500 font-medium">#</span>
        {payment.transaction_id}
      </td>
      <th
        scope="row"
        className="px-6 py-4 flex items-center gap-2 font-medium text-gray-900 whitespace-nowrap dark:text-white"
      >
        {payment.amount}
      </th>
      <td className="px-6 py-4 text-green-600 font-semibold">{payment.status}</td>
      <td className="px-6 py-4 text-primary_color">{payment.method}</td>
      <td className="px-6 py-4 text-primary_color">{createdStr}</td>
      <td className="px-6 py-4 text-primary_color space-y-2 ">
        <img
          src={
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQoFRQjM-wM_nXMA03AGDXgJK3VeX7vtD3ctA&s"
          }
          className="size-10 rounded-full "
          alt=""
        />
        <h2>{"Siam Hasan"}</h2>
      </td>
      <td className="px-6 py-4 flex items-center gap-2 text-primary_color">
        <button className="p-2 bg-blue-50 rounded-md text-primary_color hover:text-blue-500">
          Refund
        </button>
      </td>
    </tr>
  );
};

export default ManagePaymentTableCard;

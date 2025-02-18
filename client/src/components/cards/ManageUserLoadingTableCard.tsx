import React from "react";

const ManageUserLoadingTableCard = () => {
  return (
    <tr className="animate-pulse">
      <td className="px-6 py-8">
        <div className="h-4 w-6 bg-gray-300 rounded"></div>
      </td>
      <td className="px-6 py-8 flex items-center gap-2">
        <div className="size-10 bg-gray-300 rounded-full"></div>
        <div className="h-4 w-24 bg-gray-300 rounded"></div>
      </td>
      <td className="px-6 py-8">
        <div className="h-4 w-32 bg-gray-300 rounded"></div>
      </td>
      <td className="px-6 py-8">
        <div className="h-4 w-20 bg-gray-300 rounded"></div>
      </td>
      <td className="px-6 py-8">
        <div className="h-4 w-28 bg-gray-300 rounded"></div>
      </td>
      <td className="px-6 py-8">
        <div className="h-8 w-24 bg-gray-300 rounded"></div>
      </td>
      <td className="px-6 py-8 flex items-center gap-2">
        <div className="h-8 w-20 bg-gray-300 rounded"></div>
        <div className="h-8 w-10 bg-gray-300 rounded"></div>
      </td>
    </tr>
  );
};

export default ManageUserLoadingTableCard;

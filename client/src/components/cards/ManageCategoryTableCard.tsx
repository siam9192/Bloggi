import { EBlogStatus, IBlog } from "@/types/blog.type";
import { ICategory } from "@/types/category.type";
import React from "react";
import { AiOutlineDelete } from "react-icons/ai";
interface IProps {
  category: ICategory;
}
const ManageCategoryTableCard = ({ category }: IProps) => {
  const createdAt = new Date(category.created_at);
  const createdStr = `${createdAt.toDateString()}-${createdAt.toLocaleTimeString()}`;

  return (
    <tr>
      <td className="px-6 py-4 text-primary_color text-[0.9rem]">
        <span className="text-blue-500 font-medium">#</span>
        {category.id}
      </td>
      <th
        scope="row"
        className="px-6 py-4 flex flex-col gap-2  font-medium text-gray-900 whitespace-nowrap max-w-[300px] dark:text-white  text-wrap"
      >
        <img src={category.image_url} className="h-40 w-52 rounded-md" alt="" />
        <div className="space-y-2">
          <h1 className="text-xl font-medium font-jost ">{category.name}</h1>
          <p className="text-[0.8rem] text-gray-700">{category.hierarchyString}</p>
        </div>
      </th>
      <td className="px-6 py-4 text-primary_color  font-bold">{category.name}</td>

      <td className="px-6 py-4 text-primary_color space-y-2">
        <p className="text-primary_color">Created:{createdStr}</p>
      </td>

      <td className="px-6 py-4 flex items-center gap-2 text-primary_color">
        <button className=" text-red-600">Delete</button>
      </td>
    </tr>
  );
};

export default ManageCategoryTableCard;

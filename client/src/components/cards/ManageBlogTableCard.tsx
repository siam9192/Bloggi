import { EBlogStatus, IBlog } from "@/types/blog.type";
import React from "react";
import { AiOutlineDelete } from "react-icons/ai";
interface IProps {
  blog: IBlog;
}
const ManageBlogTableCard = ({ blog }: IProps) => {
  const publishDate = new Date(blog.publish_date);
  const publishDateStr = `${publishDate.toDateString()}-${publishDate.toLocaleTimeString()}`;
  const createdAt = new Date(blog.created_at);
  const createdStr = `${createdAt.toDateString()}-${createdAt.toLocaleTimeString()}`;

  return (
    <tr>
      <td className="px-6 py-4 text-primary_color text-[0.9rem]">
        <span className="text-blue-500 font-medium">#</span>
        {blog.id}
      </td>
      <th
        scope="row"
        className="px-6 py-4 flex flex-col gap-2  font-medium text-gray-900 whitespace-nowrap dark:text-white max-w-[400px] text-wrap"
      >
        <img src={blog.featured_image} className="h-52 rounded-md" alt="" />
        <div className="space-y-2">
          <h1 className="text-xl font-medium font-jost ">{blog.title}</h1>
          <p className="text-[0.8rem] text-gray-700">{blog.short_description}</p>
        </div>
      </th>
      <td className="px-6 py-4 text-primary_color">{blog.category.name}</td>
      <td className="px-6 py-4 text-primary_color ">
        {blog.status === EBlogStatus.Scheduled ? (
          <p className="px-4 py-2 bg-pink-50 rounded-full text-pink-600">{blog.status}</p>
        ) : (
          <p className="px-4 py-2 bg-green-50 rounded-full text-green-600">{blog.status}</p>
        )}
      </td>
      <td className="px-6 py-4 text-primary_color space-y-2">
        <p className="text-primary_color">Created:{publishDateStr}</p>
        <p className="text-primary_color">Published:{publishDateStr}</p>
        <p className="text-primary_color">Updated:{publishDateStr}</p>
      </td>

      <td className="px-6 py-4 text-primary_color space-y-2">
        <img
          src={
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQoFRQjM-wM_nXMA03AGDXgJK3VeX7vtD3ctA&s"
          }
          className="size-10 rounded-full mx-auto"
          alt=""
        />
        <h2>{blog.author.full_name}</h2>
      </td>
      <td className="px-6 py-4 flex items-center gap-2 text-primary_color">
        <button className=" text-red-600">Delete</button>
      </td>
    </tr>
  );
};

export default ManageBlogTableCard;

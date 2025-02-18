import { defaultImageUrl } from "@/utils/constant";
import React, { use } from "react";
import { SlOptionsVertical } from "react-icons/sl";
import UserActions from "../ui/UserActions";
import { EUserRole, EUserStatus, IUser } from "@/types/user.type";

interface IProps {
  user: IUser;
}

const ManageUserTableCard = ({ user }: IProps) => {
  const profile = user.profile!;

  const fullName = [profile.first_name, profile.last_name].join(" ");

  const joinDate = new Date(user.join_date);
  const joinDateStr = `${joinDate.toDateString()}-${joinDate.toLocaleTimeString()}`;

  return (
    <tr>
      <td className="px-6 py-4 text-primary_color text-[0.9rem]">
        <span className="text-blue-500 font-medium">#</span>
        {user.id}
      </td>
      <th
        scope="row"
        className="px-6 py-4 flex items-center gap-2 font-medium text-gray-900 whitespace-nowrap dark:text-white"
      >
        <img
          src={profile.profile_photo || defaultImageUrl.author}
          className="size-10 rounded-full"
          alt=""
        />
        <span>{fullName}</span>
      </th>
      <td className="px-6 py-4 text-primary_color">{user.email}</td>
      <td className="px-6 py-4 text-primary_color">{user.role}</td>
      <td>{joinDateStr}</td>
      <td className="px-6 py-4">
        {user.status === EUserStatus.Blocked ? (
          <div className="flex items-center gap-2 bg-pink-50 py-2 px-4 rounded-full w-fit">
            <div className="size-2 bg-pink-500 rounded-full" />
            <p className="text-red-500 font-medium">Blocked</p>
          </div>
        ) : (
          <div className="flex items-center gap-2 bg-green-50 py-2 px-4 rounded-full w-fit">
            <div className="size-2 bg-green-600 rounded-full" />
            <p className="text-green-600 font-medium">Active</p>
          </div>
        )}
      </td>
      <td className="px-6 py-4 flex items-center gap-2 text-primary_color">
        <button className="p-2 bg-gray-50 text-primary_color hover:text-blue-500">
          View Profile
        </button>
        <UserActions status={user.status} userId={user.id} />
      </td>
    </tr>
  );
};

export default ManageUserTableCard;

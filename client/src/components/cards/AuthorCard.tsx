import { IAuthorShortProfile } from "@/types/user.type";
import Link from "next/link";
import React from "react";
import AuthorFollowToggleButton from "../ui/AuthorFollowToggleButton";

interface IProps {
  author: IAuthorShortProfile;
}

function AuthorCard({ author }: IProps) {
  return (
    <div className="p-3 border hover:bg-secondary_color  hover:scale-90 hover:border-none transition-all duration-100 ease-linear bg-white">
      <img src={author.profile_photo} alt="" className="rounded-full size-32 mx-auto" />
      <div className="mt-3 space-y-2">
        <h3 className="text-xl font-bold font-jost text-center ">{author.full_name}</h3>
        <h4 className="text-center">
          <span className="text-red-600 font-medium">{author._count.followers}</span> Follower
        </h4>
      </div>
      <Link href={""}>
        <button className="mt-3 bg-blue-600 w-full py-2 text-white font-jost rounded-full">
          View Profile
        </button>
      </Link>
      <AuthorFollowToggleButton authorId={author.id} followingStatus={author.is_following} />
    </div>
  );
}

export default AuthorCard;

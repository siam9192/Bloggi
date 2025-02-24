"use client";
import { Author } from "@/types/blog.type";
import React, { useState } from "react";
import AuthorFollowToggleButton from "./AuthorFollowToggleButton";

interface IProps {
  author: Author;
}

const BlogAuthor = ({ author }: IProps) => {
  const [totalFollowers, setTotalFollowers] = useState(author.followers_count);

  const handelOnFollow = () => setTotalFollowers((prev) => prev + 1);

  const handelOnUnFollow = () => setTotalFollowers((prev) => prev - 1);

  return (
    <div className="px-5 py-10  bg-[#F5F9FA] space-y-3">
      <p className="text-gray-500 uppercase">Author</p>
      <div className=" mt-2 flex items-center gap-2">
        <img src={author.profile_photo} className="size-16 rounded-full" alt="" />
        <div className="space-y-1">
          <h2>{author.full_name}</h2>
          <p className="text-[0.9rem] font-medium text-gray-600">{totalFollowers} Followers</p>
        </div>
      </div>
      <AuthorFollowToggleButton
        onFollow={handelOnFollow}
        onUnFollow={handelOnUnFollow}
        followButtonClassName="px-4 py-2 w-full bg-primary_color text-white"
        unFollowButtonClassName="px-4 py-2 w-full bg-red-500 text-white "
        followingStatus={author.is_following}
        authorId={author.id}
      />
    </div>
  );
};

export default BlogAuthor;

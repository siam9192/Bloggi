import { changeFollowerStatus, unFollowAuthor } from "@/services/follower.service";
import { IFollowingAuthor } from "@/types/follower.type";
import Link from "next/link";
import React from "react";
import errorToast from "../toast/ErrorToast";
import { useUnFollowAuthorMutation } from "@/redux/features/follower/follower.api";

interface IProps {
  followingAuthor: IFollowingAuthor;
}

const FollowingAuthorCard = ({ followingAuthor }: IProps) => {
  const [unFollowFn, { isLoading }] = useUnFollowAuthorMutation(undefined);
  const unFollow = async () => {
    try {
      const res = await unFollowFn(followingAuthor.author.id);
      if (!res.data?.success) {
        throw new Error();
      }
    } catch (error) {
      errorToast("Something went wrong");
    }
  };
  return (
    <div className="p-3 border  h-fit  hover:scale-90 hover:border-none transition-all duration-100 ease-linear bg-white">
      <img
        src={followingAuthor.author.profile_photo}
        alt=""
        className="rounded-full size-32 mx-auto"
      />
      <div className="mt-3 space-y-2">
        <h3 className="text-xl font-bold font-jost text-center ">
          {followingAuthor.author.full_name}
        </h3>
        <h4 className="text-center">
          <span className="text-red-600 font-medium">{120}</span> Follower
        </h4>
      </div>
      <Link href={""}>
        <button className="mt-3 bg-blue-600 w-full py-2 text-white font-jost rounded-lg">
          View Profile
        </button>
      </Link>
      <button
        disabled={isLoading}
        onClick={unFollow}
        className="mt-3 bg-red-600 w-full py-2 text-white font-jost rounded-lg"
      >
        Unfollow
      </button>
      {/* <AuthorFollowToggleButton authorId={author.id} followingStatus={author.is_following} /> */}
    </div>
  );
};

export default FollowingAuthorCard;

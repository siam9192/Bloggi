import { changeFollowerStatus } from "@/services/follower.service";
import { EFollowerStatus, IMyFollower } from "@/types/follower.type";
import React from "react";
import errorToast from "../toast/ErrorToast";
import successToast from "../toast/SuccessToast";
import { defaultImageUrl } from "@/utils/constant";

type TProps = {
  follower: IMyFollower;
  refetch?: () => void | any;
};

function FollowerCard({ follower, refetch }: TProps) {
  const changeStatus = async (status: `${EFollowerStatus}`) => {
    try {
      const res = await changeFollowerStatus({
        reader_id: follower.reader_id,
        status,
      });
      if (res.success) {
        successToast(res.message);
      } else throw new Error(res.message || "");
    } catch (error: any) {
      errorToast(error.message);
    }
  };
  return (
    <div className=" md:p-5 p-3 h-fit bg-white space-y-2   font-jost hover:scale-90 duration-75">
      <img
        src={follower.profile_photo || defaultImageUrl.reader}
        className=" md:size-32 size-24 rounded-full mx-auto "
        alt=""
      />
      <div>
        <h1 className=" md:text-xl text-[1rem] text-center font-semibold font-jost text-primary_color">
          {follower.full_name}
        </h1>
        <p className=" text-[0.8rem] text-center mt-1">
          <span className="font-semibold">Since</span>:{" "}
          {new Date(follower.created_at).toDateString()}
        </p>
      </div>
      <div className="text-center">
        {follower.status === EFollowerStatus.Active ? (
          <button
            onClick={() => changeStatus(EFollowerStatus.Blocked)}
            className="w-10/12 py-1 md:text-[0.9rem] text-[0.7rem] bg-red-500 rounded-full text-white"
          >
            Block
          </button>
        ) : (
          <button
            onClick={() => changeStatus(EFollowerStatus.Active)}
            className="w-10/12 py-1 md:text-[0.9rem] text-[0.7rem] bg-green-500 rounded-full text-white"
          >
            Unblock
          </button>
        )}
      </div>
    </div>
  );
}

export default FollowerCard;

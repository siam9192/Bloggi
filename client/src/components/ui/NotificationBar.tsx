import React from "react";
import { PiBell, PiBellSimpleRinging } from "react-icons/pi";

const NotificationBar = () => {
  return (
    <button className="text-4xl p-2  bg-gray-50  rounded-full relative">
      <PiBell />
      <div className="size-5 flex justify-center items-center bg-red-500 rounded-full absolute  -top-1  right-0 text-[0.6rem] text-white">
        {20}
      </div>
    </button>
  );
};

export default NotificationBar;

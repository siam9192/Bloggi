import React from "react";
import { IconType } from "react-icons";

interface IProps {
  data: {
    title: string;
    count: number;
    icon: IconType;
    color: string;
  };
}

const OverviewCountCard = ({ data }: IProps) => {
  return (
    <div className="bg-white p-5 min-h-44  shadow-xl space-y-2 rounded-[25px] ">
      <div className="flex items-center gap-2">
        <div
          className="w-fit h-fit p-2  rounded-full text-2xl bg-opacity-60"
          style={{ backgroundColor: data.color }}
        >
          <data.icon />
        </div>
        <h1 className=" text-xl font-semibold font-jost">{data.title}</h1>
      </div>
      <h1 className="text-3xl font-bold text-center">{data.count}</h1>
    </div>
  );
};

export default OverviewCountCard;

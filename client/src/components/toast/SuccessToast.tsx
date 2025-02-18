import React from "react";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { GoCheckCircle } from "react-icons/go";
import { toast, ToasterProps } from "sonner";

interface IProps {
  t: any;
  message: string;
}

function SuccessToast({ t, message }: IProps) {
  return (
    <div
      onClick={() => toast.dismiss(t)}
      className=" bg-primary_color text-white p-5 rounded-lg w-full md:min-w-80  shadow-primary flex gap-2 items-center "
    >
      <span className="text-3xl text-green-400">
        <GoCheckCircle />
      </span>
      <span className=" font-medium text-gray-200">{message}</span>
    </div>
  );
}

function successToast(message: string, options?: ToasterProps) {
  if (options && options?.duration) {
    options.duration = 2000;
  }

  toast.custom((t) => <SuccessToast t={t} message={message} />, options);
}

export default successToast;

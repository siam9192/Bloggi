import React from "react";
import { LuAlertTriangle } from "react-icons/lu";
import { toast, ToasterProps } from "sonner";

interface IProps {
  t: any;
  message: string;
}

function ErrorToast({ t, message }: IProps) {
  return (
    <div
      onClick={() => toast.dismiss(t)}
      className=" bg-primary_color text-white p-5 rounded-lg w-full md:min-w-80  shadow-primary flex gap-2 items-center "
    >
      <span className="text-3xl text-warning_color">
        <LuAlertTriangle />
      </span>
      <span className=" font-medium  text-red-600">{message}</span>
    </div>
  );
}

function errorToast(message: string, options?: ToasterProps) {
  if (options && options?.duration) {
    options.duration = 2000;
  }

  toast.custom((t) => <ErrorToast t={t} message={message} />, options);
}

export default errorToast;

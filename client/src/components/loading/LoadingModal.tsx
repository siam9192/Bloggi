import React from "react";

interface IProps {
  message?: string;
}

function LoadingModal({ message }: IProps) {
  return (
    <div className="absolute bg-gray-900 shadow-lg rounded-lg bg-opacity-40 inset-0 w-full h-[100vh] flex justify-center items-center">
      <div className=" w-10/12 md:1/3 lg:w-1/4 min-h-52 bg-dark_color rounded-md flex flex-col justify-center items-center gap-4">
        <div className="w-10 h-10 animate-[spin_1s_linear_infinite] rounded-full border-4 border-r-sky-900 border-sky-400"></div>
        <h2 className="text-xl text-light_text_low_color dark:text-dark_text_low_color font-mono">
          {message || "Loading..."}
        </h2>
      </div>
    </div>
  );
}

export default LoadingModal;

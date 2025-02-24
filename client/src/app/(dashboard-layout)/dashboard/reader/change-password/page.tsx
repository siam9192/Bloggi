import ChangePasswordForm from "@/components/forms/ChangePasswordForm";
import React from "react";

const page = () => {
  return (
    <div className="flex justify-center items-center">
      <div className=" lg:w-1/2 w-full  bg-white md:mt-40 mt-32">
        <ChangePasswordForm />
      </div>
    </div>
  );
};

export default page;

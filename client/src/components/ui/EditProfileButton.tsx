import React, { useState } from "react";
import EditProfileForm from "../forms/EditProfileForm";

const EditProfileButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handelOnSuccess = () => setIsOpen(false);
  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="bg-primary_color text-white px-5 py-2 rounded-md hover:bg-opacity-90 transition"
      >
        Edit Profile
      </button>
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="absolute inset-0  bg-primary_color bg-opacity-40 flex items-center justify-center"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className=" lg:w-1/3 md:w-1/2 w-[90%] p-5   lg:min-h-60 bg-white "
          >
            <EditProfileForm onSuccess={handelOnSuccess} />
          </div>
        </div>
      )}
    </>
  );
};

export default EditProfileButton;

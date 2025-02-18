import React, { useState } from "react";
import CreateAuthorForm from "../forms/CreateAuthorForm";
import CreateStaffForm from "../forms/CreateStaffForm";

export const CreateStaffButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const handelOnSuccess = ()=>setIsOpen(false)
  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="px-4 py-3 border  rounded-md hover:bg-secondary_color"
      >
        Create Staff
      </button>
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="absolute inset-0  bg-primary_color bg-opacity-40 flex items-center justify-center"
        >
          <div onClick={(e) => e.stopPropagation()} className="lg:w-1/3  w-10/12  min-h-52 bg-white">
            <CreateStaffForm  onSuccess={handelOnSuccess}/>
          </div>
        </div>
      )}
    </>
  );
};

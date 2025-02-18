"use client";
import React, { useEffect, useState } from "react";
import { SlOptionsVertical } from "react-icons/sl";

const UserActions = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const nodeManageOptions = document.getElementById("manage-options");
    const handler = (event: MouseEvent) => {
      if (!nodeManageOptions) return;
      const target = event.target;
      if (!nodeManageOptions.contains(target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("click", handler);
    return () => {
      document.removeEventListener("click", handler);
    };
  }, [isOpen]);

  const handelDeleteUser = () => {};

  const handelChangeStatus = () => {};

  return (
    <div className="relative">
      <button onClick={() => setIsOpen(true)}>
        <SlOptionsVertical />
      </button>
      {isOpen && (
        <div
          id="manage-options"
          className=" absolute top-9 right-0  p-5 bg-primary_color text-white z-40 shadow-2xl  rounded-md w-52 h-min-52 space-y-2"
        >
          <button className={`block`}>Block</button>
          <button className={`block text-red-500`}>Delete User</button>
        </div>
      )}
    </div>
  );
};

export default UserActions;

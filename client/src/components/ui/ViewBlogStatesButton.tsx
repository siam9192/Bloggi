"use client";
import React, { ReactNode, useEffect, useState } from "react";
import BlogStates from "./BlogStates";

interface IProps {
  children: ReactNode;
  id: number;
}

const ViewBlogStatesButton = ({ children, id }: IProps) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [isOpen]);

  return (
    <>
      <button onClick={() => setIsOpen(true)}>{children}</button>
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="absolute inset-0  bg-primary_color bg-opacity-40 flex items-center justify-center p-2"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className=" lg:w-[60%] md:w-10/12 w-full  h-[70vh] overflow-y-auto no-scrollbar bg-white rounded-md "
          >
            <BlogStates id={id} />
          </div>
        </div>
      )}
    </>
  );
};

export default ViewBlogStatesButton;

"use client";
import React, { useEffect, useState } from "react";
import { IoFilter } from "react-icons/io5";
import BlogFilterBox from "./BlogFilterBox";

const ResponsiveBlogFilterBox = () => {
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    const sidebar = document.getElementById("blog-filterBox");
    const handler = (event: MouseEvent) => {
      if (!sidebar) return;
      const target = event.target;
      if (!sidebar.contains(target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("click", handler);
    return () => {
      document.removeEventListener("click", handler);
    };
  }, [isOpen]);
  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="text-2xl text-primary_color p-2 border  rounded-md"
      >
        <IoFilter />
      </button>
      {isOpen && (
        <div className="fixed inset-0 z-50 w-full h-full bg-primary_color bg-opacity-40 flex justify-center items-center px-5  ">
          <BlogFilterBox />
        </div>
      )}
    </>
  );
};

export default ResponsiveBlogFilterBox;

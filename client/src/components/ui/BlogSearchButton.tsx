"use client";
import React from "react";
import { LuSearch } from "react-icons/lu";

const BlogSearchButton = () => {
  return (
    <button className="p-2  md:text-3xl text-2xl text-primary_color bg-gray-50 rounded-full">
      <LuSearch />
    </button>
  );
};

export default BlogSearchButton;

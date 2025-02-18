import React, { useState } from "react";
import { IoFilter } from "react-icons/io5";
import BlogFilterBox from "./BlogFilterBox";

const BlogsFilterBoxOpenButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button className="text-2xl text-primary_color p-2 border  rounded-md">
        <IoFilter />
      </button>
      {isOpen && <BlogFilterBox />}
    </>
  );
};

export default BlogsFilterBoxOpenButton;

import React, { useState } from "react";
import CreateAuthorForm from "../forms/CreateAuthorForm";
import CreateStaffForm from "../forms/CreateStaffForm";
import CreateCategoryForm from "../forms/CreateCategoryForm";

const AddCategoryButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const handelOnSuccess = () => setIsOpen(false);
  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="px-4 py-3 border  rounded-md hover:bg-secondary_color"
      >
        Add Category
      </button>
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="absolute inset-0  bg-primary_color bg-opacity-40 flex items-center justify-center"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="lg:w-1/3  md:w-10/12 w-full  min-h-52 bg-white"
          >
            <CreateCategoryForm />
          </div>
        </div>
      )}
    </>
  );
};
export default AddCategoryButton;

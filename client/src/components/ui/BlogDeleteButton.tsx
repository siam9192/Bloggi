import { useDeleteBlogByIdMutation } from "@/redux/features/blog/blog.api";
import React, { ReactNode, useState } from "react";
import { TbAlertSquareRoundedFilled } from "react-icons/tb";
import successToast from "../toast/SuccessToast";
import errorToast from "../toast/ErrorToast";

interface IProps {
  id: number;
  children: ReactNode;
}

const BlogDeleteButton = ({ id, children }: IProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [deleteFn, { isLoading }] = useDeleteBlogByIdMutation();
  const deleteBlog = async () => {
    try {
      const res = await deleteFn(id);
      if (res.data?.success) {
        successToast(res.data.message);
      } else {
        throw new Error(res.data?.message);
      }
    } catch (error: any) {
      errorToast(error.message);
    }
    setIsOpen(false);
  };
  return (
    <>
      <button onClick={() => setIsOpen(true)}>{children}</button>
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className=" bg-primary_color bg-opacity-20 fixed inset-0 flex items-center justify-center"
        >
          <div onClick={(e) => e.stopPropagation()} className="w-1/3 bg-white min-h-60  rounded-md">
            <div className="text-center mt-5 flex justify-center items-center ">
              <span className="text-9xl text-red-500 ">
                <TbAlertSquareRoundedFilled />
              </span>
            </div>
            <div className="mt-2 space-y-2">
              <h1 className="text-2xl font-jost text-primary_color text-center font-semibold">
                Are you sure you want to delete it?
              </h1>
              <p className="text-gray-500 text-center">After delete it can't be recover</p>
            </div>
            <div className="mt-2 text-end">
              <button
                onClick={() => setIsOpen(false)}
                className="px-6 py-3 bg-red-500 hover:bg-red-600 text-white "
              >
                Cancel
              </button>
              <button
                onClick={deleteBlog}
                className="px-6 py-3 bg-green-500 hover:bg-green-600 text-white "
              >
                Delete it
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default BlogDeleteButton;

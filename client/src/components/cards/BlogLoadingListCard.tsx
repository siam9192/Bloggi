import React from "react";

const BlogLoadingListCard = () => {
  return (
    <div className="flex w-full p-4  animate-pulse">
      <div className="w-[40%]   h-52 bg-gray-300 rounded-md"></div>
      <div className="flex-1 ml-4">
        <div className="w-32 h-6 bg-gray-300 rounded"></div>
        <div className="mt-2 w-3/4 h-6 bg-gray-300 rounded"></div>
        <div className="mt-2 w-full h-4 bg-gray-300 rounded"></div>
        <div className="mt-2 w-5/6 h-4 bg-gray-300 rounded"></div>
        <div className="flex items-center mt-3">
          <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
          <div className="ml-2 w-24 h-4 bg-gray-300 rounded"></div>
        </div>
        <div className="mt-2 w-20 h-4 bg-gray-300 rounded"></div>
      </div>
    </div>
  );
};

export default BlogLoadingListCard;

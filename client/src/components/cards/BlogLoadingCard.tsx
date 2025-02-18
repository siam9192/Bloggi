import React from "react";

const BlogLoadingCard = () => {
  return (
    <div className="animate-pulse">
      <div className="h-60 bg-gray-300 rounded-md"></div>
      <div className="mt-4">
        <div className="w-24 h-6 bg-gray-300 rounded"></div>
        <div className="mt-2 w-3/4 h-6 bg-gray-300 rounded"></div>
        <div className="mt-2 w-full h-4 bg-gray-300 rounded"></div>
        <div className="mt-2 w-5/6 h-4 bg-gray-300 rounded"></div>
      </div>
    </div>
  );
};

export default BlogLoadingCard;

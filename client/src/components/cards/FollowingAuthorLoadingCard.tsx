import React from "react";

const FollowingAuthorLoadingCard = () => {
  return (
    <div className="w-64 p-4 bg-white rounded-lg animate-pulse">
      <div className="flex justify-center">
        <div className="w-20 h-20 bg-gray-300 rounded-full"></div>
      </div>
      <div className="mt-4 text-center">
        <div className="h-4 bg-gray-300 rounded w-32 mx-auto"></div>
        <div className="mt-2 h-4 bg-gray-300 rounded w-16 mx-auto"></div>
      </div>
      <div className="mt-4 space-y-2">
        <div className="h-10 bg-blue-400 rounded w-full"></div>
        <div className="h-10 bg-red-400 rounded w-full"></div>
      </div>
    </div>
  );
};

export default FollowingAuthorLoadingCard;

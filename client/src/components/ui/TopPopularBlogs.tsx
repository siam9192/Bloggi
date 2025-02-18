import React from "react";

const TopPopularBlogs = () => {
  const popularPosts = [
    "10 Tips to Boost Your Productivity",
    "The Ultimate Guide to Digital Marketing in 2024",
    "Top 5 AI Tools to Improve Your Workflow",
    "How to Start a Successful Blog from Scratch",
    "The Future of Remote Work: Trends and Predictions",
  ];
  return (
    <div className=" rounded-md shadow  p-5 space-y-4 bg-white">
      {popularPosts.map((post, index) => (
        <div key={index} className="flex gap-3">
          <h1 className="text-3xl font-bold text-blue-950">{index + 1}</h1>
          <div className=" space-y-2 font-jost">
            <h1 className="text-xl font-medium text-blue-950"> {post}</h1>
            <div>
              <p className="text-gray-500 font-semibold uppercase">Food Travel Nov-20-2023</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TopPopularBlogs;

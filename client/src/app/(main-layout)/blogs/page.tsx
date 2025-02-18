import Container from "@/components/container/Container";
import Blogs from "@/components/sections/Blogs";
import Ads from "@/components/ui/Ads";
import BlogFilterBox from "@/components/ui/BlogFilterBox";
import TopPopularBlogs from "@/components/ui/TopPopularBlogs";
import React from "react";

const page = () => {
  return (
    <div className="min-h-screen bg-white ">
      <Container>
        <div className=" px-4 py-5  flex items-center justify-between ">
          <h1 className="text-4xl font-medium">Blogs</h1>
          <p className="font-medium text-gray-500">Home/Blogs</p>
        </div>
        <div className="lg:grid grid-cols-6 gap-5 h-full">
          <div className=" lg:block hidden col-span-2 space-y-10  h-fit ">
            <BlogFilterBox />
            <TopPopularBlogs />
            <Ads />
          </div>
          <div className="col-span-4 ">
            <Blogs />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default page;

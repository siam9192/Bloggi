import AuthorCard from "@/components/cards/AuthorCard";
import Container from "@/components/container/Container";
import DefaultPagination from "@/components/pagination/DefaultPagination";
import BlogFilterBox from "@/components/ui/BlogFilterBox";
import React from "react";

const page = () => {
  return (
    <div className=" min-h-screen py-10">
      <Container className="space-y-10">
        <div className="px-5 py-10 shadow-lg bg-white rounded-md">
          <input
            type="text"
            placeholder="Search by names.."
            className="px-2 py-3 border-2 rounded-md w-1/3  "
          />
        </div>

        <div className=" grid grid-cols-5 gap-5 bg-white p-5 shadow-lg">
          {Array.from({ length: 30 }).map((_, index) => (
            <AuthorCard key={"author" + (index + 1)} />
          ))}
        </div>
        <div>
          <DefaultPagination page={3} limit={8} total={100} />
        </div>
      </Container>
    </div>
  );
};

export default page;

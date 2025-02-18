import React from "react";
import AuthorCard from "../cards/AuthorCard";
import { GoArrowRight } from "react-icons/go";
import { IAuthor, IAuthorShortProfile } from "@/types/user.type";
import { getPopularAuthors } from "@/services/author.service";

async function OurAuthors() {
  let authors: IAuthorShortProfile[];

  try {
    const res = await getPopularAuthors();
    if (!res.success) throw new Error();
    authors = res.data as IAuthorShortProfile[];
  } catch (error) {
    return <h1>Something went wrong</h1>;
  }
  return (
    <div className="py-20">
      <h1 className="text-3xl md:text-4xl font-jost font-extrabold text-center">Our Authors</h1>
      <p className="w-1/2 text-center mx-auto text-[0.9rem] mt-2">
        Meet our talented team of writers, industry experts, and passionate storytellers. Each
        author brings unique insights, expertise, and creativity to deliver engaging and informative
        content. Explore their work and get inspired!
      </p>
      <div className="mt-10 grid lg:grid-cols-6 md:grid-cols-3  grid-cols-2 md:gap-5 gap-10 ">
        {authors?.map((author, index) => (
          <AuthorCard author={author} key={"author-" + (index + 1)} />
        ))}
      </div>
      <div className="mt-10 flex justify-center">
        <button className="text-3xl px-6 py-2 hover:rounded-lg transition-all duration-100 ease-in-out hover:scale-90 flex items-center gap-1">
          <span className="text-xl font-medium font-mono">View All</span>
          <GoArrowRight />
        </button>
      </div>
    </div>
  );
}

export default OurAuthors;

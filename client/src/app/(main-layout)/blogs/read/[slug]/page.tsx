import Container from "@/components/container/Container";
import { BlogComments } from "@/components/sections/BlogComments";
import RelatedBlogs from "@/components/sections/RelatedBlogs";
import Ads from "@/components/ui/Ads";
import BlogContent from "@/components/ui/BlogContent";
import PremiumContentMessage from "@/components/ui/PremiumContentMessage";
import { getBlogBySlugForRead } from "@/services/blog.service";
import React from "react";
import { AiOutlineDislike, AiOutlineLike } from "react-icons/ai";
import { BsBookmark } from "react-icons/bs";
import { PageProps } from "../../../../../../.next/types/app/layout";
import "@/styles/BlogContent.css";
import BlogReactions from "@/components/sections/BlogReactions";
const page = async ({ params }: PageProps) => {
  const tags = [
    "blogging",
    "content-creation",
    "SEO",
    "writing-tips",
    "digital-marketing",
    "audience-engagement",
  ];

  let blog;
  let slug;
  try {
    slug = (await params).slug;
    const res = await getBlogBySlugForRead(slug);
    if (!res.success) {
      throw new Error(res.message);
    }
    blog = res.data;
  } catch (error) {}

  if (!blog) return;

  //   return <PremiumContentMessage/>
  return (
    <div className="min-h-screen md:px-5 px-2 md:py-10 py-5 bg-white">
      <Container>
        <div className="text-center space-y-4">
          <h1 className="lg:text-5xl md:text-4xl text-3xl font-semibold md:w-10/12 mx-auto">
            {blog.title}
          </h1>
          <div className="flex md:justify-center items-center gap-3 flex-wrap">
            {blog.tags.map((tag, index) => (
              <p
                key={"tag-" + (index + 1)}
                className=" w-fit md:px-6 px-4 py-2 text-[0.8rem] rounded-full text-primary_color border-secondary_color border-2 hover:bg-primary_color hover:text-white duration-100 cursor-pointer"
              >
                {tag.name}
              </p>
            ))}
          </div>
        </div>
        <div className="mt-14">
          <img src={blog.featured_image} alt="" className="w-full h-full" />
          <BlogReactions
            blogId={blog.id}
            count={{ likes: blog.likes_count, dislikes: blog.dislikes_count }}
            reactionType={blog.reaction_type}
            isBookmarked={blog.is_bookmarked || false}
          />
        </div>
        <div className="mt-14 lg:grid grid-cols-7 lg:flex-none flex flex-col  gap-5 ">
          <div className=" lg:col-span-1 lg:order-1 order-2">
            <h1 className="text-2xl font-semibold mb-2">Ads</h1>
            <Ads />
          </div>
          <div className=" lg:col-span-4 lg:order-2 order-1">
            <BlogContent content={blog.content} />
          </div>
          <div className="lg:col-span-2 space-y-5  order-3">
            <div className="p-5  bg-[#F5F9FA] space-y-3">
              <h3 className="text-gray-700 font-semibold text-[0.9rem] ">DETAILS</h3>
              <div className="flex justify-between items-center ">
                <h3 className="text-gray-700 font-semibold text-[0.9rem] ">DATE</h3>
                <h3 className="text-gray-700 font-semibold text-[0.9rem] ">
                  {new Date().toLocaleString()}
                </h3>
              </div>
              <div className="flex justify-between items-center ">
                <h3 className="text-gray-700 font-semibold text-[0.9rem] ">CATEGORY</h3>
                <h3 className="text-gray-700 font-semibold text-[0.9rem] uppercase ">
                  {blog.category.name}
                </h3>
              </div>
              <div className="flex justify-between items-center ">
                <h3 className="text-gray-700 font-semibold text-[0.9rem] uppercase ">Readers</h3>
                <h3 className="text-gray-700 font-semibold text-[0.9rem] ">{blog.views_count}</h3>
              </div>
            </div>
            <div className="px-5 py-10  bg-[#F5F9FA] space-y-3">
              <p className="text-gray-500 uppercase">Author</p>
              <div className=" mt-2 flex items-center gap-2">
                <img src={blog.author.profile_photo} className="size-16 rounded-full" alt="" />
                <div className="space-y-1">
                  <h2>{blog.author.full_name}</h2>
                  <p className="text-[0.9rem] font-medium text-gray-600">
                    {blog.author.followers_count} Followers
                  </p>
                </div>
              </div>
              <button className="px-4 py-2 w-full bg-primary_color text-white  ">Follow</button>
            </div>
          </div>
        </div>
        <div className="mt-14 space-y-10">
          <BlogComments blogId={blog.id} />
          <RelatedBlogs slug={slug} />
        </div>
      </Container>
    </div>
  );
};

export default page;

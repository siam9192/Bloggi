import BlogPostForm from "@/components/forms/BlogPostForm";
import React from "react";

function page() {
  return (
    <div className="py-5 h-[90%]">
      <div className="h-full">
        <BlogPostForm />
      </div>
    </div>
  );
}

export default page;

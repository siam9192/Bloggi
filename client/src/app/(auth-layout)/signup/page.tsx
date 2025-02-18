import SignupForm from "@/components/forms/SignupForm";
import Logo from "@/components/ui/Logo";
import React from "react";

function page() {
  return (
    <div className="p-10 bg-white h-full">
      <div className="space-y-4">
        <Logo />
        <h1 className="text-3xl font-jost font-semibold text-primary_color">Welcome to Blogi</h1>
        <p className="text-[0.9rem] text-gray-600">
          Sign up today and become a part of our vibrant blogging community.
          {/* Share your thoughts,
          express your creativity, and connect with like-minded individuals. Whether you're a
          seasoned writer or just starting out, our platform provides the perfect space to publish,
          explore, and engage. */}
        </p>
      </div>
      <div className="mt-5">
        <SignupForm />
      </div>
    </div>
  );
}

export default page;

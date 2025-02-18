import LoginForm from "@/components/forms/LoginForm";
import Logo from "@/components/ui/Logo";
import React from "react";

function page() {
  return (
    <div className="md:py-32 md:px-20 py-10 px-5 bg-white h-full">
      <div className="space-y-4">
        <Logo />
        <h1 className="text-3xl font-jost font-semibold text-primary_color">Welcome Back Again!</h1>
        <p className="text-[0.9rem] text-gray-600">
          Log in to your account and start sharing your thoughts with the world. Stay connected,
          engage with your readers, and explore amazing blogs from our community.
        </p>
      </div>
      <div className="mt-5">
        <LoginForm />
      </div>
    </div>
  );
}

export default page;

import Link from "next/link";
import React from "react";
interface IProps {
  textColor?: string;
}
function Logo({ textColor }: IProps) {
  return (
    <Link href="/" className="flex items-center gap-2  w-fit">
      <img src="/images/logo.png" alt="" className=" size-10 md:size-14 rounded-full bg-white" />
      <h1
        className={`text-2xl md:text-3xl font-extrabold font-jost ${textColor ? "text-" + textColor : "text-primary_color"}`}
      >
        Blogi
      </h1>
    </Link>
  );
}

export default Logo;

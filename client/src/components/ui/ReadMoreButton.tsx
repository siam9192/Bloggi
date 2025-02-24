"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import PremiumContentAlertMessage from "./PremiumContentAlertMessage";
import { useCurrentUser } from "@/provider/CurrentUserProvider";
import { EUserRole } from "@/types/user.type";

interface IProps {
  slug: string;
  is_premium: boolean;
  authorId: number;
}

const ReadMoreButton = ({ slug, is_premium, authorId }: IProps) => {
  const { user, profile } = useCurrentUser();
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const handelNavigate = () => {
    if (is_premium && user?.role === EUserRole.Reader) return setIsOpen(true);
    if (user?.role === EUserRole.Author && profile?.id !== authorId) return setIsOpen(true);
    return router.push(`/blogs/read/${slug}`);
  };
  return (
    <>
      <button
        onClick={handelNavigate}
        className="px-6 py-2  rounded-md bg-primary_color text-white"
      >
        Read More..
      </button>
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className=" bg-primary_color bg-opacity-20 fixed inset-0 flex items-center justify-center w-full p-2 z-[1000]"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="lg:w-1/3 md:w-1/3 w-full bg-white min-h-60  rounded-md"
          >
            <PremiumContentAlertMessage />
          </div>
        </div>
      )}
    </>
  );
};

export default ReadMoreButton;

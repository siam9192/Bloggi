"use client";
import { logout } from "@/services/auth.service";
import { useRouter } from "next/navigation";
import React from "react";
import { CiLogout } from "react-icons/ci";

const LogoutButton = () => {
  const router = useRouter();
  const handelLogout = async () => {
    await logout();
    router.push("/");
  };
  return (
    <button
      onClick={handelLogout}
      className="flex items-center gap-2 text-xl text-red-700 font-medium"
    >
      <span className="text-3xl">
        <CiLogout />
      </span>
      <span>Logout</span>
    </button>
  );
};

export default LogoutButton;

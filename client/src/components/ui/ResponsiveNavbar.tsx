"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { CgMenuLeftAlt } from "react-icons/cg";
import { FaBlogger, FaRegUser } from "react-icons/fa";
import { FcAbout } from "react-icons/fc";
import { IoHomeOutline, IoPricetagsOutline } from "react-icons/io5";
import Logo from "./Logo";
import { LuLogIn } from "react-icons/lu";
import { useCurrentUser } from "@/provider/CurrentUserProvider";
import { usePathname } from "next/navigation";

const ResponsiveNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, profile } = useCurrentUser();
  const pathname = usePathname();
  useEffect(() => {
    const sidebar = document.getElementById("responsive-navbar");
    const handler = (event: MouseEvent) => {
      if (!sidebar) return;
      const target = event.target;
      if (!sidebar.contains(target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("click", handler);
    return () => {
      document.removeEventListener("click", handler);
    };
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
  }, [isOpen]);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const basicRoutes = [
    {
      name: "Home",
      icon: IoHomeOutline,
      href: "/",
    },
    {
      name: "Blogs",
      icon: FaBlogger,
      href: "/blogs",
    },
    {
      name: "Pricing",
      icon: IoPricetagsOutline,
      href: "/pricing",
    },
    {
      name: "About",
      icon: FcAbout,
      href: "/about",
    },
  ];
  const authRoutes = [
    {
      name: "Login",
      icon: LuLogIn,
      href: "/login",
    },
    {
      name: "Signup",
      icon: FaRegUser,
      href: "/signup",
    },
  ];

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="text-3xl text-primary_color p-2 border rounded-full lg:hidden "
      >
        <CgMenuLeftAlt />
      </button>

      <div
        className={`fixed w-full h-full top-0  bg-primary_color bg-opacity-30  ${isOpen ? "left-0" : "-left-[200%]"} duration-150 z-50  `}
      >
        <div id="responsive-navbar" className="h-full w-10/12 bg-white p-5 relative">
          <div className=" flex justify-between items-center">
            <Logo />
            {user && (
              <div className="flex items-center gap-2">
                <h3 className="font-bold font-jost">
                  <span className="text-blue-600">Hi,</span> {profile?.first_name}
                </h3>
                <Link href={`/dashboard/${user?.role.toLocaleLowerCase()}`}>
                  <img
                    className="size-12 rounded-full  border-2 border-primary_color"
                    src={
                      "https://img.freepik.com/free-photo/young-bearded-man-with-striped-shirt_273609-5677.jpg?semt=ais_hybrid"
                    }
                    alt=""
                  />
                </Link>
              </div>
            )}
          </div>
          <div className="mt-10 space-y-5">
            {basicRoutes.map((route) => (
              <Link href={route.href} key={route.href} className="block">
                <div className="flex   items-center gap-2">
                  <span className="text-2xl p-2 bg-blue-50 rounded-full">{<route.icon />}</span>
                  <span className="text-[18px] font-semibold">{route.name}</span>
                </div>
              </Link>
            ))}
            {!user &&
              authRoutes.map((route) => (
                <Link href={route.href} key={route.href} className="block">
                  <div className="flex   items-center gap-2">
                    <span className="text-2xl p-2 bg-blue-50 rounded-full">{<route.icon />}</span>
                    <span className="text-[18px] font-semibold">{route.name}</span>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default ResponsiveNavbar;

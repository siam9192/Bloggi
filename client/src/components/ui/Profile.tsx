"use client";
import { useCurrentUser } from "@/provider/CurrentUserProvider";
import React from "react";
import EditProfileButton from "./EditProfileButton";

const Profile = () => {
  const { user, profile } = useCurrentUser();
  return (
    <div className="mx-auto grid md:grid-cols-2 gap-10 bg-white shadow-lg rounded-xl p-5">
      {/* Profile Details Section */}
      <div className="">
        <div className="p-10 space-y-5">
          <h1 className="text-2xl font-semibold text-primary_color">My Profile</h1>
          <div className="md:hidden  ">
            <img
              src={profile?.profile_photo}
              alt="Profile"
              className="w-40 h-40 mx-auto rounded-full border-4 border-primary_color object-cover"
            />
          </div>
          <div>
            <h2 className="text-xl font-medium">Name:</h2>
            <p className="text-gray-600">{[profile?.first_name, profile?.last_name].join(" ")}</p>
          </div>

          <div>
            <h2 className="text-xl font-medium">Email:</h2>
            <p className="text-gray-600">{user?.email}</p>
          </div>

          <div>
            <h2 className="text-xl font-medium">Phone:</h2>
            <p className="text-gray-600">N/A</p>
          </div>

          <div>
            <h2 className="text-xl font-medium">Address:</h2>
            <p className="text-gray-600">N/A</p>
          </div>
        </div>
        <div className="mt-5">
          <EditProfileButton />
        </div>
      </div>

      {/* Profile Image Section */}
      <div className=" md:block hidden   md:flex items-center justify-center">
        <div className="relative">
          <img
            src={profile?.profile_photo}
            alt="Profile"
            className="w-40 h-40 rounded-full border-4 border-primary_color object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default Profile;

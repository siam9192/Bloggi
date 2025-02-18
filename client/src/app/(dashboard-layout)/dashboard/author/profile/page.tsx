"use client";
import ChangeAuthorProfilePhoto from "@/components/ui/ChangeAuthorProfilePhoto";
import EditAuthorProfile from "@/components/ui/EditAuthorProfile";
import ProfileImageCropper from "@/components/ui/ProfileImageCropper";
import { useCurrentUser } from "@/provider/CurrentUserProvider";
import { ESocialPlatform } from "@/types/user.type";
import React, { CSSProperties, useState } from "react";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";
import { FaLinkedin, FaSquareInstagram } from "react-icons/fa6";
import { MdEdit } from "react-icons/md";

function page() {
  const { user, isLoading } = useCurrentUser();
  const [isReadMore, setIsReadMore] = useState(false);

  const backgroundImageStyle = (url: string): CSSProperties => {
    return {
      backgroundImage: `url(${url})`,
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
      backgroundSize: "cover",
    };
  };

  const profile = user?.author;
  const bio = profile?.bio;

  const socialLinks = profile?.social_links;

  const socialIcon: any = {
    Facebook: <FaFacebook />,
    Twitter: <FaTwitter />,
    Instagram: <FaInstagram />,
    Linkedin: <FaLinkedin />,
  };

  const aboutMe =
    (bio && bio.length > 200 ? (isReadMore ? bio : bio.slice(200) + "...") : bio) || null;
  if (isLoading || !profile) return <></>;
  return (
    <div className=" p-3 mt-3 bg-white shadow">
      <div className="lg:grid grid-cols-8">
        <div className=" col-span-6 space-y-10">
          {/* Cover image */}
          <div
            className="md:h-72 h-60 rounded-[20px]"
            style={backgroundImageStyle(
              "https://t3.ftcdn.net/jpg/04/92/48/38/360_F_492483827_1ZroF5jdz8ZvYlpsjT90Hb3kxytJ9AQI.jpg",
            )}
          />

          <div className="px-5 pb-5  border-b border-gray-400 border-opacity-35">
            <div>
              <div className="flex md:flex-row flex-col justify-between items-center ">
                <div className="flex md:flex-row flex-col  gap-5">
                  <ChangeAuthorProfilePhoto url={profile?.profile_photo} />
                  <div className="space-y-2">
                    <h1 className=" md:text-4xl text-2xl font-jost font-bold">
                      {profile?.first_name + " " + profile?.last_name}
                    </h1>
                    <p className="text-gray-800">Our verified author</p>
                  </div>
                </div>

                <div></div>
              </div>
              <div className="mt-3 flex items-center gap-4 ">
                {Object.keys(socialIcon).map((key) => {
                  const link = socialLinks?.find((item) => item.platform === key);
                  return link ? (
                    <a
                      key={key}
                      href={link.url}
                      className="text-3xl text-primary_color p-2 bg-gray-100 rounded-full hover:text-red-500"
                    >
                      {socialIcon[key]}
                    </a>
                  ) : (
                    <button
                      disabled
                      key={key}
                      className="text-3xl text-primary_color p-2 bg-gray-100 rounded-full hover:text-red-500 disabled:text-gray-600"
                    >
                      {socialIcon[key]}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold font-jost">About Me:</h3>
            <p className="text-[0.9rem] mt-2" onClick={() => setIsReadMore(false)}>
              {aboutMe}
            </p>
            {bio && bio.length > 200 ? (
              <button onClick={() => setIsReadMore(true)} className="text-blue-700 font-medium">
                Read more..
              </button>
            ) : null}
          </div>
        </div>

        <div className="col-span-2  px-10 py-5  lg:block hidden">
          <EditAuthorProfile />
          <button className=" mt-2 w-full py-3 bg-primary_color  text-white font-bold rounded-md">
            View Posts
          </button>
          <button className="mt-2 w-full py-3 bg-blue-700 text-white font-bold rounded-md">
            View Followers
          </button>
        </div>

        <button className="fixed right-5 bottom-10 p-3 bg-blue-600 hover:bg-blue-700 hover:scale-90 text-white text-2xl rounded-full lg:hidden block">
          <MdEdit />
        </button>
      </div>
    </div>
  );
}

export default page;

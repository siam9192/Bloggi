"use client";
import React, { useEffect, useState } from "react";
import { IoSaveOutline } from "react-icons/io5";
import AddSocialLink from "./AddSocialLink";
import UpdateSocialLink from "./UpdateSocialLink";
import { useCurrentUser } from "@/provider/CurrentUserProvider";
import { ESocialPlatform, ISocialLink } from "@/types/user.type";
import { getFormValues } from "@/utils/func";
import LoadingPopup from "../popup/LoadingPopup";
import { updateMyProfile } from "@/services/profile.service";
import successToast from "../toast/SuccessToast";
import errorToast from "../toast/ErrorToast";

function EditAuthorProfile() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { user, isLoading, refetch } = useCurrentUser();
  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const author = user?.author;
  const [socialLinks, setSocialLinks] = useState<
    (ISocialLink & { is_deleted?: boolean; is_new_added?: boolean })[]
  >(author?.social_links || []);

  useEffect(() => {
    if (author) {
      setSocialLinks(author?.social_links || []);
    }
  }, [user]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [isOpen]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const target = event.currentTarget; // More precise than event.target
    const values = getFormValues(target, ["first_name", "last_name", "bio"]);
    const payload = {
      ...values,
      social_links: socialLinks,
    };

    try {
      setError(null); //Reset error
      setIsUpdating(true);
      const res = await updateMyProfile(payload);
      if (res?.success) {
        successToast(res.message);
        setIsOpen(false);
        refetch();
      } else throw new Error(res?.message);
    } catch (error: any) {
      errorToast(error.message || "Something went wrong");
    } finally {
      setIsUpdating(false);
    }
  };

  const onSocialLinkUpdate = (url: string, platform: `${ESocialPlatform}`) => {
    const socialLink = socialLinks.find((socialLink) => socialLink.platform === platform);
    if (socialLink) {
      const array = socialLinks;
      const index = array.indexOf(socialLink);
      array[index].url = url;
      setSocialLinks([...array]);
    }
  };

  const onSocialLinkDelete = (platform: `${ESocialPlatform}`) => {
    const socialLink = socialLinks.find((socialLink) => socialLink.platform === platform);

    if (socialLink) {
      const array = socialLinks;
      const index = array.indexOf(socialLink);
      array[index].is_deleted = true;
      setSocialLinks([...array]);
    }
  };

  const onAddNewSocialLink = (value: { platform: `${ESocialPlatform}`; url: string }) => {
    const arr = [...socialLinks, { ...value, is_new_added: true }];
    setSocialLinks(arr);
  };

  const handelClose = () => {
    if (!isLoading) {
      setIsOpen(false);
    }
  };

  const existPlatforms = socialLinks
    .filter((ele) => ele.is_deleted === undefined)
    .map((ele) => ele.platform);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="w-full py-3 bg-pink-600 text-white font-bold rounded-md"
      >
        Edit
      </button>
      {isOpen && (
        <div
          onClick={handelClose}
          className="absolute inset-0  bg-primary_color bg-opacity-40 flex items-center justify-center"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className=" lg:w-1/2  md:w-[80%] w-[90%] bg-white min-h-60 md:p-5 p-3 "
          >
            <h1 className="text-2xl font-semibold font-jost ">Edit Profile</h1>
            <form className="mt-5" onSubmit={handleSubmit} action="">
              <div className="mt-10 space-y-3">
                <div className="grid grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="" className="font-semibold text-black mb-1">
                      First Name:
                    </label>
                    <input
                      name="first_name"
                      type="text"
                      defaultValue={author?.first_name}
                      min={3}
                      max={20}
                      required
                      className="p-3 bg-gray-50 border w-full rounded-md"
                    />
                  </div>
                  <div>
                    <label htmlFor="" className="font-semibold text-black mb-1">
                      Last Name:
                    </label>
                    <input
                      name="last_name"
                      type="text"
                      defaultValue={author?.last_name}
                      min={3}
                      max={20}
                      required
                      className="p-3 bg-gray-50 border w-full rounded-md"
                    />
                  </div>
                </div>
                <div>
                  <div>
                    <label htmlFor="" className="font-semibold text-black mb-1 ">
                      Bio:
                    </label>
                    <textarea
                      name="bio"
                      id=""
                      defaultValue={author?.bio}
                      required
                      className="w-full min-h-52 max-h-62 bg-gray-50 border rounded-md resize-none p-2"
                    ></textarea>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold font-jost">Social Links:</h3>
                    <div className="flex items-center flex-wrap gap-2 mt-2">
                      {socialLinks
                        .filter((item) => item.is_deleted == false || item.is_deleted === undefined)
                        .map((link) => {
                          return (
                            <UpdateSocialLink
                              onDelete={onSocialLinkDelete}
                              onUpdate={onSocialLinkUpdate}
                              key={"link-" + link.platform}
                              link={link}
                            />
                          );
                        })}
                      <AddSocialLink onAdd={onAddNewSocialLink} existPlatforms={existPlatforms} />
                    </div>
                  </div>
                </div>
              </div>
              <button
                type="submit"
                className=" md:px-4 md:py-3 p-2 bg-primary_color rounded-md hover:scale-90 duration-75 text-white border mt-5 float-right flex items-center gap-1"
              >
                <span>
                  <IoSaveOutline />
                </span>{" "}
                <span className="">Save Changes</span>
              </button>
            </form>
          </div>
        </div>
      )}
      <LoadingPopup status={isUpdating} />
    </>
  );
}

export default EditAuthorProfile;

import { ESocialPlatform, ISocialLink } from "@/types/user.type";
import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import { FaFacebook, FaInstagramSquare, FaLinkedin, FaTwitter } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";

interface IProps {
  link: ISocialLink;
  onUpdate: (url: string, platform: `${ESocialPlatform}`) => any | void;
  onDelete: (platform: `${ESocialPlatform}`) => void | any;
}

const socialIcon = {
  Facebook: <FaFacebook />,
  Twitter: <FaTwitter />,
  Instagram: <FaInstagramSquare />,
  Linkedin: <FaLinkedin />,
};

function UpdateSocialLink({ link, onUpdate, onDelete }: IProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const icon = socialIcon[link.platform as "Facebook" | "Instagram" | "Twitter" | "Linkedin"];
  const urlInputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [isOpen]);

  const handelDelete = (e: any) => {
    e.stopPropagation();
    onDelete(link.platform);
  };

  // document.onSele

  const handelUpdate = () => {
    const urlInput = urlInputRef.current;
    setError("");
    try {
      if (!urlInput) {
        throw new Error();
      }

      const value = urlInput.value;
      const pattern = /^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(:\d+)?(\/[^\s]*)?$/;
      if (link.url === value) {
        throw new Error("Please change something");
      } else if (value && pattern.test(value)) {
        onUpdate(value, link.platform);
        setIsOpen(false);
      } else {
        throw new Error("Enter a valid url");
      }
    } catch (err: any) {
      setError(err?.message || "Something went wrong");
    }
  };
  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        key={link.platform}
        className="flex items-center gap-2 border p-2 relative"
      >
        <span className="md:text-2xl text-xl">{icon}</span>
        <span className="md:text-xl text-[0.9rem]">{link.platform}</span>
        <span
          onClick={handelDelete}
          className="text-[0.9rem] absolute top-0 right-0 hover:bg-red-600"
        >
          <RxCross2 />
        </span>
      </button>
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="absolute inset-0  bg-primary_color bg-opacity-40 flex items-center justify-center"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="lg:w-1/4 md:w-1/2 w-10/12 bg-white min-h-60 p-5 "
          >
            <div>
              <div className="space-y-4">
                <h2 className="text-2xl font-medium">{link.platform}</h2>
                <div>
                  <label htmlFor="url">Account URL:</label>
                  <input
                    ref={urlInputRef}
                    id="url"
                    name="url"
                    type="text"
                    defaultValue={link.url}
                    required
                    placeholder="URL"
                    className="px-2 py-3 w-full border rounded-md bg-gray-50 mt-2"
                  />
                </div>
              </div>
              <button
                onClick={handelUpdate}
                type="button"
                className="px-4 py-2 bg-blue-600 text-white mt-5 float-right"
              >
                Add
              </button>
              {error ? <p className="text-red-600 mt-1">{error}</p> : null}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default UpdateSocialLink;

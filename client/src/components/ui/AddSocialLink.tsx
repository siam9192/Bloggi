import { ESocialPlatform, ISocialLink } from "@/types/user.type";
import React, { useEffect, useRef, useState } from "react";
import { FaPlus } from "react-icons/fa";

interface IProps {
  onAdd: (value: ISocialLink) => void | any;
  existPlatforms: string[];
}

function AddSocialLink({ onAdd, existPlatforms }: IProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const selectPlatformRef = useRef<HTMLSelectElement | null>(null);
  const urlRef = useRef<HTMLInputElement | null>(null);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [isOpen]);

  const platforms = Object.values(ESocialPlatform).filter(
    (ele) => typeof ele === "string" && !existPlatforms.includes(ele),
  );

  const totalPlatforms = Object.values(ESocialPlatform).filter(
    (ele) => typeof ele === "string",
  ).length;

  const handelAdd = () => {
    const selectPlatform = selectPlatformRef.current;
    const url = urlRef.current;
    if (selectPlatform && url) {
      const value = {
        platform: selectPlatform.value as `${ESocialPlatform}`,
        url: url.value,
      };
      onAdd(value);
      setIsOpen(false);
    } else {
      if (!selectPlatform || !selectPlatform.value) {
        setError("Platform is required");
      } else {
        setError("URL is required");
      }
    }
  };
  return (
    <>
      {totalPlatforms !== existPlatforms.length ? (
        <button
          onClick={() => setIsOpen(true)}
          type="button"
          className=" text-xl md:text-xl p-2 rounded-full bg-black text-white"
        >
          <FaPlus />
        </button>
      ) : null}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="absolute inset-0  bg-primary_color bg-opacity-40 flex items-center justify-center"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="  lg:w-1/4 md:w-1/2 w-10/12 bg-white min-h-60 p-5 "
          >
            <div>
              <div className="space-y-4">
                <div>
                  <label htmlFor="name">Select Social Media:</label>
                  <select
                    ref={selectPlatformRef}
                    id="name"
                    name="name"
                    required
                    className="w-full p-2 border rounded-md bg-gray-50 mt-2"
                  >
                    {platforms.map((platform) => (
                      <option key={platform} value={platform}>
                        {platform}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="url">Account URL:</label>
                  <input
                    ref={urlRef}
                    id="url"
                    name="url"
                    type="text"
                    required
                    placeholder="URL"
                    className="px-2 py-3 w-full border rounded-md bg-gray-50 mt-2"
                  />
                </div>
              </div>
              <button
                onClick={handelAdd}
                type="button"
                className="px-4 py-2 bg-blue-600 text-white mt-5 float-right"
              >
                Add
              </button>
              {error ? <p className="mt-1 text-red-500">{error}</p> : null}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default AddSocialLink;

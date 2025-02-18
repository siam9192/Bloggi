"use client";
import React, { ChangeEvent, FC, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { IoCloudUploadOutline } from "react-icons/io5";
import GalleryImage from "./GalleryImage";
import { uploadFile } from "@/cloudinary";
import { useImages } from "./ImageProvider";
interface IProps {
  onClose: (state: any) => void;
  onSelect?(src: string): void;
  visible: boolean;
}
const ImageGallery: FC<IProps> = ({ visible, onClose, onSelect }) => {
  const [isUploading, setIsUploading] = useState(false);
  const image = useImages();
  const images = image?.images;
  const updateImages = image?.updateImages;

  const handelClose = () => {
    onClose(false);
  };

  const fileInputOnChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length) {
      setIsUploading(true);
      try {
        const formData = new FormData();
        formData.append("file", files[0]);
        const res = await uploadFile(formData);
        if (res && updateImages) {
          updateImages([res.secure_url]);
        }
      } catch (error) {
        console.log(error);
      }

      setIsUploading(false);
    }
  };

  const handelSelection = (image: string) => {
    onSelect && onSelect(image);
    handelClose();
  };

  const uploadingCount = 1;
  if (!visible) return null;
  return (
    <div
      tabIndex={-1}
      onKeyDown={({ key }) => {
        if (key === "Escape") handelClose();
      }}
      className="fixed inset-0  bg-primary_color bg-opacity-40 flex items-center justify-center z-50"
    >
      <div className=" md:w-[80%]  w-10/12 h-[80%]  rounded-md p-4 overflow-y-auto bg-white  relative no-scrollbar">
        <button type="button" onClick={handelClose} className="absolute right-2 top-2">
          <IoMdClose size={24} />
        </button>
        <div className="mt-5">
          <div className="flex items-center justify-center w-full">
            <label
              htmlFor="dropzone-file"
              className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50"
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <IoCloudUploadOutline size={32} />
                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                  <span className="font-semibold">Click to upload</span> or drag and drop
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  SVG, PNG, JPG or GIF (MAX. 800x400px)
                </p>
              </div>
              <input
                id="dropzone-file"
                type="file"
                accept="image/*"
                onChange={fileInputOnChange}
                className="hidden"
              />
            </label>
          </div>

          {images?.length ? (
            <p className="p-4 text-center font-semibold text-gray-400">No images to render...</p>
          ) : null}
          <div className="grid md:grid-cols-4 grid-cols-2 gap-4">
            {isUploading &&
              [...Array(uploadingCount)].map((_, index) => (
                <div
                  key={"uploading-" + (index + 1)}
                  className=" md:h-60  animate-pulse  bg-gray-200"
                />
              ))}
            {images?.map((item, index) => {
              return (
                <GalleryImage onSelectClick={handelSelection} key={"image-" + index} src={item} />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageGallery;

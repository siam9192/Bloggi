import React, { CSSProperties, useEffect, useRef, useState } from "react";
import Cropper, { ReactCropperElement } from "react-cropper";
import "cropperjs/dist/cropper.css";
import { dataURLtoFile } from "@/utils/func";

interface IProps {
  imageFile: File | null;
  onSave: (file: File) => void | any;
  setStatus: (status: boolean) => void | any;
}

function ProfileImageCropper({ imageFile, onSave, setStatus }: IProps) {
  const cropperRef = useRef<ReactCropperElement>(null);

  const onCrop = () => {
    const cropper = cropperRef.current?.cropper;
    // cropper?.getImageData().aspectRatio
  };

  const handelCancel = () => {
    const cropper = cropperRef.current?.cropper;
    cropper?.clear();
    cropper?.reset();
    setStatus(false);
  };

  const handelSave = async () => {
    const cropper = cropperRef.current?.cropper;
    if (cropper) {
      const url = cropper.getCroppedCanvas().toDataURL();

      // const response = await fetch(url);
      // const blob = await response.blob();
      // const file = new File([blob], "", { type: blob.type });
      const file = dataURLtoFile(url);

      onSave(file);
    }
  };

  const style: CSSProperties = {
    width: "100%",
    height: "100%",
    background: "black",
  };

  const imageUrl = URL.createObjectURL(imageFile as File);

  return (
    <div className="absolute inset-0 bg-primary_color bg-opacity-40 flex justify-center items-center">
      <div className="bg-white  lg:w-1/2 w-10/12  h-[80%]  p-8 rounded-md ">
        <h1 className="text-2xl  font-semibold text-primary_color mb-4 font-jost">
          Crop Profile Image before set
        </h1>
        <Cropper
          src={imageUrl}
          style={style}
          initialAspectRatio={16 / 16}
          aspectRatio={16 / 16}
          guides={false}
          // zoomable={false}
          cropBoxResizable={false}
          crop={onCrop}
          ref={cropperRef}
        />
        <div className="mt-5 flex items-center gap-2 justify-end">
          <button onClick={handelCancel} className="bg-pink-600 text-white px-4 py-2  rounded-md">
            Close
          </button>
          <button
            onClick={handelSave}
            className=" bg-primary_color text-white px-4 py-2  rounded-md"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProfileImageCropper;

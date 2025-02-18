import React, { ChangeEvent, useRef, useState } from "react";
import ProfileImageCropper from "./ProfileImageCropper";
import "@/styles/ChangeProfilePhoto.css";
import { MdCameraswitch } from "react-icons/md";
import axios from "axios";
import errorToast from "../toast/ErrorToast";
import { updateMyProfile } from "@/services/profile.service";
import { toast } from "sonner";
interface IProps {
  url: string;
}
function ChangeAuthorProfilePhoto({ url }: IProps) {
  const [imageCropperIsOpen, setImageCropperIsOpen] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const setImageCropperOpenStatus = (status: boolean) => {
    setImageCropperIsOpen(status);
  };

  const onCroppedImageSave = async (file: File) => {
    setImageFile(file);
    setImageCropperOpenStatus(false);
    setIsLoading(false);
    const toastId = toast.loading("Image is updating...");
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_IMG_BB_UPLOAD_URL}?key=${process.env.NEXT_PUBLIC_IMG_BB_API_KEY}` as string,
        { image: file },
        {
          headers: { "Content-Type": "multipart/form-data" },
        },
      );

      const url = response.data.data.display_url;
      if (!url) throw new Error();
      const res = await updateMyProfile({ profile_photo: url });
      if (!res.success) throw new Error();
    } catch (error) {
      errorToast("Something went wrong!");
      setImageFile(null);
    }
    setIsLoading(false);
    toast.dismiss(toastId);
  };

  const openImageInput = () => {
    const imageInput = imageInputRef.current;
    if (imageInput) {
      imageInput.click();
    }
  };

  const imageInputOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files?.length) return;
    const file = files[0];
    setImageFile(file);
    setImageCropperIsOpen(true);
  };

  const imageUrl = imageFile ? URL.createObjectURL(imageFile) : url;

  return (
    <>
      <div>
        <div
          onClick={openImageInput}
          className="size-40  rounded-full -mt-24 border-2 select-none border-white shadow edit_author_profile_photo_container"
        >
          <img src={imageUrl} alt="" className="w-full h-full  rounded-full" />
          <div className=" text-3xl font-medium flex justify-center items-center text-white edit_author_profile_photo_click_area">
            <MdCameraswitch />
            <input
              ref={imageInputRef}
              onChange={imageInputOnChange}
              type="file"
              accept="image/png, image/gif, image/jpeg,image/jpg"
              className="hidden"
            />
          </div>
        </div>
      </div>
      {imageCropperIsOpen && imageFile ? (
        <ProfileImageCropper
          imageFile={imageFile}
          setStatus={setImageCropperOpenStatus}
          onSave={onCroppedImageSave}
        />
      ) : null}
    </>
  );
}

export default ChangeAuthorProfilePhoto;

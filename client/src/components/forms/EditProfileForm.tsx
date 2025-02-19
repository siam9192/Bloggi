"use client";
import React, { ChangeEvent, useRef, useState } from "react";

import FormInput from "../hook-form/FormInput";
import Form from "../hook-form/Form";
import { useCurrentUser } from "@/provider/CurrentUserProvider";
import { z } from "zod";
import { NameValidationSchema } from "@/utils/validation.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { updateMyProfile } from "@/services/profile.service";
import errorToast from "../toast/ErrorToast";

interface IProps {
  onSuccess?(): void;
}

const EditProfileForm = ({ onSuccess }: IProps) => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [error, setError] = useState<Record<string, string>>({});
  const ref = useRef<HTMLInputElement>(null);
  const { profile, refetch } = useCurrentUser();
  const [isLoading, setIsLoading] = useState(false);

  const handelSubmit = async (values: any) => {
    console.log(values);
    setIsLoading(true);
    try {
      let profile_photo = profile?.profile_photo;
      if (imageFile) {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_IMG_BB_UPLOAD_URL}?key=${process.env.NEXT_PUBLIC_IMG_BB_API_KEY}` as string,
          { image: imageFile },
          {
            headers: { "Content-Type": "multipart/form-data" },
          },
        );
        const url = response.data.data.display_url;
        if (!url) throw new Error();
        profile_photo = url;
      }
      const payload = {
        ...values.name,
        profile_photo,
      };
      console.log(payload);
      const res = await updateMyProfile(payload);
      if (!res.success) throw new Error();
      refetch();
      onSuccess && onSuccess();
    } catch (error) {
      errorToast("Something went wrong!");
      setImageFile(null);
    }
    setIsLoading(false);
  };

  const onImageInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (!files || !files.length) return;
    const file = files[0];
    if (file.size > 5 * 1024 * 1024) {
      return setError({
        profilePhoto: "Image size must be up to 5mb",
      });
    }
    setImageFile(file);
  };

  const defaultValues = {
    
      first_name: profile?.first_name,
      last_name: profile?.last_name,
  
  };

  const validation = z.object({
    first_name: z.string({ required_error: "First Name is required" }).max(15).min(2),
    last_name: z.string({ required_error: "Last Name is required" }).max(15).min(2),
  });

  return (
    <Form onSubmit={handelSubmit} resolver={zodResolver(validation)} defaultValues={defaultValues}>
      <h1 className="text-2xl font-medium">Edit Profile</h1>
      <div className="mt-3 space-y-2">
        <div className="w-fit mx-auto text-center">
          <input onChange={onImageInputChange} type="file" ref={ref} className="hidden" />
          <img
            className="size-32 rounded-full border-2"
            src={imageFile ? URL.createObjectURL(imageFile) : profile?.profile_photo}
            alt="image_cannot_loaded"
          />
          <button
            type="button"
            onClick={() => ref.current && ref.current.click()}
            className="mt-3 px-4 py-2 bg-secondary_color text-primary_color rounded-md"
          >
            Change
          </button>
        </div>
        <FormInput name="first_name" label="First Name*" />
        <FormInput name="last_name" label="Last Name*" />
      </div>
      <div className=" mt-5 text-end">
        <button
          disabled={isLoading}
          type="submit"
          className="px-6 py-3 bg-primary_color text-white"
        >
          Save
        </button>
      </div>
    </Form>
  );
};

export default EditProfileForm;

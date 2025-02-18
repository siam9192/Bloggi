"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { getSearchUrl } from "@/utils/func";
import { IParam } from "@/types/response.type";
import { IRetrieveCategory } from "@/types/category.type";
import FormInput from "../hook-form/FormInput";
import Form from "../hook-form/Form";
import { createAuthor } from "@/services/user.service";
import successToast from "../toast/SuccessToast";
import { zodResolver } from "@hookform/resolvers/zod";
import UserValidations from "@/validations/user.validation";
import FormTextArea from "../hook-form/FormTextarea";
import FormFileInput from "../hook-form/FormFileInput";
import { uploadFile } from "@/cloudinary";
import axios from "axios";

interface IProps {
  onSuccess?: () => void | any;
}

const CreateAuthorForm = ({ onSuccess }: IProps) => {
  const [errorMessage, setErrorMessage] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const roles = ["Admin"];

  const options = roles.map((option) => ({
    name: option,
    value: option,
  }));

  const handelSubmit = async (values: any) => {
    setIsLoading(true);
    setErrorMessage("");

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_IMG_BB_UPLOAD_URL}?key=${process.env.NEXT_PUBLIC_IMG_BB_API_KEY}` as string,
        { image: values.profilePhoto[0] },
        {
          headers: { "Content-Type": "multipart/form-data" },
        },
      );

      const url = response.data.data.display_url;
      if (!url) throw new Error();

      const payload = {
        name: values.name,
        bio: values.bio,
        profile_photo: url,
        email: values.email,
        password: values.password,
      };

      const res = await createAuthor(payload);
      if (res.success) {
        successToast("Author created successfully");
        onSuccess && onSuccess();
      } else throw new Error(res.message);
    } catch (error: any) {
      setErrorMessage(error.message);
    }

    setIsLoading(false);
  };

  return (
    <Form
      onSubmit={handelSubmit}
      resolver={zodResolver(UserValidations.createAuthorValidation)}
      className=" rounded-md shadow  p-5 space-y-4 bg-white"
    >
      <h1 className="text-2xl font-medium text-primary_color">Create Author</h1>

      <div className="grid grid-cols-2 gap-3">
        <FormInput name="name.first_name" label="First Name" />
        <FormInput name="name.last_name" label="Last Name" />
      </div>
      <FormTextArea name="bio" label="Bio" placeholder="Bio.." />
      <FormInput name="email" label="Email" />

      <div>
        <label
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          htmlFor="file_input"
        >
          Upload Profile Photo
        </label>
        <FormFileInput name="profilePhoto" label="Profile Photo" accept="image/*" />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <FormInput name="password" label="Password" />
        <FormInput name="confirmPassword" label="Confirm Password" />
      </div>
      <div>
        <button type="submit" className="px-6 py-3 bg-primary_color text-white  w-full">
          {isLoading ? "Submitting.." : "Submit"}
        </button>
        {errorMessage && <p className="text-red-500 mt-1">{errorMessage}</p>}
      </div>
    </Form>
  );
};

export default CreateAuthorForm;

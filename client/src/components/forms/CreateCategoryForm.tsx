"use client";
import React, { useState } from "react";
import FormInput from "../hook-form/FormInput";
import Form from "../hook-form/Form";
import FormSelect from "../hook-form/FormSelect";
import { zodResolver } from "@hookform/resolvers/zod";
import UserValidations from "@/validations/user.validation";
import { createStaff } from "@/services/user.service";
import successToast from "../toast/SuccessToast";
import SelectCategory from "../ui/SelectCategory";
import FormFileInput from "../hook-form/FormFileInput";

interface IProps {
  onSuccess?: () => void | any;
}

const CreateCategoryForm = ({ onSuccess }: IProps) => {
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
      const payload = {
        name: values.name,
        email: values.email,
        role: values.role,
        password: values.password,
      };

      const res = await createStaff(payload);
      if (res.success) {
        successToast("Staff created successfully");
        onSuccess && onSuccess();
      } else throw new Error();
    } catch (error: any) {
      setErrorMessage(error.message);
    }

    setIsLoading(false);
  };

  return (
    <Form
      onSubmit={handelSubmit}
      defaultValues={{ role: "Admin" }}
      resolver={zodResolver(UserValidations.createStaffValidation)}
      className=" rounded-md shadow  p-5 space-y-4 bg-white"
    >
      <h1 className="text-2xl font-medium text-primary_color">Create Category</h1>

      <FormInput name="name" label="Category Name" />
      <div>
        <label className="  block text-start 0font-medium text-[1rem]">
          Chose Parent Category (optional)
        </label>
        <SelectCategory />
      </div>
      <FormFileInput name="image" accept="image/*" label="Category Image" />

      <div className="text-end">
        <button
          type="submit"
          disabled={isLoading}
          className="px-6 py-3 bg-primary_color text-white  w-full"
        >
          Submit
        </button>
        {errorMessage && <p className="text-red-500">{errorMessage}</p>}
      </div>
    </Form>
  );
};

export default CreateCategoryForm;

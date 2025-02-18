"use client";
import React, { ChangeEvent, useState } from "react";
import Form from "../hook-form/Form";
import FormInput from "../hook-form/FormInput";
import { changePassword } from "@/services/auth.service";
import successToast from "../toast/SuccessToast";
import LoadingPopup from "../popup/LoadingPopup";
import { zodResolver } from "@hookform/resolvers/zod";
import AuthValidations from "@/validations/auth.validation";

const ChangePasswordForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const handelSubmit = async (values: any) => {
    const { newPassword, confirmPassword, oldPassword } = values;
    setErrorMessage("");
    setIsLoading(true);

    try {
      if (newPassword !== oldPassword)
        throw new Error("New Password & Confirm Password does'nt match");
      const payload = {
        newPassword,
        oldPassword,
      };
      const res = await changePassword(payload);
      if (res.success) {
        setIsLoading(false);
        successToast(res.message);
        return true;
      } else throw new Error(res.message);
    } catch (error: any) {
      const message = error.message || "Something went wrong";
      successToast(message);
      setErrorMessage(message);
    }
    setIsLoading(false);
  };

  const type = showPassword ? "text" : "password";

  const handelShowPassword = (e: ChangeEvent<HTMLInputElement>) => {
    setShowPassword(e.currentTarget.checked);
  };

  return (
    <>
      <Form
        reset
        onSubmit={handelSubmit}
        resolver={zodResolver(AuthValidations.changePasswordValidation)}
        className="p-5 shadow-primary rounded-md"
      >
        <h1 className="text-2xl font-medium text-primary_color">Change Password</h1>
        <div className="mt-5 space-y-2">
          <FormInput name="oldPassword" label="Old Password" />
          <FormInput type={type} name="newPassword" label="New Password" />
          <FormInput type={type} name="confirmPassword" label="Confirm Password" />
          <div className="flex items-center gap-2 w-fit ">
            <input
              onChange={handelShowPassword}
              type="checkbox"
              id="showPassword"
              className="w-5 h-5  accent-black "
            />
            <label htmlFor="showPassword">Show Password</label>
          </div>
        </div>
        <button className="mt-3 w-full py-3 bg-primary_color text-white rounded-md hover:bg-gray-900">
          Submit
        </button>
        {errorMessage && <p className="mt-1 text-red-500">{errorMessage}</p>}
      </Form>
      <LoadingPopup status={isLoading} />
    </>
  );
};

export default ChangePasswordForm;

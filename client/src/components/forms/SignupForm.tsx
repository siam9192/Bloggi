"use client";
import React, { ChangeEvent, useState } from "react";
import Form from "../hook-form/Form";
import FormInput from "../hook-form/FormInput";
import Link from "next/link";
import AuthValidations from "@/validations/auth.validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { signup } from "@/services/auth.service";
import SuccessPopup, { ISuccessPopupProps } from "../popup/SuccessPopup";

function SignupForm() {
  const [passwordType, setPasswordType] = useState<"password" | "text">("password");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [successPopupStatus, setSuccessPopupStatus] = useState<boolean>(false);
  const handelSubmit = async (values: any) => {
    // First Reset error and success message
    setErrorMessage(null);
    setSuccessMessage(null);
    setIsLoading(true);
    const { password, confirmPassword } = values;

    try {
      if (password !== confirmPassword) {
        throw new Error("Both password does'nt match");
      }
      const payload = {
        name: values.name,
        email: values.email,
        password,
      };
      const response = await signup(payload);
      if (response.success) {
        setSuccessMessage(response.message);
        setIsLoading(false);
        setSuccessPopupStatus(true);
        // Return true for reset form after success
        return true;
      } else {
        setIsLoading(false);
        throw new Error(response.message);
      }
    } catch (error) {
      setErrorMessage((error as any)?.message || "Something went wrong!");
    }
  };

  const handelShowPassword = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.currentTarget.checked) {
      setPasswordType("text");
    } else {
      setPasswordType("password");
    }
  };

  const changeSuccessPopupStatus = (status: true) => {
    setSuccessPopupStatus(status);
  };

  const successPopupProps: ISuccessPopupProps = {
    status: successPopupStatus,
    message: "Your account created successfully!",
    description: "Now you can login your account from login page",
    setStatus: setSuccessPopupStatus,
  };

  return (
    <>
      <Form
        onSubmit={handelSubmit}
        reset
        resolver={zodResolver(AuthValidations.signupValidationSchema)}
      >
        <div className="space-y-2">
          <FormInput name="name.first_name" label="First Name*" />
          <FormInput name="name.last_name" label="Last Name*" />
          <FormInput name="email" label="Email*" />
          <FormInput name="password" type={passwordType} label="Password*" />
          <FormInput name="confirmPassword" type={passwordType} label="Confirm Password*" />
          <div className="flex items-center gap-2 w-fit float-right">
            <input
              onChange={handelShowPassword}
              type="checkbox"
              id="showPassword"
              className="w-5 h-5  accent-black "
            />
            <label htmlFor="showPassword">Show Password</label>
          </div>
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className="mt-5 w-full py-4 bg-primary_color hover:bg-secondary_color  hover:text-primary_color text-white "
        >
          {isLoading ? "..." : " Signup"}
        </button>
        <div className="mt-2 space-y-1">
          <button type="button">Forget Your Password ?</button>
          <p className="text-end">
            Already Have an Account?
            <Link href="/login" className="text-blue-700 font-medium">
              {""}
              Login
            </Link>
          </p>
          {successMessage ? (
            <p className="text-green-500">{successMessage}</p>
          ) : errorMessage ? (
            <p className="text-red-500">{errorMessage}</p>
          ) : null}
        </div>
      </Form>
      <SuccessPopup {...successPopupProps} />
    </>
  );
}

export default SignupForm;

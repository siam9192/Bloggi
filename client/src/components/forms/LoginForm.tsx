"use client";
import React, { ChangeEvent, useState } from "react";
import Form from "../hook-form/Form";
import FormInput from "../hook-form/FormInput";
import Link from "next/link";
import AuthValidations from "@/validations/auth.validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { login } from "@/services/auth.service";
import { useRouter, useSearchParams } from "next/navigation";

function LoginForm() {
  const [passwordType, setPasswordType] = useState<"password" | "text">("password");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get("redirect");

  const handelSubmit = async (values: any) => {
    // First Reset error and success message
    setErrorMessage(null);
    setSuccessMessage(null);
    setIsLoading(true);

    try {
      const payload = values;
      const response = await login(payload);

      if (response.success) {
        setSuccessMessage(response.message);
        setIsLoading(false);
        router.replace(redirectUrl ? redirectUrl : "/");
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

  return (
    <Form onSubmit={handelSubmit} resolver={zodResolver(AuthValidations.loginValidationSchema)}>
      <div className="space-y-4">
        <FormInput name="email" label="Email*" />
        <FormInput name="password" type={passwordType} label="Password*" />
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
        {isLoading ? "..." : "Login"}
      </button>
      <p className="text-end mt-2">
        Don't Have an Account?
        <Link href="/signup" className="text-blue-700 font-medium">
          {""}
          Signup
        </Link>
      </p>
      {successMessage ? (
        <p className="text-green-500">{successMessage}</p>
      ) : errorMessage ? (
        <p className="text-red-500">{errorMessage}</p>
      ) : null}
    </Form>
  );
}

export default LoginForm;

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


interface IProps {
  onSuccess?:()=>void|any
}

const CreateAuthorForm = ({onSuccess}:IProps) => {
  const [errorMessage,setErrorMessage] = useState('');

  const [isLoading,setIsLoading] =  useState(false)
  
  
    const roles = ["Admin"];
  
    const options = roles.map((option) => ({
      name: option,
      value: option,
    }));
  
    const handelSubmit = async(values: any) => {
      setIsLoading(true)
      setErrorMessage('')
      try {
          const payload = {
              name:values.name,
              email:values.email,
              password:values.password
          }
        
         const res = await createAuthor(payload)
          if(res.success) {
              successToast("Staff created successfully")
             onSuccess && onSuccess()
          }
          else throw  new Error()
         
      } catch (error:any) {
          setErrorMessage(error.message)
      }
      
      setIsLoading(false)
    };
  

  return (
    <Form onSubmit={() => {}} className=" rounded-md shadow  p-5 space-y-4 bg-white">
      <h1 className="text-2xl font-medium text-primary_color">Create Author</h1>
      <div className="grid grid-cols-2 gap-3">
        <FormInput name="first_name" label="First Name" />
        <FormInput name="last_name" label="Last Name" />
      </div>
      <FormInput name="email" label="Email" />
      <FormInput name="password" label="Password" />
      <FormInput name="confirm_password" label="Confirm Password" />
       
      <div >
    
        <button type="submit" className="px-6 py-3 bg-primary_color text-white  w-full">
         Submit
        </button>
      </div>
    </Form>
  );
};

export default CreateAuthorForm;

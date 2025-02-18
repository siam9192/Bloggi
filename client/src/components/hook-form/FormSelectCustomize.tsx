"use client";
import React, { useEffect, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import Select from "../select/Select";

interface IOption {
  display: string;
  value: any;
}
interface IProps {
  defaultOption: IOption;
  options: IOption[];
  onChange?: (value: any) => void | any;
  name: string;
  label: string;
  className?: string;
}

const FormSelect = ({ name, label, className, options, defaultOption, onChange }: IProps) => {
  const {
    formState: { errors, defaultValues },
  } = useFormContext();
  const [value, setValue] = useState<string>(defaultOption.value);
  const error = errors[name]?.message?.toString();

  useEffect(() => {
    if (onChange) {
      onChange(value);
    }
  }, [value]);

  return (
    <Controller
      name={name}
      render={({ field }) => {
        // Set the select value on input

        return (
          <div>
            {label && (
              <label className=" block dark:text-slate-100 font-medium" htmlFor={name}>
                {label}
              </label>
            )}
            <input
              className={
                className ||
                "w-full mt-1 p-2 border-2 hidden  dark:text-slate-100 dark:bg-transparent border-gray-500 dark:border-slate-200 dark:border-opacity-35  font-medium"
              }
              {...field}
              value={value}
            />

            <Select
              defaultOption={defaultOption}
              onChange={(value: any) => {
                field.onChange(value.value);
                setValue(value.value);
              }}
              options={options}
            />
            {error && <p className=" text-red-600 mt-1">{error}</p>}
          </div>
        );
      }}
    />
  );
};

export default FormSelect;

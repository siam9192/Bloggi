import React from "react";
import "@/styles/Checkbox.css";
import { Controller, useFormContext } from "react-hook-form";

interface IProps {
  name: string;
  label: string;
  value: string;
  defaultChecked?: boolean;
}

function FormCheckbox({ name, label, value, defaultChecked }: IProps) {
  const {
    formState: { errors },
  } = useFormContext();

  return (
    <Controller
      name={name}
      render={({ field }) => {
        field.value = value;
        return (
          <div className="checkbox_container w-fit">
            <label>
              <input
                type="radio"
                name="radio"
                value={field.value || value}
                defaultChecked={defaultChecked}
              />
              <span className=" font-semibold">{label}</span>
            </label>
          </div>
        );
      }}
    />
  );
}

export default FormCheckbox;

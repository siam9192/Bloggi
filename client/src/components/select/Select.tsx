"use client";
import React, { useEffect, useState } from "react";
import { RiArrowDropDownLine } from "react-icons/ri";

interface IOption {
  display: string;
  value: any;
}
interface IProps {
  defaultOption: IOption;
  options: IOption[];
  onChange: <T>(value: T) => void | any;
}

const Select = ({ defaultOption, options, onChange }: IProps) => {
  const [isOpen, setOpenStatus] = useState(false);

  const [selectedOption, setSelectedOption] = useState<IOption>(defaultOption);

  useEffect(() => {
    // If is open === true then add overflow hidden style  in body
    if (isOpen) {
      document.body.addEventListener("click", () => {
        setOpenStatus(false);
      });
      return () => {
        document.body.removeEventListener("click", () => {
          setOpenStatus(false);
        });
      };
    }
  }, [isOpen]);

  const selectOption = (option: IOption) => {
    setSelectedOption(option);
    onChange(option);
    setOpenStatus(false);
  };

  useEffect(() => {
    onChange(defaultOption);
  }, []);

  // Replace same option value which match with default option value
  options = [defaultOption, ...options.filter((option) => option.value !== defaultOption.value)];
  return (
    <div className="relative">
      <div
        onClick={(e) => {
          e.stopPropagation();
          setOpenStatus(true);
        }}
        className={
          "w-full mt-2 px-2 py-3 rounded-lg bg-gray-100  dark:bg-dark_color  dark:text-slate-100 dark:bg-dark-light dark:border-opacity-35  font-medium outline-primary-color outline-2 flex justify-between items-center"
        }
      >
        {/* Selected options or default value */}
        <p>{selectedOption.display}</p>
        <span className={`text-xl ${isOpen ? "rotate-180" : "rotate-0"} duration-200`}>
          <RiArrowDropDownLine />
        </span>

        {/* Options */}
        <div
          className={`absolute w-full left-0  mt-72  h-52 overflow-y-auto customize-scroll-bar dark:bg-dark_color shadow-lg rounded-lg z-20 p-3 space-y-3 ${isOpen ? "translate-y-0 visible opacity-100" : "translate-y-5 scale-75 invisible opacity-0"} duration-200  customize-scrollbar `}
        >
          {options.map((option, index) => (
            <button
              onClick={(e) => {
                e.stopPropagation();
                selectOption(option);
              }}
              key={option.display + index.toString()}
              className="block font-medium hover:dark:bg-dark_highlight_color p-2 select-none w-full text-start"
            >
              {option.display}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Select;

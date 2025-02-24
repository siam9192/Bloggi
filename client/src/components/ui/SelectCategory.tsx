"use client";
import { getCategories } from "@/services/category.service";
import { IRetrieveCategory } from "@/types/category.type";
import React, { ChangeEvent, MouseEvent, useEffect, useRef, useState } from "react";
import { BiSolidCategoryAlt } from "react-icons/bi";
import "@/components/loading/Loading.css";
import useBounce from "@/useBounce";
import { LuSearchX } from "react-icons/lu";

interface IOptionsProps {
  word: string;
  inputValue: string;
}
const OptionText = ({ word, inputValue }: IOptionsProps) => {
  const parts = word.split(new RegExp(`(${inputValue})`, "gi"));

  return (
    <p>
      {parts.map((part, index) =>
        part.toLowerCase() === inputValue.toLowerCase() ? (
          <span key={index} className="text-blue-500 font-bold">
            {part}
          </span>
        ) : (
          part
        ),
      )}
    </p>
  );
};

interface IProps {
  defaultValue?: IRetrieveCategory;
  onChange?(value: IRetrieveCategory): void;
}

function SelectCategory({ defaultValue, onChange }: IProps) {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [inputValue, setInputValue] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<IRetrieveCategory | null>(
    defaultValue || null,
  );

  const [categories, setCategories] = useState<IRetrieveCategory[]>([]);

  useEffect(() => {
    const select = selectRef.current;
    if (!select) return;

    const handler = (event: any) => {
      if (!select.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, [isOpen]);

  const value = useBounce(inputValue, 400);

  const handelFetching = async () => {
    setIsLoading(true);
    const params = [
      {
        name: "searchTerm",
        value: value,
      },
    ];
    try {
      const res = await getCategories(params);
      if (res.success) {
        setCategories(res.data || []);
      } else {
        throw new Error(res.message);
      }
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };
  useEffect(() => {
    handelFetching();
  }, [value]);

  const handelOnSelect = (category: IRetrieveCategory) => {
    setSelectedCategory(category);
    setIsOpen(false);
    const input = inputRef.current;
    if (input) {
      input.value = category.hierarchyString;
    }
    onChange && onChange(category);
  };

  return (
    <div ref={selectRef} className="mt-2 relative">
      <div className="flex items-center gap-2 border rounded-md  px-2 py-3 bg-white">
        <span className="text-2xl">
          <BiSolidCategoryAlt />
        </span>
        <input
          ref={inputRef}
          onChange={(e) => {
            setInputValue(e.target.value);
            setSelectedCategory(null);
          }}
          defaultValue={selectedCategory?.hierarchyString}
          onFocus={(e) => {
            const input = inputRef.current;
            if (input) {
              input.removeAttribute("value");
              input.defaultValue = selectedCategory?.hierarchyString || "";
            }
            setIsOpen(true);
          }}
          type="text"
          placeholder="Enter category name.."
          className="w-full border-none outline-none"
        />
        <input
          type="text"
          name="category"
          readOnly
          value={selectedCategory ? JSON.stringify(selectedCategory) : ""}
          className="hidden"
        />
      </div>
      {isOpen && (
        <div className=" absolute  top-14 w-full bg-black rounded-xl max-h-60 overflow-y-scroll  no-scrollbar p-2 z-40">
          {categories
            .filter((category) => selectedCategory?.id !== category.id)
            .map((category) => (
              <button
                onClick={() => handelOnSelect(category)}
                key={category.id}
                className="text-[0.9rem]text-primary_color px-2 py-3 block mt-2 hover:bg-white  hover:text-black text-white w-full text-start rounded-md"
              >
                <OptionText word={category.hierarchyString} inputValue={value} />
              </button>
            ))}
          {value && !isLoading && !categories.length && (
            <div className=" py-5 flex  text-center flex-col justify-center items-center gap-2 ">
              <span className="text-5xl text-white">
                <LuSearchX />
              </span>
              <p className="text-[0.9rem] text-gray-200">No category found</p>
            </div>
          )}
          {isLoading && <div className="text-gray-50">Loading..</div>}
        </div>
      )}
    </div>
  );
}

export default SelectCategory;

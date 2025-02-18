"use client";
import React, { ChangeEvent, ReactNode, use, useEffect, useRef, useState } from "react";
import { IconType } from "react-icons";
import { LuSearchX } from "react-icons/lu";

type TOption = {
  display: string;
  value: any;
};

interface IProps {
  options: TOption[];
  onSelect: (value: any) => void | any;
  onInputFieldChange: (value: string) => void | any;
  isLoading?: boolean;
  icon?: ReactNode;
}

const SearchSelect = ({ options, onSelect, onInputFieldChange, isLoading, icon }: IProps) => {
  const [focus, setFocus] = useState(false);
  const [selected, setSelected] = useState<TOption | null>(null);
  const [keyword, setKeyword] = useState("");

  const ref = useRef<HTMLDivElement>(null);

  const handelSelect = (index: number) => {
    setFocus(false);
    setSelected(options[index].value);
    onSelect(options[index]);
  };

  const handelInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setKeyword(e.target.value);
    onInputFieldChange(e.target.value);
  };

  const regex = new RegExp(`(${keyword})`, "gi");

  useEffect(() => {
    // If the `focus` state is true, execute the following logic
    if (focus) {
      // Define a function to handle the click event
      const fn = (e: any) => {
        // Check if the click target is outside the referenced element
        if (!ref.current?.contains(e.target)) {
          // If the click is outside, set the `focus` state to false
          setFocus(false);
        }
      };

      // Attach the `fn` function to the document's click event
      document.addEventListener("click", fn);

      // Cleanup function to remove the event listener
      return () => {
        document.removeEventListener("click", fn);
      };
    }
    // Empty dependency array ensures this effect only runs once on component mount
  }, [focus]); // Add `focus` as a dependency to reapply the effect when `focus` changes

  return (
    <div ref={ref} className="relative">
      <input
        onFocus={() => setFocus(true)}
        onChange={handelInputChange}
        type="text"
        className="w-full mt-1 px-2 py-3 rounded-lg bg-gray-100  dark:bg-dark_color  dark:text-slate-100 dark:bg-dark-light dark:border-opacity-35  font-medium outline-primary-color outline-2"
      />
      {focus ? (
        <div className="absolute  top-16 rounded-md shadow-xl w-full min-h-32 max-h-60 overflow-y-auto bg-dark_color z-30 p-3 customize-scrollbar">
          {isLoading ? (
            <div>
              <div className="w-10 h-10 animate-[spin_1s_linear_infinite] rounded-full border-4 border-r-sky-900 border-sky-400 mx-auto mt-10"></div>
              <h6 className="dark:text-dark_text_low_color">Searching..</h6>
            </div>
          ) : options.length ? (
            <div className="">
              {options.map((item, index) => (
                <button
                  onClick={() => handelSelect(index)}
                  type="button"
                  key={index}
                  className="w-full text-start py-2 select-none hover:bg-dark_light_color text-white p-2 text-xl flex items-center gap-1"
                >
                  {icon ? (
                    <span className="text-xl dark:text-dark_text_medium_color">{icon}</span>
                  ) : null}
                  <p>
                    {item.display.split(regex).map((part, i) =>
                      keyword && regex.test(part) ? (
                        <span key={part + i} className="text-primary_color">
                          {part}
                        </span>
                      ) : (
                        part
                      ),
                    )}
                  </p>
                </button>
              ))}
            </div>
          ) : (
            <div className="flex justify-center items-center gap-2 h-32 flex-col">
              <span className="text-4xl dark:text-dark_text_medium_color ">
                <LuSearchX />
              </span>
              <h6 className="dark:text-dark_text_low_color">No result found</h6>
            </div>
          )}
        </div>
      ) : null}
    </div>
  );
};

export default SearchSelect;

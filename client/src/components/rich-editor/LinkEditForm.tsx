import React, { FC, useEffect, useState } from "react";
import ToolButton from "./ToolButton";
import { BiLink, BiUnlink } from "react-icons/bi";

interface IProps {
  onSubmit(link: string): void;
  initialLink: string;
}
const LinkEditForm: FC<IProps> = ({ onSubmit, initialLink }) => {
  const [showForm, setShowForm] = useState(false);
  const [link, setLink] = useState<string>("");

  useEffect(() => {
    if (initialLink) setLink(initialLink);
  }, [initialLink]);

  return (
    <div>
      <div className="  z-50 ring-1 ring-black p-2 rounded flex items-center shadow-sm bg-white border-2 border-blue-600  ">
        <input
          onChange={(event) => setLink(event.target.value)}
          type="text"
          onBlur={() => setShowForm(false)}
          placeholder="Enter URL"
          className=" outline-none border-none bg-transparent"
        />
        <button type="button" onMouseDown={() => onSubmit(link)}>
          <BiUnlink />
        </button>
      </div>
    </div>
  );
};

export default LinkEditForm;

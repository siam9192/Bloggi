import React, { FC, useState } from "react";
import ToolButton from "./ToolButton";
import { BiLink } from "react-icons/bi";

interface IProps {
  onSubmit(link: string): void;
}
const LinkForm: FC<IProps> = ({ onSubmit }) => {
  const [showForm, setShowForm] = useState(false);
  const [link, setLink] = useState<string>("");

  return (
    <div>
      <ToolButton onClick={() => setShowForm(true)}>
        <BiLink />
      </ToolButton>

      {showForm && (
        <div className="absolute top-40 z-50 ring-1 ring-black p-2 rounded flex items-center shadow-sm bg-white border-2 border-blue-600">
          <input
            onChange={(event) => setLink(event.target.value)}
            type="text"
            onBlur={() => setShowForm(false)}
            placeholder="Enter URL"
            className=" outline-none border-none bg-transparent"
          />
          <button type="button" onMouseDown={() => onSubmit(link)}>
            ok
          </button>
        </div>
      )}
    </div>
  );
};

export default LinkForm;

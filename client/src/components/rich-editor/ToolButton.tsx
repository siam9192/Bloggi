import React, { FC, ReactNode } from "react";
import clsx from "clsx";
interface IProps {
  children: ReactNode;
  active?: boolean;
  onClick: () => void;
}

const ToolButton: FC<IProps> = ({ children, active, onClick }) => {
  return (
    <button
      onClick={onClick}
      type="button"
      className={clsx("p-2", active ? " bg-black text-white" : "text-black")}
    >
      {children}
    </button>
  );
};

export default ToolButton;

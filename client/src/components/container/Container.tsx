import React from "react";

interface IProps {
  children: React.ReactNode;
  className?: string;
}

function Container({ children, className }: IProps) {
  return <div className={`max-w-[1400px] mx-auto px-2 lg:px-0  ${className}`}>{children}</div>;
}

export default Container;

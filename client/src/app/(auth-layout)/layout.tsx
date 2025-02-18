import React from "react";
import { LayoutProps } from "../../../.next/types/app/layout";

function layout({ children }: LayoutProps) {
  return (
    <div className="lg:grid grid-cols-6 h-screen overflow-hidden">
      <div className="col-span-2">{children}</div>

      <div
        className="col-span-4 bg-[url(/images/auth-1.png)] bg-secondary_colo lg:block hidden"
        style={{
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      ></div>
    </div>
  );
}

export default layout;

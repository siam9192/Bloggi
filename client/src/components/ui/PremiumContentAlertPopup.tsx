import React from "react";

const PremiumContentAlertPopup = () => {
  return (
    <div className=" bg-primary_color bg-opacity-20 fixed inset-0 flex items-center justify-center w-full p-2 z-[1000]">
      <div
        onClick={(e) => e.stopPropagation()}
        className="lg:w-1/3 md:w-1/3 w-full bg-white min-h-60  rounded-md"
      ></div>
    </div>
  );
};

export default PremiumContentAlertPopup;

import React from "react";
import { CiLocationOn } from "react-icons/ci";

function LocationInput() {
  return (
    <div className="p-2   bg-dark_color rounded-md  flex items-center gap-2 w-full ">
      <span className="text-4xl font-medium  text-primary_color   ">
        <CiLocationOn />
      </span>
      <input
        type="text"
        placeholder="Enter Location.."
        className="w-full bg-transparent border-none outline-none  text-white "
      />
    </div>
  );
}

export default LocationInput;

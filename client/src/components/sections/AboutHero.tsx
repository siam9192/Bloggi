import React from "react";

const style = {
  backgroundImage: `url(https://media.istockphoto.com/id/1321029825/photo/portrait-of-business-team.jpg?s=612x612&w=0&k=20&c=r_mjz8nYxz7LyqL1zByr5iYxcnV48dzYwyXcXHyeE4k=)`,
  backgroundSize: "cover",
  backgroundColor: "rgba(0,0,0,0.7)",
  backgroundBlendMode: "overlay",
};
const heading = "ABOUTUS";
const AboutHero = () => {
  return (
    <div
      className="bg-local ... h-[50vh] flex flex-col justify-center items-center font-jakarta"
      style={style}
    >
      <h1 className=" hidden md:block  text-2xl md:text-6xl text-white font-bold space-x-2 md:space-x-4">
        {heading.split("").map((i) => (
          <span className="  bg-primary_color px-5 py-2 md:px-7 md:py-2 rounded-full ">{i}</span>
        ))}
      </h1>
      <h1 className=" md:hidden text-4xl text-white text white font-bold">ABOUT US</h1>
    </div>
  );
};

export default AboutHero;

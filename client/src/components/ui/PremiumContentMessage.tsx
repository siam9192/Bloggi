import React from "react";

const PremiumContentMessage = () => {
  return (
    <div className="h-[80vh] overflow-hidden flex flex-col gap-4 justify-center items-center text-center bg-white">
      <img
        src="https://media.istockphoto.com/id/1294482883/vector/ban-vector-icon-on-white-background.jpg?s=612x612&w=0&k=20&c=xWtakwisodqCIfmPdKn-VERTZbbBzg3SF8-x6T3Ibzw="
        alt=""
        className=" h-1/2"
      />
      <div className="space-y-2">
        <h1 className="md:text-5xl  text-4xl font-medium text-primary_color">
          This is Premium Content!
        </h1>
        <p>Please Purchase our membership plans so you can get access of this content</p>
        <button className="px-6 py-3 rounded-lg  bg-primary_color text-white ">View Planes</button>
      </div>
    </div>
  );
};

export default PremiumContentMessage;

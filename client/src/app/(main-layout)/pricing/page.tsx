import Container from "@/components/container/Container";
import Pricing from "@/components/sections/Pricing";
import React from "react";

const page = () => {
  return (
    <div>
      <div className="pricing-page-header p-10 ">
        <Container className="h-full">
          <div className=" mt-24 flex justify-center flex-col  items-center text-center space-y-2">
            <h1 className="text-4xl  text-primary_color font-bold">
              Chose A Plan that's right fot you
            </h1>
            <p className="text-gray-800">
              Finding the perfect plan to suit your needs is essential, whether you're an individual
              looking for basic features or a business seeking advanced capabilities. Our flexible
              pricing options ensure that you get the best value without paying for unnecessary
              extras.
            </p>
          </div>
        </Container>
      </div>
      <Container>
        <Pricing />
      </Container>
    </div>
  );
};

export default page;

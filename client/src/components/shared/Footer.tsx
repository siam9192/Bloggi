import React from "react";
import Container from "../container/Container";
import footerRoutesData from "@/data/footer-routes.data";

const Footer = () => {
  return (
    <footer>
      <Container>
        <div className=" bg-black text-gray-300 font-jost  px-10 md:px-20 rounded-[35px] my-5">
          <div className=" md:w-1/2 mx-auto mb-10 md:pt-20 p-10 ">
            <div className="space-y-3 text-center">
              <h1 className="text-2xl font-bold  text-white">
                Lets's get Started on Something great
              </h1>
              <p>Join over 400+ startups already growing with Blogi</p>
            </div>
            <div className="mt-5 flex justify-center items-center gap-2"></div>
          </div>
          <div className=" grid lg:grid-cols-6 md:grid-cols-3 grid-cols-2 gap-10 pb-20">
            {footerRoutesData.map((data, index) => (
              <ul key={"footer-route-section-" + (index + 1)} className="space-y-3">
                <h4 className="text-[0.8rem] text-white font-medium">{data.name}</h4>
                {data.routes.map((route, index2) => (
                  <a
                    href={route.path}
                    key={"footer-route" + (index + 1) * (index2 + 1)}
                    className="text-gray-50 hover:text-secondary_color font-medium block"
                  >
                    {route.name}
                  </a>
                ))}
              </ul>
            ))}
          </div>
          <div className="pb-10 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <img
                src="images/logo.png"
                alt=""
                className="size-12 bg-white  rounded-full  border-2 border-black"
              />
              <h1 className=" text-2xl  font-bold font-jost text-white ">Blogi</h1>
            </div>
            <p className="text-[0.8rem] text-white">@ 2025 Blogi.All rights reserved.</p>
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;

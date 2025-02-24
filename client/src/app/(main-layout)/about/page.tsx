import AboutContact from "@/components/sections/AboutContact";
import AboutHero from "@/components/sections/AboutHero";
import AboutMapLocation from "@/components/sections/AboutMapLoaction";
import AboutMission from "@/components/sections/AboutMission";
import AboutTeam from "@/components/sections/AboutTeam";
import React from "react";

const page = () => {
  return (
    <div>
      <AboutHero />
      <AboutMission />
      <AboutTeam />
      <AboutContact />
      <AboutMapLocation />
    </div>
  );
};

export default page;

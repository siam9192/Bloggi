import React from "react";

const AboutMapLocation = () => {
  return (
    <div className="py-20">
      <div className=" space-y-2 text-center">
        <h1 className=" text-3xl font-semibold text-black">Discover Our Location</h1>
        <p>Find us here and contact us</p>
      </div>

      <div className="py-10">
        <div className=" overflow-hidden h-0 pb-[30%] relative">
          <iframe
            className=" border-0 h-full w-full left-0 top-0 absolute"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d101410.06608869965!2d-122.16387303155503!3d37.41194878745799!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x808fb7495bec0189%3A0x7c17d44a466baf9b!2z4Kau4Ka-4KaJ4Kao4KeN4Kaf4KeH4KaH4KaoIOCmreCmv-CmiSwg4KaV4KeN4Kav4Ka-4Kay4Ka_4Kar4KeL4Kaw4KeN4Kao4Ka_4Kav4Ka84Ka-LCDgpq7gpr7gprDgp43gppXgpr_gpqgg4Kav4KeB4KaV4KeN4Kak4Kaw4Ka-4Ka34KeN4Kaf4KeN4Kaw!5e0!3m2!1sbn!2sbd!4v1720712293358!5m2!1sbn!2sbd"
            loading="lazy"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default AboutMapLocation;

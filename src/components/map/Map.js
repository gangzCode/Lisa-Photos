import React from "react";
import Image from "next/image";

import map_pin from "/public/contact/map_pin.png";
import map_placeholder from "/public/contact/map_placeholder.png";
import google_maps_pin from "/public/contact/google_maps_pin.png";
import Link from "next/link";

const Map = () => {
  return (
    <div className="md:w-[1100px] border border-[#e6e6e6] rounded-3xl bg-white shadow-lg py-16 px-4 md:px-20 mx-4 md:mx-0 flex flex-col md:flex-row md:justify-between gap-y-4">
      <div className="basis-1/2">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d179.90919873160593!2d-79.24727344151967!3d43.823751207319056!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89d4d6d7ad9d8f77%3A0xb799ac5d28c01df5!2s2855%20Markham%20Rd%20%23405%2C%20Scarborough%2C%20ON%20M1X%200C3%2C%20Canada!5e0!3m2!1sen!2slk!4v1713461446290!5m2!1sen!2slk"
          className="border shadow-md w-full h-[580px] rounded-2xl"
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
      <div className="flex flex-col justify-between gap-y-8 md:gap-y-0">
        <div className="flex flex-row items-center gap-4 px-4 text-3xl md:text-5xl font-extrabold">
          <Image src={map_pin} alt="" />
          Find us at!
        </div>
        <div className="flex flex-col text-[#857BC2] text-base md:text-xl font-bold px-4 ">
          <p>Lisa Photos,</p>
          <p>2855 Markham Rd </p>
          <p>SUITE 405, Scarborough, ON M1X 0C3</p>
        </div>
        <Link
          href={"https://maps.app.goo.gl/JEHDeU9w13ZSSHRz7"}
          target="_blank"
          className="flex flex-col gap-6 border border-[#e6e6e6] bg-white hover:bg-[#e5e5e5] hover:-translate-y-1 transition-all rounded-3xl p-5 shadow-sm "
        >
          <div className="flex flex-row gap-4 items-center text-2xl font-extrabold">
            Google maps <Image src={google_maps_pin} alt="" />
          </div>
          <div className="flex flex-col text-sm text-[#797979]">
            <p>Lisa Photos, 2855 Markham Rd SUITE 405,</p>
            <p>Scarborough, ON M1X 0C3</p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Map;

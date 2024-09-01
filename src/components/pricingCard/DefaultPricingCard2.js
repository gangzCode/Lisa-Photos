import React from "react";
import Button from "@mui/material/Button";
import Image from "next/image";
import feature_check from "./../../../public/feature_check.png";

const DefaultPricingCard2 = () => {
  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-col items-center py-16 w-[340px] border border-black rounded-3xl gap-8 ">
        <div className="flex flex-col items-center gap-2">
          <p className="text-xl font-semibold">TWO ID PHOTO</p>
          <p className="text-3xl bg-[#210068] text-white font-semibold p-4 px-10 rounded-full">
            MULTI
          </p>
        </div>
        <div className="flex flex-col items-center gap-2">
          <p className="text-3xl">
            $
            <span className="text-6xl font-extrabold text-[#657BF0]">
              24.99
            </span>
          </p>
          <p className="text-[#AEAEAE] text-2xl font-bold">/session</p>
        </div>
        <div className="flex flex-col w-full px-10 gap-4">
          <div className="flex flex-row gap-2 text-sm font-semibold">
            <Image src={feature_check} width={18} height={12} alt="" />
            Any Two ID Photos
          </div>
          <div className="flex flex-row gap-2 text-sm font-semibold">
            <Image src={feature_check} width={18} height={12} alt="" />
            For One Person
          </div>
          {/* <div className="flex flex-row gap-2 text-sm font-semibold">
            <Image src={feature_check} width={18} height={12} alt="" />
            Lorem ipsum
          </div>
          <div className="flex flex-row gap-2 text-sm font-semibold">
            <Image src={feature_check} width={18} height={12} alt="" />
            Lorem ipsum
          </div>
          <div className="flex flex-row gap-2 text-sm font-semibold">
            <Image src={feature_check} width={18} height={12} alt="" />
            Lorem ipsum
          </div>
          <div className="flex flex-row gap-2 text-sm font-semibold">
            <Image src={feature_check} width={18} height={12} alt="" />
            Lorem ipsum
          </div> */}
        </div>
      </div>
      <Button
        href="/booking"
        variant="contained"
        sx={{
          borderRadius: "100px",
          padding: "10px 25px",
          marginTop: "-22px",
          fontWeight: "bold",
          textTransform: "none",
          fontSize: "1.25rem",
          lineHeight: "1.75rem",
        }}
      >
        Choose Plan
      </Button>
    </div>
  );
};

export default DefaultPricingCard2;

import React from "react";
import Button from "@mui/material/Button";
import Image from "next/image";

const SpecialPricingCard = () => {
  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-col items-center py-16 w-[340px] bg-[#657BF0] rounded-3xl gap-8 ">
        <div className="text-[#657BF0] bg-[#F6ED10] px-20 py-3 rounded-lg text-sm">
          ★ Most Popular
        </div>
        <div className="flex flex-col items-center gap-2">
          <p className="text-xl  text-white">ONE ID PHOTO</p>
          <p className="text-3xl bg-white text-[#657BF0] font-semibold p-4 px-10 rounded-full">
            FAMILY
          </p>
        </div>
        <div className="flex flex-col items-center gap-2">
          <p className="text-3xl text-white">
            $<span className="text-6xl font-extrabold text-white">49.99</span>
          </p>
          <p className="text-[#EAEAEA] text-2xl font-bold">/session</p>
        </div>
        <div className="flex flex-col text-white text-2xl">One ID Photo</div>
        <div className="flex flex-col text-white text-2xl">For Four People</div>
      </div>
      <Button
          href="/booking"
          variant="outlined"
          sx={{
            background: "white",
            borderRadius: "100px",
            padding: "10px 25px",
            marginTop: "-22px",
            fontWeight: "bold",
            textTransform: "none",
            fontSize: "1.25rem",
            lineHeight: "1.75rem",
            '&:hover': {
              backgroundColor: '#f0f0f0', // Change this to the desired hover color
            },
            '&:active': {
              backgroundColor: '#e0e0e0', // Change this to the desired active color
            },
          }}
        >
          Choose Plan
      </Button>
    </div>
  );
};

export default SpecialPricingCard;

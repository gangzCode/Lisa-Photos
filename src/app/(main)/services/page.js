import Image from "next/image";
import React from "react";
import services_1 from "/public/services/services_1.png";
import services_2 from "/public/services/services_2.png";
import services_desc_1 from "/public/services/services_desc_1.png";
import services_desc_2 from "/public/services/services_desc_2.png";
import services_desc_3 from "/public/services/services_desc_3.png";
import services_desc_4 from "/public/services/services_desc_4.png";
import data from "../../../../public/data/data.json"; // Import JSON data

import bg_pattern_1 from "/public/bg_pattern/bg_pattern_1.png";
import bg_pattern_2 from "/public/bg_pattern/bg_pattern_2.png";
import ServiceList from "@/components/ServiceList/ServiceList";

const page = () => {
  // const DocumentInformation = ({ documentInformation }) => {
  //   // Get an array of countries
  //   const countries = Object.keys(documentInformation);
  //   // const countries = ["Canada"];
  //   // Calculate the number of items per column
  //   const itemsPerColumn = Math.ceil(countries.length / 3);

  //   return (
  //     <section className="md:w-[1200px] px-4 md:px-0 flex flex-col md:flex-row justify-between">
  //       {[...Array(3)].map((_, columnIndex) => (
  //         <div
  //           key={columnIndex}
  //           className="flex flex-col items-start text-left gap-8 md:w-1/3 md:px-2"
  //         >
  //           {countries
  //             .slice(
  //               columnIndex * itemsPerColumn,
  //               (columnIndex + 1) * itemsPerColumn +
  //                 (columnIndex === 0 ? 3 : columnIndex === 1 ? 5 : 0)
  //             )
  //             .map((country) => (
  //               <div key={country}>
  //                 <p className="text-2xl font-bold mb-2">{country}</p>
  //                 {/* Populate documents for each country */}
  //                 <ul className="list-disc pl-4">
  //                   {Object.entries(documentInformation[country]).map(
  //                     ([document, value]) => (
  //                       <li key={document} className="text-lg text-[#797979]">
  //                         {document}: {value}
  //                       </li>
  //                     )
  //                   )}
  //                 </ul>
  //               </div>
  //             ))}
  //         </div>
  //       ))}
  //     </section>
  //   );
  // };

  return (
    <main className="flex flex-col items-center gap-16 md:gap-32 my-24 relative">
      {/* Header */}
      <Image
        src={bg_pattern_1}
        className="hidden md:block absolute -z-10 left-0 top-0"
        alt=""
      />
      <Image
        src={bg_pattern_2}
        className="hidden md:block absolute -z-10 right-0 -bottom-96"
        alt=""
      />
      <section className="flex flex-col gap-4 items-center text-center">
        <h1 className="text-3xl md:text-5xl font-extrabold">Our Services</h1>
        <p className="text-base md:text-xl text-[#828282] tracking-[.35rem]	">
          EXCELLENT, EFFICIENT, PROFESSIONAL
        </p>
      </section>
      {/* first */}
      <section className="flex flex-col-reverse md:flex-row justify-between gap-y-8 md:w-[1280px] px-4 md:px-0">
        <div>
          <Image src={services_1} className="rounded-3xl" alt="" />
        </div>
        <div className="flex flex-col justify-center items-center md:items-end gap-8 md:gap-16">
          <div className="flex flex-col-reverse md:flex-row gap-4">
            <div className="flex flex-col gap-2 items-center md:items-end">
              <p className="text-2xl font-semibold">Fast and Reliable</p>
              <p className="text-[#797979]">Ready in few Minutes</p>
            </div>
            <div className="flex flex-row justify-center md:block">
              <Image src={services_desc_1} alt="" />
            </div>
          </div>
          <div className="flex flex-col-reverse md:flex-row gap-4">
            <div className="flex flex-col gap-2 items-center md:items-end">
              <p className="text-2xl font-semibold text-center md:text-left">
                Convenient Online Booking
              </p>
              <p className="text-[#797979]">Hassle free, save time </p>
            </div>
            <div className="flex flex-row justify-center md:block">
              <Image src={services_desc_2} alt="" />
            </div>
          </div>
          <div className="flex flex-col-reverse md:flex-row gap-4">
            <div className="flex flex-col gap-2 items-center md:items-end">
              <p className="text-2xl font-semibold">Available in All Sizes</p>
              <p className="text-[#797979]">
                We specialize in all kinds of passport and ID.{" "}
              </p>
            </div>
            <div className="flex flex-row justify-center md:block">
              <Image src={services_desc_3} alt="" />
            </div>
          </div>
          <div className="flex flex-col-reverse md:flex-row gap-4">
            <div className="flex flex-col gap-2 items-center md:items-end">
              <p className="text-2xl font-semibold text-center md:text-left">
                Meeting Strict Requirements
              </p>
              <p className="text-[#797979]">
                Or we will re-take your photos for free
              </p>
            </div>
            <div className="flex flex-row justify-center md:block">
              <Image src={services_desc_4} alt="" />
            </div>
          </div>
        </div>
      </section>
      {/* Document information section */}
      <section
        className="flex flex-col gap-4 items-center text-center"
        id="list"
      >
        <div>
          <h1 className="text-3xl md:text-5xl font-extrabold">
            List of Services
          </h1>
        </div>
        <div>
          <br />
        </div>
        <div>
          <ServiceList documentInformation={data} />
        </div>
      </section>
      {/* second */}
      <section className="md:w-[1200px] px-4 md:px-0 flex flex-col md:flex-row justify-between gap-y-8">
        <div className="flex flex-col justify-between gap-y-8 md:w-[320px]">
          <div className="flex flex-col items-center text-center gap-2">
            <p className="text-2xl font-bold">Excellent Quality</p>
            <p className="text-[#797979] text-lg">
              We have best cameras and professional photographers. Printed on
              premium photo paper with instant dry technology
            </p>
          </div>
          <div className="flex flex-col items-center text-center gap-2">
            <p className="text-2xl font-bold">Outstanding Detail</p>
            <p className="text-[#797979] text-lg">
              We will capture your best angle with lighting and background.
            </p>
          </div>
          <div className="flex flex-col items-center text-center gap-2">
            <p className="text-2xl font-bold">Digital Copy</p>
            <p className="text-[#797979] text-lg">
              Perfectly sized, cropped photos ready to be uploaded and delivered
              immediately And securely to your inbox
            </p>
          </div>
        </div>
        <div>
          <Image src={services_2} alt="" />
        </div>
      </section>
    </main>
  );
};

export default page;

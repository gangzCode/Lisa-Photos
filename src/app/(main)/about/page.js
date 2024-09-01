import React from "react";
import Image from "next/image";
import Link from "next/link";

import about_1 from "/public/about/about_1.png";
import about_2 from "/public/about/about_2.png";
import about_3 from "/public/about/about_3.png";
import what_we_do_banner from "/public/about/what_we_do_banner.jpg";

import customer from "/public/about/customer_icon.png";
import efficiency from "/public/about/efficiency_icon.png";
import excellence from "/public/about/excellence_icon.png";
import trust from "/public/about/trust_icon.png";
// import trust2 from "/public";

const page = () => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between gap-14 md:gap-28 my-16 md:my-36">
      {/* Title */}
      <section className="flex flex-col gap-6 text-center md:w-[760px] px-4 md:px-0">
        <h1 className="text-4xl md:text-7xl font-extrabold ">About Us</h1>
        <p className=" text-base md:text-xl text-[#7C7C7C]">
          Behind Every Photo is Our Commitment to Your Identity
        </p>
      </section>
      {/* Photos */}
      <section className="flex flex-col gap-y-4 px-4 md:px-0 md:flex-row md:justify-between md:w-[1050px]">
        <Image src={about_1} className="rounded-3xl" alt="" />
        <Image src={about_2} className="rounded-3xl" alt="" />
      </section>
      {/* What we do */}
      <section className="md:w-[1050px] px-4 flex flex-col md:flex-row gap-4 md:gap-10">
        {/* <h1 className="text-4xl font-extrabold basis-1/3">What we do</h1> */}
        <div className="flex-1 text-4xl font-bold flex flex-col items-center md:items-start gap-4">
          <h1 className="text-4xl font-extrabold basis-1/3">What We Do</h1>
          <div className="relative w-[300px] md:w-full h-[100px] md:h-full">
            <Image
              src={what_we_do_banner}
              alt=""
              fill
              className="object-cover rounded-2xl "
            />
          </div>
        </div>
        <div className="flex flex-col gap-8 text-lg  text-[#797979] basis-2/3">
          <p>
            We specialize in providing high-quality passport and ID photos for
            Canadian and Most international Countries.
          </p>
          <p>
            Our experienced photographers are trained to capture your best
            angles while ensuring that every detail,from lighting to
            background,complies with strict guidelines.
          </p>
        </div>
      </section>
      {/* Facts */}
      <section className="md:w-[1100px] flex flex-col md:flex-row items-center justify-center bg-[#F9F9F9] rounded-3xl p-16 gap-20">
        <div className="flex flex-col gap-2 items-center">
          <div className="text-5xl font-bold">
            <span>100</span>
            <span className="text-[#5236FF]">+</span>
          </div>
          <span className="font-bold">Client Satisfaction</span>
        </div>
        <div className="flex flex-col gap-2 items-center">
          <div className="text-5xl font-bold">
            <span>24</span>
            <span className="text-[#5236FF]">h</span>
          </div>
          <span className="font-bold">Expert Support Team</span>
        </div>
        <div className="flex flex-col gap-2 items-center">
          <div className="text-5xl font-bold">
            <span>5</span>
            <span className="text-[#5236FF]">k+</span>
          </div>
          <span className="font-bold">Sales Count</span>
        </div>
      </section>
      {/* Our Misson */}
      <section className="flex flex-col md:flex-row md:w-[1150px] px-4 md:px-0 gap-8">
        <div className="flex flex-col gap-8 basis-1/2">
          <h1 className="text-4xl md:text-5xl font-extrabold">Our Mission</h1>
          <div className="flex flex-col gap-8 text-lg md:text-2xl text-[#797979] font-semibold md:leading-10">
            <p>
              Lisa Photos is committed to capturing your perfect Identity,
              offering a seamless experience to our customers while maintaining
              the highest standards of Professionalism and Accuracy.
            </p>
            <p>
              We understand the importance of professional ID photos,which is
              why we go the extra mile to deliver results that you can trust.
            </p>
          </div>
        </div>
        <div className="flex flex-col items-center">
          <Image src={about_3} alt="" className="rounded-[50px]" />
        </div>
      </section>
      {/* Values */}
      <section className="flex flex-col items-center gap-8 px-4 md:px-0">
        <div className="p-5 px-7 bg-[#EFECFF] w-fit rounded-full font-extrabold text-[#5236FF]">
          Our Values
        </div>
        <h1 className="text-3xl md:text-5xl font-extrabold  md:w-[750px] text-center">
          The Story and Values Behind Our Company
        </h1>
        <div className="flex flex-col md:flex-row gap-16">
          <div className="bg-[#F9F9F9] p-10 flex flex-col items-center md:items-start md:flex-row md:w-[620px] gap-6 rounded-3xl">
            <Image src={excellence} alt="" />
            <div className="flex flex-col items-center md:items-start gap-4">
              <h1 className="text-2xl font-extrabold">EXCELLENCE</h1>
              <p className="text-base md:text-xl text-[#797979] text-center md:text-left">
                We are committed to delivering Precise and accurate ID photos
                meeting official requirements.
              </p>
            </div>
          </div>
          <div className="bg-[#F9F9F9] p-10 flex flex-col items-center md:items-start md:flex-row md:w-[620px] gap-6 rounded-3xl">
            <Image src={efficiency} alt="" />
            <div className="flex flex-col items-center md:items-start gap-4">
              <h1 className="text-2xl font-extrabold">EFFICIENCY</h1>
              <p className="text-base md:text-xl text-[#797979] text-center md:text-left">
                Time is precious, Our streamlined process ensures that you get
                your ID photos quickly without compromising quality.
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-16">
          <div className="bg-[#F9F9F9] p-10 flex flex-col items-center md:items-start md:flex-row md:w-[620px] gap-6 rounded-3xl">
            <Image src={customer} alt="" />
            <div className="flex flex-col items-center md:items-start gap-4">
              <h1 className="text-2xl font-extrabold">CUSTOMER SERVICE</h1>
              <p className="text-base md:text-xl text-[#797979] text-center md:text-left">
                Your satisfaction is our priority. We offer personalized
                service,and strive to exceed your expectations with every visit.
              </p>
            </div>
          </div>
          <div className="bg-[#F9F9F9] p-10 flex flex-col items-center md:items-start md:flex-row md:w-[620px] gap-6 rounded-3xl">
            <Image src={trust} alt="" />
            <div className="flex flex-col items-center md:items-start gap-4">
              <h1 className="text-2xl font-extrabold">TRUST</h1>
              <p className="text-base md:text-xl text-[#797979] text-center md:text-left">
                With years of experience and a reputation for excellence,we have
                earned the trust of our community .You can rely on us for
                professional ID photo service
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default page;

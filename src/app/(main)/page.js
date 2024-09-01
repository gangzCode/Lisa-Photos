import DefaultPricingCard from "@/components/pricingCard/DefaultPricingCard";
import DefaultPricingCard2 from "@/components/pricingCard/DefaultPricingCard2";
import SpecialPricingCard from "@/components/pricingCard/SpecialPricingCard";
import Image from "next/image";
import Link from "next/link";

import button_icon from "/public/button_icon.png";
import banner from "/public/banner.png";
import button_icon_sm from "/public/button_icon_sm.png";
import header_decor from "/public/header_decor.png";
import what_we_do_banner from "/public/what_we_do_banner.jpg";
import home_pattern from "/public/home_pattern.png";
import person from "/public/person.png";
import person_2 from "/public/person_2.png";
import person_3 from "/public/person_3.png";
import person_4 from "/public/person_4.png";
import person_5 from "/public/person_5.png";
import view_projects_button from "/public/view_projects_button.png";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between gap-6 my-16 md:my-36">
      {/* Hero Banner */}
      <section className="px-4 md:px-0 md:w-[1440px] flex flex-col gap-8 md:gap-12 items-center">
        <div className="text-2xl md:text-7xl font-extrabold text-center flex flex-col gap-2 md:gap-9">
          <h1>Capture Your</h1>
          <h1 className="flex flex-row items-center">
            Precise
            <Image src={header_decor} alt="" className="w-14 md:w-28 inline" />
            Identity with
          </h1>
          <h1>Lisa Photos</h1>
        </div>
        <div className=" md:w-[800px] text-base md:text-xl text-center text-[#7C7C7C]">
          We are committed to providing you with professional, high-quality images for Passport, Visa and Official documents.
        </div>
        <Link
          href={"/booking"}
          className="py-4 px-6 text-2xl bg-[#5236FF] hover:bg-[#3925B2] transition-colors rounded-full text-white font-semibold flex flex-row items-center gap-4"
        >
          Book now
          <Image src={button_icon} alt="" />
        </Link>
      </section>
      {/* Image banner */}
      <section className="w-full h-fit">
        <div className="relative w-full h-[230px] md:h-[710px]">
          <Image src={banner} fill className="object-cover" alt="" />
        </div>
      </section>
      {/* What we do */}
      <section className="md:w-[1300px] flex flex-col md:flex-row mb-14 md:mb-20 px-4 md:px-0 gap-8 md:gap-10">
        <div className="flex-1 text-4xl font-bold flex flex-col items-center md:items-start gap-4">
          <p>
            What{" "}
            <span className="bg-[#657BF0] text-white pl-1 pr-6">We Do</span>
          </p>
          <div className="relative w-[300px] md:w-full h-[100px] md:h-full overflow-hidden">
            <Image
              src={what_we_do_banner}
              alt=""
              fill
              className="object-cover rounded-3xl "
              style={{ objectPosition: 'center top' }}
            />
            <div className="absolute inset-0 bg-black opacity-10 rounded-3xl"></div> 
          </div>
        </div>
        <div className="flex-1 flex flex-col gap-8 text-lg md:text-2xl font-semibold">
          <p>
            We specialize in providing professional ID images, ensuring compliance with all official regulations.
          </p>
          <p>
            With state-of-the-art equipment, skilled photographers and meticulous attention to detail, We ensure every photo gets approved.  
          </p>
          <Link
            href={"/services#list"}
            className="py-2 px-4 w-fit bg-white rounded-full text-sm text-black border-black border font-bold flex flex-row items-center gap-2"
          >
            See Our List
            <Image src={button_icon_sm} alt="" />
          </Link>
        </div>
      </section>
      {/* What we offer */}
      <section className="md:w-[1200px] flex flex-col items-center gap-6 md:gap-10 mb-20 px-4 md:px-0 relative">
        <h1 className="text-4xl md:text-7xl font-extrabold text-center md:mb-16">
          What{" "}
          <span className="bg-[#657BF0] text-white pl-1 pr-6">We Offer</span>
        </h1>
        <div className="flex flex-col md:gap-10">
          <h2 className="text-lg md:text-5xl font-extrabold text-center text-[#657BF0]">
            We work to craft the best professional
          </h2>
          <h2 className="text-lg md:text-5xl font-extrabold text-center text-[#657BF0] mb-16">
            <span className="text-black">Photos</span> taken to meet strict requirements
          </h2>
        </div>
        <div className="md:w-[1100px] flex flex-col md:flex-row gap-y-7">
          <div className="flex-1 flex flex-col gap-7 md:gap-20 items-start">
            <div className="flex flex-col gap-6 relative">
              <Image src={person} alt="" className=" rounded-[40px]" />
              <div className="flex flex-col gap-2 px-4 md:px-0">
                <h1 className="text-3xl font-semibold">CANADIAN PASSPORT</h1>
                {/* <p className="text-lg">Lorem ipsum dolor</p> */}
              </div>
             {/*  <Link
                href={"/services"}
                className="absolute right-4 md:right-0 top-0 md:top-32 -translate-y-1/2 md:translate-y-0  md:translate-x-1/2 bg-black hover:bg-[#464646] p-3 rounded-full flex flex-col items-center justify-center"
              >
                <Image src={view_projects_button} alt="" />
              </Link> */}
            </div>
            <div className="flex flex-col gap-6">
              <Image src={person_2} alt="" className=" rounded-[40px]" />
              <div className="flex flex-col gap-2 px-4 md:px-0">
                <h1 className="text-3xl font-semibold">US VISITORS VISA</h1>
                {/* <p className="text-lg">Lorem ipsum dolor</p> */}
              </div>
            </div>
            <div className="flex flex-col gap-6">
              <Image src={person_3} alt="" className=" rounded-[40px]" />
              <div className="flex flex-col gap-2 px-4 md:px-0">
                <h1 className="text-3xl font-semibold">CANADIAN CITIZENSHIP <br/>PHOTO</h1>
                {/* <p className="text-lg">Lorem ipsum dolor</p> */}
              </div>
            </div>
          </div>
          <div className="flex-1 flex flex-col gap-7 md:gap-20 items-end md:pt-28">
            <div className="flex flex-col gap-6">
              <Image src={person_4} alt="" className=" rounded-[40px]" />
              <div className="flex flex-col gap-2 px-4 md:px-0">
                <h1 className="text-3xl font-semibold">CANADIAN PERMANENT <br/>RESIDENCE PHOTO</h1>
                {/* <p className="text-lg">Lorem ipsum dolor</p> */}
              </div>
            </div>
            <div className="flex flex-col gap-6">
              <Image src={person_5} alt="" className=" rounded-[40px]" />
              <div className="flex flex-col gap-2 px-4 md:px-0">
                <h1 className="text-3xl font-semibold">INTERNATIONAL VISA</h1>
                {/* <p className="text-lg">Lorem ipsum dolor</p> */}
              </div>
            </div>
            <div className="w-full relative flex flex-row justify-center md:block ">
              <Link
                href={"/services"}
                className="size-[220px] flex flex-col items-center justify-center p-10 relative md:absolute md:left-36 top-12"
              >
                <div className="w-full h-full bg-white opacity-0 hover:opacity-30 transition-opacity absolute z-20 rounded-full"></div>
                <div className="flex flex-col items-start z-10 gap-1 text-md text-white font-bold">
                  <p>See</p>
                  <p>All services</p>
                  <Image src={"/btn_arrow.png"} width={22} height={22} alt="" />
                </div>
                <Image
                  src={"/btn_background.png"}
                  alt=""
                  fill
                  className=" object-cover"
                />
              </Link>
            </div>
          </div>
        </div>
        <Image
          src={home_pattern}
          alt=""
          className="hidden md:block absolute -z-10 top-1/2 -translate-y-1/2"
        />
      </section>
      {/* Pricing */}
      <section id="pricing">
        <h1 className="text-4xl md:text-7xl font-extrabold text-center mb-16">
          Pricing
        </h1>
        <div className="md:w-[1200px] flex flex-col md:flex-row justify-between gap-y-7">
          <DefaultPricingCard />
          <SpecialPricingCard />
          <DefaultPricingCard2 />
        </div>
      </section>
    </main>
  );
}

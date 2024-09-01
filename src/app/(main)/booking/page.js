import React from "react";
import Image from "next/image";
import Button from "@mui/material/Button";

import booking_1 from "/public/booking/booking_1.png";
import booking_2 from "/public/booking/booking_2.png";
import booking_3 from "/public/booking/booking_3.png";
import booking_photos_icon from "/public/booking/booking_photos_icon.png";

import BookingForm from "@/components/bookingForm/BookingForm";

import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import bg_pattern_1 from "/public/bg_pattern/bg_pattern_1.png";
import bg_pattern_2 from "/public/bg_pattern/bg_pattern_2.png";
import Map from "@/components/map/Map";
import NewUserRedirctor from "@/components/NewUserRedirector/NewUserRedirctor";

const page = () => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between gap-20 px-4 md:px-0 my-16 relative">
      <NewUserRedirctor />
      <Image
        src={bg_pattern_1}
        className="hidden md:block absolute -z-10 left-0 top-10"
        alt=""
      />
      <Image
        src={bg_pattern_2}
        className="hidden md:block absolute -z-10 right-0 -bottom-96"
        alt=""
      />
      {/* Images */}
      <section className="flex flex-col md:flex-row relative gap-4">
        <Image src={booking_1} alt="" className="rounded-xl" />
        <div className="flex flex-row md:flex-col gap-4 h-fit">
          <div>
            <Image src={booking_2} alt="" className="rounded-xl" />
          </div>
          <div>
            <Image src={booking_3} alt="" className="rounded-xl" />
          </div>
        </div>
        <div className="absolute bottom-44 md:bottom-8 left-4 md:left-8">
          <Button variant="contained" href="/services#list">
            <Image src={booking_photos_icon} alt="" />
            View List of Services
          </Button>
        </div>
      </section>
      {/* Booking component */}
      <section className="w-full md:w-[1100px] flex flex-col items-center">
        <BookingForm />
      </section>
      {/* About */}
     {/*  <section className="flex flex-col gap-16 md:w-[1300px]">
        <h1 className="text-5xl font-bold">About</h1>
        <p className="font-bold text-lg">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry&apos;s standard dummy text
          ever since the 1500s, when an unknown printer took a galley of type
          and scrambled it to make a type specimen book. 
        </p>
        <div className="flex flex-col gap-6 md:w-[1200px]">
          <div>
            <Accordion
              sx={{
                width: "100%",
                padding: "20px 40px",
                borderWidth: 1,
                borderColor: "#C6C6C6",
              }}
            >
              <AccordionSummary
                expandIcon={
                  <div className="p-5 rounded-full bg-[#5236FF] size-8 flex flex-row items-center justify-center">
                    <ExpandMoreIcon
                      sx={{ fontSize: "1.75rem", color: "white" }}
                    />
                  </div>
                }
                aria-controls="panel1-content"
                id="panel1-header"
                className="text-2xl font-extrabold"
              >
                What should I wear for a passport photo?
              </AccordionSummary>
              <AccordionDetails>
                <div className="flex flex-col gap-6">
                  <p>
                    Straight poses and neutral facial expressions are one thing.
                    But what about the passport photo dress code? Does it even
                    exist? While the US Department of State&apos;s clothing
                    guidelines are quite relaxed, there are some aspects you
                    must pay attention to when choosing clothes and accessories
                    for your passport photo.
                  </p>
                  <p>
                    Here are some tips that will help you prepare perfect
                    passport pictures:
                  </p>
                  <ul className="list-disc pl-10">
                    <li>
                      Pick casual, everyday clothes. You should look as natural
                      as possible in your passport photo. Also, avoid white
                      clothes—you don’t want to blend with the background, after
                      all!
                    </li>
                    <li>
                      You have complete freedom as to your hairstyle. Just be
                      careful about your hair covering any part of your face or
                      your hairstyle going beyond the picture’s frame.
                      Everything, including your hair, must fit into the 2x2
                      photo.
                    </li>
                    <li>
                      Limit the accessories. Give up on anything that can cause
                      reflections or shadows in your passport photo. Jewelry is
                      acceptable—just make it simple.
                    </li>
                    <li>
                      Glasses and headgear, in general, are forbidden. The
                      exceptions include medical or religious reasons for
                      wearing them.
                    </li>
                  </ul>
                </div>
              </AccordionDetails>
            </Accordion>
          </div>
          <div>
            <Accordion
              sx={{
                width: "100%",
                padding: "20px 40px",
                borderWidth: 1,
                borderColor: "#C6C6C6",
              }}
            >
              <AccordionSummary
                expandIcon={
                  <div className="p-5 rounded-full bg-[#5236FF] size-8 flex flex-row items-center justify-center">
                    <ExpandMoreIcon
                      sx={{ fontSize: "1.75rem", color: "white" }}
                    />
                  </div>
                }
                aria-controls="panel1-content"
                id="panel1-header"
                className="text-2xl font-extrabold"
              >
                Where to get a passport photo?
              </AccordionSummary>
              <AccordionDetails>
                <div className="flex flex-col gap-6">
                  <p>
                    Straight poses and neutral facial expressions are one thing.
                    But what about the passport photo dress code? Does it even
                    exist? While the US Department of State&apos;s clothing
                    guidelines are quite relaxed, there are some aspects you
                    must pay attention to when choosing clothes and accessories
                    for your passport photo.
                  </p>
                  <p>
                    Here are some tips that will help you prepare perfect
                    passport pictures:
                  </p>
                  <ul className="list-disc pl-10">
                    <li>
                      Pick casual, everyday clothes. You should look as natural
                      as possible in your passport photo. Also, avoid white
                      clothes—you don’t want to blend with the background, after
                      all!
                    </li>
                    <li>
                      You have complete freedom as to your hairstyle. Just be
                      careful about your hair covering any part of your face or
                      your hairstyle going beyond the picture’s frame.
                      Everything, including your hair, must fit into the 2x2
                      photo.
                    </li>
                    <li>
                      Limit the accessories. Give up on anything that can cause
                      reflections or shadows in your passport photo. Jewelry is
                      acceptable—just make it simple.
                    </li>
                    <li>
                      Glasses and headgear, in general, are forbidden. The
                      exceptions include medical or religious reasons for
                      wearing them.
                    </li>
                  </ul>
                </div>
              </AccordionDetails>
            </Accordion>
          </div>
          <div>
            <Accordion
              sx={{
                width: "100%",
                padding: "20px 40px",
                borderWidth: 1,
                borderColor: "#C6C6C6",
              }}
            >
              <AccordionSummary
                expandIcon={
                  <div className="p-5 rounded-full bg-[#5236FF] size-8 flex flex-row items-center justify-center">
                    <ExpandMoreIcon
                      sx={{ fontSize: "1.75rem", color: "white" }}
                    />
                  </div>
                }
                aria-controls="panel1-content"
                id="panel1-header"
                className="text-2xl font-extrabold"
              >
                Where to get a passport photo? 2
              </AccordionSummary>
              <AccordionDetails>
                <div className="flex flex-col gap-6">
                  <p>
                    Straight poses and neutral facial expressions are one thing.
                    But what about the passport photo dress code? Does it even
                    exist? While the US Department of State&apos;s clothing
                    guidelines are quite relaxed, there are some aspects you
                    must pay attention to when choosing clothes and accessories
                    for your passport photo.
                  </p>
                  <p>
                    Here are some tips that will help you prepare perfect
                    passport pictures:
                  </p>
                  <ul className="list-disc pl-10">
                    <li>
                      Pick casual, everyday clothes. You should look as natural
                      as possible in your passport photo. Also, avoid white
                      clothes—you don’t want to blend with the background, after
                      all!
                    </li>
                    <li>
                      You have complete freedom as to your hairstyle. Just be
                      careful about your hair covering any part of your face or
                      your hairstyle going beyond the picture’s frame.
                      Everything, including your hair, must fit into the 2x2
                      photo.
                    </li>
                    <li>
                      Limit the accessories. Give up on anything that can cause
                      reflections or shadows in your passport photo. Jewelry is
                      acceptable—just make it simple.
                    </li>
                    <li>
                      Glasses and headgear, in general, are forbidden. The
                      exceptions include medical or religious reasons for
                      wearing them.
                    </li>
                  </ul>
                </div>
              </AccordionDetails>
            </Accordion>
          </div>
        </div>
      </section> */}
      {/* Map */}
      <section>
        {/* <Map /> */}
      </section>
      {/* Things to know */}
      <section className="flex flex-col gap-8 md:w-[1300px] border border-[#C6C6C6] py-12 px-4 md:p-12 rounded-2xl bg-white">
        <h1 className="text-3xl font-bold">Things to know</h1>
        <div className="border-[#E5E7EB] border w-full md:w-16"></div>
        <div className="flex flex-col gap-6">
          <h1 className="text-xl font-bold">Cancellation policy</h1>
          <div className="flex flex-col gap-6 text-[#6B7280]">
            <p>1. Cancellation by the Customer:</p>
            <ul className="list-disc pl-10">
              <li>
                If you need to cancel your booking, please do so at least 24
                hours before the scheduled start time.
              </li>
              <li>
                Cancellations made more than 24 hours in advance will receive a
                full refund of the booking fee.
              </li>
              <li>
                Cancellations made within 24 hours of the scheduled start time
                will not be eligible for a refund.
              </li>
            </ul>
          </div>
          <div className="flex flex-col gap-6 text-[#6B7280]">
            <p>2. Cancellation by the Studio:</p>
            <ul className="list-disc pl-10">
              <li>
                In the rare event that the studio facility cancels your booking
                due to unforeseen circumstances, such as maintenance or
                unexpected closure, we will provide a full refund of the booking
                fee.
              </li>
              <li>
                We will make every effort to notify you promptly if such a
                situation arises.
              </li>
            </ul>
          </div>
        </div>
        <div className="border-[#E5E7EB] border w-full md:w-16"></div>

        <div className="flex flex-col gap-6 ">
          <h1 className="text-xl font-bold">Working hours</h1>

          <div className="md:w-[450px] text-[#6B7280]">
            <div className="flex flex-row justify-between rounded-lg p-4 bg-[#F3F4F6]">
              <p>Weekdays</p>
              <p>10:00 am - 05:00 pm</p>
            </div>
            <div className="flex flex-row justify-between rounded-lg p-4">
              <p>Weekends (Saturday only)</p>
              <p>10:00 pm - 05:00 pm</p>
            </div>
          </div>
        </div>
        <div className="border-[#E5E7EB] border w-full md:w-16"></div>

        <div className="flex flex-col gap-6 ">
          <h1 className="text-xl font-bold">Special Note</h1>
          <div className="text-[#6B7280] flex flex-col gap-6 pl-7 md:w-[1000px]">
            <p>
              If you fail to show up for your booking without prior cancellation
              or notice, you will not be eligible for a refund.
            </p>
            <p>
              Please note that this cancellation policy is subject to change
              without prior notice. We recommend reviewing the policy at the
              time of booking to ensure you are aware of any updates.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
};

export default page;

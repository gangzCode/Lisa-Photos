// "use client";

import React from "react";
import mail from "/public/contact/mail.png";
import phone from "/public/contact/phone.png";
import map_pin from "/public/contact/map_pin.png";
import map_placeholder from "/public/contact/map_placeholder.png";
import google_maps_pin from "/public/contact/google_maps_pin.png";
import faq_bg from "/public/contact/faq_bg.png";
import Image from "next/image";

import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import bg_pattern_1 from "/public/bg_pattern/bg_pattern_3.png";
import bg_pattern_2 from "/public/bg_pattern/bg_pattern_1.png";
import Map from "@/components/map/Map";
import Link from "next/link";

import faqs from "@/utils/data/faqs/faqs";
import ContactMessageForm from "@/components/ContactMessageForm/ContactMessageForm";

const page = () => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between gap-16 mt-16 md:mt-36 relative">
      <Image
        src={bg_pattern_1}
        className="hidden md:block absolute -z-10 right-0 -top-36"
        alt=""
      />

      <Image
        src={bg_pattern_2}
        className="hidden md:block absolute -z-10 left-0 -bottom-96"
        alt=""
      />

      {/* Header */}
      <section>
        <h1 className="text-4xl md:text-7xl font-extrabold">
          Get in touch today!
        </h1>
      </section>

      {/* Contact details */}
      <section className="flex flex-col md:flex-row gap-6 px-4 md:px-0">
        <Link
          href="mailto:lisaphoto@mail.com"
          className="flex flex-col md:flex-row items-center justify-between border-[#E8E8E8] border rounded-3xl bg-white hover:bg-[#e5e5e5] transition-colors px-8 py-6 shadow-lg md:w-[550px]"
        >
          <div className="flex flex-col md:flex-row items-center gap-4">
            <Image src={mail} alt="" />
            <h2 className="text-lg font-extrabold">Mail Us</h2>
          </div>
          <div className="text-[#797979] text-lg"> info@lisaphotos.ca</div>
        </Link>
        <Link
          href="tel:+00165476589"
          className="flex flex-col md:flex-row items-center justify-between border-[#E8E8E8] border rounded-3xl bg-white hover:bg-[#e5e5e5] transition-colors px-8 py-6 shadow-lg md:w-[550px]"
        >
          <div className="flex flex-col md:flex-row items-center gap-4">
            <Image src={phone} alt="" />
            <h2 className="text-lg font-extrabold">Call Us</h2>
          </div>
          <div className="text-[#797979] text-lg">+1 647 900 9750</div>
        </Link>
      </section>

      {/* Message form */}
      <section className="md:w-[1120px] py-20 px-4 md:px-14 mx-4 md:mx-0 rounded-3xl bg-white shadow-lg">
        <ContactMessageForm />
      </section>

      {/* Map */}
      <section>
        <Map />
      </section>

      {/* FAQs */}
      <section className="relative w-full px-4 md:px-0" id="faq">
        {/*  <Image src={faq_bg} fill className="object-cover" alt="" /> */}
        <div className="relative z-10 w-full flex flex-col items-center gap-28 py-20">
          <h1 className="text-4xl md:text-7xl font-extrabold text-black">
            Frequently Asked Questions
          </h1>
          <div className="flex flex-col gap-y-6">
            {faqs.map((faq, key) => {
              return (
                <div className="md:w-[1200px]" key={key}>
                  <Accordion
                    sx={{
                      // width: "1200px",
                      padding: "20px 20px",
                    }}
                  >
                    <AccordionSummary
                      expandIcon={
                        <div className="p-5 rounded-full bg-[#5236FF] size-8 md:size-16 flex flex-row items-center justify-center">
                          <ExpandMoreIcon
                            sx={{ fontSize: "2.25rem", color: "white" }}
                          />
                        </div>
                      }
                      aria-controls="panel1-content"
                      id="panel1-header"
                      className="text-lg md:text-3xl font-extrabold"
                    >
                      {faq.question}
                    </AccordionSummary>
                    <AccordionDetails
                      sx={{
                        color: "#797979",
                        fontSize: "1.25rem",
                        lineHeight: "2rem",
                        whiteSpace: "pre-line",
                      }}
                    >
                      <div dangerouslySetInnerHTML={{ __html: faq.answer }} />
                    </AccordionDetails>
                  </Accordion>
                </div>
              );
            })}
            {/* <div className="md:w-[1200px]">
              <Accordion
                sx={{
                  // width: "1200px",
                  padding: "20px 20px",
                }}
              >
                <AccordionSummary
                  expandIcon={
                    <div className="p-5 rounded-full bg-[#5236FF] size-8 md:size-16 flex flex-row items-center justify-center">
                      <ExpandMoreIcon
                        sx={{ fontSize: "2.25rem", color: "white" }}
                      />
                    </div>
                  }
                  aria-controls="panel1-content"
                  id="panel1-header"
                  className="text-lg md:text-3xl font-extrabold"
                >
                  1. How to take the best passport photo in Toronto?
                </AccordionSummary>
                <AccordionDetails
                  sx={{
                    color: "#797979",
                    fontSize: "1.25rem",
                    lineHeight: "2rem",
                  }}
                >
                  The are going to use a passage of Lorem Ipsum, you need to be
                  sure tdembarrassing hidden in the middle of text. All the
                  Lorem generators on the Internet tend to repeat predefined
                  chunks as necessary, making this the first true generator on
                  the Internet. eget.
                </AccordionDetails>
              </Accordion>
            </div>
            <div className="md:w-[1200px]">
              <Accordion
                sx={{
                  // width: "1200px",
                  padding: "20px 20px",
                }}
              >
                <AccordionSummary
                  expandIcon={
                    <div className="p-5 rounded-full bg-[#5236FF] size-8 md:size-16 flex flex-row items-center justify-center">
                      <ExpandMoreIcon
                        sx={{ fontSize: "2.25rem", color: "white" }}
                      />
                    </div>
                  }
                  aria-controls="panel1-content"
                  id="panel1-header"
                  className="text-lg md:text-3xl font-extrabold"
                >
                  2. How can I return an item purchased online?
                </AccordionSummary>
                <AccordionDetails
                  sx={{
                    color: "#797979",
                    fontSize: "1.25rem",
                    lineHeight: "2rem",
                  }}
                >
                  The are going to use a passage of Lorem Ipsum, you need to be
                  sure tdembarrassing hidden in the middle of text. All the
                  Lorem generators on the Internet tend to repeat predefined
                  chunks as necessary, making this the first true generator on
                  the Internet. eget.
                </AccordionDetails>
              </Accordion>
            </div>
            <div className="md:w-[1200px]">
              <Accordion
                sx={{
                  // width: "1200px",
                  padding: "20px 20px",
                }}
              >
                <AccordionSummary
                  expandIcon={
                    <div className="p-5 rounded-full bg-[#5236FF] size-8 md:size-16 flex flex-row items-center justify-center">
                      <ExpandMoreIcon
                        sx={{ fontSize: "2.25rem", color: "white" }}
                      />
                    </div>
                  }
                  aria-controls="panel1-content"
                  id="panel1-header"
                  className="text-lg md:text-3xl font-extrabold"
                >
                  3. Can I cancel or change my booking?
                </AccordionSummary>
                <AccordionDetails
                  sx={{
                    color: "#797979",
                    fontSize: "1.25rem",
                    lineHeight: "2rem",
                  }}
                >
                  The are going to use a passage of Lorem Ipsum, you need to be
                  sure tdembarrassing hidden in the middle of text. All the
                  Lorem generators on the Internet tend to repeat predefined
                  chunks as necessary, making this the first true generator on
                  the Internet. eget.
                </AccordionDetails>
              </Accordion>
            </div>
            <div className="md:w-[1200px]">
              <Accordion
                sx={{
                  // width: "1200px",
                  padding: "20px 20px",
                }}
              >
                <AccordionSummary
                  expandIcon={
                    <div className="p-5 rounded-full bg-[#5236FF] size-8 md:size-16 flex flex-row items-center justify-center">
                      <ExpandMoreIcon
                        sx={{ fontSize: "2.25rem", color: "white" }}
                      />
                    </div>
                  }
                  aria-controls="panel1-content"
                  id="panel1-header"
                  className="text-lg md:text-3xl font-extrabold"
                >
                  4. I have a promotional or discount code?
                </AccordionSummary>
                <AccordionDetails
                  sx={{
                    color: "#797979",
                    fontSize: "1.25rem",
                    lineHeight: "2rem",
                  }}
                >
                  The are going to use a passage of Lorem Ipsum, you need to be
                  sure tdembarrassing hidden in the middle of text. All the
                  Lorem generators on the Internet tend to repeat predefined
                  chunks as necessary, making this the first true generator on
                  the Internet. eget.
                </AccordionDetails>
              </Accordion>
            </div>
            <div className="md:w-[1200px]">
              <Accordion
                sx={{
                  // width: "1200px",
                  padding: "20px 20px",
                }}
              >
                <AccordionSummary
                  expandIcon={
                    <div className="p-5 rounded-full bg-[#5236FF] size-8 md:size-16 flex flex-row items-center justify-center">
                      <ExpandMoreIcon
                        sx={{ fontSize: "2.25rem", color: "white" }}
                      />
                    </div>
                  }
                  aria-controls="panel1-content"
                  id="panel1-header"
                  className="text-lg md:text-3xl font-extrabold"
                >
                  5. How to take the best passport photo in Toronto?
                </AccordionSummary>
                <AccordionDetails
                  sx={{
                    color: "#797979",
                    fontSize: "1.25rem",
                    lineHeight: "2rem",
                  }}
                >
                  The are going to use a passage of Lorem Ipsum, you need to be
                  sure tdembarrassing hidden in the middle of text. All the
                  Lorem generators on the Internet tend to repeat predefined
                  chunks as necessary, making this the first true generator on
                  the Internet. eget.
                </AccordionDetails>
              </Accordion>
            </div> */}
          </div>
        </div>
      </section>
    </main>
  );
};

export default page;

import React from "react";
import Link from "next/link";
import Image from "next/image";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import EmailSubscriptionForm from "../EmailSubscriptionForm/EmailSubscriptionForm";

const Footer = () => {
  return (
    <footer className="w-full px-5 md:px-32 py-20 bg-[#1A1A1A] text-white">
      <div className="flex flex-col w-full md:w-[1200px] mx-auto">
        <div className="flex flex-col md:flex-row justify-between border-b-2 pb-16 w-full mb-4 gap-y-12">
          <div>
            <Link href="/" className="flex flex-row items-center">
              <Image
                src={"/logo/logo.png"}
                width={180}
                height={105}
                alt="logo"
              />
            </Link>
          </div>
          <div className="flex flex-row gap-32">
            <div className="flex flex-col gap-8">
              <h2 className="font-bold">Company</h2>
              <ul className="flex flex-col gap-4">
                <li>
                  <Link href={"/about"}>About</Link>
                </li>
                <li>
                  <Link href={"/services"}>Services</Link>
                </li>
                <li>
                  <Link href={"/#pricing"}>Pricing</Link>
                </li>
                <li>
                  <Link href={"/booking"}>Book now</Link>
                </li>
              </ul>
            </div>
            <div className="flex flex-col gap-8">
              <h2 className="font-bold">Help</h2>
              <ul className="flex flex-col gap-4">
                <li>
                  <Link href={"/contact#faq"}>FAQ</Link>
                </li>
                <li>
                  <Link href={"/contact"}>Contact us</Link>
                </li>
                <li>
                  <Link href={"/policy/terms"}>Terms</Link>
                </li>
                <li>
                  <Link href={"/policy/privacy"}>Privacy</Link>
                </li>
              </ul>
            </div>
          </div>
          {/* <div className="flex flex-col gap-8">
            <h2 className="font-bold">Subscribe</h2>
            <p>
              Join our newsletter to stay up to date on features and releases.
            </p>
            <form className="flex flex-row gap-10">
              <TextField
                id="standard-basic"
                label="Email"
                placeholder="Enter your email..."
                variant="standard"
                sx={{
                  color: "white",
                  "& .MuiInputBase-input": {
                    color: "white",
                  },
                  "& .MuiFormLabel-root": {
                    color: "white",
                  },
                  "& .MuiInputBase-root::before": {
                    borderBottom: "1px solid #ffffff",
                    "& .MuiInputBase-root::hover": {
                      borderBottom: "2px solid #ffffff",
                    },
                  },
                  "& .MuiInputBase-root::hover::not(.Mui-disabled, .Mui-error)::before":
                    {
                      borderBottom: "2px solid #ffffff",
                    },
                }}
              />
              <Button
                variant="outlined"
                sx={{
                  borderRadius: "100px",
                }}
              >
                Subscribe
              </Button>
            </form>
            <p className=" text-sm">
              By subscribing you agree to with our Privacy Policy and provide
              <br />
              consent to receive updates from our company.
            </p>
          </div> */}
          <EmailSubscriptionForm />
        </div>
        <div className=" text-xs md:text-base">
          © 2024 Lisa Photos. All rights reserved. Developed by
          <Link href={"https://www.codeinis.io/"} target="_blank">
            {" "}
            Codeinis.io
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

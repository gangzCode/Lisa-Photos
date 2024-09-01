import React from "react";
import Link from "next/link";
import { redirect } from "next/navigation";
import Image from "next/image";
import Button from "@mui/material/Button";

import logo from "/public/logo/logo.png";
import { getSession } from "@auth0/nextjs-auth0";
import UserControls from "../userControls/UserControls";

const Header = async () => {
  const session = await getSession();

  return (
    <header className="py-6 md:py-10 px-5 md:px-20 hidden md:flex flex-row w-full items-center justify-between">
      <Link href="/" className="flex flex-row items-center">
        <Image src={logo} width={115} height={73} alt="logo" />
        {/* <p className="font-bold text-xl">Lisa photos</p> */}
      </Link>

      <div className="flex flex-row gap-6 ">
        <ul className="flex flex-row gap-6 items-center bg-[#e0e0e0] py-5 px-12 rounded-full font-bold text-xl">
          <li>
            <Link
              href={"/"}
              className=" hover:text-[#5236FF] transition-colors"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              href={"/about"}
              className=" hover:text-[#5236FF] transition-colors"
            >
              About
            </Link>
          </li>
          <li>
            <Link
              href={"/services"}
              className=" hover:text-[#5236FF] transition-colors"
            >
              Services
            </Link>
          </li>
          {/* <li>
            <Link
              href={"/pricing"}
              className=" hover:text-[#5236FF] transition-colors"
            >
              Pricing
            </Link>
          </li> */}
          <li>
            <Link
              href={"/contact"}
              className=" hover:text-[#5236FF] transition-colors"
            >
              Contact
            </Link>
          </li>
        </ul>

        <Link
          href={"/booking"}
          className="rounded-full font-bold py-4 px-8 bg-[#5236FF] hover:bg-[#3925B2] transition-colors flex flex-row items-center justify-center text-white text-xl"
        >
          Book now
        </Link>

        {session ? (
          // <div>
          //   <Image
          //     src={session?.user.picture}
          //     alt={session?.user.name}
          //     width={32}
          //     height={32}
          //     className="rounded-full"
          //   />
          //   <h2>{JSON.stringify(session?.user)}</h2>
          //   <p>{session?.user.email}</p>
          //   <a
          //     href={"/api/auth/logout"}
          //     className="rounded-full font-bold py-4 px-8 bg-[#5236FF] hover:bg-[#3925B2] transition-colors flex flex-row items-center justify-center text-white text-xl"
          //   >
          //     Sign out
          //   </a>
          // </div>
          <UserControls />
        ) : (
          <a
            href="/api/auth/login"
            className="rounded-full font-bold py-4 px-8 bg-[#5236FF] hover:bg-[#3925B2] transition-colors flex flex-row items-center justify-center text-white text-xl"
          >
            Login
          </a>
        )}
      </div>
      {/* <button>login</button> */}
    </header>
  );
};

export default Header;

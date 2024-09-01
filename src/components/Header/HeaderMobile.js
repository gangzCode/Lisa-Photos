"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Button from "@mui/material/Button";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { useUser } from "@auth0/nextjs-auth0/client";
import UserControls from "../userControls/UserControls";

import logo from "/public/logo/logo.png";

export const HeaderMobile = () => {
  const { user, error, isLoading } = useUser();
  const [open, setOpen] = useState(false);

  const toggleDrawer = (value) => () => {
    setOpen(value);
  };

  return (
    <header className="py-6 md:py-10 px-5 md:px-20 flex md:hidden flex-col w-full ">
      <div className="w-full flex flex-row items-center justify-between">
        <Link href="/" className="flex flex-row items-center">
          <Image src={logo} width={101} height={58} alt="logo" />
          {/* <p className="font-bold text-xl">Lisa photos</p> */}
        </Link>
        <div className="flex flex-row">
          {!user && !error && !isLoading && (
            <Link
              href={"/api/auth/login"}
              className="rounded-full font-bold py-4 px-8 bg-[#5236FF] hover:bg-[#3925B2] flex flex-row items-center justify-center text-white text-xl"
              onClick={toggleDrawer(false)}
            >
              Login
            </Link>
          )}
          {user && !error && !isLoading && <UserControls />}
          <IconButton aria-label="menu" onClick={toggleDrawer(!open)}>
            <MenuIcon />
          </IconButton>
        </div>
      </div>

      {open && (
        <div className="flex flex-col gap-4 items-center">
          <ul className="flex flex-col gap-6 items-center py-5 px-12  font-bold text-xl">
            <li>
              <Link
                href={"/"}
                className=" hover:text-[#5236FF] transition-colors"
                onClick={toggleDrawer(false)}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href={"/about"}
                className=" hover:text-[#5236FF] transition-colors"
                onClick={toggleDrawer(false)}
              >
                About
              </Link>
            </li>
            <li>
              <Link
                href={"/services"}
                className=" hover:text-[#5236FF] transition-colors"
                onClick={toggleDrawer(false)}
              >
                Services
              </Link>
            </li>
            <li>
              <Link
                href={"/contact"}
                className=" hover:text-[#5236FF] transition-colors"
                onClick={toggleDrawer(false)}
              >
                Contact
              </Link>
            </li>
          </ul>

          <Link
            href={"/booking"}
            className="rounded-full font-bold py-4 px-8 bg-[#5236FF] hover:bg-[#3925B2] flex flex-row items-center justify-center text-white text-xl"
            onClick={toggleDrawer(false)}
          >
            Book now
          </Link>

          {/* {false ? (
            <Link
              href={"/api/auth/logout"}
              className="rounded-full font-bold py-4 px-8 bg-[#5236FF] hover:bg-[#3925B2] flex flex-row items-center justify-center text-white text-xl"
              onClick={toggleDrawer(false)}
            >
              Sign out
            </Link>
          ) : (
            
          )} */}
        </div>
      )}

      {/* <Drawer open={open} onClose={toggleDrawer(false)}></Drawer> */}

      {/* <button>login</button> */}
    </header>
  );
};

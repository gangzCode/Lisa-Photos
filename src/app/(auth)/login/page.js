import Link from "next/link";
import React from "react";
import Image from "next/image";
import LoginForm from "@/components/loginForm/LoginForm";
import { redirect } from "next/navigation";
import logo from "/public/logo/logo.png";

import signup_deco from "/public/auth/signup_deco.png";
import facebook from "/public/auth/providers/facebook.png";
import apple from "/public/auth/providers/apple.png";
import google from "/public/auth/providers/google.png";

const UserLogin = async () => {
  return (
    <main className=" flex md:min-h-screen flex-col items-center my-24 md:my-0 md:justify-center gap-6">
      <div className="absolute top-2 right-6 md:left-2 h-fit w-[100px] md:w-[223px]">
        <Link href="/">
          <Image src={logo} alt="logo" />
        </Link>
      </div>

      <div className="flex flex-col md:flex-row gap-x-36 gap-y-8 w-fit h-fit md:items-center justify-center ">
        <div className="md:p-6 flex flex-col gap-6 ">
          <div className="flex flex-col gap-2 md:gap-4">
            <h1 className="text-3xl md:text-6xl font-bold ">Sign in to</h1>
            <h2 className="text-xl md:text-4xl font-semibold ">
              Start booking your photoshoot
            </h2>
          </div>
          <div className="">
            <p>If you don&apos;t have an account</p>
            <p>
              You can{" "}
              <Link href="/register" className="text-[#4D47C3] font-semibold">
                Register Here!
              </Link>
            </p>
          </div>
          <Image
            src={signup_deco}
            alt=""
            className="bottom-0 absolute hidden md:block"
          />
        </div>

        <div className=" md:w-96">
          <h1 className="text-4xl font-semibold mb-10 hidden md:block">
            Sign in
          </h1>
          <LoginForm />
          <h2 className=" text-center my-12 text-[#B5B5B5]">
            or continue with
          </h2>
          <div
            id="oauth-providers"
            className="w-full flex items-center justify-center "
          >
            <div className="flex flex-row gap-6 w-fit">
              <Image src={facebook} alt="" />
              <Image src={apple} alt="" />
              <Image src={google} alt="" />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default UserLogin;

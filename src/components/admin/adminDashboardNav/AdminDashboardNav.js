"use client";

import Image from "next/image";
import React from "react";

import logo from "/public/logo/logo.png";
import admin_avatar from "/public/admin/admin_avatar.png";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";

const AdminDashboardNav = () => {
  const navButtonClass = "font-bold px-4 py-2 text-left";

  const router = useRouter();

  const handleLogout = () => {
    axios.get("/api/adminAuth/logout").then((res) => {
      if (res.data.success && res.data.success === true) {
        router.push("/admin/login");
      }
    });
  };

  return (
    <div className="flex flex-col h-full items-center gap-y-6 px-4 py-8 border-r-2 bg-white">
      <div className="flex flex-row items-center text-lg font-bold mb-4">
        <Image src={logo} width={80} height={40} alt="" /> Lisa Photo
      </div>
      
      <div className="border w-56 border-[#DFE5F1]"></div>
      <div className="flex flex-col w-full gap-4">
        <Link href={"/admin/dashboard/appointments"} className={navButtonClass}>
          Appointments
        </Link>
        <Link href={"/admin/dashboard/uploadPhotos"} className={navButtonClass}>
          Upload Photos
        </Link>
        <Link href={"/admin/dashboard/timeslots"} className={navButtonClass}>
          Time Slots
        </Link>
        <Link href={"/admin/dashboard/subscribers"} className={navButtonClass}>
          Subscribers
        </Link>
        <button onClick={handleLogout} className={navButtonClass}>
          Log Out
        </button>
      </div>
    </div>
  );
};

export default AdminDashboardNav;

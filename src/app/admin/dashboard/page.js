import React from "react";
import { redirect } from "next/navigation";
import { getSession } from "@/utils/admin_auth/session/Session";

const page = async () => {
  const session = await getSession();

  console.log("dashboard", session);

  if (session) redirect("/admin/dashboard/appointments");

  // return (
  //   <main className="flex min-h-screen flex-col items-center justify-center ">
  //     Dashboard
  //   </main>
  // );
};

export default page;

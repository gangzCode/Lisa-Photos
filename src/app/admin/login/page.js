import AdminLoginForm from "@/components/admin/adminLoginForm/AdminLoginForm";

import React from "react";
import { getSession } from "@/utils/admin_auth/session/Session";
import { redirect } from "next/navigation";

const page = async () => {
  const session = await getSession();

  console.log("Login page", session);

  if (session) redirect("/admin/dashboard");

  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <section>
        <AdminLoginForm />
      </section>
    </main>
  );
};

export default page;

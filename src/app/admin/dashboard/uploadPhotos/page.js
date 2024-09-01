import AppointmentWrapper from "@/components/admin/appointmentWrapper/AppointmentWrapper";
import React from "react";

const page = () => {
  return (
    <main className="w-full h-screen px-12 py-12 flex flex-col gap-8">
      <section className="font-bold text-3xl">Upload photos</section>

      <section className="overflow-y-scroll h-full">
        <AppointmentWrapper uploadPhotos />
      </section>
    </main>
  );
};

export default page;

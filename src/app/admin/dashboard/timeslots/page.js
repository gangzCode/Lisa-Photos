import TimeSlotsCreator from "@/components/TimeSlotsCreator/TimeSlotsCreator";
import React from "react";

const page = () => {
  return (
    <main className="w-full h-screen px-12 py-12 flex flex-col gap-8">
      <section className="font-bold text-3xl">Time slots</section>

      <section className="flex flex-col gap-4 h-full">
        <TimeSlotsCreator />
      </section>
    </main>
  );
};

export default page;

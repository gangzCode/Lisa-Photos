import React from "react";

import { getSession } from "@auth0/nextjs-auth0";
import { permanentRedirect, redirect } from "next/navigation";
import ProfileForm from "@/components/profileForm/ProfileForm";
import client from "@/utils/db/db";
import UserAppointment from "@/components/UserAppointments/UserAppointment/UserAppointment";
import Appointment from "@/components/admin/appointment/Appointment";

export const revalidate = 5;

const page = async () => {
  const session = await getSession();

  // console.log(session);
  if (!session) permanentRedirect("/api/auth/login");

  const retrieveUserAppointmentData = async () => {
    const dbClient = client;

    const appointments = dbClient
      .db("lisa-test")
      .collection("appointments")
      .find({
        email: session?.user.email,
        status: "done",
        digitalCopies: true,
      });

    const appointmentArray = await appointments.toArray();

    return appointmentArray;
  };

  const userAppointments = await retrieveUserAppointmentData();
  return (
    <main className="flex flex-col items-center gap-20 my-20">
      {/* My images */}
      <section className="md:w-[1120px] flex flex-col items-center gap-8 px-4 md:px-0">
        <h1 className="text-3xl md:text-5xl font-extrabold w-full">
          Request photos
        </h1>
        <div className="flex flex-col gap-4 w-full">
          {userAppointments.map((appointment, key) => {
            return (
              <UserAppointment
                key={key}
                appointment={{
                  ...appointment,
                  _id: appointment._id.toString(),
                }}
              />
            );
          })}

          {/* <UserAppointment
            name={"Security License"}
            status={"Pending"}
            ready={false}
          /> */}
        </div>
      </section>

      {/* Edit profile */}
      <section className="md:w-[890px] flex flex-col gap-8 px-4 md:px-0">
        <ProfileForm />
      </section>
    </main>
  );
};

export default page;

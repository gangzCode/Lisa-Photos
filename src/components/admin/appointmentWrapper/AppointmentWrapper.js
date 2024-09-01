"use client";

import React, { useEffect, useState } from "react";
import Appointment from "../appointment/Appointment";
import axios from "axios";

const AppointmentWrapper = ({ uploadPhotos = false }) => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const apiPath = uploadPhotos
      ? "/api/appointments/getPhotoRequestedAppointments"
      : "/api/appointments/getAllAppointments";

    axios
      .get(apiPath)
      .then((res) => {
        if (res.data.success && res.data.success === true) {
          // Sort appointments based on creation date in descending order
          const sortedAppointments = res.data.appointments.sort(
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
          );
          setAppointments(sortedAppointments);
          console.log(res.data.appointments);
          setLoading(false);
        } else {
          console.log(res);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  }, [uploadPhotos]);

  if (loading === true) return <div>Loading...</div>;

  const columnNamesRow = (
    <div className="flex flex-row justify-between w-[91.7%] px-8 items-center ">
      <div className="flex-1">Name</div>
      <div className="flex-1">Date</div>
      {!uploadPhotos && <div className="flex-1">Time</div>}
      <div className="flex-1">Email</div>
      <div className="flex-1">Contact no</div>
      <div className="flex-1">amount</div>
      <div className="flex-1">Paid</div>
      <div className="flex-1">Status</div>
    </div>
  );

  return (
    <div className="flex flex-col gap-4">
      {columnNamesRow}
      {appointments.map((appointment, key) => {
        return (
          <Appointment
            appointment={appointment}
            key={key}
            uploadPhotos={uploadPhotos}
          />
        );
      })}
    </div>
  );
};

export default AppointmentWrapper;

"use client";

import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
} from "@mui/material";
import React, { useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import dayjs from "dayjs";
import axios from "axios";
import ImageUploader from "./imageUploader/ImageUploader";

import { IconButton } from "@mui/material";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import Swal from "sweetalert2";
import utc from "dayjs/plugin/utc";

const Appointment = ({ appointment, uploadPhotos = false }) => {
  dayjs.extend(utc);
  const [currentStatus, setCurrentStatus] = useState(appointment.status);
  const [currentPaidStatus, setCurrentPaidStatus] = useState(appointment.paid);
  const [photos, setPhotos] = useState(appointment.photos);

  const handleStatusChange = (e, newStatus) => {
    e.stopPropagation();
    setCurrentStatus(newStatus);

    axios
      .post("/api/appointments/updateAppointmentStatus", {
        ...appointment,
        status: newStatus,
      })
      .then((res) => {
        if (res.data.success && res.data.success === true) {
          console.log("Appointment updated");
          // router.push("/admin/dashboard/appointments");
        }
      });
  };

  const handlePaidStatusChange = (e, newStatus) => {
    e.stopPropagation();
    setCurrentPaidStatus(newStatus);

    axios
      .post("/api/appointments/updateAppointmentPaidStatus", {
        ...appointment,
        paid: newStatus,
      })
      .then((res) => {
        if (res.data.success && res.data.success === true) {
          console.log("Appointment updated");
          // router.push("/admin/dashboard/appointments");
        }
      });
  };

  const handlePhotoAdd = () => {
    setPhotos([
      ...photos,
      {
        id: photos.length,
        imgData: "",
      },
    ]);
  };

  const handlePhotoRemove = () => {
    setPhotos(photos.slice(0, -1));
  };

  const handleImageSelection = (photoId, imgData) => {
    setPhotos(
      photos.map((photo) => {
        if (photo.id === photoId) {
          return { ...photo, imgData: imgData };
        } else return photo;
      })
    );
  };

  const handleSubmitImages = () => {
    axios
      .post("/api/appointments/updateAppointmentImages", {
        ...appointment,
        photos: photos,
      })
      .then((res) => {
        if (res.data.success && res.data.success === true) {
          console.log("Appointment updated");
          Swal.fire({
            title: "Photos saved",
            text: "Customer has been notified",
            icon: "success",
          });
          // router.push("/admin/dashboard/appointments");
        }
      });
  };

  return (
    <div>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <div className="flex flex-row justify-between w-full px-4 items-center gap-1">
            {/* Name */}
            <div className="flex-1 text-sm">{appointment.name}</div>
            {/* Date */}
            <div className="flex-1 text-sm">
              {dayjs(appointment.date).format("DD/MM/YYYY")}
            </div>
            {/* Time */}
            {!uploadPhotos && (
              <div className="flex-1 text-sm">
                {dayjs(appointment.slots[0].startTime).utc().format("hh:mm a")}{" "}
                - {dayjs(appointment.slots[0].endTime).utc().format("hh:mm a")}
              </div>
            )}
            <div className="flex-1 text-center text-sm">
              {appointment.user.email}
            </div>
            <div className="flex-1 text-center text-sm">
              {appointment.user.contactno}
            </div>
            <div className="flex-1 text-sm">{appointment.amount}</div>

            <div className="flex-1 ">
              <ToggleButtonGroup
                color="primary"
                value={currentPaidStatus}
                disabled={uploadPhotos}
                exclusive
                onChange={handlePaidStatusChange}
                aria-label="Platform"
              >
                <ToggleButton value={true}>Paid</ToggleButton>
                <ToggleButton value={false}>Unpaid</ToggleButton>
              </ToggleButtonGroup>
            </div>

            {/* Status */}
            <div className="flex-1 ">
              <ToggleButtonGroup
                color="primary"
                value={currentStatus}
                exclusive
                disabled={uploadPhotos}
                onChange={handleStatusChange}
                aria-label="Platform"
              >
                <ToggleButton value="booked" disabled>
                  booked
                </ToggleButton>
                <ToggleButton value="done">Completed</ToggleButton>
                <ToggleButton value="noshow">No show</ToggleButton>
              </ToggleButtonGroup>
            </div>
          </div>
        </AccordionSummary>
        <AccordionDetails>
          <div className="flex flex-col">
            <p>{appointment.country}</p>
            <div>
              {appointment.documents.map((doc) => (
                <div key={doc.id}>
                  <p>{doc.document}</p>
                  <p>{doc.size}</p>
                </div>
              ))}
            </div>
            {!uploadPhotos && (
              <div>
                {appointment.slots.map((slot, key) => {
                  if (key != 0)
                    return (
                      <div key={slot.id}>
                        <p>
                          {dayjs(slot.startTime).utc().format("hh:mm a")} -{" "}
                          {dayjs(slot.endTime).utc().format("hh:mm a")}
                        </p>
                      </div>
                    );
                })}
              </div>
            )}
            <div className="flex flex-col gap-4 mt-4">
              {uploadPhotos &&
                photos &&
                photos.map((photo) => (
                  <div key={photo.id}>
                    <ImageUploader
                      photoId={photo.id}
                      img={photo.imgData}
                      imageSelectHandler={handleImageSelection}
                    />
                  </div>
                ))}
            </div>
            {uploadPhotos && (
              <div>
                <div className="flex flex-row gap-4 items-center">
                  <IconButton
                    aria-label="remove"
                    disabled={photos.length <= 0}
                    onClick={() => handlePhotoRemove()}
                  >
                    <RemoveIcon />
                  </IconButton>
                  <IconButton aria-label="add" onClick={() => handlePhotoAdd()}>
                    <AddIcon />
                  </IconButton>
                </div>
                <div>
                  <Button variant="contained" onClick={handleSubmitImages}>
                    Save changes
                  </Button>
                </div>
              </div>
            )}
          </div>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default Appointment;

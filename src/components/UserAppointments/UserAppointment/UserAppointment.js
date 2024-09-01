"use client";

import React, { useState } from "react";
import Button from "@mui/material/Button";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import dayjs from "dayjs";
import axios from "axios";
import JSZip from "jszip";
import FileSaver from "file-saver";

const UserAppointment = ({ appointment }) => {
  // console.log(appointment);

  const [photoRequested, setPhotoRequested] = useState(
    appointment.isPhotoRequested
  );

  // const submitPhotoRequest = () => {
  //   axios
  //     .post("/api/appointments/updatePhotoRequest", appointment)
  //     .then((res) => {
  //       if (res.data.success && res.data.success === true) {
  //         setPhotoRequested(true);
  //         console.log("Photo requested");
  //       }
  //     });
  // };

  const dataURItoFile = (dataURI, filename) => {
    // Split the Data URI into its parts
    const [, mimeType, base64Data] = dataURI.match(/^data:(.*);base64,(.*)$/);

    // Convert base64 to binary
    const binaryData = atob(base64Data);
    const arrayBuffer = new ArrayBuffer(binaryData.length);
    const uint8Array = new Uint8Array(arrayBuffer);
    for (let i = 0; i < binaryData.length; i++) {
      uint8Array[i] = binaryData.charCodeAt(i);
    }

    // Create Blob
    const blob = new Blob([uint8Array], { type: mimeType });

    // Create File
    return new File([blob], filename, { type: mimeType });
  };

  const handleDownload = () => {
    var zip = new JSZip();

    appointment.photos.forEach((element, index) => {
      const imgName = `image_${index}.jpg`;
      const imgFile = dataURItoFile(element.imgData, imgName);
      zip.file(imgName, imgFile, { base64: true });
    });

    zip.generateAsync({ type: "blob" }).then(function (content) {
      FileSaver.saveAs(content, "Images.zip");
      // see FileSaver.js
    });
  };

  return (
    <div className="flex flex-col md:flex-row justify-between items-center gap-y-4 p-8 border-2 border-[#CCCCCC] rounded-3xl">
      <p className="text-2xl w-">
        {dayjs(appointment.date).format("DD/MM/YYYY")} -{" "}
        {appointment.package === "multi"
          ? "Multiple"
          : appointment.documents[0].document}{" "}
        - {appointment.country}
      </p>

      <div className="flex flex-col md:flex-row gap-4">
        {appointment.photos.length > 0 && (
          <div>
            <Button
              variant="contained"
              sx={{
                width: "190px",
                padding: "10px 20px",
                fontSize: "1.25rem",
                textTransform: "none",
                fontSize: "1.25rem",
                lineHeight: "1.75rem",
                background: "#048D11",
              }}
              onClick={handleDownload}
            >
              <div className="flex flex-row gap-2 items-center">
                <FileDownloadIcon />
                Download
              </div>
            </Button>
          </div>
        )}

        <div className="flex flex-row gap-2 items-center">
          {appointment.photos.length > 0 ? "Photos available" : "Pending"}
          {/* {ready ? <FileDownloadIcon /> : <AccessTimeIcon />}
          {status} */}
        </div>
      </div>
    </div>
  );
};

export default UserAppointment;

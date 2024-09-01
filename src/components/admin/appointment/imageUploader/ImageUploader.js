import axios from "axios";
import Image from "next/image";
import React, { useState } from "react";

const ImageUploader = ({ photoId, img, imageSelectHandler }) => {
  const [selectedImage, setSelectedImage] = useState(img);

  const handleImageSelect = (event) => {
    const imageFile = event.target.files[0];
    const imageUrl = URL.createObjectURL(imageFile);
    const reader = new FileReader();
    reader.onloadend = () => {
      // axios
      //   .post("/api/appointments/updateAppointmentImage", {
      //     id: appointmentId,
      //     docId: photoId,
      //     img: reader.result,
      //   })
      //   .then((res) => {
      //     if (res.data.success && res.data.success) {
      //       console.log("Updated");
      //     }
      //   });

      imageSelectHandler(photoId, reader.result);
    };
    if (imageFile) {
      reader.readAsDataURL(imageFile);
    }

    console.log(imageFile);
    setSelectedImage(imageUrl);
  };

  return (
    <div className="border-2 border-black p-4 rounded-xl w-fit">
      <div>
        {/* Input field for selecting images */}
        <input
          type="file"
          accept="image/*"
          // value={selectedImage}
          onChange={handleImageSelect}
        />

        {/* Display the selected image */}
        {selectedImage && (
          <div className=" w-96 h-fit">
            <Image
              src={selectedImage}
              alt="Selected"
              width={0}
              height={0}
              sizes="100vw"
              className="w-full h-auto"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageUploader;

"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import avatar from "/public/profile/profile_avatar.png";
import { useUser } from "@auth0/nextjs-auth0/client";
import Swal from "sweetalert2";
import axios from "axios";

const ProfileForm = () => {
  const { user, error, isLoading } = useUser();

  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    contactno: "",
    city: "",
    state: "",
  });

  const [originalData, setOriginalData] = useState({});

  const [isFormLoading, setisFormLoading] = useState(true);
  useEffect(() => {
    axios
      .get("/api/user/getUser")
      .then((res) => {
        // console.log(res);
        if (res.data.success && res.data.success === true) {
          const userData = res.data.user;

          setFormData(userData);
          setOriginalData(userData);

          setisFormLoading(false);
          // console.log(userData);
        } else if (
          res.data.success === false &&
          res.data.type === "user_null"
        ) {
          // console.log("user_null");
          // Swal.fire("Please update your details");
          setisFormLoading(false);
        }
      })
      .catch((error) => {
        // console.log(error);
      });
  }, []);

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSubmission = () => {
    axios
      .post("/api/user/updateUser", formData)
      .then((res) => {
        // console.log(res);
        if (res.data.success && res.data.success === true) {
          setOriginalData(formData)
          Swal.fire("Your details have been updated");
        }
      })
      .catch((error) => {
        // console.log(error);
      });
  };

  const handleFormCancel = () => {
    setFormData(originalData);
  };

  if (isLoading) return <div>Loading...</div>;
  if (isFormLoading) return <div>Form Loading...</div>;
  if (error) return <div>{error.message}</div>;

  const formTextFieldStyle = {
    width: "100%",
  };
  return (
    <>
      <div className="flex flex-col md:flex-row items-center justify-between gap-y-6 ">
        <p className="text-5xl font-extrabold">Edit Profile</p>
        <Image src={avatar} alt="" />
      </div>
      <form
        className="flex flex-col gap-6 md:gap-10 items-center"
        action={() => handleFormSubmission()}
      >
        <div className="w-full flex flex-col md:flex-row justify-between gap-y-6">
          <div className="md:w-[420px] h-fit">
            <TextField
              id="firstname"
              name="firstname"
              value={formData.firstname}
              label="First name"
              variant="outlined"
              sx={formTextFieldStyle}
              onChange={handleFormChange}
            />
          </div>
          <div className="md:w-[420px] h-fit">
            <TextField
              id="lastname"
              name="lastname"
              value={formData.lastname}
              label="Last name"
              variant="outlined"
              sx={formTextFieldStyle}
              onChange={handleFormChange}
            />
          </div>
        </div>
        <div className="w-full flex flex-row justify-between">
          <TextField
            id="email"
            name="email"
            value={formData.email}
            disabled
            label="Email"
            variant="outlined"
            sx={{ width: "100%" }}
            onChange={handleFormChange}
          />
        </div>
        <div className="w-full flex flex-row justify-between">
          <TextField
            id="contactnumber"
            name="contactno"
            value={formData.contactno}
            label="Contact Number"
            variant="outlined"
            sx={{ width: "100%" }}
            onChange={handleFormChange}
          />
        </div>
        <div className="w-full flex flex-col md:flex-row justify-between gap-y-6">
          <div className="md:w-[420px] h-fit">
            <TextField
              id="city"
              name="city"
              value={formData.city}
              label="City"
              variant="outlined"
              sx={formTextFieldStyle}
              onChange={handleFormChange}
            />
          </div>
          <div className="md:w-[420px] h-fit">
            <TextField
              id="state"
              name="state"
              value={formData.state}
              label="Province"
              variant="outlined"
              sx={formTextFieldStyle}
              onChange={handleFormChange}
            />
          </div>
        </div>
        <div className="w-full flex flex-row justify-between">
          <TextField
            name="password"
            label="Password"
            type="password"
            variant="outlined"
            sx={{ width: "100%" }}
          />
        </div>
        <div className="flex flex-col md:flex-row gap-6">
          <Button
            variant="outlined"
            sx={{
              width: "240px",
              fontWeight: "bold",
              textTransform: "none",
              fontSize: "1.25rem",
              lineHeight: "1.75rem",
              padding: "10px 25px",
              borderColor: "#5236FF",
            }}
            onClick={handleFormCancel}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            type="submit"
            sx={{
              width: "240px",
              fontWeight: "bold",
              textTransform: "none",
              fontSize: "1.25rem",
              lineHeight: "1.75rem",
              padding: "10px 25px",
              background: "#5236FF",
            }}
          >
            Save
          </Button>
        </div>
      </form>
    </>
  );
};

export default ProfileForm;

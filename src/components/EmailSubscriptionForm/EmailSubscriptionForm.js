"use client";

import { Button, TextField } from "@mui/material";
import React, { useState } from "react";
// import SimpleReactValidator from "simple-react-validator";
import { validate } from "react-email-validator";
import axios from "axios";
import Swal from "sweetalert2";

const EmailSubscriptionForm = () => {
  const [email, setEmail] = useState("");

  // const validator = new SimpleReactValidator();

  const handleSubmit = () => {
    if (email.trim() === "") return;
    if (!validate(email)) return;

    axios
      .post("/api/subscriptions/addEmail", { email })
      .then((res) => {
        if (res.data.success && res.data.success === true) {
          Swal.fire({
            icon: "success",
            title: "Subscribed",
          });
          setEmail("");
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div className="flex flex-col gap-8">
      <h2 className="font-bold">Subscribe</h2>
      <p>Join our newsletter to stay up to date on features and releases.</p>
      <form
        className="flex flex-row gap-10"
        action={() => {
          handleSubmit();
        }}
      >
        <TextField
          id="email"
          name="email"
          label="Email"
          placeholder="Enter your email..."
          variant="standard"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          sx={{
            color: "white",
            "& .MuiInputBase-input": {
              color: "white",
            },
            "& .MuiFormLabel-root": {
              color: "white",
            },
            "& .MuiInputBase-root::before": {
              borderBottom: "1px solid #ffffff",
              "& .MuiInputBase-root::hover": {
                borderBottom: "2px solid #ffffff",
              },
            },
            "& .MuiInputBase-root::before::hover::not(.Mui-disabled, .Mui-error)":
              {
                borderBottom: "2px solid #ffffff",
              },
          }}
        />
        <Button
          variant="outlined"
          type="submit"
          sx={{
            borderRadius: "100px",
          }}
        >
          Subscribe
        </Button>
      </form>
      <p className=" text-sm">
        By subscribing you agree to with our Privacy Policy and provide
        <br />
        consent to receive updates from our company.
      </p>
    </div>
  );
};

export default EmailSubscriptionForm;

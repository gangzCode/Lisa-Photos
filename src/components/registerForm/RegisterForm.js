"use client";

import React, { useState } from "react";
import { registerUser } from "@/app/actions/actions";
import SimpleReactValidator from "simple-react-validator";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    contactno: "",
    password: "",
    confirmpassword: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (validator.fieldValid(e.target.name)) {
      validator.hideMessageFor(e.target.name);
    } else {
      validator.showMessageFor(e.target.name);
      // console.log(validator.check(formData.email, "required|email"));
    }
  };

  const handleSubmit = (formData) => {
    registerUser(formData);
  };

  const [validator] = useState(new SimpleReactValidator());

  return (
    <form className=" flex flex-col gap-6" action={handleSubmit}>
      <TextField
        required
        id="email-input"
        label="Email"
        variant="outlined"
        name="email"
        value={formData.email}
        error={!validator.check(formData.email, "required|email")}
        helperText={validator.message(
          "email",
          formData.email,
          "required|email"
        )}
        onChange={(e) => {
          handleChange(e);
        }}
      />
      <TextField
        required
        id="username-input"
        label="Username"
        variant="outlined"
        name="username"
        value={formData.username}
        error={!validator.check(formData.username, "required|alpha_num_dash")}
        helperText={validator.message(
          "username",
          formData.username,
          "required|alpha_num"
        )}
        onChange={(e) => {
          handleChange(e);
        }}
      />
      <TextField
        required
        id="contactno-input"
        label="Contact number"
        variant="outlined"
        name="contactno"
        value={formData.contactno}
        error={!validator.check(formData.contactno, "required|phone")}
        helperText={validator.message(
          "contactno",
          formData.contactno,
          "required|phone"
        )}
        onChange={(e) => {
          handleChange(e);
        }}
      />
      <TextField
        required
        id="password-input"
        label="Password"
        variant="outlined"
        name="password"
        value={formData.password}
        error={!validator.check(formData.password, "required|alpha_num")}
        type="password"
        helperText={validator.message(
          "password",
          formData.password,
          "required|alpha_num"
        )}
        onChange={(e) => {
          handleChange(e);
        }}
      />
      <TextField
        required
        id="confirmpassword-input"
        label="Confirm Password"
        variant="outlined"
        name="confirmpassword"
        value={formData.confirmpassword}
        error={!validator.check(formData.confirmpassword, "required|alpha_num")}
        type="password"
        helperText={validator.message(
          "confirmpassword",
          formData.confirmpassword,
          "required|alpha_num"
        )}
        onChange={(e) => {
          handleChange(e);
        }}
      />

      <Button variant="contained" type="submit">
        Register
      </Button>
    </form>
  );
};

export default RegisterForm;

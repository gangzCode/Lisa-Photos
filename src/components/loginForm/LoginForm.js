"use client";

import React, { useState } from "react";
import { registerUser } from "@/app/actions/actions";
import SimpleReactValidator from "simple-react-validator";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

const LoginForm = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (validator.fieldValid(e.target.name)) {
      validator.hideMessageFor(e.target.name);
    } else {
      validator.showMessageFor(e.target.name);
    }
  };

  const [validator] = useState(new SimpleReactValidator());

  return (
    <form
      className=" flex flex-col gap-6"
      // action={() => {
      //   signIn("credentials", {
      //     username: formData.username,
      //     password: formData.password,
      //   });
      // }}
    >
      <TextField
        required
        id="emailusername-input"
        label="Email or Username"
        variant="outlined"
        name="username"
        value={formData.username}
        error={!validator.check(formData.username, "required|string")}
        helperText={validator.message(
          "username",
          formData.username,
          "required|string"
        )}
        onChange={(e) => {
          handleChange(e);
        }}
      />
      <div className="flex flex-col">
        <TextField
          required
          id="password-input"
          label="Password"
          variant="outlined"
          name="password"
          value={formData.password}
          error={!validator.check(formData.password, "required|alpha_num")}
          helperText={validator.message(
            "password",
            formData.password,
            "required|alpha_num"
          )}
          onChange={(e) => {
            handleChange(e);
          }}
        />
        <p className="text-right text-[#B0B0B0]">Forgot password?</p>
      </div>
      <Button variant="contained" type="submit">
        Login
      </Button>
    </form>
  );
};

export default LoginForm;

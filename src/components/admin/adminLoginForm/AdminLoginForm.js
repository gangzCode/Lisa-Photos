"use client";

import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import SimpleReactValidator from "simple-react-validator";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import axios from "axios";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Box } from "@mui/material";
import { redirect } from "next/navigation";
import Swal from "sweetalert2";

const LoginForm = () => {
  const router = useRouter();

  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const changeHandler = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
    validator.showMessages();
  };

  const [validator] = useState(new SimpleReactValidator());

  const submitForm = (e) => {
    e.preventDefault();
    if (validator.allValid()) {
      validator.hideMessages();
      axios
        .post("/api/adminAuth/login", credentials)
        .then((res) => {
          if (res.data.success && res.data.success === true) {
            router.push("/admin/dashboard/appointments");
          } else {
            Swal.fire(res.data.message);
            // console.log("error occured during login");
          }
        })
        .catch((error) => {
          // console.log(error);
        });
    } else {
      validator.showMessages();
      toast.error("Empty field is not allowed!");
    }
  };

  return (
    <div className=" w-[500px] px-24 py-16 shadow-xl border rounded-3xl">
      <div className="flex flex-col gap-4 items-center w-full">
        <h2>Sign In</h2>
        <p>Sign in to your account</p>
        <form onSubmit={submitForm} className="flex flex-col w-full">
          <div className="flex flex-col gap-4">
            <div>
              <TextField
                className="inputOutline"
                fullWidth
                placeholder="E-mail"
                value={credentials.email}
                variant="outlined"
                helperText={validator.message(
                  "email",
                  credentials.email,
                  "required"
                )}
                name="email"
                label="Email"
                InputLabelProps={{
                  shrink: true,
                }}
                onBlur={(e) => changeHandler(e)}
                onChange={(e) => changeHandler(e)}
              />
            </div>
            <div>
              <TextField
                className="inputOutline"
                fullWidth
                placeholder="Password"
                value={credentials.password}
                helperText={validator.message(
                  "password",
                  credentials.password,
                  "required"
                )}
                variant="outlined"
                name="password"
                type="password"
                label="Password"
                InputLabelProps={{
                  shrink: true,
                }}
                onBlur={(e) => changeHandler(e)}
                onChange={(e) => changeHandler(e)}
              />
            </div>
            <div>
              <div className="formFooter">
                <Button fullWidth variant="contained" type="submit">
                  Login
                </Button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;

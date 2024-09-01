"use client";

import React, { useState } from "react";
import { StepsProvider } from "react-step-builder";
import FormSteps from "./formSteps/FormSteps";

import { Steps, useSteps } from "react-step-builder";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

const BookingForm = () => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <StepsProvider>
        <FormSteps />
      </StepsProvider>
    </LocalizationProvider>
  );
};

export default BookingForm;

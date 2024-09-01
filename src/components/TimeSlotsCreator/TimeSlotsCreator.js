"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import {
  DatePicker,
  LocalizationProvider,
  TimePicker,
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Button from "@mui/material/Button";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import { IconButton } from "@mui/material";
import { Delete } from "@mui/icons-material";

const TimeSlotsCreator = () => {
  dayjs.extend(utc);

  const [year, setYear] = useState(null);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [templateSlots, setTemplateSlots] = useState([]);
  const [selectedMonths, setSelectedMonths] = useState([
    false, //jan
    false, //feb
    false, //mar
    false, //apr
    false, //may
    false, //jun
    false, //jul
    false, //aug
    false, //sep
    false, //oct
    false, //nov
    false, //dec
  ]);

  const monthLabels = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const [date, setDate] = useState(null);
  const [selectedDaySlots, setSelectedDaySlots] = useState([]);
  const [dateSlotsModified, setDateSlotsModified] = useState(false);

  // Batch Modification functions
  const createTemplateSlot = () => {
    setTemplateSlots([
      ...templateSlots,
      {
        id:
          templateSlots.length === 0
            ? 0
            : templateSlots[templateSlots.length - 1].id + 1,
        startTime: startTime.utc().format(),
        endTime: endTime.utc().format(),
        booked: false,
      },
    ]);
  };

  const deleteTemplateSlot = (id) => {
    setTemplateSlots(templateSlots.filter((slot) => slot.id != id));
  };

  const handleMonthSelect = (e, monthIndex) => {
    const updatedMonths = selectedMonths.map((month, i) => {
      console.log(month);
      if (monthIndex === i) {
        console.log("Changing", monthIndex);
        return e.target.checked;
      } else {
        return month;
      }
    });

    setSelectedMonths(updatedMonths);

    console.log(selectedMonths);
  };

  const submitTimeslotGenerationData = () => {
    axios
      .post("/api/timeslots/generateBatchTimeslots", {
        year,
        templateSlots,
        selectedMonths,
      })
      .then((res) => {
        if (res.data.success && res.data.success === true) {
          console.log("Timeslots update");
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  //Single date update functions
  const handleDateChange = (val) => {
    setDate(val);
    setDateSlotsModified(false);

    axios
      .get("/api/timeslots/getTimeslots", {
        params: { date: val.utc(true).format() },
      })
      .then((res) => {
        if (res.data.success && res.data.success === true) {
          setSelectedDaySlots(res.data.slots);
          console.log("Retrieved timeslots for date", res.data.slots);
        }
      })
      .catch((error) => {
        console.error("Error fetching time slots for date:", error);
      });
  };

  const deleteTimeslot = (slotId) => {
    setDateSlotsModified(true);

    setSelectedDaySlots(selectedDaySlots.filter((slot) => slotId != slot.id));
  };

  const submitModifiedSlots = () => {
    axios
      .post("/api/timeslots/submitTimeslots", {
        date: date.utc(true).format(),
        slots: selectedDaySlots,
      })
      .then((res) => {
        if (res.data.success && res.data.success === true) {
          console.log("Changes saved");
          setDateSlotsModified(false);
        }
      });
  };

  // const createTimeslot = () => {
  //   setSlots([
  //     ...slots,
  //     {
  //       id: slots.length === 0 ? 0 : slots[slots.length - 1].id + 1,
  //       startTime: startTime.utc().format(),
  //       endTime: endTime.utc().format(),
  //       booked: false,
  //       isDeleted: false,
  //     },
  //   ]);
  //   setShowSubmitButton(true);
  // };

  // const deleteTimeSlot = (slotId) => {
  //   if (!year || !date) {
  //     alert("Please select a year and a date.");
  //     return;
  //   }

  //   // Set isDeleted flag to true for the selected time slot
  //   const updatedSlots = slots.map((slot) =>
  //     slot.id === slotId ? { ...slot, isDeleted: true } : slot
  //   );
  //   setSlots(updatedSlots);

  //   // Update the server with the isDeleted flag
  //   axios
  //     .post("/api/timeslots/deleteTimeSlots", {
  //       year: year,
  //       date: date.utc().format(),
  //       slotId: slotId,
  //       isDeleted: true, // Send isDeleted flag to the server
  //     })
  //     .then((res) => {
  //       if (res.data.success && res.data.success === true) {
  //         console.log("Time slot marked as deleted.");
  //       }
  //     })
  //     .catch((error) => {
  //       console.error("Error deleting time slot:", error);
  //     });
  // };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className="border-2 p-10 flex flex-row gap-4 ">
        <div className="flex flex-col gap-4 p-4 border border-[#bfbfbf] rounded-lg flex-1">
          <p>Apply batch timeslots</p>
          <div className="flex flex-row gap-4">
            <div>
              <TimePicker
                label="Start time"
                value={startTime}
                onChange={(newValue) => setStartTime(newValue.utc(true))}
              />
            </div>
            <div>
              <TimePicker
                label="End time"
                value={endTime}
                onChange={(newValue) => setEndTime(newValue.utc(true))}
              />
            </div>
            <Button
              variant="contained"
              onClick={createTemplateSlot}
              disabled={!startTime || !endTime}
            >
              Create timeslot
            </Button>
          </div>
          <div className="overflow-y-auto max-h-[150px]">
            <div className="flex flex-row flex-wrap gap-4 w-full">
              {templateSlots.map((slot, index) => {
                return (
                  <div
                    key={slot.id}
                    className="flex flex-row items-center justify-between p-2 bg-white rounded-lg border gap-2"
                  >
                    <p>
                      {index} : {dayjs(slot.startTime).utc().format("hh:mm a")}{" "}
                      - {dayjs(slot.endTime).utc().format("hh:mm a")}
                    </p>
                    <IconButton
                      variant="contained"
                      onClick={() => deleteTemplateSlot(slot.id)}
                    >
                      <Delete />
                    </IconButton>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {templateSlots.length > 0 && (
          <div className="flex-1 flex flex-col gap-4 p-4 border border-[#bfbfbf] rounded-lg">
            <div className="flex flex-col gap-4">
              <p>Select year and months to replace timeslots</p>
              <div className="flex flex-row gap-4 items-center">
                <DatePicker
                  label="Select Year"
                  value={year}
                  onChange={(value) => setYear(value)}
                  views={["year"]}
                  inputFormat="yyyy"
                />
                <div>
                  <Button
                    variant="contained"
                    onClick={() => {
                      submitTimeslotGenerationData();
                    }}
                    disabled={selectedMonths.every((v) => v === false) || !year}
                  >
                    Replace timeslots
                  </Button>
                </div>
              </div>
              <ul className="flex flex-row flex-wrap gap-4">
                {year &&
                  selectedMonths.map((month, key) => {
                    return (
                      <li
                        key={key}
                        className="p-2 bg-white border w-fit rounded-xl"
                      >
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={month}
                              onChange={(e) => handleMonthSelect(e, key)}
                              inputProps={{ "aria-label": "controlled" }}
                            />
                          }
                          label={monthLabels[key]}
                        />
                      </li>
                    );
                  })}
              </ul>
            </div>
          </div>
        )}
      </div>

      <div className="border-2 p-10 flex flex-col gap-4">
        <p>Modify timeslots</p>
        <div className="flex flex-row gap-4 ">
          <DatePicker
            label="Select Date"
            value={date}
            onChange={(value) => handleDateChange(value)}
          />

          <Button
            variant="contained"
            onClick={() => {
              submitModifiedSlots();
            }}
            disabled={!dateSlotsModified}
          >
            Save changes
          </Button>
        </div>
        <div className="overflow-y-scroll max-h-60">
          {date && (
            <div className="flex flex-row flex-wrap gap-4">
              {selectedDaySlots.map((slot) => (
                <div
                  key={slot.id}
                  className="flex flex-row items-center justify-between p-2 bg-white rounded-lg border gap-2 w-fit"
                >
                  {dayjs(slot.startTime).utc().format("hh:mm a")} -{" "}
                  {dayjs(slot.endTime).utc().format("hh:mm a")}
                  <IconButton
                    variant="contained"
                    onClick={() => deleteTimeslot(slot.id)}
                  >
                    <Delete />
                  </IconButton>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </LocalizationProvider>
  );
};

export default TimeSlotsCreator;

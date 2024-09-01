import React, { useState, useEffect } from "react";
import { Steps, useSteps } from "react-step-builder";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import Button from "@mui/material/Button";
import Image from "next/image";
import booking_add_icon from "/public/booking/formIcons/booking_add_icon.png";
import booking_date_icon from "/public/booking/formIcons/booking_date_icon.png";
import booking_time_icon from "/public/booking/formIcons/booking_time_icon.png";
import payment_icons from "/public/booking/formIcons/payment_icons.png";
import booking_confirmed from "/public/booking/formIcons/booking_confirmed.png";
import booking_failed from "/public/booking/formIcons/booking_confirmed.png"; //REPLACE WITH SUITABLE IMAGE
import dayjs from "dayjs";
import axios from "axios";
import Swal from "sweetalert2";
import data from "../../../../public/data/data.json";
import utc from "dayjs/plugin/utc";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { ListItemText, Modal, styled } from "@mui/material";
import feature_check from "../../../../public/feature_check.png";

import Select from "@mui/material/Select";
import { IconButton } from "@mui/material";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import CheckoutWrapper from "@/components/CheckoutWrapper/CheckoutWrapper";
import CancelIcon from "@mui/icons-material/Cancel";
// import { $, add, multiply } from "moneysafe";
import currency from "currency.js";
import CloseIcon from "@mui/icons-material/Close";
import CheckIcon from "@mui/icons-material/Check";
import { deepPurple, grey, purple } from "@mui/material/colors";

const FormSteps = () => {
  dayjs.extend(utc);

  const { prev, next, jump, total, current, progress } = useSteps();

  // const [appointments, setAppointments] = useState([]);

  const [slots, setSlots] = useState([]);
  const [hasRequestedSlots, setHasRequestedSlots] = useState(false);
  const [slotsReceived, setSlotsReceived] = useState(false);
  const [selectedTimeSlots, setSelectedTimeSlots] = useState([]);
  const [familyAddon, setFamilyAddon] = useState(false);
  const [numFamilyMembers, setNumFamilyMembers] = useState(0);

  const [initPayment, setInitPayment] = useState(false);

  const [timeslotSummaryModalOpen, setTimeslotSummaryModalOpen] =
    useState(false);

  const [formData, setFormData] = useState({
    package: "",
    country: "",
    documents: [
      {
        id: 0,
        document: "",
        size: "",
      },
    ],
    photos: [],
    date: "",
    time: "",
    timeslots: [],
    specialrequest: "",
    addon: 0,
    digitalCopies: false,
  });

  const [documentTypes, setDocumentTypes] = useState([]);
  const [documentSizes, setDocumentSizes] = useState([]);

  useEffect(() => {
    if (formData.country) {
      const selectedCountryData = data[formData.country];
      if (selectedCountryData) {
        const types = Object.keys(selectedCountryData); // Get document types
        setDocumentTypes(types);

        // const selectedType = formData.document;
        // const sizes = selectedType ? selectedCountryData[selectedType] : [];
        // setDocumentSizes(sizes);
      }
    }
  }, [formData.country, formData.documents]);

  const countries = Object.keys(data); // Get countries from JSON data

  const handleChange = (key, value) => {
    setFormData({ ...formData, [key]: value === null ? "" : value });

    // console.log(key);
    // console.log(value);
  };

  const handlePackageChange = (value) => {
    if (value === formData.package) {
      setFormData({
        ...formData,
        package: "",
        country: "",
        documents: [{ id: 0, document: "", size: "" }],
        addon: 0,
      });
    } else {
      setFormData({
        ...formData,
        package: value,
        country: "",
        documents: [{ id: 0, document: "", size: "" }],
        addon: 0,
      });
    }
  };

  const getTimeslots = (value) => {
    // if (date === null) return;
    setHasRequestedSlots(true);
    // setSlotsReceived(false);
    axios
      .get("/api/timeslots/getAvailableTimeslots", {
        params: { date: value },
      })
      .then((res) => {
        setSlotsReceived(true);
        if (res.data.success && res.data.success === true) {
          console.log(res.data.slots);
          setSlots(res.data.slots);
        }
      });
  };

  const handleTimeslotsSelect = (timeslots) => {
    // const maxSlots =
    //   formData.package === "family" ? 4 + formData.addon : 1 + formData.addon;

    console.log(formData);
    // if (formData.timeslots.length < maxSlots)
    setFormData({ ...formData, timeslots: timeslots });
  };

  const handleSubmit = (isPaid) => {
    axios
      .post("/api/appointments/submitAppointment", {
        ...formData,
        date: formData.date.utc(true).format(),
        dateCreated: dayjs().utc(true).format(),
        paid: isPaid,
      })
      .then((res) => {
        if (res.data.success && res.data.success === true) {
          jump(6);
        } else {
          Swal.fire(
            "Unknown error occured, please contact Lisa Photos Immediately"
          );
        }
      });
  };

  const PurplePackageButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText("#657BF0"),
    backgroundColor: "#657BF0",
    "&:hover": {
      backgroundColor: "#1738e8",
    },
  }));

  const WhitePackageButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText(grey[50]),
    backgroundColor: grey[50],
    "&:hover": {
      backgroundColor: grey[300],
    },
  }));

  const handlePaymentFailed = () => {
    jump(7);
  };

  const getPackageAmount = () => {
    return formData.package === "single"
      ? currency(14.99)
      : formData.package === "family"
      ? currency(49.99)
      : currency(24.99);
  };
  const getAddonsAmount = () => {
    return formData.package === "multi"
      ? currency(14.99).multiply(formData.addon)
      : currency(14.99).multiply(formData.addon);
  };

  const getDigitalCopiesAmount = () => {
    return formData.package === "single"
      ? currency(9.99).add(currency(9.99).multiply(formData.addon))
      : formData.package === "family"
      ? currency(39.96).add(currency(9.99).multiply(formData.addon))
      : currency(19.98).add(currency(19.98).multiply(formData.addon));
  };

  const getSubtotal = () => {
    if (formData.digitalCopies)
      return getPackageAmount()
        .add(getAddonsAmount())
        .add(getDigitalCopiesAmount());
    else return getPackageAmount().add(getAddonsAmount());
  };

  const getTaxAmount = () => {
    return currency(getSubtotal(), { increment: 0.01 }).multiply(0.13);
  };

  const getTotal = () => {
    return getSubtotal().add(getTaxAmount());
  };

  return (
    <div className=" flex flex-col items-center border border-[#C6C6C6] bg-white rounded-2xl px-4 md:px-20 py-14 relative shadow-lg w-full md:w-fit">
      <Steps>
        {/* Step 1 content */}
        <div className="w-full md:w-[1150px] flex flex-col items-center gap-8">
          <h1 className="text-4xl font-bold">Select A Package</h1>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Single Package */}
            <div className="flex flex-col items-center gap-4">
              <div className="flex flex-col items-center py-8 border border-black rounded-3xl gap-8 w-full md:w-[360px]">
                <div className="flex flex-col items-center gap-2">
                  <p className="text-xl font-semibold">ONE ID PHOTO</p>
                  <p className="text-3xl bg-[#210068] text-white font-semibold p-4 px-10 rounded-full">
                    INDIVIDUAL
                  </p>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <p className="text-3xl">
                    $
                    <span className="text-6xl font-extrabold text-[#657BF0]">
                      14.99
                    </span>
                  </p>
                  <p className="text-[#AEAEAE] text-2xl font-bold">/session</p>
                </div>
                <div className="flex flex-col w-full px-10 gap-4">
                  <div className="flex flex-row gap-2 text-sm font-semibold">
                    <Image src={feature_check} width={18} height={12} alt="" />
                    Any one ID Photo
                  </div>
                  <div className="flex flex-row gap-2 text-sm font-semibold">
                    <Image src={feature_check} width={18} height={12} alt="" />
                    For One Person
                  </div>
                </div>
                <PurplePackageButton
                  variant="contained"
                  sx={{
                    borderRadius: "100px",
                    padding: "10px 25px",
                    // marginTop: "-22px",
                    fontWeight: "bold",
                    textTransform: "none",
                    fontSize: "1.25rem",
                    lineHeight: "1.75rem",
                  }}
                  disabled={formData.package === "single"}
                  onClick={() => {
                    handlePackageChange("single");
                  }}
                >
                  {formData.package === "single" ? "Selected" : "Select"}
                </PurplePackageButton>
              </div>
              {formData.package === "single" && (
                <div className="flex flex-row gap-4 items-center border border-black rounded-xl p-4">
                  <p className="font-bold">Add members</p>
                  <div className="flex flex-row gap-4 items-center">
                    <IconButton
                      aria-label="remove"
                      disabled={formData.addon === 0}
                      onClick={() => {
                        setFormData({
                          ...formData,
                          addon: formData.addon === 0 ? 0 : formData.addon - 1,
                        });
                      }}
                    >
                      <RemoveIcon />
                    </IconButton>
                    <p>{formData.addon}</p>

                    <IconButton
                      aria-label="add"
                      onClick={() => {
                        setFormData({
                          ...formData,
                          addon: formData.addon + 1,
                        });
                      }}
                    >
                      <AddIcon />
                    </IconButton>
                  </div>
                </div>
              )}
            </div>
            {/* Family Package */}
            <div className="flex flex-col items-center gap-4">
              <div className="flex flex-col items-center py-8  bg-[#657BF0] rounded-3xl gap-8 text-white px-8 w-full md:w-[360px]">
                <div className="text-[#657BF0] bg-[#F6ED10] w-full text-center py-3 rounded-lg text-sm">
                  ★ Most Popular
                </div>
                <div className="flex flex-col items-center gap-2">
                  <p className="text-xl text-white">ONE ID PHOTO</p>
                  <p className="text-3xl bg-white text-[#657BF0] font-semibold p-4 px-10 rounded-full">
                    FAMILY
                  </p>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <p className="text-3xl text-white">
                    $
                    <span className="text-6xl font-extrabold text-white">
                      49.99
                    </span>
                  </p>
                  <p className="text-[#EAEAEA] text-2xl font-bold">/session</p>
                </div>
                <div className="flex flex-col text-white text-2xl">
                  One ID Photo
                </div>
                <div className="flex flex-col text-white text-2xl">
                  For Four People
                </div>
                <WhitePackageButton
                  variant="outlined"
                  sx={{
                    borderRadius: "100px",
                    padding: "10px 25px",
                    // marginTop: "-22px",
                    fontWeight: "bold",
                    textTransform: "none",
                    fontSize: "1.25rem",
                    lineHeight: "1.75rem",
                  }}
                  disabled={formData.package === "family"}
                  onClick={() => {
                    handlePackageChange("family");
                  }}
                >
                  {formData.package === "family" ? "Selected" : "Select"}
                </WhitePackageButton>
              </div>
              {formData.package === "family" && (
                <div className="flex flex-row gap-4 items-center border border-black rounded-xl p-4">
                  <p className="font-bold">Add members</p>
                  <div className="flex flex-row gap-4 items-center">
                    <IconButton
                      aria-label="remove"
                      disabled={formData.addon === 0}
                      onClick={() => {
                        setFormData({
                          ...formData,
                          addon: formData.addon === 0 ? 0 : formData.addon - 1,
                        });
                      }}
                    >
                      <RemoveIcon />
                    </IconButton>
                    <p>{formData.addon}</p>

                    <IconButton
                      aria-label="add"
                      onClick={() => {
                        setFormData({
                          ...formData,
                          addon: formData.addon + 1,
                        });
                      }}
                    >
                      <AddIcon />
                    </IconButton>
                  </div>
                </div>
              )}
            </div>
            {/* Multi Package */}
            <div className="flex flex-col items-center gap-4">
              <div className="flex flex-col items-center py-8 border border-black rounded-3xl gap-8 px-8 md:w-[360px]">
                <div className="flex flex-col items-center gap-2">
                  <p className="text-xl font-semibold">TWO ID PHOTO</p>
                  <p className="text-3xl bg-[#210068] text-white font-semibold p-4 px-10 rounded-full">
                    MULTI
                  </p>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <p className="text-3xl">
                    $
                    <span className="text-6xl font-extrabold text-[#657BF0]">
                      24.99
                    </span>
                  </p>
                  <p className="text-[#AEAEAE] text-2xl font-bold">/session</p>
                </div>
                <div className="flex flex-col w-full px-10 gap-4">
                  <div className="flex flex-row gap-2 text-sm font-semibold">
                    <Image src={feature_check} width={18} height={12} alt="" />
                    Any Two ID Photos
                  </div>
                  <div className="flex flex-row gap-2 text-sm font-semibold">
                    <Image src={feature_check} width={18} height={12} alt="" />
                    For One Person
                  </div>
                </div>
                <PurplePackageButton
                  variant="contained"
                  sx={{
                    borderRadius: "100px",
                    padding: "10px 25px",
                    // marginTop: "-22px",
                    fontWeight: "bold",
                    textTransform: "none",
                    fontSize: "1.25rem",
                    lineHeight: "1.75rem",
                  }}
                  disabled={formData.package === "multi"}
                  onClick={() => {
                    handlePackageChange("multi");
                  }}
                >
                  {formData.package === "multi" ? "Selected" : "Select"}
                </PurplePackageButton>
              </div>
              {formData.package === "multi" && (
                <div className="flex flex-row gap-4 items-center border border-black rounded-xl p-4">
                  <p className="font-bold">Add members</p>
                  <div className="flex flex-row gap-4 items-center">
                    <IconButton
                      aria-label="remove"
                      disabled={formData.addon === 0}
                      onClick={() => {
                        setFormData({
                          ...formData,
                          addon: formData.addon === 0 ? 0 : formData.addon - 1,
                        });
                      }}
                    >
                      <RemoveIcon />
                    </IconButton>
                    <p>{formData.addon}</p>

                    <IconButton
                      aria-label="add"
                      onClick={() => {
                        setFormData({
                          ...formData,
                          addon: formData.addon + 1,
                        });
                      }}
                    >
                      <AddIcon />
                    </IconButton>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Step 2 content */}
        <div className="flex flex-col items-center gap-10 w-full md:w-[500px] ">
          <h1 className="text-4xl font-bold">Select Document</h1>
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            name="country"
            options={countries}
            sx={{ width: "100%" }}
            value={formData.country}
            onChange={(e, value) => {
              handleChange("country", value);
            }}
            renderInput={(params) => (
              <TextField {...params} label="Countries" />
            )}
          />
          {formData.documents.map((document) => {
            // console.log(document);
            return (
              <div key={document.id} className="flex flex-col gap-4">
                <Autocomplete
                  disablePortal
                  id="combo-box-demo"
                  name="document"
                  onChange={(e, value) => {
                    // handleChange("document", value);

                    // Automatically set the size based on the selected document type
                    const selectedCountryData = data[formData.country];
                    if (selectedCountryData && value) {
                      const size = selectedCountryData[value];
                      // setFormData((prevData) => ({ ...prevData, size: size }));
                      setFormData({
                        ...formData,
                        documents: formData.documents.map((doc) => {
                          if (doc.id === document.id)
                            return { ...doc, document: value, size: size };
                          return doc;
                        }),
                      });
                    }
                  }}
                  options={documentTypes}
                  sx={{ width: "100%" }}
                  renderInput={(params) => (
                    <TextField {...params} label="Document Type" />
                  )}
                />
                <div>
                  <p className="text-xl font-bold">Size:</p>
                  <TextField
                    disabled
                    value={formData.documents[document.id].size}
                    sx={{ width: "100%" }}
                  />
                </div>
              </div>
            );
          })}
          {formData.package === "multi" && (
            <div className="flex flex-row gap-4">
              <IconButton
                aria-label="add"
                disabled={formData.documents.length >= 2}
                onClick={() => {
                  setFormData({
                    ...formData,
                    documents: [
                      ...formData.documents,
                      {
                        id: formData.documents.length,
                        document: "",
                        size: "",
                      },
                    ],
                  });
                }}
              >
                <AddIcon />
              </IconButton>
              <IconButton
                aria-label="remove"
                disabled={formData.documents.length < 2}
                onClick={() => {
                  setFormData({
                    ...formData,
                    documents: formData.documents.slice(0, -1),
                  });
                }}
              >
                <RemoveIcon />
              </IconButton>
            </div>
          )}
          {/* Display the size for the selected document type */}
        </div>

        {/* Step 3 content */}
        <div className="flex flex-col items-center w-full gap-10">
          <h1 className="text-4xl font-bold">Select Time Slot</h1>
          <div className="flex flex-col items-center gap-10 w-full">
            <div className="flex flex-col gap-4">
              <p className="text-xl font-bold">Select Date</p>
              <DatePicker
                name="date"
                value={dayjs(formData.date)}
                disablePast
                onChange={(value) => {
                  // handleChange("date", value);
                  getTimeslots(value.utc(true).format());
                  // setSelectedTimeSlots([]);
                  setFormData({ ...formData, timeslots: [], date: value });
                }}
              />
            </div>

            <div className="w-full flex flex-col gap-4">
              <p className="text-xl font-bold">Timeslot</p>
              {!hasRequestedSlots && <div>Select a date</div>}
              {hasRequestedSlots && !slotsReceived && slots.length === 0 && (
                <div>Loading...</div>
              )}
              {hasRequestedSlots && slotsReceived && slots.length === 0 && (
                <div>Slots unavailable on given date</div>
              )}
              {hasRequestedSlots && slotsReceived && slots.length > 0 && (
                <>
                  <FormControl fullWidth>
                    <Select
                      multiple
                      value={formData.timeslots}
                      onChange={(e) => {
                        console.log(e.target.value);
                        handleTimeslotsSelect(e.target.value);
                      }}
                      renderValue={() => null}
                      /*  renderValue={(selected) => (
                        <div className="flex flex-wrap">
                          {selected.map((slot) => (
                            <div key={slot} className="m-1">
                              {dayjs(slots.find(s => s.id === slot).startTime).format("hh:mm a")} -{" "}
                              {dayjs(slots.find(s => s.id === slot).endTime).format("hh:mm a")}
                            </div>
                          ))}
                        </div>
                      )} */
                    >
                      {slots.map((slot) => {
                        const maxSlots =
                          formData.package === "family"
                            ? 4 + formData.addon
                            : 1 + formData.addon;

                        const disabledOnMaxSlots =
                          formData.timeslots.length >= maxSlots &&
                          !formData.timeslots.includes(slot.id);

                        const standardizedSlot = dayjs(formData.date)
                          .utc(true)
                          .hour(dayjs(slot.startTime).utc().hour())
                          .minute(dayjs(slot.startTime).utc().minute());

                        // console.log(standardizedSlot);

                        const disabledOnPassedTime =
                          standardizedSlot.isBefore(dayjs().utc(true)) ||
                          standardizedSlot.isSame(dayjs().utc(true));

                        console.log(
                          standardizedSlot.format(),
                          " --- ",
                          disabledOnPassedTime ? "passed" : "after"
                        );
                        return (
                          <MenuItem
                            key={slot.id}
                            value={slot.id}
                            disabled={
                              disabledOnMaxSlots || disabledOnPassedTime
                            }
                          >
                            <Checkbox
                              checked={formData.timeslots.includes(slot.id)}
                            />
                            <ListItemText
                              primary={`${dayjs(slot.startTime)
                                .utc()
                                .format("hh:mm a")} - ${dayjs(slot.endTime)
                                .utc()
                                .format("hh:mm a")}`}
                            />
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </FormControl>
                  <div className="mt-4">
                    <p className="text-xl font-bold mb-2">
                      Selected Timeslots:
                    </p>
                    <ul className="list-disc list-inside">
                      {formData.timeslots.map((slotId) => (
                        <li key={slotId}>
                          {dayjs(slots.find((s) => s.id === slotId).startTime)
                            .utc()
                            .format("hh:mm a")}{" "}
                          -{" "}
                          {dayjs(slots.find((s) => s.id === slotId).endTime)
                            .utc()
                            .format("hh:mm a")}
                        </li>
                      ))}
                    </ul>
                  </div>
                </>
              )}
            </div>

            <div className="flex flex-col gap-4 w-full">
              <p className="text-xl font-bold">Special Requests</p>
              <TextField
                id="outlined-multiline-flexible"
                multiline
                name="specialrequest"
                value={formData.specialrequest}
                onChange={(e) => {
                  handleChange(e.target.name, e.target.value);
                }}
                maxRows={4}
                sx={{ width: "100%" }}
              />
            </div>
          </div>
        </div>

        {/* Step 4 content Booking Preview*/}
        <div className="flex flex-col items-center w-full gap-10">
          <h1 className="text-4xl font-bold">Preview of Booking</h1>
          <h2 className="text-xl font-bold w-full text-left">
            Confirm Booking
          </h2>
          <div
            className="flex flex-col w-full rounded-3xl border-2 border-[#D9D9D9]"
            // onClick={() => jump(2)}
          >
            <div className="flex flex-row gap-4 items-center py-2 border-b-2 border-[#D9D9D9]">
              <div className="flex flex-col items-center justify-center p-4">
                <Image src={booking_date_icon} width={25} alt="" />
              </div>
              <div className="flex flex-col ">
                <p className="text-lg font-bold">
                  {dayjs(formData.date).format("MMM D").toString()}
                </p>
                <p className="text-[#9CA3AF] font-light">
                  {dayjs(formData.date).format("dddd").toString()}
                </p>
              </div>
            </div>
            <div className="flex flex-row gap-4 items-center py-2">
              <div className="flex flex-col items-center justify-center p-4">
                <Image src={booking_time_icon} width={25} alt="" />
              </div>
              <div className="flex flex-col ">
                <p className="text-lg font-bold">
                  {formData.timeslots.length > 0 &&
                    dayjs(
                      slots.find((slot) => slot.id === formData.timeslots[0])
                        .startTime
                    )
                      .utc()
                      .format("h.mm a")}
                  {formData.timeslots.length > 1 && (
                    <span className="text-sm">
                      {" "}
                      +{formData.timeslots.length - 1}
                    </span>
                  )}
                </p>
                {/* <p className="text-[#9CA3AF] font-light">Guests</p> */}
              </div>
            </div>
          </div>
          <div>
            <FormControlLabel
              control={
                <Checkbox
                  checked={formData.digitalCopies}
                  onChange={(e) => {
                    setFormData({
                      ...formData,
                      digitalCopies: e.target.checked,
                    });
                  }}
                />
              }
              label="Request for Digital Photos"
            />
          </div>
          <div className="flex flex-col gap-3 w-full px-2">
            <div className="flex flex-row justify-between text-[#4B5563] capitalize">
              <p>{formData.package}</p>
              <p>{getPackageAmount().format()}</p>
            </div>
            {formData.addon > 0 && (
              <div className="flex flex-row justify-between text-[#4B5563]">
                <p>Addons x {formData.addon}</p>
                <p>{getAddonsAmount().format()}</p>
              </div>
            )}
            {formData.digitalCopies === true && (
              <div className="flex flex-row justify-between text-[#4B5563]">
                <p>Request for Digital Photos</p>
                <p>{currency(getDigitalCopiesAmount()).format()}</p>
              </div>
            )}

            <div className="flex flex-row justify-between mt-1 pt-2 border-t-2 border-[#E5E7EB] text-lg">
              <p>Subtotal</p>
              <p>{getSubtotal().format()}</p>
            </div>
            <div className="flex flex-row justify-between border-[#E5E7EB] text-lg">
              <p>Tax</p>
              <p>{getTaxAmount().format()}</p>
            </div>
            <div className="flex flex-row justify-between mt-1 pt-2 border-t-2 border-[#E5E7EB] text-lg font-bold">
              <p>Total</p>
              <p>{getTotal().format()}</p>
            </div>
          </div>
        </div>

        {/* Step 5 content Payment*/}
        <div className="flex flex-col items-center w-full gap-10">
          <h1 className="text-4xl font-bold">Payment</h1>
          {/* <form className="flex flex-col gap-10 w-full">
            <div className="">
              <TextField
                id="outlined-basic"
                label="Card holder full name"
                variant="outlined"
                sx={{ width: "100%" }}
              />
            </div>
            <div>
              <TextField
                id="outlined-basic"
                label="Card number"
                variant="outlined"
                sx={{ width: "100%" }}
              />
            </div>
            <div className="flex flex-row gap-8">
              <TextField
                id="outlined-basic"
                label="Expiry date"
                variant="outlined"
              />
              <TextField id="outlined-basic" label="CVV" variant="outlined" />
            </div>
          </form>
          <div className="flex flex-row gap-2 w-full items-center">
            <p className="text-sm text-[#878C93]">Pay securely with</p>
            <Image src={payment_icons} alt="" width={150} height={20} />
          </div> */}
          {initPayment && (
            <CheckoutWrapper
              onSuccess={handleSubmit}
              onPaymentFailed={handlePaymentFailed}
              bookingDetes={{
                package: formData.package,
                addon: formData.addon,
                digitalCopies: formData.digitalCopies,
              }}
            />
          )}
        </div>

        {/* Booking success step (Step 6)*/}
        <div className="flex flex-col items-center w-full gap-10">
          <h1 className="text-4xl font-bold text-center">Booking confirmed</h1>
          <div className="flex flex-col items-center gap-8 justify-center md:w-[600px] py-4 md:py-20">
            <Image src={booking_confirmed} alt="" />
            <p className="text-3xl text-center text-[#31A91D] font-semibold">
              Congratulations! You have successfully reserved
            </p>
            <div className="flex flex-col items-center gap-4 w-full">
              <div className="flex flex-col md:flex-row gap-4 w-full justify-center ">
                <div className="flex flex-col gap-1 border border-[#C6C6C6] bg-white p-4 rounded-lg flex-1 shadow-md">
                  <p className="text-[#656565]">Package</p>
                  <p className="capitalize">{formData.package}</p>
                </div>
                <div className="flex flex-col gap-1 border border-[#C6C6C6] bg-white p-4 rounded-lg flex-1 shadow-md">
                  <p className="text-[#656565]">Date</p>
                  <p className="capitalize">
                    {dayjs(formData.date).format("DD/MM/YYYY")}
                  </p>
                </div>
                <div className="flex flex-col gap-1 border border-[#C6C6C6] bg-white p-4 rounded-lg flex-1 shadow-md">
                  <p className="text-[#656565]">Country</p>
                  <p className="capitalize">{formData.country}</p>
                </div>
              </div>
              <div className="flex flex-col gap-1 border border-[#C6C6C6] bg-white p-4 rounded-lg flex-1 shadow-md w-full">
                <p className="text-[#656565]">Documents</p>
                <ul className="flex flex-col gap-2">
                  {formData.documents.map((doc) => (
                    <li key={doc.id}>
                      {doc.document} - {doc.size}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex flex-col md:flex-row gap-4 w-full justify-center">
                <div className="flex flex-col gap-1 border border-[#C6C6C6] bg-white p-4 rounded-lg shadow-md w-full md:w-fit flex-1">
                  <p className="text-[#656565]">Timeslots</p>
                  <div>
                    {formData.timeslots.length === 1 ? (
                      <p>
                        {dayjs(
                          slots.find((s) => s.id === formData.timeslots[0])
                            .startTime
                        )
                          .utc()
                          .format("hh:mm a")}{" "}
                        -{" "}
                        {dayjs(
                          slots.find((s) => s.id === formData.timeslots[0])
                            .endTime
                        )
                          .utc()
                          .format("hh:mm a")}
                      </p>
                    ) : (
                      <Button
                        onClick={() => setTimeslotSummaryModalOpen(true)}
                        size="small"
                      >
                        View all
                      </Button>
                    )}
                  </div>
                  <Modal
                    open={timeslotSummaryModalOpen}
                    onClose={() => setTimeslotSummaryModalOpen(false)}
                  >
                    <div className="flex flex-col gap-4 p-8 bg-white rounded-xl border border-[#C6C6C6] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 min-w-[250px]">
                      <h1 className="">Booked timeslots</h1>
                      <ul className="flex flex-col gap-1">
                        {formData.timeslots.map((slotId) => (
                          <li key={slotId}>
                            {dayjs(slots.find((s) => s.id === slotId).startTime)
                              .utc()
                              .format("hh:mm a")}{" "}
                            -{" "}
                            {dayjs(slots.find((s) => s.id === slotId).endTime)
                              .utc()
                              .format("hh:mm a")}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </Modal>
                </div>
                <div className="flex flex-col gap-1 border border-[#C6C6C6] bg-white p-4 rounded-lg shadow-md w-full md:w-fit  flex-1">
                  <p className="text-[#656565]">Digital copies</p>
                  <p>
                    {formData.digitalCopies ? "Requested" : "Did not request"}
                  </p>
                </div>
                <div className="flex flex-col gap-1 border border-[#C6C6C6] bg-white p-4 rounded-lg shadow-md w-full md:w-fit pr-8">
                  <p className="text-[#656565]">Addons</p>
                  <p>{formData.addon}</p>
                </div>
                {/* <div className="basis-2/3"></div>
                <div className="basis-1/3">
                  <div className="flex flex-col gap-4 "></div>
                </div> */}
              </div>
            </div>
            {/* <p className="text-md text-center text-[#808080]">
              please carry ERS / VRM / SMS / Mail sent to your contact details,
              along with a relavant ID proof while travelling
            </p> */}
          </div>
        </div>
        {/* Booking failed step (Step 7)*/}
        <div className="flex flex-col items-center w-full gap-10">
          <h1 className="text-4xl font-bold text-center">Booking Failed</h1>
          <div className="flex flex-col items-center gap-8 justify-center md:w-[600px] py-4 md:py-20">
            {/* <Image src={booking_failed} alt="" /> */}
            <CancelIcon
              sx={{
                width: "100px",
                height: "100px",
                color: "#DC143C",
              }}
            />
            <p className="text-3xl text-center text-[#DC143C] font-semibold">
              Booking Failed
            </p>
            <p className="text-md text-center text-[#808080]">
              Please try again later
            </p>
          </div>
        </div>
      </Steps>
      <div className="absolute -bottom-5 flex flex-row gap-4">
        {current > 1 && current < 6 && (
          <Button
            variant="contained"
            onClick={() => {
              prev();
            }}
          >
            Prev
          </Button>
        )}
        {current < 5 && (
          <Button
            variant="contained"
            onClick={() => {
              if (current === 1) {
                // Step 1: Package selection validation
                if (formData.package === "") {
                  Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Please select a package!",
                  });
                  return;
                }
              } else if (current === 2) {
                // Step 2: Document selection validation
                const hasEmptyDocument = formData.documents.some(
                  (doc) => doc.document === "" || doc.size === ""
                );
                if (formData.country === "" || hasEmptyDocument) {
                  Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Please select a country and document type for all documents!",
                  });
                  return;
                }
              } else if (current === 3) {
                // Step 3: Time slot selection validation
                if (formData.date === "" || formData.timeslots.length === 0) {
                  Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Please select a date and at least one time slot!",
                  });
                  return;
                }
              }
              if (current < 4) {
                next();
              } else if (current === 4) {
                // const itemsValidate = false
                if (formData.package === "") return;

                setInitPayment(true);
                next();
              }
            }}
          >
            Next
          </Button>
        )}
      </div>
    </div>
  );
};

export default FormSteps;

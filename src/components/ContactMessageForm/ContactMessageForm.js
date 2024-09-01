"use client";

import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import SimpleReactValidator from "simple-react-validator";
import axios from "axios";
import Swal from 'sweetalert2'


const ContactMessageForm = () => {
  const formTextFieldStyle = {
    width: "100%",
  };

    const [fullName, setFullName] = useState("")
    const [lastName, setLastName] = useState("")
    const [company, setCompany] = useState("")
    const [email, setEmail] = useState("")
    const [phoneNumber, setPhoneNumber] = useState("")
    const [pictureType, setPictureType] = useState("")
    const [inquiry, setInquiry] = useState("")
    // const [submitted, setSubmitted] = useState(false)

    const handleSubmit = async (e) => { 
        e.preventDefault()

        // if(submitted) return
        
        if(fullName === "") return
        if(email === "") return
        if(phoneNumber === "") return
        if(pictureType === "") return

        // console.log('Sending')
        let data = {
            fullName,
            email,
            phoneNumber,
            pictureType,
            inquiry
        }
        await fetch('/api/sendEmail/', {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then((res) => {
            // console.log('Response received')
            if (res.status === 200) {
                Swal.fire({
                    title: 'Success',
                    text: 'Message has been submitted',
                    icon: 'success',
                    confirmButtonText: 'Done'
                  })
                setFullName("")
                setEmail("")
                setPhoneNumber("")
                setPictureType("")
                setInquiry("")
                // console.log('Response succeeded!')
                // if(!submitted) setSubmitted(true)
            } else {
                Swal.fire({
                    title: 'Failed',
                    text: 'Could not submit your message',
                    icon: 'error',
                    confirmButtonText: 'Done',
                    confirmButtonColor: '#575aa7',
                  })
                // console.log('Response failed!')
            }
        })
    }

    const trimInput = (val) => {
        // console.log(val)
        return val.trim()
    }

  return (
    <form
      className="flex flex-col gap-10 items-center"
    >
      <div className="w-full flex flex-col gap-y-6 md:flex-row justify-between">
        <div className="md:w-[480px]">
          <TextField
            id="fullName"
            label="Full name"
            value={fullName} 
            onChange={(val) => {setFullName(trimInput(val.target.value))}}
            variant="outlined"
            sx={formTextFieldStyle}
          />
        </div>
        <div className="md:w-[480px]">
          <TextField
            id="email"
            label="Email"
            value={email}
            onChange={(val) => {setEmail(trimInput(val.target.value))}}
            variant="outlined"
            sx={formTextFieldStyle}
          />
        </div>
      </div>
      <div className="w-full flex flex-col gap-y-6 md:flex-row justify-between">
        <div className="md:w-[480px]">
          <TextField
            id="phone-number"
            label="Phone number"
            value={phoneNumber} 
            onChange={(val) => {setPhoneNumber(trimInput(val.target.value))}}
            variant="outlined"
            sx={formTextFieldStyle}
          />
        </div>
        <div className="md:w-[480px]">
          <TextField
            id="pic-type"
            label="Picture Type"
            value={pictureType} 
            onChange={(val) => {setPictureType(trimInput(val.target.value))}}
            variant="outlined"
            sx={formTextFieldStyle}
          />
        </div>
      </div>
      <div className="w-full">
        <TextField
          id="message"
          label="Message"
          value={inquiry}
          onChange={(val) => {setInquiry(trimInput(val.target.value))}}
          variant="outlined"
          multiline
          rows={6}
          sx={{ width: "100%" }}
        />
      </div>
      <Button
        variant="contained"
        type="submit"
        onClick={(e) => {handleSubmit(e)}}
        sx={{
          width: "fit-content",
          padding: "15px 90px",
          fontWeight: "bold",
          borderRadius: "100px",
          background: "#242331",
          fontSize: "1.25rem",
          textTransform: "none",
        }}
      >
        Send Message
      </Button>
    </form>
  );
};

export default ContactMessageForm;

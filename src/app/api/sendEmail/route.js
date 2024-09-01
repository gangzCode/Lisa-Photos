import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

export async function POST(req, res) {
  try {
    const body = await req.json();

    // console.log(body)

    let nodemailer = require("nodemailer");
    const transporter = nodemailer.createTransport({
      port: 465,
      host: process.env.SMTP_HOST,
      auth: {
        user: process.env.SENDER_EMAIL,
        pass: process.env.SENDER_PASSWORD,
      },
      secure: true,
    });

    const mailData = {
      from: process.env.SENDER_EMAIL,
      to: process.env.RECEIVER_EMAIL,
      subject: `Message From ${body.fullName}`,
      text: body.message + " | Sent from: " + body.email,
      html: `
                <div>Full Name : ${body.fullName} </div>
                <div>Email :${body.email} </div>
                <div>Phone number :${body.phoneNumber} </div>
                <div>Picture Type :${body.pictureType} </div>
                <div>Message : </div>
                <div>${body.inquiry}</div>
            `,
    };

    await transporter.sendMail(mailData);

    return NextResponse.json({ success: true, message: "success" });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error },
      { status: 500 }
    );
  }
}

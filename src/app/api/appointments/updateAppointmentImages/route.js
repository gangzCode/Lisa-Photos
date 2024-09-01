import client from "@/utils/db/db";
import { getSession } from "@auth0/nextjs-auth0";
import { ObjectId } from "mongodb";

export async function POST(req) {
  // const session = await getSession();

  const appointment = await req.json();
  // console.log(userData);

  console.log(appointment);

  const query = { _id: ObjectId.createFromHexString(appointment._id) };
  const update = { $set: { photos: appointment.photos } };
  // const arrayFilters = [{ "x.id": appointment.docId }];

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
    to: appointment.email,
    subject: `Your digital copies have been uploaded `,
    // text: body.message + " | Sent from: " + body.email,
    html: `
          <div>Dear customer,<br/></div>
          <div><br/></div>
          <div>Digital copies of your recent appointment have been uploaded.</div>
          <div>You can collect your digital copies from your profile page.</div>
          <div><br/></div>
          <div>Thank you for choosing Lisa photos.</div>
          <div>Lisa Photos.</div>
            `,
  };

  await transporter.sendMail(mailData);

  try {
    const dbClient = client;
    await dbClient
      .db("lisa-test")
      .collection("appointments")
      .updateOne(query, update);
    return Response.json({ success: true, message: "Updated" });
  } catch (error) {
    return Response.json({ success: false, message: "failed" });
  }
}

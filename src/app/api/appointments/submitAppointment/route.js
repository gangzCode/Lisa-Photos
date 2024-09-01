import client from "@/utils/db/db";
import { getSession } from "@auth0/nextjs-auth0";
import dayjs from "dayjs";
var utc = require("dayjs/plugin/utc");
import currency from "currency.js";

const getPackageAmount = (bookingDetes) => {
  return bookingDetes.package === "single"
    ? currency(14.99)
    : bookingDetes.package === "family"
    ? currency(49.99)
    : currency(24.99);
};
const getAddonsAmount = (bookingDetes) => {
  return bookingDetes.package === "multi"
    ? currency(14.99).multiply(bookingDetes.addon)
    : currency(14.99).multiply(bookingDetes.addon);
};

const getDigitalCopiesAmount = (bookingDetes) => {
  return bookingDetes.package === "single"
    ? currency(9.99).add(currency(9.99).multiply(bookingDetes.addon))
    : bookingDetes.package === "family"
    ? currency(39.96).add(currency(9.99).multiply(bookingDetes.addon))
    : currency(19.98).add(currency(19.98).multiply(bookingDetes.addon));
};

const getSubtotal = (bookingDetes) => {
  if (bookingDetes.digitalCopies)
    return getPackageAmount(bookingDetes)
      .add(getAddonsAmount(bookingDetes))
      .add(getDigitalCopiesAmount(bookingDetes));
  else return getPackageAmount(bookingDetes).add(getAddonsAmount(bookingDetes));
};

const getTaxAmount = (bookingDetes) => {
  return currency(getSubtotal(bookingDetes), { increment: 0.01 }).multiply(
    0.13
  );
};

const getTotal = (bookingDetes) => {
  return getSubtotal(bookingDetes).add(getTaxAmount(bookingDetes));
};
const calculateOrderAmount = (bookingDetes) => {
  // Replace this constant with a calculation of the order's amount
  // Calculate the order total on the server to prevent
  // people from directly manipulating the amount on the client

  // console.log(getTotal(bookingDetes).format());
  // console.log(getTotal(bookingDetes).value);

  return getTotal(bookingDetes).value + "";
};

export async function POST(req) {
  dayjs.extend(utc);

  const session = await getSession();
  const appointment = await req.json();
  // console.log(session?.user);
  appointment.email = session?.user.email;
  appointment.status = "booked"; //status can be booked, done or no show
  appointment.name = session?.user.name;
  // appointment.dateCreated = dayjs().utc().format();
  // console.log(appointment);
  appointment.amount = calculateOrderAmount({
    package: appointment.package,
    addon: appointment.addon,
    digitalCopies: appointment.digitalCopies,
  });
  try {
    const dbClient = client;

    const timeslots = await dbClient
      .db("lisa-test")
      .collection("timeslots")
      .findOne({
        date: appointment.date,
      });

    const slots = timeslots.slots;

    const filteredSlots = slots.filter((slot) =>
      appointment.timeslots.includes(slot.id)
    );

    appointment.slots = filteredSlots;

    await dbClient
      .db("lisa-test")
      .collection("appointments")
      .insertOne(appointment);

    await dbClient
      .db("lisa-test")
      .collection("timeslots")
      .updateOne(
        {
          date: appointment.date,
        },
        {
          $set: {
            "slots.$[x].booked": true,
          },
        },
        {
          arrayFilters: [{ "x.id": { $in: appointment.timeslots } }],
        }
      );

    // console.log(filteredSlots);

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

    const generateTimeslotsTags = () => {
      var string = "";
      filteredSlots.forEach((slot) => {
        // console.log(slot.startTime, slot.endTime);
        string += `<p>${dayjs(slot.startTime)
          .utc()
          .format("hh:mm A")} - ${dayjs(slot.endTime)
          .utc()
          .format("hh:mm A")}</p>`;
      });

      // console.log(string);
      return string;
    };

    const generateInvoice = () => {
      const bookingDetes = {
        package: appointment.package,
        addon: appointment.addon,
        digitalCopies: appointment.digitalCopies,
      };

      var string = "<table><tr><th>Item</th><th>Amount</th></tr>";

      string += `<tr><td>Package</td><td>${getPackageAmount(
        bookingDetes
      )}</td></tr>`;
      if (appointment.addon > 0)
        string += `<tr><td>Addons x${
          appointment.addon
        }</td><td>${getAddonsAmount(bookingDetes)}</td></tr>`;
      if (appointment.digitalCopies)
        string += `<tr><td>Digital photo request</td><td>${getDigitalCopiesAmount(
          bookingDetes
        )}</td></tr>`;
      string += `<tr ><td>Subtotal</td><td style="border-top:2px solid black;">${getSubtotal(
        bookingDetes
      )}</td></tr>`;
      string += `<tr><td>Tax</td><td>${getTaxAmount(bookingDetes)}</td></tr>`;
      string += `<tr><td>Total</td><td style="border-top:2px solid black;">${getTotal(
        bookingDetes
      )}</td></tr>`;

      string += `</table>`;

      return string;
    };

    const mailData = {
      from: process.env.SENDER_EMAIL,
      to: session?.user.email,
      subject: `Your appointment with Lisa Photos `,
      // text: body.message + " | Sent from: " + body.email,
      // attachments: [
      //   {
      //     filename: "logo.png",
      //     path: __dirname,
      //     cid: "logo", //same cid value as in the html img src
      //   },
      // ],
      html: `<!DOCTYPE html>
              <html lang="en">
              <head>
                <meta charset="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <title>Lisa invoice</title>
              </head>
              <body>
                <div>Dear customer,<br/></div>
                <br/>
                <div>Date : ${dayjs(appointment.date).format(
                  "DD/MM/YYYY"
                )}</div>
                <div>Timeslots :</div>
                <div>
                  ${generateTimeslotsTags()}
                </div>
                 ${
                   appointment.paid
                     ? "<div>Payment confirmed!<br/><br/></div>"
                     : "<div>Payment needs to be done!<br/><br/></div>"
                 }
                <div>Thank You,<br/></div>
                <div>Lisa Photos.</div>
                <br/>
                <div>
                  <div style="display:flex;flex-direction:row;align-items:center;">
                    <img src="https://www.lisaphotos.ca/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Flogo.42279e11.png&w=128&q=75"/>
                    <h1>Lisa Photos Invoice</h1>
                  </div>
                  <table>
                    <tr>
                      <td>Bill to -</td>
                      <td>${session?.user.email}</td>
                    </tr>
                    <tr>
                      <td>Address -</td>
                      <td>
                        Lisa Photos, <br/>
                        2855 Markham Rd <br/>
                        SUITE 405, Scarborough, ON M1X 0C3
                      </td>
                    </tr>
                    <tr>
                      <td>Contact</td>
                      <td>photos@lisagroups.com</td>
                    </tr>
                  </table>
                </div>
                <div>Invoice date - ${dayjs(appointment.dateCreated).format(
                  "DD/MM/YYYY"
                )}</div>
                <div>${generateInvoice()}</div>
                
              </body>
            </html>
          `,
    };

    await transporter.sendMail(mailData);

    // console.log("");
    return Response.json({ success: true, message: "Submitted" });
  } catch (error) {
    return Response.json({ success: false, message: "failed" });
  }
}

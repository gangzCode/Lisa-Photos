import client from "@/utils/db/db";
import dayjs from "dayjs";
var utc = require("dayjs/plugin/utc");

export const dynamic = "force-dynamic";
export async function GET(req) {
  dayjs.extend(utc);
  const { searchParams } = new URL(req.url);

  console.log(searchParams.get("date"));

  try {
    const dbClient = client;
    const timeslots = await dbClient
      .db("lisa-test")
      .collection("timeslots")
      .findOne({ date: dayjs(searchParams.get("date")).utc().format() });

    const timeslotsArray = timeslots.slots;

    const filteredTimeslots = timeslotsArray.filter((slot) => {
      if (slot.booked === false) return slot;
    });

    console.log(filteredTimeslots);
    return Response.json({
      success: true,
      slots: filteredTimeslots,
    });
  } catch (error) {
    return Response.json({ success: false });
  }
}

import client from "@/utils/db/db";
// import { getSession } from "@auth0/nextjs-auth0";
import { ObjectId } from "mongodb";

export async function POST(req) {
  // const session = await getSession();

  const appointment = await req.json();
  // console.log(userData);

  console.log(appointment);

  const query = { _id: ObjectId.createFromHexString(appointment._id) };
  const update = { $set: { status: appointment.status } };
  const options = { upsert: true };

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

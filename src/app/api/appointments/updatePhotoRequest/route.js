import client from "@/utils/db/db";
import { ObjectId } from "mongodb";

export async function POST(req) {
  const appointment = await req.json();

  const query = { _id: ObjectId.createFromHexString(appointment._id) };
  const update = { $set: { isPhotoRequested: true } };
  // const arrayFilters = [{ "x.id": appointment.docId }];

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

import client from "@/utils/db/db";

export async function POST(req) {
  const data = await req.json();

  console.log(data.date);

  try {
    const dbClient = client;

    // Specify the query to find documents with matching date
    const query = { date: data.date }; // Adjust this based on your actual schema

    // Update operation to set slots for the specified date
    const update = { $set: { slots: data.slots } };
    const options = { upsert: true }; // Upsert if document doesn't exist

    // Perform the update operation
    await dbClient
      .db("lisa-test")
      .collection("timeslots")
      .updateOne(query, update, options);

    return Response.json({ success: true, message: "Submitted" });
  } catch (error) {
    console.error("Error submitting time slots:", error);
    return Response.json({ success: false, message: "Failed" });
  }
}

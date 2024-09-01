import client from "@/utils/db/db";

export async function POST(req) {
  const { date, slotId } = await req.json();

  const query = { date }; // Filter by specific date
  const update = { $pull: { slots: { id: slotId } } }; // Remove the slot with the given id
  const options = { multi: false }; // Only remove one slot

  try {
    const dbClient = client;
    await dbClient
      .db("lisa-test")
      .collection("timeslots")
      .updateOne(query, update, options);

    return Response.json({ success: true, message: "Time slot deleted" });
  } catch (error) {
    return Response.json({ success: false, message: "Failed to delete time slot" });
  }
}
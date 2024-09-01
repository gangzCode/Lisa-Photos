import client from "@/utils/db/db";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const date = searchParams.get("date");

  console.log(date);

  try {
    const dbClient = client;
    const dateDoc = await dbClient
      .db("lisa-test")
      .collection("timeslots")
      .findOne({ date });

    const slots = dateDoc ? dateDoc.slots : [];

    return Response.json({
      success: true,
      slots,
    });
  } catch (error) {
    return Response.json({ success: false });
  }
}

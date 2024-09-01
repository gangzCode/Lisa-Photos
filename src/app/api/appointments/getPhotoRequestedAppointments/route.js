import client from "@/utils/db/db";

export const dynamic = "force-dynamic";
export async function GET(req) {
  try {
    const dbClient = client;
    // const appointments = await dbClient
    //   .db("lisa-test")
    //   .collection("appointments")
    //   .find({ digitalCopies: true });
    const appointments = await dbClient
      .db("lisa-test")
      .collection("appointments")
      .aggregate([
        {
          $match: {
            digitalCopies: true,
          },
        },
        {
          $lookup: {
            from: "users",
            localField: "email",
            foreignField: "email",
            as: "user",
          },
        },
        {
          $unwind: "$user",
        },
      ]);

    const appointmentArray = await appointments.toArray();

    return Response.json({
      success: true,
      appointments: appointmentArray,
    });
  } catch (error) {
    return Response.json({ success: false });
  }
}

import client from "@/utils/db/db";

export async function POST(req) {
  // const session = await getSession();

  const subData = await req.json();
  // console.log(userData);

  const query = { email: subData.email };
  const update = { $set: { email: subData.email } };
  const options = { upsert: true };

  try {
    const dbClient = client;
    dbClient
      .db("lisa-test")
      .collection("subscribers")
      .updateOne(query, update, options);
    return Response.json({ success: true, message: "Updated" });
  } catch (error) {
    return Response.json({ success: false, message: "failed" });
  }
}

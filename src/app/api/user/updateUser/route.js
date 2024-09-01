import client from "@/utils/db/db";
import { getSession } from "@auth0/nextjs-auth0";

export async function POST(req) {
  const session = await getSession();

  const userData = await req.json();
  // console.log(userData);

  const query = { email: session?.user.email };
  const update = { $set: { ...userData } };
  const options = { upsert: true };

  try {
    const dbClient = client;
    dbClient
      .db("lisa-test")
      .collection("users")
      .updateOne(query, update, options);
    return Response.json({ success: true, message: "Updated" });
  } catch (error) {
    return Response.json({ success: false, message: "failed" });
  }
}

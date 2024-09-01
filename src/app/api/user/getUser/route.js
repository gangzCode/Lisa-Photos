import client from "@/utils/db/db";
import { getSession } from "@auth0/nextjs-auth0";

export async function GET(req, res) {
  const session = await getSession();

  try {
    const dbClient = client;
    const user = await dbClient
      .db("lisa-test")
      .collection("users")
      .findOne({ id_email: session?.user.email });

    if (user === null)
      return Response.json({
        success: false,
        type: "user_null",
        message: "user doesn't exist",
      });

    delete user._id;
    delete user.id_email;
    return Response.json({ success: true, user: user });
  } catch (error) {
    // console.log(error);
    return Response.json({
      success: false,
      type: "error ",
      message: "unknown error occured",
    });
  }
}

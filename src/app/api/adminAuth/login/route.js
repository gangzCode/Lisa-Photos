import { generateJWT } from "@/utils/admin_auth/JWTHelper/JWTHelper";
import clientPromise from "@/utils/db/db";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(req) {
  try {
    const body = await req.json();
    const dbClient = await clientPromise;

    const user = await dbClient
      .db("lisa-test")
      .collection("admins")
      .findOne({ email: body.email });

    if (!user) {
      return NextResponse.json({
        success: false,
        message: "Username or Password is incorrect.",
      });
    }

    const isPasswordValid = await bcrypt.compare(body.password, user.password);

    if (isPasswordValid) {
      const token = generateJWT({ username: user.email });

      const session = {
        username: user.email,
        token: token,
      };

      const sixHours = 60 * 60 * 6;

      cookies().set("LISA_ADMIN", JSON.stringify(session), {
        maxAge: sixHours,
        path: '/',  // Ensure the cookie is set for the root path
      });

      return NextResponse.json({ success: true, message: "Login successful" });
    } else {
      return NextResponse.json({
        success: false,
        message: "Username or Password is incorrect.",
      });
    }
  } catch (e) {
    console.error("Error during login", e);
    return NextResponse.json({
      success: false,
      message: "An error occurred during login",
    });
  }
}

// Use this to generate password
// const salt = await bcrypt.genSalt(10);
// body.password = await bcrypt.hash(body.password, salt);
import client from "@/utils/db/db";
import { getSession } from "@auth0/nextjs-auth0";
import { redirect } from "next/navigation";
import React from "react";

// await checkNewUser();

const NewUserRedirctor = async () => {
  const session = await getSession();
  const checkNewUser = async () => {
    var user = null;

    try {
      if (session === null) return null;

      const dbClient = client;
      user = await dbClient
        .db("lisa-test")
        .collection("users")
        .findOne({ id_email: session?.user.email });
    } catch (error) {
      // console.log(error);
      return null;
    }

    return user;
  };
  const user = await checkNewUser();

  // console.log("User", user);
  // console.log("Session", session);
  if (user === null) redirect("/profile");
};

export default NewUserRedirctor;
import React from "react";
import client from "@/utils/db/db";

const page = async () => {
  const dbClient = client;
  var subscribers;

  try {
    subscribers = await dbClient
      .db("lisa-test")
      .collection("subscribers")
      .find();
  } catch (e) {
    console.log(e);
  }

  const subscribersArr = subscribers ? await subscribers.toArray() : [];

  console.log("Subscribers ", subscribersArr);
  return (
    <main className="w-full h-screen px-12 py-12 flex flex-col gap-4">
      <section>Subscribers</section>

      <section className="flex flex-col h-full">
        {subscribersArr.map((sub, key) => (
          <p key={key}>{sub.email}</p>
        ))}
      </section>
    </main>
  );
};

export default page;

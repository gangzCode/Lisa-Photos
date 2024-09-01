import client from "@/utils/db/db";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

export async function POST(req) {
  dayjs.extend(utc);

  const data = await req.json();

  const convertedMonths = convertMonths(data.selectedMonths);

  const queryDates = generateQueryDates(
    dayjs(data.year).year(),
    convertedMonths
  );

  const update = { $set: { slots: data.templateSlots } };
  const options = { upsert: true };

  try {
    const dbClient = client;
    const collection = dbClient.db("lisa-test").collection("timeslots");

    const upsertOps = [];

    queryDates.forEach((date) => {
      console.log("Creating upsert op for ", date);

      const upsertOp = {
        updateOne: {
          filter: { date },
          update: { $set: { slots: data.templateSlots } },
          upsert: true,
        },
      };

      upsertOps.push(upsertOp);
      // const query = ;

      // await collection.updateOne(query, update, options);
    });

    await collection.bulkWrite(upsertOps);

    return Response.json({ success: true, message: "Updated" });
  } catch (error) {
    console.log(error);
    return Response.json({ success: false, message: "failed" });
  }
}

const convertMonths = (months) => {
  const newMonths = [];

  for (let i = 0; i < months.length; i++) {
    const monthVal = months[i];

    if (monthVal === true) newMonths.push(i);
  }

  return newMonths;
};

const generateQueryDates = (year, months) => {
  //Set Start and end dates for each month of the year
  //Loop between each start and end dates to generate the query dates
  //Dont forget to format it using utc().format()

  const queries = [];

  months.forEach((monthVal) => {
    // const startDate = dayjs().year(year).month(monthVal).startOf("month");
    const endDate = dayjs().year(year).month(monthVal).endOf("month");

    for (let i = 1; i <= endDate.date(); i++) {
      const date = dayjs()
        .year(year)
        .month(monthVal)
        .hour(0)
        .minute(0)
        .second(0)
        .millisecond(0)
        .date(i);

      queries.push(date.utc(true).format());
    }
  });
  return queries;
};

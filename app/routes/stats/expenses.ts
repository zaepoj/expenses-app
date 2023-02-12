import { Prisma } from "@prisma/client";
import { json, type ActionArgs } from "@remix-run/node";
import { getAllUsers, storeMonthlyExpenseStat } from "~/server/db.server";
import { getMonthlyTotalExpensesForUser } from "~/server/models/expense.server";
import { monthByNumber } from "~/utils/expense";

export const action = async ({ request }: ActionArgs) => {
  const method = request.method;

  if (method !== "POST") return json({ message: "not found" }, 404);

  const apiKey = request.headers.get("api_key");
  console.log(
    "ENV",
    process.env.STATS_API_KEY,
    apiKey !== process.env.STATS_API_KEY
  );
  console.log("APIKEY", apiKey, !apiKey);
  if (!apiKey || apiKey !== process.env.STATS_API_KEY) {
    return json({ message: "unauthorized" }, 401);
  }

  const users = await getAllUsers();

  for (const user of users) {
    const sumOfCurrentMonthlyExpenses = await getMonthlyTotalExpensesForUser(
      user.uid
    );

    await storeMonthlyExpenseStat({
      userId: user.uid,
      value: new Prisma.Decimal(sumOfCurrentMonthlyExpenses),
      month: monthByNumber(new Date().getMonth()),
    });
  }

  return json({}, 200);
};

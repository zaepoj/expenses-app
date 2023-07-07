import { json, type LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { requireAuth } from "~/server/auth.server";
import Typography from "~/components/Typography";
import Card from "~/components/Card";
import { useNavigate } from "react-router-dom";
import { getMonthlyTotalExpensesForUser } from "~/server/models/expense.server";
import * as styles from "./index.css";

export const loader: LoaderFunction = async ({ request }) => {
  const user = await requireAuth(request);
  const monthlyTotalExpenses = await getMonthlyTotalExpensesForUser(user.uid);

  return json({
    user,
    monthlyTotalExpenses,
  });
};

export default function Index() {
  const data = useLoaderData();
  const navigate = useNavigate();

  return (
    <div className={styles.ContentContainer}>
      <Typography type="h1">{`Welcome back ${
        data.user.name || data.user.email || "unknown"
      }!`}</Typography>
      <div style={{ width: "100%" }} className={styles.CardContainer}>
        <Card
          clickable
          onClick={() => navigate("/expenses")}
          title="Expenses"
          infoLabel="monthly"
        >
          <div style={{ paddingTop: "2em" }}>
            <Typography type="h1">{data?.monthlyTotalExpenses} €</Typography>
          </div>
        </Card>
      </div>
    </div>
  );
}

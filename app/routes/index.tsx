import {json, type LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { requireAuth } from "~/server/auth.server";
import Typography from "~/components/Typography";
import styled from "styled-components";
import Card from "~/components/Card";
import { useNavigate } from "react-router-dom";
import { getMonthlyTotalExpensesForUser } from "~/server/models/expense.server";

export const loader: LoaderFunction = async ({ request }) => {
  const user = await requireAuth(request);
  const monthlyTotalExpenses = await getMonthlyTotalExpensesForUser(user.uid);

  return json({
    user,
    monthlyTotalExpenses,
  });
};

const CardContainer = styled.div`
  padding-top: 5em;
  padding-bottom: 5em;
  display: flex;
  flex-wrap: wrap;
  gap: 4%;
  width: 100%;
`;
const ContentContainer = styled.div`
  height: 100%;
  flex: 1;
  padding-left: 2em;
  padding-right: 2em;
  padding-top: 5em;
  margin-left: 5em;

  @media only screen and (max-width: 700px) {
    padding-left: 0.25em;
    padding-right: 0.25em;
    padding-top: 10em;
  }
`;

export default function Index() {
  const data = useLoaderData();
  const navigate = useNavigate();

  return (
    <ContentContainer>
      <Typography type="h1">{`Welcome back ${
        data.user.name || data.user.email || "unknown"
      }!`}</Typography>
      <CardContainer>
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
      </CardContainer>
    </ContentContainer>
  );
}

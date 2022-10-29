import { json, LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { requireAuth } from "~/server/auth.server";
import Typography from "~/components/Typography";
import styled from "styled-components";
import Card from "~/components/Card";
import { useNavigate } from "react-router-dom";

export const loader: LoaderFunction = async ({ request }) => {
  const user = await requireAuth(request);
  return json({
    user,
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

  @media only screen and (max-width: 600px) {
    padding-left: 0.25em;
    padding-right: 0.25em;
    padding-top: 0.5em;
  }
`;

export default function Index() {
  const data = useLoaderData();
  const navigate = useNavigate();
  

  return (
    <ContentContainer>
      <Typography
        type="h1"
        text={`Welcome back ${
          data.user.displayName || data.user.email || "unknown"
        }!`}
      />
      <CardContainer>
        <Card clickable onClick={() => navigate("/expenses")} title="Expenses" infoLabel="monthly">
          <p>Test</p>
        </Card>
        <Card clickable title="Savings" infoLabel="info">
          <p>Test</p>
        </Card>
      </CardContainer>
    </ContentContainer>
  );
}

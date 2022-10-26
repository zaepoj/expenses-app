import { json, LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { requireAuth } from "~/server/auth.server";
import Layout from "~/components/Layout";
import Typography from "~/components/Typography";
import styled from "styled-components";
import Card from "~/components/Card";
import {AiFillHome, AiFillProject} from "react-icons/ai"


export const loader: LoaderFunction = async ({ request }) => {
  const user = await requireAuth(request);
  return json({
    message: `Welcome back ${user.displayName || user.email || "unknown"}!`,
  });
};


const CardContainer = styled.div`
  margin-top: 5em;
  display: flex;
  flex-wrap: wrap;
  gap: 4%
`

export default function Index() {
  const data = useLoaderData();

  return (
    <Layout
      navItems={[
        { to: "/", title: "Dashboard", icon: AiFillHome},
        { to: "/expenses", title: "Expenses", icon: AiFillProject},
      ]}
    >
      <>
      <Typography type="h2" text={`${data.message}`} />
      <CardContainer>
        <Card clickable title="Expenses" infoLabel="monthly" ><p>Test</p></Card>
        <Card clickable title="Savings" infoLabel="info" ><p>Test</p></Card>
      </CardContainer>
      </>
    </Layout>
  );
}

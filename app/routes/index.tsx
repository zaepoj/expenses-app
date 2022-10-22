import { json, LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import styled from "styled-components";
import { requireAuth } from "~/server/auth.server";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  flex-direction: column;
`;


export const loader: LoaderFunction = async ({ request }) => {
  const user = await requireAuth(request);
  return json({
    message: `Hello ${user.displayName || user.email ||  "unknown"}!`,
  });
};


export default function Index() {
  const data = useLoaderData();

  return <Container>{data.message}</Container>;
}

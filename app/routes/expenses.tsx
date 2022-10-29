import styled from "styled-components";
import { z } from "zod";
import TextField from "~/components/TextField";
import Button from "~/components/Button";
import { ActionFunction, json, LoaderFunction, redirect } from "@remix-run/node";
import { requireAuth, signIn } from "~/server/auth.server";
import { commitSession, getSession } from "~/sessions";
import { Link, useActionData, useLoaderData } from "@remix-run/react";


export const loader: LoaderFunction = async ({ request }) => {
  const user = await requireAuth(request);
  return json({
    user,
  });
};


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


export default function ExpenseView() {
  const data = useLoaderData();
  return (
		<ContentContainer>test</ContentContainer>
  );

}

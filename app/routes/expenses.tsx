import styled from "styled-components";
import Button from "~/components/Button";
import {
  json,
  LoaderFunction,
} from "@remix-run/node";
import { requireAuth } from "~/server/auth.server";
import {
  Outlet,
  useLoaderData,
  useNavigate,
} from "@remix-run/react";
import { useState } from "react";

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
  const [addModalOpen, setAddModalOpen] = useState(true);
  const navigate = useNavigate();

  const data = useLoaderData();
  return (
    <>
      <Outlet />
      <ContentContainer>
        <Button onClick={() => navigate("/expenses/add")}>Add</Button>
      </ContentContainer>
    </>
  );
}

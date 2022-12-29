import styled from "styled-components";
import Button from "~/components/Button";
import { json, LoaderFunction } from "@remix-run/node";
import { requireAuth } from "~/server/auth.server";
import { Outlet, useNavigate } from "@remix-run/react";

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

  @media only screen and (max-width: 700px) {
    padding-left: 0.25em;
    padding-right: 0.25em;
    padding-top: 10em;
  }
`;

export default function ExpenseView() {
  const navigate = useNavigate();

  return (
    <>
      <Outlet />
      <ContentContainer>
        <Button onClick={() => navigate("/expenses/add")}>Add</Button>
      </ContentContainer>
    </>
  );
}

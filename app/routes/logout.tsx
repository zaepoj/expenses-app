import styled from "styled-components";
import { LoaderFunction, redirect } from "@remix-run/node";
import { destroySession, getSession } from "~/sessions";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  flex-direction: column;
  max-width: 500px;
  margin: auto;
`;

export const loader: LoaderFunction = async ({ request }) => {
  const session = await getSession(request.headers.get("Cookie"));
  return redirect("/", {
    headers: { "Set-Cookie": await destroySession(session) },
  });
};

export default function Logout() {
  return <Container>Logging off..</Container>;
}

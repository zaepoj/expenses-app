import styled from "styled-components";
import TextField from "~/components/TextField";
import Button from "~/components/Button";
import { ActionFunction, json, redirect } from "@remix-run/node";
import { signUp } from "~/utils/db.server";
import { commitSession, getSession } from "~/sessions";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  flex-direction: column;
`;

export const action: ActionFunction = async ({ request }) => {
  let formData = await request.formData();
  const email = formData.get("email");
  const password = formData.get("password");

  try {
    let sessionCookie;

    const formError = json(
      { error: "Please fill all fields!" },
      { status: 400 }
    );
    if (typeof email !== "string") return formError;
    if (typeof password !== "string") return formError;

    if (email && password) {
      sessionCookie = await signUp(email, password);
    }

    const session = await getSession(request.headers.get("cookie"));
    session.set("session", sessionCookie);

    return redirect("/", {
      headers: {
        "Set-Cookie": await commitSession(session),
      },
    });
  } catch (e) {
    console.log(e);
  }

  return { email, password };
};

export default function Join() {
  return (
    <Container>
      <form method="post">
        <TextField type="text" placeholder="email" name="email" />
        <TextField type="password" placeholder="password" name="password" />
        <Button type="submit">Login</Button>
      </form>
    </Container>
  );
}

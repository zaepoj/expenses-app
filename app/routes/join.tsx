import styled from "styled-components";
import TextField from "~/components/TextField";
import Button from "~/components/Button";
import { ActionFunction, json, redirect } from "@remix-run/node";
import { signUp } from "~/server/auth.server";
import { commitSession, getSession } from "~/sessions";

const Container = styled.div`
  max-width: 500px;
  margin: auto;
  height: 100%;
  display: flex;
  align-items: center;
`;

const InputContainer = styled.div`
  display: grid;
  row-gap: 10%;
  align-items: center;
`;

const HeaderContainer = styled.div`
	padding-bottom: 3em;
`;

export const action: ActionFunction = async ({ request }) => {
  let formData = await request.formData();
  const name = formData.get("name");
  const email = formData.get("email");
  const password = formData.get("password");
  const confirmPassword = formData.get("confirm-password");

  try {
    let sessionCookie;

    const formError = json(
      { error: "Please fill all fields!" },
      { status: 400 }
    );

    if (typeof name !== "string") return formError;
    if (typeof email !== "string") return formError;
    if (typeof password !== "string") return formError;
    if (typeof confirmPassword !== "string") return formError;
    if (confirmPassword !== password) return formError;

    if (email && password && name) {
      sessionCookie = await signUp(email, password, name);
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
      <form style={{ width: "100%" }} method="post">
        <HeaderContainer>
          <h1>Sign up</h1>
        </HeaderContainer>
        <InputContainer>
          <TextField type="text" placeholder="Name" name="name" label="Name" />
          <TextField
            type="text"
            placeholder="email"
            name="email"
            label="Email"
          />
          <TextField
            type="password"
            placeholder="password"
            name="password"
            label="Password"
          />
          <TextField
            type="password"
            placeholder="confirm password"
            name="confirm-password"
          />
          <Button type="submit">Sign up</Button>
        </InputContainer>
      </form>
    </Container>
  );
}

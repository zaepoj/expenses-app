import styled from "styled-components";
import { z } from "zod";
import TextField from "~/components/TextField";
import Button from "~/components/Button";
import { ActionFunction, redirect } from "@remix-run/node";
import { signIn } from "~/server/auth.server";
import { commitSession, getSession } from "~/sessions";
import { Form, Link, useActionData, useTransition } from "@remix-run/react";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  flex-direction: column;
  min-width: 350px;
  padding: 1em;
  margin: auto;
`;

const InputContainer = styled.div`
  display: grid;
  row-gap: 10%;
  align-items: center;
`;

const SignUpLink = styled(Link)`
  padding-left: 0.5em;
  color: #afafe6;
  text-decoration: none;
  font-size: 1.1em;
`;

export const action: ActionFunction = async ({ request }) => {
  let formData = await request.formData();
  const formPayload = Object.fromEntries(formData);

  const validationSchema = z.object({
    email: z.string().email(),
    password: z.string(),
  });

  try {
    validationSchema.parse(formPayload);
    let sessionCookie;

    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    sessionCookie = await signIn(email, password);

    const session = await getSession(request.headers.get("cookie"));
    session.set("session", sessionCookie);

    return redirect("/", {
      headers: {
        "Set-Cookie": await commitSession(session),
      },
    });
  } catch (e) {
    return {
      errorMessage:
        "incorrect email or password. Make sure you have entered right credentials.",
    };
  }
};

export default function Join() {
  const actionData = useActionData() as { errorMessage: string };
  const transition = useTransition();
  const isSubmitting = !!transition.submission;

  return (
    <Container>
      <Form style={{ width: "100%", maxWidth: "350px" }} method="post">
        <InputContainer>
          <TextField type="text" placeholder="email" name="email" />
          <TextField
            type="password"
            placeholder="password"
            name="password"
            showPasswordCheckbox={true}
            errorHelper={actionData?.errorMessage}
          />
          <div style={{ marginTop: "1em", width: "100%" }}>
            <Button fullWidth disabled={isSubmitting} type="submit">
              {isSubmitting ? "Signing in.." : "Sign in"}
            </Button>
            <div style={{ marginTop: "1em" }}>
              Don't have an account?
              <SignUpLink to="/join">Sign up</SignUpLink>
            </div>
          </div>
        </InputContainer>
      </Form>
    </Container>
  );
}

import { z } from "zod";
import TextField from "~/components/TextField";
import Button from "~/components/Button";
import { type ActionFunction, redirect } from "@remix-run/node";
import { signIn } from "~/server/auth.server";
import { commitSession, getSession } from "~/sessions";
import { Form, Link, useActionData, useTransition } from "@remix-run/react";
import * as styles from "./login.css";

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const formPayload = Object.fromEntries(formData);

  const validationSchema = z.object({
    email: z.string().email(),
    password: z.string(),
  });

  try {
    validationSchema.parse(formPayload);

    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const sessionCookie = await signIn(email, password);

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
    <div className={styles.Container}>
      <Form style={{ width: "100%", maxWidth: "350px" }} method="post">
        <div className={styles.InputContainer}>
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
              <Link className={styles.SignUpLink} to="/join">
                Sign up
              </Link>
            </div>
          </div>
        </div>
      </Form>
    </div>
  );
}

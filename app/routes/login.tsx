import { z } from "zod";
import TextField from "~/components/TextField";
import Button from "~/components/Button";
import { type ActionFunction, redirect } from "@remix-run/node";
import { signIn } from "~/server/auth.server";
import { commitSession, getSession } from "~/sessions";
import { Form, Link, useActionData, useNavigation } from "@remix-run/react";

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
  const transition = useNavigation();
  const isSubmitting = transition.state === "submitting";

  return (
    <div className="flex p-5 lg:max-w-2xl justify-center items-center h-full flex-col text-slate-600 mx-auto">
      <Form className="w-full mx-4 " method="post">
        <div className="grid gap-4">
          <TextField type="text" placeholder="email" name="email" />
          <TextField
            type="password"
            placeholder="password"
            name="password"
            showPasswordCheckbox={true}
            errorHelper={actionData?.errorMessage}
          />
          <div className="mt-4 w-full">
            <Button fullWidth disabled={isSubmitting} type="submit">
              {isSubmitting ? "Signing in.." : "Sign in"}
            </Button>
            <div className="mt-4">
              Don't have an account?
              <Link
                className="pl-2 text-indigo-400 text-lg decoration-transparent"
                to="/join"
              >
                Sign up
              </Link>
            </div>
          </div>
        </div>
      </Form>
    </div>
  );
}

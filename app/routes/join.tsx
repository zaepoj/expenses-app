import { z } from "zod";
import TextField from "~/components/TextField";
import Button from "~/components/Button";
import { type ActionFunction, redirect } from "@remix-run/node";
import { signUp } from "~/server/auth.server";
import { commitSession, getSession } from "~/sessions";
import { Form, Link, useActionData, useNavigation } from "@remix-run/react";

type ErrorActionResponse = {
  join_name: string;
  join_email: string;
  join_password: string;
  join_confirmPassword: string;
};

type FormDataEntries = {
  join_name: string;
  join_email: string;
  join_password: string;
  join_confirmPassword: string;
};

type ActionResponse = {
  formData: FormDataEntries;
  errors: ErrorActionResponse;
};

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const formPayload = Object.fromEntries(formData);
  const validationSchema = z
    .object({
      join_name: z
        .string()
        .min(2, { message: "Name must be atleast 2 characters long" }),
      join_email: z.string().email({ message: "Invalid email" }),
      join_password: z.string().min(3, { message: "Invalid password" }),
      join_confirmPassword: z.string().min(3, { message: "Invalid password" }),
    })
    .refine((data) => data.join_confirmPassword === data.join_password, {
      message: "Password mismatch!",
      path: ["confirmPassword"],
    });

  try {
    validationSchema.parse(formPayload);
    const name = formData.get("join_name") as string;
    const email = formData.get("join_email") as string;
    const password = formData.get("join_password") as string;

    let sessionCookie;

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
  } catch (e: any) {
    console.log(e);
    let errors = {} as ErrorActionResponse;
    if (e.issues) {
      errors = e.issues.reduce((acc: any, curr: any) => {
        const key = curr.path[0];
        acc[key] = curr.message;
        return acc;
      }, {});
    }
    const code = typeof e.code === "string" && (e.code as string);
    if (code === "auth/email-already-exists") {
      errors.join_email = "User with this email already exists";
    }

    if (code === "auth/invalid-password") {
      errors.join_password = "password must be at least 6 characters";
    }

    return {
      formData: Object.fromEntries(formData),
      errors,
    };
  }
};

export default function Join() {
  const actionData = useActionData() as ActionResponse;
  const transition = useNavigation();
  const isSubmitting = transition.state === "submitting";

  console.log(actionData);
  return (
    <div className="flex justify-center items-center h-full flex-col p-5 lg:max-w-2xl mx-auto ">
      <Form style={{ width: "100%" }} method="post">
        <div className="text-lg text-almostWhite mb-10 ">
          <h1>Sign up</h1>
        </div>
        <div className="grid">
          <div className="pb-10 grid gap-5">
            <TextField
              type="text"
              placeholder="Name"
              name="join_name"
              label="Name"
              defaultValue={actionData?.formData?.join_name}
              errorHelper={actionData?.errors?.join_name}
            />
            <TextField
              type="text"
              placeholder="email"
              name="join_email"
              label="Email"
              defaultValue={actionData?.formData?.join_email}
              errorHelper={actionData?.errors?.join_email}
            />
            <TextField
              type="password"
              placeholder="password"
              name="join_password"
              label="Password"
              defaultValue={actionData?.formData?.join_password}
              errorHelper={actionData?.errors?.join_password}
            />
            <TextField
              type="password"
              placeholder="confirm password"
              name="join_confirmPassword"
              label="Confirm Password"
              errorHelper={actionData?.errors?.join_confirmPassword}
              defaultValue={actionData?.formData?.join_confirmPassword}
            />
          </div>

          <Button disabled={isSubmitting} type="submit">
            {isSubmitting ? "Loading.." : "Sign up"}
          </Button>
          <div className="text-almostWhite" style={{ marginTop: "1em" }}>
            Already have an account?
            <Link
              className="pl-2 text-indigo-400 text-lg decoration-transparent"
              to="/login"
            >
              Sign in
            </Link>
          </div>
        </div>
      </Form>
    </div>
  );
}

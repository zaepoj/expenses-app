import styled from "styled-components";
import { z } from "zod";
import TextField from "~/components/TextField";
import Button from "~/components/Button";
import { ActionFunction, json, redirect } from "@remix-run/node";
import { signUp } from "~/server/auth.server";
import { commitSession, getSession } from "~/sessions";
import { Form, Link, useActionData, useTransition } from "@remix-run/react";

const Container = styled.div`
  min-width: 400px;
  margin: auto;
  height: 100%;
  display: flex;
  align-items: center;
`;

const InputContainer = styled.div`
  display: grid;
  row-gap: 5%;
  align-items: center;
`;

const HeaderContainer = styled.div`
  padding-bottom: 3em;
`;

const SignUpLink = styled(Link)`
  padding-left: 0.5em;
  color: #afafe6;
  text-decoration: none;
  font-size: 1.1em;
`;

type ErrorActionResponse = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

type FormDataEntries = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

type ActionResponse = {
  formData: FormDataEntries;
  errors: ErrorActionResponse;
};

export const action: ActionFunction = async ({ request }) => {
  let formData = await request.formData();
  const formPayload = Object.fromEntries(formData);
  const validationSchema = z
    .object({
      name: z
        .string()
        .min(2, { message: "Name must be atleast 2 characters long" }),
      email: z.string().email({ message: "Invalid email" }),
      password: z.string().min(3, { message: "Invalid password" }),
      confirmPassword: z.string().min(3, { message: "Invalid password" }),
    })
    .refine((data) => data.confirmPassword === data.password, {
      message: "Password mismatch!",
      path: ["confirmPassword"],
    });

  try {
    validationSchema.parse(formPayload);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

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
      errors.email = "User with this email already exists";
    }

    if (code === "auth/invalid-password") {
      errors.password = "password must be at least 6 characters";
    }

    return {
      formData: Object.fromEntries(formData),
      errors,
    };
  }
};

export default function Join() {
  const actionData = useActionData() as ActionResponse;
  const transition = useTransition();
  const isSubmitting = !!transition.submission;

  return (
    <Container>
      <Form style={{ width: "100%" }} method="post">
        <HeaderContainer>
          <h1>Sign up</h1>
        </HeaderContainer>
        <InputContainer>
          <TextField
            type="text"
            placeholder="Name"
            name="name"
            label="Name"
            defaultValue={actionData?.formData?.name}
            errorHelper={actionData?.errors?.name}
          />
          <TextField
            type="text"
            placeholder="email"
            name="email"
            label="Email"
            defaultValue={actionData?.formData?.email}
            errorHelper={actionData?.errors?.email}
          />
          <TextField
            type="password"
            placeholder="password"
            name="password"
            label="Password"
            defaultValue={actionData?.formData?.password}
            errorHelper={actionData?.errors?.password}
          />
          <TextField
            type="password"
            placeholder="confirm password"
            name="confirmPassword"
            errorHelper={actionData?.errors?.confirmPassword}
            defaultValue={actionData?.formData?.confirmPassword}
          />
          <Button disabled={isSubmitting} type="submit">
            {isSubmitting ? "Loading.." : "Sign up"}
          </Button>
          <div>
            Already have an account?
            <SignUpLink to="/login">Sign in</SignUpLink>
          </div>
        </InputContainer>
      </Form>
    </Container>
  );
}

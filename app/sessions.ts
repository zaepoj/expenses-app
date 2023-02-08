import { createCookieSessionStorage } from "@remix-run/node";

export const { getSession, commitSession, destroySession } =
  createCookieSessionStorage({
    cookie: {
      name: "__session",
      secrets: [process.env.SessionSecret || "fancy-secret"],
      maxAge: 60 * 60 * 24 * 7, // 1 week
      sameSite: "lax",
      path: "/",
      httpOnly: true,
    },
  });

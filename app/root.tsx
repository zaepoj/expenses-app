import {
  json,
  LinksFunction,
  LoaderFunction,
  MetaFunction,
} from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
  useTransition
} from "@remix-run/react";
import shared from "./shared.css";
import { AiFillHome, AiFillProject } from "react-icons/ai";
import Layout from "./components/Layout";
import { requireAuth } from "./server/auth.server";
import { cssBundleHref } from "@remix-run/css-bundle";
import LoaderBar from "./components/LoaderBar";
import * as styles from "./app.css";
import { ClientOnly } from "remix-utils";
import { createPortal } from "react-dom";

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "Expenses Tracker",
  viewport: "width=device-width,initial-scale=1",
});

export const loader: LoaderFunction = async ({ request, context }) => {
  const url = new URL(request.url);
  const path = url.pathname;
  const isLoginOrSignUpPage =
    path === "/login" || path === "/join" || path === "logout";

  return json({
    user: !isLoginOrSignUpPage && (await requireAuth(request)),
    isLoginOrSignUpPage,
  });
};

export const links: LinksFunction = () => {
  return [
    ...(cssBundleHref ? [{ rel: "stylesheet", href: cssBundleHref }] : []),
    // ...
  ];
};

export function Head() {
  return (
    <>
            <link href={shared} rel="stylesheet" />
        <link
          href="https://fonts.googleapis.com/css?family=Lato:400,700"
          rel="stylesheet"
          type="text/css"
        />
      <Meta />
      <Links />
    </>
  );
}


export default function App() {
  const data = useLoaderData();
  const isLoginOrSignUpPage = data.isLoginOrSignUpPage;
  const user = data.user;
  const transition = useTransition();
  return (
    <>
    {/* <html className={styles.html} lang="en"> */}

      {/* <body className={styles.body}>
        <div className={styles.container}>
          {!isLoginOrSignUpPage && (
            <Layout
              userInfo={{ uid: user.uid, name: user.name }}
              navItems={[
                { to: "/", title: "Dashboard", icon: AiFillHome },
                { to: "/expenses", title: "Expenses", icon: AiFillProject },
                // { to: "/settings", title: "Settings", icon: FaCog },
              ]}
            />
          )}
          <div
            className={
              isLoginOrSignUpPage
                ? styles.outletContainerLoginOrSignUpPage
                : styles.outlerContainer
            }
          >
            <LoaderBar
              loading={
                transition.state === "loading" ||
                transition.state === "submitting"
              }
            />
            <Outlet />
          </div>
        </div> */}
        <ClientOnly>{() => createPortal(<Head />, document.head)}</ClientOnly>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      {/* </body> */}
  {/* </html> */}
    </>
  );
}

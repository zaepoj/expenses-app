import { json, LoaderFunction, MetaFunction } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";
import styled, { ThemeProvider } from "styled-components";
import { theme } from "./theme";
import shared from "./shared.css";
import { AiFillHome, AiFillProject } from "react-icons/ai";
import Layout from "./components/Layout";
import { requireAuth } from "./server/auth.server";
import { FaCog } from "react-icons/fa";

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "New Remix App",
  viewport: "width=device-width,initial-scale=1",
});

const Container = styled.div`
  height: 100%;
  display: flex;

  @media only screen and (max-width: 700px) {
    flex-direction: column;
  }
`;

const OutletContainer = styled.div<{ isLoginOrSignUpPage: boolean }>`
  margin-left: ${(props) => (props.isLoginOrSignUpPage ? "auto" : "250px")};
  margin-right: ${(props) => props.isLoginOrSignUpPage && "auto"};
  width: ${(props) => !props.isLoginOrSignUpPage && "100%"};
  min-width: 300px;

  @media only screen and (max-width: 700px) {
    margin: 0;
  }
`;

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

export default function App() {
  // TODO type this
  const data = useLoaderData();
  const isLoginOrSignUpPage = data.isLoginOrSignUpPage;
  const user = data.user;
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
        <link href={shared} rel="stylesheet" />
        <link
          href="https://fonts.googleapis.com/css?family=Roboto+Mono|Roboto+Slab|Roboto:300,400,500,700"
          rel="stylesheet"
        />
        {typeof document === "undefined" ? "__STYLES__" : null}
      </head>
      <body>
        <ThemeProvider theme={theme}>
          <Container>
            {!isLoginOrSignUpPage && (
              <Layout
                userInfo={{ uid: user.uid, name: user.name }}
                navItems={[
                  { to: "/", title: "Dashboard", icon: AiFillHome },
                  { to: "/expenses", title: "Expenses", icon: AiFillProject },
                  { to: "/settings", title: "Settings", icon: FaCog },
                ]}
              />
            )}
            <OutletContainer isLoginOrSignUpPage={isLoginOrSignUpPage}>
              <Outlet />
            </OutletContainer>
          </Container>
          <ScrollRestoration />
          <Scripts />
          <LiveReload />
        </ThemeProvider>
      </body>
    </html>
  );
}

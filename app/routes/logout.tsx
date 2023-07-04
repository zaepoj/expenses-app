import { type LoaderFunction, redirect } from "@remix-run/node";
import { destroySession, getSession } from "~/sessions";
import * as styles from "./logout.css";

export const loader: LoaderFunction = async ({ request }) => {
  const session = await getSession(request.headers.get("Cookie"));
  return redirect("/", {
    headers: { "Set-Cookie": await destroySession(session) },
  });
};

export default function Logout() {
  return <div className={styles.container}>Logging off..</div>;
}

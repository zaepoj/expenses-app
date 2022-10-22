import { getAuth as getServerAuth, UserRecord } from "firebase-admin/auth";
import {
  getApps as getServerApps,
  initializeApp as initializeServerApp,
  cert as serverCert,
} from "firebase-admin/app";
import { signInWithPassword } from "~/firebaseClientSdk";
import { destroySession, getSession } from "~/sessions";
import { redirect, Session } from "@remix-run/node";

if (getServerApps().length === 0) {
  if (process.env.FIREBASE_AUTH) {
    const serviceAccount = JSON.parse(process.env.FIREBASE_AUTH);
    const config = {
      credential: serverCert(serviceAccount),
    };
    initializeServerApp(config);
  } else {
    throw new Error("missing env or something");
  }
}

const signUp = async (email: string, password: string, name: string) => {
  const auth = getServerAuth();
  await auth.createUser({ email, password, displayName: name });
  return await signIn(email, password);
};

const signIn = async (email: string, password: string) => {
  const idToken = await signInWithPassword(email, password);
  return signInWithToken(idToken);
};

const signInWithToken = async (idToken: string) => {
  const auth = getServerAuth();
  const expiresIn = 1000 * 60 * 60 * 24 * 7; // 1 week
  const sessionCookie = await auth.createSessionCookie(idToken, {
    expiresIn,
  });
  return sessionCookie;
};

const checkSessionCookie = async (session: Session) => {
  try {
    const auth = getServerAuth();
    const decodedIdToken = await auth.verifySessionCookie(
      session.get("session") || ""
    );
    return decodedIdToken;
  } catch {
    return { uid: undefined };
  }
};

const requireAuth = async (request: Request): Promise<UserRecord> => {
  const auth = getServerAuth();
  const session = await getSession(request.headers.get("cookie"));

  try {
    const { uid } = await checkSessionCookie(session);
    console.log("UID", uid);
    if(!uid) throw new Error("invalid uid")

    const user = await auth.getUser(uid);
    if(!user) throw new Error("user not found");
    return user;
  } catch (e) {
    throw redirect("/login", {
      headers: { "Set-Cookie": await destroySession(session) },
    });
  }
};

export { signUp, signIn, checkSessionCookie, requireAuth };

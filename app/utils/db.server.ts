import { initializeApp, getApps } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { getAuth as getServerAuth } from "firebase-admin/auth";
import { firestore } from "firebase-admin";
import {
  getApps as getServerApps,
  initializeApp as initializeServerApp,
  cert as serverCert,
} from "firebase-admin/app";

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

const db = firestore();

const firebaseConfig = {

};

let firebase;
if (getApps().length === 0) {
  firebase = initializeApp(firebaseConfig);
}

async function signUp(email: string, password: string) {
  const auth = getServerAuth();
  await auth.createUser({ email, password, displayName: email });
  return await signIn(email, password);
}

export const signInWithToken = async (idToken: string) => {
  const auth = getServerAuth();
  const expiresIn = 1000 * 60 * 60 * 24 * 7; // 1 week
  const sessionCookie = await auth.createSessionCookie(idToken, {
    expiresIn,
  });
  return sessionCookie;
};

export const signIn = async (email: string, password: string) => {
  const auth = getAuth();
  await signInWithEmailAndPassword(auth, email, password);
  const idToken = await auth.currentUser?.getIdToken();
  return idToken;
};

export { signUp, db };

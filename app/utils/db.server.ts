import { initializeApp, getApps } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import {
  initializeApp as adminInitializeApp,
  credential,
  firestore,
} from "firebase-admin";

if (getApps().length === 0) {
  if (process.env.FIREBASE_AUTH) {
    console.log(process.env.FIREBASE_AUTH.toString());
    const serviceAccount = JSON.parse(process.env.FIREBASE_AUTH);
    const config = {
      credential: credential.cert(serviceAccount),
    };
    adminInitializeApp(config);
  } else {
    throw new Error("missing env or something");
  }
}

const db = firestore();

const firebaseConfig = {};

let firebase;
if (getApps().length === 0) {
  firebase = initializeApp(firebaseConfig);
}

async function signUp(email: string, password: string) {
  const auth = getAuth();
  return createUserWithEmailAndPassword(auth, email, password);
}

export { db };

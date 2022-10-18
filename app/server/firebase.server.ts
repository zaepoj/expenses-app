import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import * as admin from "firebase-admin";



if (getApps().length === 0) {
	console.log("test")
  if (process.env.FIREBASE_AUTH) {
		console.log("asd")
    console.log(process.env.FIREBASE_AUTH.toString())
    const serviceAccount = JSON.parse(process.env.FIREBASE_AUTH);
    const config = {
      credential: admin.credential.cert(serviceAccount),
    };
    admin.initializeApp(config)
  } else {
    throw new Error("missing env");
  }
}

const firebaseConfig = {
  apiKey: "AIzaSyBxX_TefUpwzuS7R9Zwz0sysbc1vEMVBfs",
  authDomain: "expensesapp-9bbe6.firebaseapp.com",
  projectId: "expensesapp-9bbe6",
  storageBucket: "expensesapp-9bbe6.appspot.com",
  messagingSenderId: "257195153172",
  appId: "1:257195153172:web:2cb8de27d2a49998135401",
};

if (getApps().length === 0) {
  initializeApp(firebaseConfig);
}
const auth = getAuth();

export { auth };

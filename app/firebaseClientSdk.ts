import { initializeApp, getApps } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

//https://stackoverflow.com/a/37484053
const firebaseConfig =
  process.env.NODE_ENV === "production"
    ? {
        apiKey: "AIzaSyBxX_TefUpwzuS7R9Zwz0sysbc1vEMVBfs",
        authDomain: "expensesapp-9bbe6.firebaseapp.com",
        projectId: "expensesapp-9bbe6",
        storageBucket: "expensesapp-9bbe6.appspot.com",
        messagingSenderId: "257195153172",
        appId: "1:257195153172:web:2cb8de27d2a49998135401",
      }
    : {
        apiKey: "AIzaSyAU4C6g56ej8ZR3GycQCdyKDHsXT4TVFPI",
        authDomain: "project-2-316421.firebaseapp.com",
        projectId: "project-2-316421",
        storageBucket: "project-2-316421.appspot.com",
        messagingSenderId: "163481291957",
        appId: "1:163481291957:web:bf238397b994f69f1242fc",
      };

let firebase;
if (getApps().length === 0) {
  firebase = initializeApp(firebaseConfig);
}

const signInWithPassword = async (email: string, password: string) => {
  const auth = getAuth();
  await signInWithEmailAndPassword(auth, email, password);
  const idToken = (await auth.currentUser?.getIdToken()) || "";
  return idToken;
};

export { signInWithPassword };

import { initializeApp, getApps } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const firebaseConfig = {

};

let firebase;
if (getApps().length === 0) {
  firebase = initializeApp(firebaseConfig);
}

const signInWithPassword = async (email: string, password: string) => {
  const auth = getAuth();
  await signInWithEmailAndPassword(auth, email, password);
  const idToken = await auth.currentUser?.getIdToken() || '';
  return idToken;
};

export { signInWithPassword };

// lib/firebase.js
import { initializeApp, getApps } from "firebase/app";
import { getAnalytics, logEvent } from "firebase/analytics";
import { getFirestore, collection, addDoc, serverTimestamp } from "firebase/firestore";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { firebaseConfig } from "../firebaseConfig";

let app, analytics, db, auth, googleProvider;

if (!getApps().length && typeof window !== "undefined") {
  app = initializeApp(firebaseConfig);
  try {
    analytics = getAnalytics(app);
  } catch {}
  db = getFirestore(app);
  auth = getAuth(app);
  googleProvider = new GoogleAuthProvider();
}

export {
  analytics,
  logEvent,
  db,
  collection,
  addDoc,
  serverTimestamp,
  auth,
  googleProvider,
  signInWithPopup,
};

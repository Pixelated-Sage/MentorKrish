// lib/firebase.js
import { initializeApp, getApps } from "firebase/app";
import { getAnalytics, logEvent } from "firebase/analytics";
import { getFirestore, collection, addDoc, serverTimestamp } from "firebase/firestore";
import { firebaseConfig } from "../firebaseConfig";

let app, analytics, db;

if (!getApps().length && typeof window !== "undefined") {
  app = initializeApp(firebaseConfig);
  try {
    analytics = getAnalytics(app);
  } catch {}
  db = getFirestore(app);
}

export { analytics, logEvent, db, collection, addDoc, serverTimestamp };

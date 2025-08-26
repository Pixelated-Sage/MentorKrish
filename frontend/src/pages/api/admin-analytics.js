import admin from "firebase-admin";
import path from "path";
import fs from "fs";

let serviceAccount;
try {
  const keyPath = path.resolve(process.cwd(), "serviceAccountKey.json");
  console.log("Reading Firebase key from", keyPath);
  serviceAccount = JSON.parse(fs.readFileSync(keyPath, "utf8"));
} catch (err) {
  console.error("Failed to load Firebase service account key file:", err);
  throw err; // expose error so server startup fails loudly
}

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}
const db = admin.firestore();

export default async function handler(req, res) {
  try {
    // Aggregate event stats by event type
    const snapshot = await db.collection("user_events").get();

    const eventCounts = {};
    snapshot.forEach(doc => {
      const data = doc.data();
      const ev = data.event || "unknown";
      eventCounts[ev] = (eventCounts[ev] || 0) + 1;
    });

    // Turn into array for charts
    const eventArray = Object.entries(eventCounts).map(([event, count]) => ({
      name: event,
      value: count,
    }));

    res.status(200).json({ eventCounts: eventArray });
  } catch (err) {
    console.error("Firestore fetch failed:", err);
    res.status(500).json({ error: "Failed to fetch analytics" });
  }
}

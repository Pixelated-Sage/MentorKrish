import admin from "firebase-admin";
import path from "path";
import fs from "fs";

const serviceAccount = JSON.parse(
  fs.readFileSync(path.resolve(process.cwd(), "serviceAccountKey.json"), "utf8")
);

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

const db = admin.firestore();

export default async function handler(req, res) {
  try {
    await db.collection("test_collection").add({
      testField: "This is a test",
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });
    res.status(200).json({ message: "Write successful" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

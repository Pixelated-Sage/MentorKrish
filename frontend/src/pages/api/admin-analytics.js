import admin from "firebase-admin";
import path from "path";
import fs from "fs";


let serviceAccount;

try {
  // Parse service account from ENV variable
  serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
  console.log("Using service account from env var", process.env.FIREBASE_SERVICE_ACCOUNT ? "✅" : "❌");
} catch (err) {
  console.error("Failed to parse FIREBASE_SERVICE_ACCOUNT env var:", err);
  throw err;
}
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}
const db = admin.firestore();

export default async function handler(req, res) {
  try {
    const snapshot = await db.collection("user_events").get();

    const now = new Date();
    const thirtyDaysAgo = new Date(now.getTime() - 29 * 24 * 60 * 60 * 1000);

    const eventCounts = {};
    const pageViews = {};
    const courseViews = {};
    const dailyTrends = {};

    snapshot.forEach((doc) => {
      const data = doc.data();

      // Event type counts
      const event = data.event || "unknown";
      eventCounts[event] = (eventCounts[event] || 0) + 1;

      // Aggregate page views by path
      if (data.path && event === "page_view") {
        pageViews[data.path] = (pageViews[data.path] || 0) + 1;
      }

      // Aggregate course views by course key
      if (data.course && (event === "courses_page_view" || event === "course_tab_switch" || event === "course_enroll_click")) {
        courseViews[data.course] = (courseViews[data.course] || 0) + 1;
      }

      // Daily event trend (last 30 days based on timestamp)
      if (data.timestamp) {
        const ts = data.timestamp.toDate ? data.timestamp.toDate() : new Date(data.timestamp);
        if (ts >= thirtyDaysAgo) {
          const dayKey = ts.toISOString().slice(0, 10); // YYYY-MM-DD
          dailyTrends[dayKey] = (dailyTrends[dayKey] || 0) + 1;
        }
      }
    });

    // Convert objects to arrays and sort for charts
    const sortedPageViews = Object.entries(pageViews).map(([path, count]) => ({ path, count }))
      .sort((a,b) => b.count - a.count).slice(0,10); // top 10 pages

    const sortedCourseViews = Object.entries(courseViews).map(([course, count]) => ({ course, count }))
      .sort((a,b) => b.count - a.count);

    // Generate filled dates for daily trends last 30 days
    const dailyTrendArray = [];
    for(let i=0; i<30; i++){
      const date = new Date(thirtyDaysAgo.getTime() + i*24*60*60*1000);
      const dayKey = date.toISOString().slice(0,10);
      dailyTrendArray.push({ date: dayKey, count: dailyTrends[dayKey] || 0 });
    }

    const eventArray = Object.entries(eventCounts).map(([name, value]) => ({ name, value }));

    res.status(200).json({
      eventCounts: eventArray,
      pageViews: sortedPageViews,
      courseViews: sortedCourseViews,
      dailyTrends: dailyTrendArray
    });

  } catch (err) {
    console.error("Firestore fetch failed:", err);
    res.status(500).json({ error: "Failed to fetch analytics" });
  }
}

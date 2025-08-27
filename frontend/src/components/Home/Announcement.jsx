import React, { useState, useEffect } from "react";
import { fetchAnnouncements } from "../../lib/api";
import { analytics, logEvent, db, addDoc, collection, serverTimestamp } from "../../lib/firebase"; // Adjust path if needed
import { useRouter } from "next/router";

export default function AnnouncementsSection() {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      const data = await fetchAnnouncements();

      // Map backend fields → UI format
      const mapped = data.map((item) => ({
        id: item.id || item._id || index, // add announcement id for analytics
        title: item.title,
        image: item.imageUrl
          ? `${process.env.NEXT_PUBLIC_API_URL}${item.imageUrl}`
          : "/assets/img/dsat.jpg",
        description: item.description,
        timer: null,
        link: "/contact",
      }));

      setAnnouncements(mapped);
      setLoading(false);
    }

    loadData();
  }, []);

  // Track click on "Know More"
  const handleKnowMoreClick = async (announcement, index) => {
    // Firebase Analytics tracking
    if (analytics) {
      logEvent(analytics, "announcement_click", {
        announcement_id: announcement.id,
        announcement_title: announcement.title,
        location: "homepage_announcements",
      });
    }

    // Firestore tracking
    if (db) {
      try {
        await addDoc(collection(db, "user_events"), {
          event: "announcement_click",
          announcement_id: announcement.id,
          announcement_title: announcement.title,
          index,
          location: "homepage_announcements",
          user: typeof window !== "undefined" ? localStorage.getItem("userEmail") || "guest" : "server",
          timestamp: serverTimestamp(),
          path: typeof window !== "undefined" ? window.location.pathname : "server",
        });
      } catch (e) {
        console.error("Failed to log announcement click event to Firestore", e);
      }
    }

    // Navigation
    router.push(announcement.link);
  };

  if (loading) {
    return (
      <section className="py-10 bg-w1" id="announcements">
        <div className="max-w-7xl mx-auto px-4 text-center text-g2">
          Loading announcements...
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 bg-w1" id="announcement">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <h2 className="text-2xl sm:text-3xl font-bold text-g1 mb-3 text-center">
          📢 Latest Announcements
        </h2>
        <p className="text-center text-g2 mb-8 max-w-xl mx-auto text-sm sm:text-base leading-relaxed">
          Stay updated with deadlines, new programs, and exclusive opportunities from the Mentor Krish community.
        </p>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {announcements.map((item, index) => (
            <div
              key={index}
              className="bg-w2 rounded-2xl shadow-md overflow-hidden hover:shadow-2xl hover:-translate-y-1 transition-transform duration-300 border border-white/10"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-40 sm:h-48 object-cover"
                loading="lazy"
              />
              <div className="p-5 flex flex-col justify-between min-h-[180px]">
                <div>
                  <h3 className="text-lg sm:text-xl font-semibold text-g1 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-g2 text-sm leading-relaxed line-clamp-3">
                    {item.description}
                  </p>
                </div>

                <div className="mt-4">
                  {item.timer && (
                    <div className="bg-w1 text-r1 text-[11px] sm:text-xs px-2 py-1 inline-block rounded-full font-semibold mb-3 tracking-wide select-none">
                      ⏳ {item.timer} left
                    </div>
                  )}
                  <button
                    type="button"
                    className="text-r1 hover:text-r2 hover:underline font-semibold text-sm"
                    onClick={() => handleKnowMoreClick(item, index)}
                  >
                    Know More →
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

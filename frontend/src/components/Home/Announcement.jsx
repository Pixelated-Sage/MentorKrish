import React, { useState, useEffect } from "react";
import { fetchAnnouncements } from "../../lib/api";
import { analytics, logEvent, db, addDoc, collection, serverTimestamp } from "../../lib/firebase";
import { useRouter } from "next/router";
import Sample from "../../../public/assets/img/dsat.jpg";

function AnnouncementModal({ announcement, onClose }) {
  if (!announcement) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
      <div className="bg-w1 rounded-2xl shadow-xl max-w-lg w-full p-6 relative border">
        <button
          className="absolute right-5 top-5 text-gray-500 text-3xl"
          onClick={onClose}
          aria-label="Close"
        >×</button>
        <img
          src={announcement.image}
          alt={announcement.title}
          className="w-full h-44 object-cover rounded-lg mb-4"
        />
        <h2 className="text-xl font-bold mb-2">{announcement.title}</h2>
        {announcement.timer && (
          <div className="mb-2 bg-yellow-100 text-yellow-700 font-bold py-1 px-3 inline-block rounded">{announcement.timer}</div>
        )}
        <p className="text-g2 mb-3">{announcement.description}</p>
        {announcement.content && (
          <div className="mb-4 text-base whitespace-pre-line">{announcement.content}</div>
        )}
        <button
          className="bg-r1 hover:bg-r2 text-white px-6 py-2 rounded font-semibold shadow mt-3"
          onClick={() => window.location.href = '/contact'}
        >
          Contact
        </button>
      </div>
    </div>
  );
}

export default function AnnouncementsSection() {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalIndex, setModalIndex] = useState(null);
  const router = useRouter();

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      const data = await fetchAnnouncements();

      const now = new Date();
      const filtered = data.filter(item => {
        if (!item.date || !item.time) return true;
        const announcementTime = new Date(`${item.date}T${item.time}`);
        return announcementTime >= now;
      });

      const mapped = filtered.map((item, index) => ({
        id: item.id || item._id || index,
        title: item.title,
        image: item.imageUrl && item.imageUrl.startsWith('http')
          ? item.imageUrl
          : Sample,
        description: item.description,
        content: item.content,
        timer: (() => {
          if (!item.date || !item.time) return null;
          const end = new Date(`${item.date}T${item.time}`);
          const diff = end - now;
          if (diff <= 0) return null;
          const days = Math.floor(diff / (1000 * 60 * 60 * 24));
          const hours = Math.floor(diff / (1000 * 60 * 60)) % 24;
          const mins = Math.floor(diff / (1000 * 60)) % 60;
          return `${
            days > 0 ? days + "d " : ""}${
            hours > 0 ? hours + "h " : ""
          }${
            mins > 0 ? mins + "m" : ""
          } left`;
        })(),
        link: "/contact",
      }));

      setAnnouncements(mapped);
      setLoading(false);
    }
    loadData();
  }, []);

  // Track click on "Know More" (for analytics)
  const handleKnowMoreClick = async (announcement, index) => {
    if (analytics) {
      logEvent(analytics, "announcement_click", {
        announcement_id: announcement.id,
        announcement_title: announcement.title,
        location: "homepage_announcements",
      });
    }
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
    setModalIndex(index);
  };

  const closeModal = () => setModalIndex(null);

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
          Latest Announcements
        </h2>
        <p className="text-center text-g2 mb-8 max-w-xl mx-auto text-sm sm:text-base leading-relaxed">
          Stay updated with deadlines, new programs, and exclusive opportunities from the Mentor Krish community.
        </p>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {announcements.map((item, index) => (
            <div
              key={index}
              className="bg-w2 rounded-2xl shadow-md overflow-hidden hover:shadow-2xl hover:-translate-y-1 transition-transform duration-300 border border-white/10 cursor-pointer"
              onClick={() => handleKnowMoreClick(item, index)}
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
                    onClick={e => {
                      e.stopPropagation();
                      handleKnowMoreClick(item, index);
                    }}
                  >
                    Know More →
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {modalIndex !== null && (
        <AnnouncementModal
          announcement={announcements[modalIndex]}
          onClose={closeModal}
        />
      )}
    </section>
  );
}

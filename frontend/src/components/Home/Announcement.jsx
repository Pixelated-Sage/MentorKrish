import React, { useState, useEffect } from "react";
import { fetchAnnouncements } from "../../lib/api";

export default function AnnouncementsSection() {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      const data = await fetchAnnouncements();

      // Map backend fields → UI format
      const mapped = data.map((item) => ({
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

  if (loading) {
    return (
      <section className="py-10 bg-w1" id="announcements">
        <div className="max-w-7xl mx-auto px-4 text-center">Loading announcements...</div>
      </section>
    );
  }

  return (
    <section className="py-10 bg-w1" id="announcement">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-g1 mb-2 text-center">
          Latest Announcements
        </h2>
        <p className="text-center text-g2 mb-6 max-w-lg mx-auto text-xs sm:text-base">
          Stay updated with deadlines, new programs, and more from the Mentor Krish community.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {announcements.map((item, index) => (
            <div
              key={index}
              className="bg-w2 rounded-xl shadow-lg overflow-hidden hover:scale-105 transition transform duration-300"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-32 sm:h-40 object-cover"
                loading="lazy"
              />
              <div className="p-3 sm:p-5">
                <h3 className="text-base sm:text-lg font-semibold text-g1 mb-1 sm:mb-2">
                  {item.title}
                </h3>
                <p className="text-g2 text-xs sm:text-sm mb-2 leading-snug">
                  {item.description}
                </p>
                {item.timer && (
                  <div className="bg-w1 text-r1 text-[10px] sm:text-xs px-2 py-1 inline-block rounded-full font-semibold mb-2 tracking-wide select-none">
                    {item.timer} left
                  </div>
                )}
                <a
                  href={item.link}
                  className="text-r1 hover:text-r2 hover:underline font-medium text-xs sm:text-sm"
                >
                  Know More →
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

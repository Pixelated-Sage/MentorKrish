import React, { useState, useEffect } from "react";
import { fetchAnnouncements } from "../../lib/api";
import { Sparkles, Calendar, ArrowRight, Bell } from "lucide-react";

export default function AnnouncementsSection() {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      const data = await fetchAnnouncements();
      setAnnouncements(data || []);
      setLoading(false);
    }
    loadData();
  }, []);

  if (loading || announcements.length === 0) {
    return null; // Return null cleanly when no active announcements are scheduled
  }

  return (
    <section className="py-16 bg-slate-50 border-y border-gray-100" id="announcement">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-red-100 text-red-600 text-xs font-bold uppercase tracking-wider mb-3">
            <Bell size={14} /> Latest Updates
          </span>
          <h2 className="text-3xl font-black text-gray-900">Announcements & Deadlines</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {announcements.map((item, index) => (
            <div key={index} className="bg-white rounded-3xl p-6 shadow-md border border-gray-100 space-y-4">
              <span className="text-xs font-bold text-red-600 bg-red-50 px-3 py-1 rounded-full">
                {item.date || "Upcoming"}
              </span>
              <h3 className="text-xl font-bold text-gray-900">{item.title}</h3>
              <p className="text-gray-600 text-sm">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

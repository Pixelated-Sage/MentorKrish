import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Eye, X, Image as ImageIcon, Play, Film } from "lucide-react";
import { fetchGallery } from "../lib/api";
import Head from "next/head";

export default function Gallery() {
  const [items, setItems] = useState([]);
  const [activeTab, setActiveTab] = useState("All");
  const [selectedMedia, setSelectedMedia] = useState(null);

  useEffect(() => {
    async function load() {
      const data = await fetchGallery();
      setItems(data);
    }
    load();
  }, []);

  const filterTabs = ["All", "Photos", "Videos", "Mentorship", "Classroom", "Counseling", "Achievements", "Workshops"];

  const filteredItems = items.filter((item) => {
    if (activeTab === "All") return true;
    if (activeTab === "Photos") return item.type === "image";
    if (activeTab === "Videos") return item.type === "video";
    return item.category === activeTab;
  });

  return (
    <>
      <Head>
        <title>Media Gallery & Highlights | Mentor Krish</title>
        <meta
          name="description"
          content="Explore photos and video highlights from Mentor Krish SAT prep sessions, 1-on-1 mentoring, and student achievement celebrations."
        />
        <link rel="canonical" href="https://mentorkrish.in/gallery" />
      </Head>

      <Navbar />

      <main className="min-h-screen bg-slate-50 pt-28 pb-20">
        {/* Header Banner */}
        <div className="max-w-7xl mx-auto px-4 md:px-8 mb-10">
          <div className="bg-slate-900 text-white rounded-2xl p-8 md:p-12 shadow-xs border border-slate-800 relative overflow-hidden">
            <div className="relative z-10 max-w-2xl space-y-3">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded bg-slate-800 text-slate-300 text-xs font-bold uppercase tracking-wider border border-slate-700">
                <Film size={14} className="text-red-700" /> Photo & Video Library
              </span>
              <h1 className="text-3xl md:text-4xl font-black tracking-tight">
                Institute & <span className="text-red-700">Mentorship</span> Gallery
              </h1>
              <p className="text-slate-400 text-sm md:text-base leading-relaxed">
                Highlights from 1-on-1 Digital SAT strategy sessions, diagnostic workshops, student felicitation ceremonies, and video walkthroughs.
              </p>
            </div>
          </div>
        </div>

        {/* Media Filter Bar */}
        <div className="max-w-7xl mx-auto px-4 md:px-8 mb-8">
          <div className="flex flex-wrap gap-2 justify-start">
            {filterTabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  activeTab === tab
                    ? "bg-slate-900 text-white shadow-xs"
                    : "bg-white text-slate-700 hover:bg-slate-200 border border-slate-200"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          {filteredItems.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-2xl border border-slate-200">
              <p className="text-slate-500 text-sm font-semibold">No media items available in this category.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              <AnimatePresence>
                {filteredItems.map((item) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="group relative bg-white rounded-2xl overflow-hidden shadow-xs border border-slate-200 hover:shadow-md transition-all duration-200 cursor-pointer h-64 flex flex-col justify-between"
                    onClick={() => setSelectedMedia(item)}
                  >
                    {/* Media Thumbnail */}
                    <img
                      src={item.src}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />

                    {/* Video Badge Overlay */}
                    {item.type === "video" && (
                      <div className="absolute inset-0 flex items-center justify-center bg-slate-950/30 group-hover:bg-slate-950/50 transition-colors">
                        <div className="w-12 h-12 rounded-full bg-red-700 text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                          <Play size={20} className="ml-1" />
                        </div>
                      </div>
                    )}

                    {/* Hover Info Banner */}
                    <div className="absolute inset-0 bg-slate-950/75 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col justify-between p-5">
                      <div className="flex justify-between items-center">
                        <span className="bg-red-700 text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded">
                          {item.type === "video" ? "Video" : "Photo"}
                        </span>
                        <span className="bg-slate-900 text-slate-300 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border border-slate-700">
                          {item.category}
                        </span>
                      </div>

                      <div>
                        <h3 className="text-base font-bold text-white mb-1">{item.title}</h3>
                        <p className="text-slate-300 text-xs line-clamp-2">{item.description}</p>
                        <div className="mt-2 flex items-center gap-1 text-[11px] text-red-400 font-bold uppercase tracking-wider">
                          <Eye size={13} /> {item.type === "video" ? "Watch Video" : "View Photo"}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>

        {/* Media Modal Lightbox / Player */}
        <AnimatePresence>
          {selectedMedia && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xs">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-white rounded-2xl max-w-3xl w-full overflow-hidden shadow-2xl relative border border-slate-200"
              >
                <button
                  onClick={() => setSelectedMedia(null)}
                  className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-slate-950/80 text-white flex items-center justify-center hover:bg-slate-900 transition cursor-pointer"
                >
                  <X size={16} />
                </button>

                {selectedMedia.type === "video" && selectedMedia.videoUrl ? (
                  <div className="aspect-video w-full bg-black flex items-center justify-center">
                    {selectedMedia.videoUrl.endsWith(".mp4") || selectedMedia.videoUrl.startsWith("/assets") ? (
                      <video
                        src={selectedMedia.videoUrl}
                        controls
                        autoPlay
                        className="w-full h-full object-contain"
                      />
                    ) : (
                      <iframe
                        src={selectedMedia.videoUrl}
                        title={selectedMedia.title}
                        className="w-full h-full border-0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    )}
                  </div>
                ) : (
                  <div className="h-80 w-full relative bg-slate-100">
                    <img
                      src={selectedMedia.src}
                      alt={selectedMedia.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}

                <div className="p-6 space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="bg-red-50 text-red-700 border border-red-200 text-[10px] font-extrabold px-2.5 py-0.5 rounded uppercase tracking-wider">
                      {selectedMedia.type === "video" ? "Video Highlights" : "Photo"}
                    </span>
                    <span className="bg-slate-100 text-slate-700 text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">
                      {selectedMedia.category}
                    </span>
                  </div>
                  <h2 className="text-xl font-bold text-slate-900">{selectedMedia.title}</h2>
                  <p className="text-slate-600 text-xs md:text-sm leading-relaxed">{selectedMedia.description}</p>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </main>

      <Footer />
    </>
  );
}

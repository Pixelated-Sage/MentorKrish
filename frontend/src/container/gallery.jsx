import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Eye, X, Film, Sparkles } from "lucide-react";
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

  const dynamicCategories = Array.from(
    new Set(items.map((item) => item.category).filter(Boolean))
  );
  const filterTabs = ["All", ...dynamicCategories];

  const filteredItems = items.filter((item) => {
    if (activeTab === "All") return true;
    if (activeTab === "Photos") return item.type === "image";
    if (activeTab === "Videos") return item.type === "video";
    return item.category === activeTab;
  });

  return (
    <>
      <Head>
        <title>Media Gallery & Student Achievements | Mentor Krish</title>
        <meta
          name="description"
          content="Explore student score cards, testimonials, and milestone achievements from Mentor Krish SAT, AP, and academic coaching programs."
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
                <Film size={14} className="text-red-700" /> Photo & Achievement Library
              </span>
              <h1 className="text-3xl md:text-4xl font-black tracking-tight">
                Institute & <span className="text-red-700">Mentorship</span> Gallery
              </h1>
              <p className="text-slate-400 text-sm md:text-base leading-relaxed">
                Highlights from AP scores, SAT results, student felicitation celebrations, and parent testimonials.
              </p>
            </div>
          </div>
        </div>

        {/* Media Filter Bar */}
        {filterTabs.length > 2 && (
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
        )}

        {/* Gallery Grid */}
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          {filteredItems.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-2xl border border-slate-200">
              <p className="text-slate-500 text-sm font-semibold">No media items available in this category.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
              <AnimatePresence>
                {filteredItems.map((item) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="group relative bg-white rounded-2xl overflow-hidden shadow-xs border border-slate-200 hover:shadow-lg transition-all duration-300 cursor-pointer flex flex-col"
                    onClick={() => setSelectedMedia(item)}
                  >
                    {/* Media Thumbnail Container */}
                    <div className="relative aspect-[4/5] sm:aspect-[3/4] w-full bg-slate-100 overflow-hidden flex items-center justify-center p-3">
                      <img
                        src={item.src}
                        alt={item.title}
                        loading="lazy"
                        className="w-full h-full object-contain object-center rounded-xl group-hover:scale-102 transition-transform duration-300 drop-shadow-xs"
                      />

                      {/* Category Tag overlay */}
                      <div className="absolute top-4 left-4 z-10">
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-slate-900/80 backdrop-blur-xs text-white text-[11px] font-bold uppercase tracking-wider border border-white/10">
                          <Sparkles size={11} className="text-yellow-400" />
                          {item.category || "Highlight"}
                        </span>
                      </div>

                      {/* Hover Info Banner */}
                      <div className="absolute inset-0 bg-slate-950/60 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col justify-end p-5">
                        <div>
                          <h3 className="text-sm font-bold text-white mb-1">{item.title}</h3>
                          <div className="mt-1 flex items-center gap-1 text-[11px] text-red-400 font-bold uppercase tracking-wider">
                            <Eye size={13} /> View Photo
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Card Description */}
                    <div className="p-5 bg-white border-t border-slate-100 flex-grow flex flex-col justify-between">
                      <div className="space-y-1">
                        <h3 className="font-bold text-slate-900 text-base group-hover:text-red-700 transition-colors">
                          {item.title}
                        </h3>
                        <p className="text-slate-600 text-xs leading-relaxed line-clamp-2">
                          {item.description}
                        </p>
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
            <div
              className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xs"
              onClick={() => setSelectedMedia(null)}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-white rounded-2xl max-w-2xl w-full overflow-hidden shadow-2xl relative border border-slate-200 flex flex-col max-h-[90vh]"
              >
                <button
                  onClick={() => setSelectedMedia(null)}
                  className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-slate-950/80 text-white flex items-center justify-center hover:bg-slate-900 transition cursor-pointer"
                  aria-label="Close modal"
                >
                  <X size={16} />
                </button>

                <div className="bg-slate-950 flex items-center justify-center p-4 overflow-hidden max-h-[65vh]">
                  <img
                    src={selectedMedia.src}
                    alt={selectedMedia.title}
                    className="max-h-[60vh] w-auto max-w-full object-contain rounded-lg"
                  />
                </div>

                <div className="p-6 space-y-2 bg-white">
                  <div className="flex items-center gap-2">
                    <span className="bg-red-50 text-red-700 border border-red-200 text-[10px] font-extrabold px-2.5 py-0.5 rounded uppercase tracking-wider">
                      {selectedMedia.category}
                    </span>
                    <span className="text-slate-400 text-xs">• Verified Result</span>
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

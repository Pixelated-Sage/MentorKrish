import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Eye, X, Award, ChevronRight, Sparkles } from "lucide-react";
import { fetchGallery } from "../../lib/api";

const Gallery = () => {
  const [galleryItems, setGalleryItems] = useState([]);
  const [activeFilter, setActiveFilter] = useState("all");
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadGallery() {
      setLoading(true);
      const data = await fetchGallery();
      setGalleryItems(data);
      setLoading(false);
    }
    loadGallery();
  }, []);

  const categories = ["all", ...new Set(galleryItems.map((item) => item.category).filter(Boolean))];

  const filteredItems =
    activeFilter === "all"
      ? galleryItems
      : galleryItems.filter((item) => item.category === activeFilter);

  return (
    <section className="py-20 bg-slate-50 border-t border-slate-200" id="gallery">
      <div className="max-w-7xl mx-auto px-4 md:px-8 space-y-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-2xl space-y-3">
            <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-md bg-slate-200 text-slate-800 text-xs font-bold uppercase tracking-wider border border-slate-300">
              <Award size={14} className="text-red-700" /> Student Highlights & Results
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
              Moments of <span className="text-red-700">Excellence</span> & Mentorship
            </h2>
            <p className="text-slate-600 text-sm md:text-base leading-relaxed">
              Real results, student score achievements, and testimonials from our SAT, AP, and academic mentorship batches.
            </p>
          </div>

          {/* Filter Pills & View All Link */}
          <div className="flex flex-wrap items-center gap-2">
            {categories.length > 2 && (
              <div className="flex flex-wrap gap-1.5 bg-slate-200/80 p-1 rounded-xl">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveFilter(cat)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                      activeFilter === cat
                        ? "bg-slate-900 text-white shadow-xs"
                        : "text-slate-600 hover:text-slate-900 hover:bg-white/60"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            )}

            <Link
              href="/gallery"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider bg-red-700 text-white hover:bg-red-800 transition-colors shadow-xs"
            >
              <span>Full Gallery</span>
              <ChevronRight size={14} />
            </Link>
          </div>
        </div>

        {/* Gallery Cards Grid */}
        {loading ? (
          <div className="text-center py-16 text-slate-400 text-sm font-semibold">
            Loading gallery...
          </div>
        ) : filteredItems.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-slate-200">
            <p className="text-slate-500 text-sm font-semibold">No media items available right now.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence>
              {filteredItems.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  onClick={() => setSelectedMedia(item)}
                  className="group bg-white rounded-2xl overflow-hidden shadow-xs border border-slate-200 hover:shadow-lg hover:border-slate-300 transition-all duration-300 cursor-pointer flex flex-col"
                >
                  {/* Image Container with high quality aspect display */}
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

                    {/* Hover Overlay Button */}
                    <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                      <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/95 text-slate-900 text-xs font-black shadow-lg uppercase tracking-wider transform translate-y-2 group-hover:translate-y-0 transition-transform">
                        <Eye size={14} className="text-red-700" /> Click to Preview
                      </span>
                    </div>
                  </div>

                  {/* Card Content Footer */}
                  <div className="p-5 flex flex-col justify-between flex-grow border-t border-slate-100 bg-white">
                    <div className="space-y-1.5">
                      <h3 className="font-bold text-slate-900 text-base group-hover:text-red-700 transition-colors line-clamp-1">
                        {item.title}
                      </h3>
                      <p className="text-slate-600 text-xs leading-relaxed line-clamp-2">
                        {item.description}
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-medium">
                      <span className="text-red-700 font-bold uppercase text-[11px] tracking-wider flex items-center gap-1">
                        Verified Score <ChevronRight size={12} />
                      </span>
                      <span>Mentor Krish Result</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}

        {/* Modal Lightbox */}
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
                {/* Close Button */}
                <button
                  onClick={() => setSelectedMedia(null)}
                  className="absolute top-3 right-3 z-10 w-9 h-9 rounded-full bg-slate-900/80 text-white flex items-center justify-center hover:bg-slate-900 transition cursor-pointer shadow-md"
                  aria-label="Close modal"
                >
                  <X size={18} />
                </button>

                {/* Media Display */}
                <div className="bg-slate-950 flex items-center justify-center p-4 overflow-hidden max-h-[65vh]">
                  <img
                    src={selectedMedia.src}
                    alt={selectedMedia.title}
                    className="max-h-[60vh] w-auto max-w-full object-contain rounded-lg"
                  />
                </div>

                {/* Media Details */}
                <div className="p-6 bg-white space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="bg-red-50 text-red-700 border border-red-200 text-[10px] font-extrabold px-2.5 py-0.5 rounded uppercase tracking-wider">
                      {selectedMedia.category}
                    </span>
                    <span className="text-slate-400 text-xs">• Mentor Krish Mentorship</span>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900">{selectedMedia.title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{selectedMedia.description}</p>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Gallery;

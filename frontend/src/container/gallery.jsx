// pages/gallery.jsx
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Play, Heart, Download, ExternalLink, Eye } from 'lucide-react';
import { fetchGallery } from '../lib/api';
import sample from "../../public/assets/img/dsat.jpg";

const ITEMS_PER_PAGE = 12;

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35 } },
  hover: { y: -5, transition: { duration: 0.18 } },
};

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.25 } },
};

// Media component with Intersection Observer for lazy video play
function Media({ src, title }) {
  const ref = useRef();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.75 }
    );

    if (ref.current) observer.observe(ref.current);

    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, []);

  const isVideo = src?.match(/\.(mp4|mov|webm)$/i);

  return (
    <div ref={ref} className="relative w-full h-full">
      {isVideo ? (
        <video
          src={src}
          className="w-full h-full object-cover"
          autoPlay={isVisible}
          loop
          muted
          playsInline
          draggable={false}
        />
      ) : (
        <img
          src={src || sample}
          alt={title}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-105"
          draggable={false}
        />
      )}
    </div>
  );
}

const Gallery = () => {
  const [galleryData, setGalleryData] = useState([]);
  const [filter, setFilter] = useState('all');
  const [hoveredCard, setHoveredCard] = useState(null);
  const [likedCards, setLikedCards] = useState(new Set());
  const [loading, setLoading] = useState(true);
  const [visibleItems, setVisibleItems] = useState(ITEMS_PER_PAGE);

  useEffect(() => {
    async function loadGallery() {
      setLoading(true);
      const data = await fetchGallery();
      setGalleryData(data);
      setLoading(false);
    }
    loadGallery();
  }, []);

  const filteredData = filter === 'all' ? galleryData : galleryData.filter(item => item.category === filter);
  const displayedData = filteredData.slice(0, visibleItems);

  const handleLoadMore = () => {
    setVisibleItems(prev => Math.min(prev + ITEMS_PER_PAGE, filteredData.length));
  };

  const toggleLike = (cardId) => {
    setLikedCards(prev => {
      const newSet = new Set(prev);
      newSet.has(cardId) ? newSet.delete(cardId) : newSet.add(cardId);
      return newSet;
    });
  };

  const categoriesSet = new Set(['all']);
  galleryData.forEach(item => item.category && categoriesSet.add(item.category));
  const categoriesArr = Array.from(categoriesSet);

  const getSizeClass = (size) => `
    ${size === 'small' ? 'row-span-2' : size === 'medium' ? 'row-span-3' : size === 'large' ? 'row-span-4' : 'row-span-3'}
    sm:${size === 'small' ? 'row-span-2' : size === 'medium' ? 'row-span-3' : size === 'large' ? 'row-span-4' : 'row-span-3'}
    xs:row-span-2
  `;

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-w2 mt-18 p-4 sm:p-6 md:p-10 max-w-7xl mx-auto">
        {/* Page header */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-g1 mb-2">Gallery</h1>
          <p className="text-g2 max-w-xl mx-auto text-sm sm:text-base">
            Explore our latest designs, tutorials, and development showcases. Filter based on category and dive into the details.
          </p>
        </motion.div>

        {/* Sticky Filter Bar */}
        <div className="sticky top-16 z-30 bg-w2/95 backdrop-blur-sm border-b border-w2 mb-6 py-3 flex flex-wrap justify-center gap-3 shadow-sm">
          {categoriesArr.map((cat) => (
            <button
              key={cat}
              onClick={() => { setFilter(cat); setVisibleItems(ITEMS_PER_PAGE); setHoveredCard(null); }}
              className={`px-5 py-2 rounded-full font-semibold text-sm transition ${filter === cat ? 'bg-r1 text-w1 shadow-md' : 'bg-w1 text-g2 border border-w2 hover:bg-g2 hover:text-w1'}`}
              aria-pressed={filter === cat}
            >
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-5 auto-rows-[90px] sm:auto-rows-[100px] md:auto-rows-[120px]">
          <AnimatePresence>
            {loading ? (
              <div className="col-span-full text-center py-10">Loading gallery...</div>
            ) : (
              displayedData.map((item) => (
                <motion.div
                  layout
                  key={item.id}
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  whileHover="hover"
                  className={`relative rounded-xl shadow-md overflow-hidden cursor-pointer bg-w1 ${getSizeClass(item.size)}`}
                  onMouseEnter={() => setHoveredCard(item.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                  tabIndex={0}
                  aria-label={item.title}
                >
                  <Media src={item.src} title={item.title} />

                  {/* Overlay */}
                  <AnimatePresence>
                    {hoveredCard === item.id && (
                      <motion.div variants={overlayVariants} initial="hidden" animate="visible" exit="hidden" className="absolute inset-0 bg-black/70 flex flex-col justify-between p-3 sm:p-5 text-w1">
                        <div className="flex justify-between items-start mb-2 flex-wrap gap-1">
                          <div className="flex flex-wrap gap-1">
                            {item.tags?.map((tag, i) => (
                              <span key={i} className="px-2 py-1 rounded-full bg-w1/20 text-xs font-semibold select-none">{tag}</span>
                            ))}
                          </div>
                          <motion.button
                            onClick={(e) => { e.stopPropagation(); toggleLike(item.id); }}
                            aria-label={likedCards.has(item.id) ? 'Unlike' : 'Like'}
                            className="p-1 rounded-full bg-w1/20 hover:bg-w1/30 transition"
                            whileHover={{ scale: 1.2 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            <Heart className={`w-5 h-5 ${likedCards.has(item.id) ? 'fill-r1 text-r1' : 'text-w1'}`} />
                          </motion.button>
                        </div>

                        <div>
                          <h3 className="text-lg font-semibold">{item.title}</h3>
                          <p className="text-xs sm:text-sm opacity-90 mt-1">{item.description}</p>

                          <div className="flex gap-2 mt-3 flex-wrap">
                            <motion.button className="flex items-center gap-1 px-3 py-1 rounded-full bg-w1/20 text-xs hover:bg-w1/30 transition" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.96 }} onClick={(e) => e.stopPropagation()} aria-label="View details">
                              <Eye className="w-4 h-4" /> View
                            </motion.button>
                            <motion.button className="flex items-center gap-1 px-3 py-1 rounded-full bg-w1/20 text-xs hover:bg-w1/30 transition" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.96 }} onClick={(e) => e.stopPropagation()} aria-label="Save">
                              <Download className="w-4 h-4" /> Save
                            </motion.button>
                            <motion.button className="flex items-center gap-1 px-3 py-1 rounded-full bg-w1/20 text-xs hover:bg-w1/30 transition" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.96 }} onClick={(e) => e.stopPropagation()} aria-label="Open externally">
                              <ExternalLink className="w-4 h-4" /> Open
                            </motion.button>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </div>

        {/* Load More */}
        {visibleItems < filteredData.length && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="text-center mt-10">
            <motion.button onClick={handleLoadMore} className="px-8 py-3 bg-r1 text-w1 rounded-full font-semibold text-sm sm:text-base shadow hover:bg-r2 transition-colors" whileHover={{ scale: 1.07 }} whileTap={{ scale: 0.95 }} aria-label="Load more gallery items">
              Load More
            </motion.button>
          </motion.div>
        )}
      </main>
      <Footer />
    </>
  );
};

export default Gallery;

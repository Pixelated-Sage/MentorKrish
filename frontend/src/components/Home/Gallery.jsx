import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Heart, Download, ExternalLink, Eye } from 'lucide-react';
import { fetchGallery } from '../../lib/api';
import sample from "../../../public/assets/img/dsat.jpg"; // Sample image for fallback
const ITEMS_PER_PAGE = 12;

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

      // Map backend response to the format your component expects
      const mapped = data.map(item => ({
        id: item.id,
        type: 'image', // all items from backend are images for now
        src: item.imageUrl || sample, // backend provides imageUrl as '/uploads/filename'
        title: item.title || '',
        description: item.description || '',
        category: item.tag || 'all',
        tags: item.tag ? item.tag.split(',').map(t => t.trim()) : [],
        size: 'medium' // default, as backend doesn't return this
      }));

      setGalleryData(data);
      setLoading(false);
    }
    loadGallery();
  }, []);

  // Filtering and pagination logic
  const filteredData = filter === 'all' ? galleryData : galleryData.filter(item => item.category === filter);
  const displayedData = filteredData.slice(0, visibleItems);

  const toggleLike = (cardId) => {
    setLikedCards(prev => {
      const newSet = new Set(prev);
      if (newSet.has(cardId)) newSet.delete(cardId);
      else newSet.add(cardId);
      return newSet;
    });
  };

  const getSizeClass = (size) => {
    return `
      ${size === 'small' ? 'row-span-2' :
        size === 'medium' ? 'row-span-3' :
        size === 'large' ? 'row-span-4' : 'row-span-3'
      }
      sm:${
        size === 'small' ? 'row-span-2' :
        size === 'medium' ? 'row-span-3' :
        size === 'large' ? 'row-span-4' : 'row-span-3'
      }
      xs:row-span-2
    `;
  };

  // Dynamic category filter from actual galleryData
  const categoriesSet = new Set(['all']);
  galleryData.forEach(item => { if (item.category) categoriesSet.add(item.category); });
  const categoriesArr = Array.from(categoriesSet);

  const handleLoadMore = () => {
    setVisibleItems(prev => Math.min(prev + ITEMS_PER_PAGE, filteredData.length));
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 }
    },
    hover: {
      y: -5,
      transition: { duration: 0.18 }
    }
  };

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.18 }
    }
  };

  return (
    <div className="min-h-screen bg-w1 p-3 sm:p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-5 sm:mb-8"
        >
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-g1 mb-2 sm:mb-4">Design Gallery</h1>
          <p className="text-g2 text-xs sm:text-sm mb-4 sm:mb-6">Discover amazing designs and tutorials</p>

          {/* Filter Buttons */}
          <div className="flex flex-wrap gap-2 mb-4">
            {categoriesArr.map(category => (
              <motion.button
                key={category}
                onClick={() => {
                  setFilter(category);
                  setVisibleItems(ITEMS_PER_PAGE);
                  setHoveredCard(null);
                }}
                className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium border
                  transition-all duration-150
                  ${
                    filter === category
                      ? 'bg-r1 text-w1 border-r1 shadow-md'
                      : 'bg-w1 text-g1 border-g2 hover:bg-g2 hover:text-w1'
                  }`}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Responsive Grid */}
        <div className="
            grid 
            grid-cols-2 
            sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 
            gap-2 sm:gap-4 
            auto-rows-[90px] sm:auto-rows-[100px] md:auto-rows-[120px]
        ">
          <AnimatePresence>
            {loading ? (
              <div className="col-span-full text-center py-10">Loading gallery...</div>
            ) : (
              displayedData.map((item, idx) => (
                <motion.div
                  key={item.id}
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  whileHover="hover"
                  layout
                  className={`
                    relative bg-w1 rounded-xl shadow group cursor-pointer 
                    overflow-hidden
                    ${getSizeClass(item.size)}
                    transition-shadow
                  `}
                  onMouseEnter={() => setHoveredCard(item.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  {/* Media Content */}
                  <div className="relative w-full h-full">
                    <img
                      src={item.src}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-105"
                      draggable={false}
                      loading="lazy"
                    />

                    {/* Overlay */}
                    <AnimatePresence>
                      {hoveredCard === item.id && (
                        <motion.div
                          variants={overlayVariants}
                          initial="hidden"
                          animate="visible"
                          exit="hidden"
                          className="absolute inset-0 bg-black/60 flex flex-col justify-between p-2 sm:p-4"
                        >
                          {/* Top Actions/Tags */}
                          <div className="flex justify-between items-start mb-2">
                            <div className="flex gap-1 flex-wrap">
                              {item.tags.map((tag, tagIdx) => (
                                <span
                                  key={tagIdx}
                                  className="px-1.5 sm:px-2 py-0.5 bg-w1/20 rounded-full text-[10px] sm:text-xs text-w1"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                            <motion.button
                              onClick={e => { e.stopPropagation(); toggleLike(item.id); }}
                              className="p-1 bg-w1/20 rounded-full hover:bg-w1/30 transition-all"
                              whileHover={{ scale: 1.12 }}
                              whileTap={{ scale: 0.9 }}
                            >
                              <Heart
                                className={`w-4 h-4 ${likedCards.has(item.id) ? 'fill-r1 text-r1' : 'text-w1'}`}
                              />
                            </motion.button>
                          </div>
                          {/* Bottom Content */}
                          <div className="">
                            <h3 className="text-w1 font-semibold text-xs sm:text-sm mb-1">{item.title}</h3>
                            <p className="text-w1 text-[10px] sm:text-xs opacity-90 mb-2">{item.description}</p>
                            <div className="flex gap-1 sm:gap-2">
                              <motion.button
                                className="flex items-center gap-1 px-1.5 sm:px-3 py-0.5 sm:py-1 bg-w1/20 rounded-full text-[10px] sm:text-xs text-w1 hover:bg-w1/30 transition-all"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.96 }}
                              >
                                <Eye className="w-3 h-3" />
                                View
                              </motion.button>
                              <motion.button
                                className="flex items-center gap-1 px-1.5 sm:px-3 py-0.5 sm:py-1 bg-w1/20 rounded-full text-[10px] sm:text-xs text-w1 hover:bg-w1/30 transition-all"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.96 }}
                              >
                                <Download className="w-3 h-3" />
                                Save
                              </motion.button>
                              <motion.button
                                className="flex items-center gap-1 px-1.5 sm:px-3 py-0.5 sm:py-1 bg-w1/20 rounded-full text-[10px] sm:text-xs text-w1 hover:bg-w1/30 transition-all"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.96 }}
                              >
                                <ExternalLink className="w-3 h-3" />
                                Open
                              </motion.button>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </div>

        {/* Load More Button */}
        {visibleItems < filteredData.length && !loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-center mt-7 sm:mt-12"
          >
            <motion.button
              onClick={handleLoadMore}
              className="px-5 sm:px-8 py-2 sm:py-3 bg-r1 text-w1 rounded-full font-medium hover:bg-r2 transition-colors text-xs sm:text-base"
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.97 }}
            >
              Load More
            </motion.button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Gallery;

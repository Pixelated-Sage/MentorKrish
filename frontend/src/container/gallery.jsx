// pages/gallery.jsx

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Play, Heart, Download, ExternalLink, Eye } from 'lucide-react';

// Sample gallery data (copy your full galleryData here or import from separate file)
// For brevity, use your current galleryData or expand as needed
const galleryData = [
    {
      id: 1,
      type: 'image',
      src: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&h=500&fit=crop',
      title: 'Modern UI Design',
      description: 'Clean and minimalist interface design',
      category: 'design',
      size: 'medium',
      tags: ['UI', 'Design', 'Modern'],
    },
    {
      id: 2,
      type: 'video',
      src: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4',
      poster: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&h=600&fit=crop',
      title: 'Animation Tutorial',
      description: 'Learn advanced animation techniques',
      category: 'tutorial',
      size: 'large',
      tags: ['Animation', 'Tutorial', 'Motion'],
    },
    {
      id: 3,
      type: 'image',
      src: 'https://images.unsplash.com/photo-1558655146-364adaf1fcc9?w=400&h=300&fit=crop',
      title: 'Color Palette',
      description: 'Vibrant color combinations',
      category: 'design',
      size: 'small',
      tags: ['Colors', 'Palette', 'Design'],
    },
    {
      id: 4,
      type: 'image',
      src: 'https://images.unsplash.com/photo-1586717799252-bd134ad00e26?w=400&h=550&fit=crop',
      title: 'Typography Example',
      description: 'Beautiful typography in web design',
      category: 'design',
      size: 'medium',
      tags: ['Typography', 'Fonts', 'Design'],
    },
    {
      id: 5,
      type: 'video',
      src: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_2mb.mp4',
      poster: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop',
      title: 'Code Demo',
      description: 'Interactive coding demonstration',
      category: 'tutorial',
      size: 'medium',
      tags: ['Code', 'Demo', 'Development'],
    },
    {
      id: 6,
      type: 'image',
      src: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=700&fit=crop',
      title: 'Mobile App Design',
      description: 'Sleek mobile interface',
      category: 'design',
      size: 'large',
      tags: ['Mobile', 'App', 'Interface'],
    },
    {
      id: 7,
      type: 'image',
      src: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=280&fit=crop',
      title: 'Data Visualization',
      description: 'Beautiful charts and graphs',
      category: 'design',
      size: 'small',
      tags: ['Data', 'Charts', 'Analytics'],
    },
    {
      id: 8,
      type: 'video',
      src: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4',
      poster: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400&h=500&fit=crop',
      title: 'Tech Tutorial',
      description: 'Latest technology trends',
      category: 'tutorial',
      size: 'medium',
      tags: ['Technology', 'Tutorial', 'Innovation'],
    },
    {
      id: 9,
      type: 'image',
      src: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=400&h=600&fit=crop',
      title: 'Web Development',
      description: 'Modern web development practices',
      category: 'development',
      size: 'large',
      tags: ['Web', 'Development', 'Code'],
    },
    {
      id: 10,
      type: 'image',
      src: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=350&fit=crop',
      title: 'Creative Design',
      description: 'Innovative design concepts',
      category: 'design',
      size: 'small',
      tags: ['Creative', 'Innovation', 'Art'],
    },
  ];

// Pagination settings
const ITEMS_PER_PAGE = 12;

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35 }
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
    transition: { duration: 0.25 }
  }
};

const Gallery = () => {
  const [filter, setFilter] = useState('all');
  const [hoveredCard, setHoveredCard] = useState(null);
  const [likedCards, setLikedCards] = useState(new Set());
  const [visibleItems, setVisibleItems] = useState(ITEMS_PER_PAGE);

  // Filtered data according to selected filter
  const filteredData =
    filter === 'all'
      ? galleryData
      : galleryData.filter((item) => item.category === filter);

  // Data to display currently (pagination/load more)
  const displayedData = filteredData.slice(0, visibleItems);

  // Load more handler: show more items by pagination size
  const handleLoadMore = () => {
    setVisibleItems((prev) => Math.min(prev + ITEMS_PER_PAGE, filteredData.length));
  };

  // Toggle like state of cards
  const toggleLike = (cardId) => {
    setLikedCards((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(cardId)) newSet.delete(cardId);
      else newSet.add(cardId);
      return newSet;
    });
  };

  // Extract all categories dynamically from data
  const categories = Array.from(new Set(galleryData.map((item) => item.category)));
  categories.unshift('all');

  // Responsive row spans for masonry style layout
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

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-w2 mt-9 p-4 sm:p-6 md:p-10 max-w-8xl mx-auto">

        {/* Page header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.5 }}
          className="mb-8 text-center"
        >
          <h1 className="text-4xl font-bold text-g1 mb-2">Gallery</h1>
          <p className="text-g2 max-w-xl mx-auto text-sm sm:text-base">
            Explore our latest designs, tutorials, and development showcases. Filter based on category and dive into the details.
          </p>
        </motion.div>

        {/* Sticky Filter Bar */}
        <div className="sticky top-16 z-30 bg-w2/95 backdrop-blur-sm border-b border-w2 mb-6 py-3 flex flex-wrap justify-center gap-3 shadow-sm">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setFilter(cat);
                setVisibleItems(ITEMS_PER_PAGE);
                setHoveredCard(null);
              }}
              className={`px-5 py-2 rounded-full font-semibold text-sm transition 
                ${
                  filter === cat
                    ? 'bg-r1 text-w1 shadow-md'
                    : 'bg-w1 text-g2 border border-w2 hover:bg-g2 hover:text-w1'
                }
              `}
              aria-pressed={filter === cat}
            >
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div
          className={`
            grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 
            gap-3 sm:gap-5 auto-rows-[90px] sm:auto-rows-[100px] md:auto-rows-[120px]
          `}
        >
          <AnimatePresence>
            {displayedData.map((item) => (
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
                {/* Media */}
                <div className="relative w-full h-full">
                  {item.type === 'image' ? (
                    <img
                      src={item.src}
                      alt={item.title}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-105"
                      draggable={false}
                    />
                  ) : (
                    <>
                      <img
                        src={item.poster}
                        alt={item.title}
                        loading="lazy"
                        className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-105"
                        draggable={false}
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-20 flex justify-center items-center pointer-events-none">
                        <Play className="w-8 h-8 text-w1 opacity-80" />
                      </div>
                    </>
                  )}

                  {/* Overlay */}
                  <AnimatePresence>
                    {hoveredCard === item.id && (
                      <motion.div
                        variants={overlayVariants}
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        className="absolute inset-0 bg-black/70 flex flex-col justify-between p-3 sm:p-5 text-w1"
                      >
                        {/* Tags and Like Button */}
                        <div className="flex justify-between items-start mb-2 flex-wrap gap-1">
                          <div className="flex flex-wrap gap-1">
                            {item.tags.map((tag, i) => (
                              <span
                                key={i}
                                className="px-2 py-1 rounded-full bg-w1/20 text-xs font-semibold select-none"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>

                          <motion.button
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleLike(item.id);
                            }}
                            aria-label={likedCards.has(item.id) ? 'Unlike' : 'Like'}
                            className="p-1 rounded-full bg-w1/20 hover:bg-w1/30 transition"
                            whileHover={{ scale: 1.2 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            <Heart
                              className={`w-5 h-5 ${
                                likedCards.has(item.id) ? 'fill-r1 text-r1' : 'text-w1'
                              }`}
                            />
                          </motion.button>
                        </div>

                        {/* Title and description */}
                        <div>
                          <h3 className="text-lg font-semibold">{item.title}</h3>
                          <p className="text-xs sm:text-sm opacity-90 mt-1">{item.description}</p>

                          {/* Action buttons */}
                          <div className="flex gap-2 mt-3 flex-wrap">
                            <motion.button
                              className="flex items-center gap-1 px-3 py-1 rounded-full bg-w1/20 text-xs hover:bg-w1/30 transition"
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.96 }}
                              onClick={(e) => e.stopPropagation()}
                              aria-label="View details"
                            >
                              <Eye className="w-4 h-4" /> View
                            </motion.button>
                            <motion.button
                              className="flex items-center gap-1 px-3 py-1 rounded-full bg-w1/20 text-xs hover:bg-w1/30 transition"
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.96 }}
                              onClick={(e) => e.stopPropagation()}
                              aria-label="Save"
                            >
                              <Download className="w-4 h-4" /> Save
                            </motion.button>
                            <motion.button
                              className="flex items-center gap-1 px-3 py-1 rounded-full bg-w1/20 text-xs hover:bg-w1/30 transition"
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.96 }}
                              onClick={(e) => e.stopPropagation()}
                              aria-label="Open externally"
                            >
                              <ExternalLink className="w-4 h-4" /> Open
                            </motion.button>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Load More */}
        {visibleItems < filteredData.length && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-center mt-10"
          >
            <motion.button
              onClick={handleLoadMore}
              className="px-8 py-3 bg-r1 text-w1 rounded-full font-semibold text-sm sm:text-base shadow hover:bg-r2 transition-colors"
              whileHover={{ scale: 1.07 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Load more gallery items"
            >
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

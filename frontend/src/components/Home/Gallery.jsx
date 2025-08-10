import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Heart, Download, ExternalLink, Eye } from 'lucide-react';

const Gallery = () => {
  const [hoveredCard, setHoveredCard] = useState(null);
  const [likedCards, setLikedCards] = useState(new Set());
  const [filter, setFilter] = useState('all');


  // Sample data with different card types and sizes
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

  const filteredData = filter === 'all' ? galleryData : galleryData.filter(item => item.category === filter);

  const toggleLike = (cardId) => {
    setLikedCards(prev => {
      const newSet = new Set(prev);
      if (newSet.has(cardId)) newSet.delete(cardId);
      else newSet.add(cardId);
      return newSet;
    });
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
            {['all', 'design', 'tutorial', 'development'].map(category => (
              <motion.button
                key={category}
                onClick={() => setFilter(category)}
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
            {filteredData.map((item, idx) => (
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
                  {item.type === 'image' ? (
                    <img
                      src={item.src}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-105"
                      draggable={false}
                    />
                  ) : (
                    <div className="relative w-full h-full">
                      <img
                        src={item.poster}
                        alt={item.title}
                        className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-105"
                        draggable={false}
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center">
                        <Play className="w-8 sm:w-10 h-8 sm:h-10 text-w1 opacity-80" />
                      </div>
                    </div>
                  )}

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
            ))}
          </AnimatePresence>
        </div>

        {/* Load More Button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center mt-7 sm:mt-12"
        >
          <motion.button
            className="px-5 sm:px-8 py-2 sm:py-3 bg-r1 text-w1 rounded-full font-medium hover:bg-r2 transition-colors text-xs sm:text-base"
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.97 }}
          >
            Load More
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};

export default Gallery;

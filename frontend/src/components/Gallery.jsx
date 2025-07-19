import React, { useState, useEffect } from 'react';
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
      tags: ['UI', 'Design', 'Modern']
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
      tags: ['Animation', 'Tutorial', 'Motion']
    },
    {
      id: 3,
      type: 'image',
      src: 'https://images.unsplash.com/photo-1558655146-364adaf1fcc9?w=400&h=300&fit=crop',
      title: 'Color Palette',
      description: 'Vibrant color combinations',
      category: 'design',
      size: 'small',
      tags: ['Colors', 'Palette', 'Design']
    },
    {
      id: 4,
      type: 'image',
      src: 'https://images.unsplash.com/photo-1586717799252-bd134ad00e26?w=400&h=550&fit=crop',
      title: 'Typography Example',
      description: 'Beautiful typography in web design',
      category: 'design',
      size: 'medium',
      tags: ['Typography', 'Fonts', 'Design']
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
      tags: ['Code', 'Demo', 'Development']
    },
    {
      id: 6,
      type: 'image',
      src: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=700&fit=crop',
      title: 'Mobile App Design',
      description: 'Sleek mobile interface',
      category: 'design',
      size: 'large',
      tags: ['Mobile', 'App', 'Interface']
    },
    {
      id: 7,
      type: 'image',
      src: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=280&fit=crop',
      title: 'Data Visualization',
      description: 'Beautiful charts and graphs',
      category: 'design',
      size: 'small',
      tags: ['Data', 'Charts', 'Analytics']
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
      tags: ['Technology', 'Tutorial', 'Innovation']
    },
    {
      id: 9,
      type: 'image',
      src: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=400&h=600&fit=crop',
      title: 'Web Development',
      description: 'Modern web development practices',
      category: 'development',
      size: 'large',
      tags: ['Web', 'Development', 'Code']
    },
    {
      id: 10,
      type: 'image',
      src: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=350&fit=crop',
      title: 'Creative Design',
      description: 'Innovative design concepts',
      category: 'design',
      size: 'small',
      tags: ['Creative', 'Innovation', 'Art']
    }
  ];

  const getSizeClass = (size) => {
    switch (size) {
      case 'small':
        return 'row-span-2';
      case 'medium':
        return 'row-span-3';
      case 'large':
        return 'row-span-4';
      default:
        return 'row-span-3';
    }
  };

  const filteredData = filter === 'all' 
    ? galleryData 
    : galleryData.filter(item => item.category === filter);

  const toggleLike = (cardId) => {
    setLikedCards(prev => {
      const newSet = new Set(prev);
      if (newSet.has(cardId)) {
        newSet.delete(cardId);
      } else {
        newSet.add(cardId);
      }
      return newSet;
    });
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    },
    hover: {
      y: -5,
      transition: { duration: 0.2 }
    }
  };

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: 0.2 }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Design Gallery</h1>
          <p className="text-gray-600 mb-6">Discover amazing designs and tutorials</p>
          
          {/* Filter Buttons */}
          <div className="flex flex-wrap gap-2 mb-6">
            {['all', 'design', 'tutorial', 'development'].map((category) => (
              <motion.button
                key={category}
                onClick={() => setFilter(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  filter === category
                    ? 'bg-blue-500 text-white shadow-lg'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Pinterest-style Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 auto-rows-[100px]">
          <AnimatePresence>
            {filteredData.map((item, index) => (
              <motion.div
                key={item.id}
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
                whileHover="hover"
                layout
                className={`relative bg-white rounded-xl shadow-md overflow-hidden cursor-pointer group ${getSizeClass(item.size)}`}
                onMouseEnter={() => setHoveredCard(item.id)}
                onMouseLeave={() => setHoveredCard(null)}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Media Content */}
                <div className="relative w-full h-full">
                  {item.type === 'image' ? (
                    <img
                      src={item.src}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  ) : (
                    <div className="relative w-full h-full">
                      <img
                        src={item.poster}
                        alt={item.title}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center">
                        <Play className="w-12 h-12 text-white opacity-80" />
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
                        className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-between p-4"
                      >
                        {/* Top Actions */}
                        <div className="flex justify-between items-start">
                          <div className="flex gap-2">
                            {item.tags.map((tag, tagIndex) => (
                              <span
                                key={tagIndex}
                                className="px-2 py-1 bg-white bg-opacity-20 rounded-full text-xs text-white"
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
                            className="p-2 bg-white bg-opacity-20 rounded-full hover:bg-opacity-30 transition-all"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            <Heart
                              className={`w-4 h-4 ${
                                likedCards.has(item.id) ? 'fill-red-500 text-red-500' : 'text-white'
                              }`}
                            />
                          </motion.button>
                        </div>

                        {/* Bottom Content */}
                        <div>
                          <h3 className="text-white font-semibold text-lg mb-1">{item.title}</h3>
                          <p className="text-white text-sm opacity-80 mb-3">{item.description}</p>
                          
                          {/* Action Buttons */}
                          <div className="flex gap-2">
                            <motion.button
                              className="flex items-center gap-1 px-3 py-1 bg-white bg-opacity-20 rounded-full text-xs text-white hover:bg-opacity-30 transition-all"
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              <Eye className="w-3 h-3" />
                              View
                            </motion.button>
                            <motion.button
                              className="flex items-center gap-1 px-3 py-1 bg-white bg-opacity-20 rounded-full text-xs text-white hover:bg-opacity-30 transition-all"
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              <Download className="w-3 h-3" />
                              Save
                            </motion.button>
                            <motion.button
                              className="flex items-center gap-1 px-3 py-1 bg-white bg-opacity-20 rounded-full text-xs text-white hover:bg-opacity-30 transition-all"
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
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
          className="text-center mt-12"
        >
          <motion.button
            className="px-8 py-3 bg-blue-500 text-white rounded-full font-medium hover:bg-blue-600 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Load More
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};

export default Gallery;
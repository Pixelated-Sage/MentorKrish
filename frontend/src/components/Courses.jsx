import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const RoundsDashboard = () => {
  const [activeRound, setActiveRound] = useState(0);

  const roundsData = [
    {
      id: 'round-1',
      title: 'Round I',
      subtitle: 'SAT',
      course: 'Mastering the SAT',
      description: '25–35 hours of instruction, 250+ topic exercises, 50+ sectional tests, 15+ mocks',
      focus: 'Reading, Writing, Math',
      platform: 'DSAT online platform with real test interface',
      icon: '📚',
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200'
    },
    {
      id: 'round-2',
      title: 'Round II',
      subtitle: 'PSAT',
      course: 'PSAT Prep Essentials',
      description: 'Foundational practice and strategy sessions to prepare for SAT',
      focus: 'Diagnostic test, Time management, Critical reading',
      platform: null,
      icon: '📝',
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200'
    },
    {
      id: 'round-3',
      title: 'Round III',
      subtitle: 'ACT',
      course: 'ACT Accelerator',
      description: 'Practice ACT-style questions, timing drills, test-taking strategies',
      focus: 'English, Math, Reading, Science',
      platform: null,
      icon: '🎯',
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200'
    },
    {
      id: 'round-4',
      title: 'Round IV',
      subtitle: 'IELTS',
      course: 'IELTS Band Booster',
      description: '4 modules training (Listening, Reading, Writing, Speaking) + mock interviews',
      focus: 'British Council aligned curriculum',
      platform: null,
      icon: '🌍',
      color: 'from-orange-500 to-orange-600',
      bgColor: 'bg-orange-50',
      borderColor: 'border-orange-200'
    },
    {
      id: 'round-5',
      title: 'Round V',
      subtitle: 'TOEFL',
      course: 'TOEFL Pathfinder',
      description: 'Internet-based test practice, real-time speaking feedback, grammar drills',
      focus: 'Academic English + fluency training',
      platform: null,
      icon: '🚀',
      color: 'from-red-500 to-red-600',
      bgColor: 'bg-red-50',
      borderColor: 'border-red-200'
    }
  ];

  const sidebarVariants = {
    initial: { x: -50, opacity: 0 },
    animate: { x: 0, opacity: 1, transition: { duration: 0.5 } }
  };

  const contentVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.3 } }
  };

  const cardVariants = {
    initial: { opacity: 0, y: 30, scale: 0.95 },
    animate: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { 
        duration: 0.5,
        ease: "easeOut"
      }
    },
    hover: { 
      scale: 1.02,
      y: -5,
      transition: { duration: 0.2 }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-2">
            Test Prep Rounds
          </h1>
          <p className="text-gray-600 text-lg">
            Choose your preparation path and excel in standardized tests
          </p>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left Sidebar */}
          <motion.div
            variants={sidebarVariants}
            initial="initial"
            animate="animate"
            className="lg:w-1/4 space-y-2"
          >
            <h2 className="text-2xl font-semibold text-gray-800 mb-4 px-4">
              Rounds
            </h2>
            {roundsData.map((round, index) => (
              <motion.button
                key={round.id}
                onClick={() => setActiveRound(index)}
                className={`w-full text-left p-4 rounded-xl transition-all duration-300 border-2 ${
                  activeRound === index
                    ? `${round.bgColor} ${round.borderColor} shadow-lg`
                    : 'bg-white border-gray-200 hover:border-gray-300 hover:shadow-md'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">{round.icon}</span>
                  <div>
                    <h3 className={`font-bold ${
                      activeRound === index ? 'text-gray-800' : 'text-gray-700'
                    }`}>
                      {round.title}
                    </h3>
                    <p className={`text-sm ${
                      activeRound === index ? 'text-gray-600' : 'text-gray-500'
                    }`}>
                      {round.subtitle}
                    </p>
                  </div>
                </div>
              </motion.button>
            ))}
          </motion.div>

          {/* Rotating Circular Design */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="hidden lg:flex lg:w-1/6 items-center justify-center"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ 
                duration: 20, 
                repeat: Infinity, 
                ease: "linear" 
              }}
              className="relative"
            >
              <svg
                width="200"
                height="200"
                viewBox="0 0 200 200"
                className="drop-shadow-lg"
              >
                {/* Main circle */}
                <circle
                  cx="100"
                  cy="100"
                  r="70"
                  fill="none"
                  stroke="#4A5568"
                  strokeWidth="3"
                  className="opacity-80"
                />
                
                {/* Top circle - Search/Analytics */}
                <circle cx="100" cy="30" r="20" fill="#DC2626" />
                <g transform="translate(100, 30)">
                  <circle cx="0" cy="0" r="8" fill="none" stroke="white" strokeWidth="2"/>
                  <line x1="5" y1="5" x2="12" y2="12" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                </g>
                
                {/* Right circle - Paint Roller */}
                <circle cx="170" cy="100" r="20" fill="#DC2626" />
                <g transform="translate(170, 100)">
                  <rect x="-8" y="-4" width="16" height="8" rx="4" fill="none" stroke="white" strokeWidth="2"/>
                  <line x1="8" y1="0" x2="12" y2="0" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                </g>
                
                {/* Bottom circle - Medical/Health */}
                <circle cx="100" cy="170" r="20" fill="#DC2626" />
                <g transform="translate(100, 170)">
                  <rect x="-8" y="-8" width="16" height="16" rx="2" fill="none" stroke="white" strokeWidth="2"/>
                  <line x1="-4" y1="0" x2="4" y2="0" stroke="white" strokeWidth="2"/>
                  <line x1="0" y1="-4" x2="0" y2="4" stroke="white" strokeWidth="2"/>
                </g>
                
                {/* Left circle - Globe/Network */}
                <circle cx="30" cy="100" r="20" fill="#DC2626" />
                <g transform="translate(30, 100)">
                  <circle cx="0" cy="0" r="8" fill="none" stroke="white" strokeWidth="2"/>
                  <path d="M -8 0 Q 0 -6 8 0 Q 0 6 -8 0" fill="none" stroke="white" strokeWidth="1.5"/>
                  <line x1="0" y1="-8" x2="0" y2="8" stroke="white" strokeWidth="1.5"/>
                </g>
                
                {/* Center text */}
                <text x="100" y="95" textAnchor="middle" className="fill-red-600 font-bold text-sm">
                  INCEPTION
                </text>
                <text x="100" y="110" textAnchor="middle" className="fill-gray-600 font-medium text-xs">
                  EDUCATION
                </text>
              </svg>
            </motion.div>
          </motion.div>

          {/* Right Content Area */}
          <div className="lg:w-3/5">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeRound}
                variants={contentVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="space-y-6"
              >
                {/* Course Card */}
                <motion.div
                  variants={cardVariants}
                  initial="initial"
                  animate="animate"
                  whileHover="hover"
                  className={`${roundsData[activeRound].bgColor} rounded-2xl p-8 shadow-xl border-2 ${roundsData[activeRound].borderColor}`}
                >
                  <div className="flex items-start space-x-4">
                    <div className="text-5xl">{roundsData[activeRound].icon}</div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-3">
                        <h2 className="text-3xl font-bold text-gray-800">
                          {roundsData[activeRound].course}
                        </h2>
                        <div className={`px-3 py-1 rounded-full bg-gradient-to-r ${roundsData[activeRound].color} text-white text-sm font-medium`}>
                          {roundsData[activeRound].subtitle}
                        </div>
                      </div>
                      <p className="text-gray-700 text-lg leading-relaxed mb-4">
                        {roundsData[activeRound].description}
                      </p>
                      
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="bg-white/70 rounded-lg p-4 border border-white/50">
                          <h4 className="font-semibold text-gray-800 mb-2 flex items-center">
                            <span className="mr-2">🎯</span>
                            Focus Areas
                          </h4>
                          <p className="text-gray-600">{roundsData[activeRound].focus}</p>
                        </div>
                        
                        {roundsData[activeRound].platform && (
                          <div className="bg-white/70 rounded-lg p-4 border border-white/50">
                            <h4 className="font-semibold text-gray-800 mb-2 flex items-center">
                              <span className="mr-2">💻</span>
                              Platform
                            </h4>
                            <p className="text-gray-600">{roundsData[activeRound].platform}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Additional Info Cards */}
                <div className="grid md:grid-cols-2 gap-6">
                  <motion.div
                    variants={cardVariants}
                    initial="initial"
                    animate="animate"
                    whileHover="hover"
                    className="bg-white rounded-xl p-6 shadow-lg border border-gray-200"
                  >
                    <div className="flex items-center mb-3">
                      <span className="text-2xl mr-3">📊</span>
                      <h3 className="text-xl font-semibold text-gray-800">
                        Progress Tracking
                      </h3>
                    </div>
                    <p className="text-gray-600">
                      Monitor your improvement with detailed analytics and performance insights.
                    </p>
                  </motion.div>

                  <motion.div
                    variants={cardVariants}
                    initial="initial"
                    animate="animate"
                    whileHover="hover"
                    className="bg-white rounded-xl p-6 shadow-lg border border-gray-200"
                  >
                    <div className="flex items-center mb-3">
                      <span className="text-2xl mr-3">👨‍🏫</span>
                      <h3 className="text-xl font-semibold text-gray-800">
                        Expert Guidance
                      </h3>
                    </div>
                    <p className="text-gray-600">
                      Learn from experienced instructors with proven track records.
                    </p>
                  </motion.div>
                </div>

                {/* CTA Button */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                  className="text-center"
                >
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`px-8 py-4 rounded-full bg-gradient-to-r ${roundsData[activeRound].color} text-white font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300`}
                  >
                    Start {roundsData[activeRound].subtitle} Preparation
                  </motion.button>
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoundsDashboard;

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image.js';
import Herobg from "./Herobg.jsx";
import MapBg from './Mapbg';

const Hero = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <section className="relative min-h-screen px-6 py-16 flex flex-col items-center justify-center">
      <MapBg />
      {/* <Herobg /> */}
      <motion.div
        className="text-center max-w-4xl space-y-8 mb-36"
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        {/* Logo with subtle animation */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          <img 
            src= "/assets/img/logo.png"
            alt="Mentor Krish Logo" 
            className="mx-auto w-28 h-28 object-contain drop-shadow-lg" 
          />
        </motion.div>

        {/* Main heading with gradient text and improved typography */}
        <motion.h1 
          className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          <span className="text-[#1D1616]">Unlock Your</span>{' '}
          <span className="bg-[#D84040] bg-clip-text text-transparent">
            Potential
          </span>
          <br />
          <span className="text-[#1D1616]">with</span>{' '}
          <span className="relative">
            <span className="bg-[#D84040] bg-clip-text text-transparent">
              Mentor Krish's
            </span>
            <motion.div
              className="absolute bottom-2 left-0 h-1 bg-gradient-to-r from-[#8E1616] to-[#D84040] rounded-full"
              initial={{ width: 0 }}
              animate={{ width: '100%' }}
              transition={{ delay: 1, duration: 1 }}
            />
          </span>
          <br />
          <span className="text-[#1D1616]">Tailored Educational Approach</span>
        </motion.h1>

        {/* Subtitle with improved spacing and color */}
        <motion.p 
          className="text-xl md:text-2xl text-[#1D1616]/70 font-medium leading-relaxed max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          Discover the power of{' '}
          <span className="text-black font-semibold">personalized mentoring</span>,{' '}
          <span className="text-black font-semibold">psychometric tests</span>, and a{' '}
          <span className="text-black font-semibold">proven SAT strategy</span>—all designed just for you.
        </motion.p>

        {/* Simplified button with subtle animation */}
        <motion.div
          className="pt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          <motion.button
            className="relative inline-block px-10 py-4 font-bold text-lg overflow-hidden border-2 border-[#8E1616] text-[#1D1616] rounded-full bg-[#EEEEEE] shadow-lg hover:shadow-xl transition-all duration-300"
            onMouseMove={handleMouseMove}
            whileHover={{ scale: 1.05, backgroundColor: "#D84040", color: "#EEEEEE" }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="relative z-10 transition-colors duration-300 tracking-wide">
              Register Now
            </span>
          </motion.button>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
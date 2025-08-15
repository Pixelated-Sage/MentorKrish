import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router'; // ✅ Import Next.js router
import MapBg from './Mapbg';

const Hero = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const router = useRouter(); // ✅ Get router instance

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const handleRegisterClick = () => {
    router.push('/register'); // ✅ Navigate to /register page
  };

  return (
    <section className="relative min-h-screen px-4 md:px-10 py-12 flex flex-col items-center justify-center bg-w1 overflow-hidden">
      <MapBg />
      <motion.div
        className="text-center max-w-7xl space-y-6 sm:space-y-8 mb-28 sm:mb-36"
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        {/* Logo */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          <img
            src="/assets/img/logo.png"
            alt="Mentor Krish Logo"
            className="mx-auto w-20 h-20 sm:w-28 sm:h-28 object-contain drop-shadow-lg"
          />
        </motion.div>

        {/* Heading */}
        <motion.h1
          className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-snug tracking-tight text-black"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          <span className="text-black">Unlock Your</span>{' '}
          <span className="bg-r1 bg-clip-text text-transparent">Potential</span>
          <br />
          <span className="text-black">with</span>{' '}
          <span className="relative inline-block">
            <span className="bg-r1 bg-clip-text text-transparent">Mentor Krish's</span>
            <motion.div
              className="absolute bottom-2 left-0 h-1 bg-r2 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: '100%' }}
              transition={{ delay: 1, duration: 1 }}
            />
          </span>
          <br />
          <span className="text-black">Tailored Educational Approach</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          className="text-lg sm:text-xl md:text-2xl text-g1 font-medium leading-relaxed max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          Discover the power of{' '}
          <span className="text-black font-semibold">personalized mentoring</span>,{' '}
          <span className="text-black font-semibold">psychometric tests</span>, and a{' '}
          <span className="text-black font-semibold">proven SAT strategy</span>—all designed just for you.
        </motion.p>

        {/* CTA Button */}
        <motion.div
          className="pt-6 sm:pt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          <motion.button
            className="relative inline-block px-8 sm:px-10 py-3 sm:py-4 font-bold text-base sm:text-lg overflow-hidden border-2 border-r2 text-black rounded-full bg-w2 shadow-lg hover:shadow-xl transition-all duration-300"
            onMouseMove={handleMouseMove}
            onClick={handleRegisterClick} // ✅ Navigate when clicked
            whileHover={{ scale: 1.05, backgroundColor: "#D84040", color: "#ffffff" }}
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

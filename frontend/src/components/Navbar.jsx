import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

const navItems = [
  { label: 'Home', href: '/' },
  { label: 'Courses', href: '/courses' },
  { label: 'Register', href: '/register' },
  { label: 'Login', href: '/login' },
  { label: 'Contact', href: '/contact' },
  { label: 'Trial', href: '/trial' },
  { label: 'Career', href: '/career' },
  { label: 'Psychometric', href: '/psycohmetric' },
  { label: 'Blogs', href: '/blogs' },
  { label: 'Gallery', href: '/gallery' }
  
];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/80 backdrop-blur-xl border-b border-white/20 shadow-lg shadow-black/5'
          : 'bg-white/70 backdrop-blur-md'
      }`}
      style={{
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <motion.div
          className="text-2xl font-bold cursor-pointer select-none"
          whileHover={{ scale: 1.05 }}
          transition={{ type: 'spring', stiffness: 400, damping: 10 }}
        >
          <Link href="/">
            <span className="flex gap-1 text-inherit">
              <span className="text-red-600 drop-shadow-sm">Mentor</span>
              <span className="text-yellow-500 drop-shadow-sm">Krish</span>
            </span>
          </Link>
        </motion.div>

        {/* Desktop Links */}
        <div className="hidden md:flex space-x-8 items-center">
          {navItems.map(({ label, href }, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 400, damping: 10 }}
              className="relative group"
            >
              <Link href={href}>
                <span className="text-gray-700 hover:text-gray-900 transition-all duration-200 font-medium text-sm tracking-wide cursor-pointer">
                  {label}
                  <motion.span
                    className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-red-600 to-yellow-500 group-hover:w-full transition-all duration-300"
                    layoutId="underline"
                  />
                </span>
              </Link>
            </motion.div>
          ))}

          <motion.a
            href="tel:+919999999999"
            whileHover={{
              scale: 1.05,
              boxShadow: '0 10px 25px rgba(220, 38, 38, 0.3)',
            }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 400, damping: 10 }}
            className="bg-gradient-to-r from-red-600 to-red-700 text-white px-6 py-2.5 rounded-full font-semibold text-sm shadow-lg hover:shadow-xl transition-all duration-300 border border-red-500/20 cursor-pointer"
          >
            Book Now
          </motion.a>
        </div>

        {/* Mobile Hamburger */}
        <div className="md:hidden">
          <motion.button
            onClick={() => setIsOpen(!isOpen)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="p-2 rounded-xl bg-white/50 backdrop-blur-sm border border-white/30 shadow-lg"
            style={{
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)',
            }}
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
          >
            {isOpen ? (
              <X size={24} className="text-gray-700" />
            ) : (
              <Menu size={24} className="text-gray-700" />
            )}
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="md:hidden bg-white/90 backdrop-blur-xl border-t border-white/20 shadow-2xl"
            style={{
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
            }}
          >
            <div className="px-6 py-4 space-y-1">
              {navItems.map(({ label, href }, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{
                    x: 10,
                    backgroundColor: 'rgba(255, 255, 255, 0.5)',
                  }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsOpen(false)}
                >
                  <Link href={href}>
                    <span className="block py-3 px-4 text-gray-700 hover:text-gray-900 rounded-xl transition-all duration-200 font-medium cursor-pointer">{label}</span>
                  </Link>
                </motion.div>
              ))}
              <motion.a
                href="tel:+919999999999"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                whileHover={{
                  scale: 1.02,
                  boxShadow: '0 8px 25px rgba(220, 38, 38, 0.3)',
                }}
                whileTap={{ scale: 0.98 }}
                className="block mt-4 bg-gradient-to-r from-red-600 to-red-700 text-white text-center px-6 py-3 rounded-xl font-semibold shadow-lg border border-red-500/20 cursor-pointer"
                onClick={() => setIsOpen(false)}
              >
                Book Now
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;

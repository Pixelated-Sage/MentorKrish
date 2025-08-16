import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/router";
import { scroller } from "react-scroll";

const homeSections = [
  { name: "Hero", id: "hero" },
  { name: "Cards", id: "cards" },
  { name: "About", id: "about" },
  { name: "Announcement", id: "announcement" },
  { name: "USP", id: "usp" },
  { name: "Courses", id: "courses" },
  { name: "Roadmap", id: "roadmap" },
  { name: "Gallery", id: "gallery" },
  { name: "Testimonial", id: "testimonials" },
  { name: "Footer", id: "footer" },
];
// Add more sections for Blogs, Careers, etc. as needed

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showHomeDropdown, setShowHomeDropdown] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const userRole = localStorage.getItem("userRole");
      setIsAdmin(userRole === "ADMIN");
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handler to scroll to section after navigation
  const goToSection = async (pageHref, sectionId) => {
    if (router.pathname === pageHref) {
      scroller.scrollTo(sectionId, {
        duration: 800,
        delay: 0,
        smooth: "easeInOutQuart",
        offset: -120, // Adjust for navbar height
      });
    } else {
      // Save target section in sessionStorage
      sessionStorage.setItem("scrollToSection", sectionId);
      router.push(pageHref);
    }
    setIsOpen(false);
    setShowHomeDropdown(false);
  };

  // When page loads, scroll to desired section if requested from sessionStorage
  useEffect(() => {
    const target = sessionStorage.getItem("scrollToSection");
    if (
      target &&
      typeof window !== "undefined" &&
      document.getElementById(target)
    ) {
      scroller.scrollTo(target, {
        duration: 800,
        delay: 0,
        smooth: "easeInOutQuart",
        offset: -120,
      });
      sessionStorage.removeItem("scrollToSection");
    }
  }, [router.pathname]);

  const navItems = [
    {
      label: "Home",
      href: "/",
      sections: homeSections,
    },
    { label: "Career", href: "/career" },
    { label: "Psychometric", href: "/psycohmetric" },
    { label: "Blogs", href: "/blogs" },
    { label: "Gallery", href: "/gallery" },
    { label: "Contact", href: "/contact" },
    { label: "Trial", href: "/trial" },
    { label: "Login", href: "/login" },
  ];
  if (isAdmin) navItems.push({ label: "Admin Panel", href: "/admin" });

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/80 backdrop-blur-xl border-b border-white/20 shadow-lg shadow-black/5"
          : "bg-white/70 backdrop-blur-md"
      }`}
      style={{
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <motion.div
          className="text-2xl font-bold cursor-pointer select-none"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <Link href="/">
            <span className="flex gap-1 text-inherit">
              <span className="text-red-600 drop-shadow-sm">Mentor</span>
              <span className="text-yellow-500 drop-shadow-sm">Krish</span>
            </span>
          </Link>
        </motion.div>
        {/* Desktop Links */}
        <div className="hidden md:flex space-x-8 items-center relative">
          {navItems.map((item, i) =>
            item.sections ? (
              // Dropdown, e.g. for Home
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => setShowHomeDropdown(true)}
                onMouseLeave={() => setShowHomeDropdown(false)}
              >
                <span className="text-gray-700 hover:text-gray-900 transition-all duration-200 font-medium text-sm tracking-wide cursor-pointer">
                  {item.label}
                </span>
                {/* Dropdown Menu */}
                <AnimatePresence>
                  {showHomeDropdown && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      className="absolute left-0 mt-1 min-w-[200px] bg-white shadow-xl rounded-xl border p-3 z-40"
                    >
                      {item.sections.map((section) => (
                        <button
                          key={section.id}
                          onClick={() => goToSection(item.href, section.id)}
                          className="block w-full text-left py-2 px-4 rounded hover:bg-r1/10 text-g2 text-sm mb-0.5"
                        >
                          {section.name}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <Link href={item.href} key={item.label}>
                <span className="text-gray-700 hover:text-gray-900 transition-all duration-200 font-medium text-sm tracking-wide cursor-pointer">
                  {item.label}
                </span>
              </Link>
            )
          )}
          <motion.a
            href="tel:+919999999999"
            whileHover={{
              scale: 1.05,
              boxShadow: "0 10px 25px rgba(220, 38, 38, 0.3)",
            }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
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
            {isOpen ? <X size={24} className="text-gray-700" /> : <Menu size={24} className="text-gray-700" />}
          </motion.button>
        </div>
      </div>
      {/* Mobile dropdown can be handled similarly, omitted for brevity */}
    </motion.nav>
  );
};

export default Navbar;

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/router";
import { scroller } from "react-scroll";

const homeSections = [
  { name: "Home", id: "hero" },
  // { name: "Cards", id: "cards" },
  { name: "About Us", id: "about" },
  { name: "Announcements", id: "announcement" },
  // { name: "USP", id: "usp" },
  { name: "Courses", id: "courses" },
  { name: "Roadmap", id: "roadmap" },
  // { name: "Gallery", id: "gallery" },
  { name: "Testimonial", id: "testimonials" },
  // { name: "Footer", id: "footer" },
];

const careerSections = [
  { name: "Career", id: "career" },
  { name: "Why Career Counselling", id: "why-career-counselling" },
  { name: "Our Approach", id: "our-approach" },
  { name: "What We Offer", id: "what-we-offer" },
  { name: "Success Stories", id: "success-stories" },
  { name: "FAQs", id: "faqs" },
];

const psycohmetricSections = [
  { name: "Why Psychometric Testing", id: "why-testing" },
  { name: "What We Offer", id: "what-we-offer-psycohmetric" },
  { name: "Our Approach", id: "our-approachs-psycohmetric" },
  { name: "Book a Session", id: "book-a-session-psycohmetric" },
  { name: "Success Stories", id: "success-stories-psycohmetric" },
  { name: "FAQs", id: "faqs-psycohmetric" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(null); // keep null or label of active
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

  // Scroll to anchor if exists in sessionStorage after navigation
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

  // Handles clicking a section (scroll or go, then scroll)
  const goToSection = async (pageHref, sectionId) => {
    if (router.pathname === pageHref) {
      scroller.scrollTo(sectionId, {
        duration: 800,
        delay: 0,
        smooth: "easeInOutQuart",
        offset: -120,
      });
    } else {
      sessionStorage.setItem("scrollToSection", sectionId);
      router.push(pageHref);
    }
    setIsOpen(false);
    setDropdownOpen(null);
  };

  // Items configuration with section mapping
  const navItems = [
    {
      label: "Home",
      href: "/",
      sections: homeSections,
    },
    {
      label: "Career",
      href: "/career",
      sections: careerSections,
    },
    {
      label: "Psychometric",
      href: "/psycohmetric",
      sections: psycohmetricSections,
    },
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
          {navItems.map((item, i) => {
            if (item.sections) {
              const isThisDropdownOpen = dropdownOpen === item.label;
              return (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => setDropdownOpen(item.label)}
                  onMouseLeave={() => setDropdownOpen(null)}
                >
                  <Link href={item.href}>
                    {/* Clicking the label always navigates to the main page */}
                    <span
                      className="text-gray-700 hover:text-gray-900 transition-all duration-200 font-medium text-sm tracking-wide cursor-pointer"
                      onClick={() => {
                        // If already on this page, scroll to top
                        if (router.pathname === item.href) {
                          window.scrollTo({ top: 0, behavior: "smooth" });
                        }
                      }}
                    >
                      {item.label}
                    </span>
                  </Link>
                  {/* Dropdown Menu */}
                  <AnimatePresence>
                    {isThisDropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        className="absolute left-0 mt-1 min-w-[150px] bg-white shadow-xl rounded-xl   z-40"
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
              );
            }
            // Regular nav
            return (
              <Link href={item.href} key={item.label}>
                <span className="text-gray-700 hover:text-gray-900 transition-all duration-200 font-medium text-sm tracking-wide cursor-pointer">
                  {item.label}
                </span>
              </Link>
            );
          })}
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
              backdropFilter: "blur(10px)",
              WebkitBackdropFilter: "blur(10px)",
            }}
            aria-label={isOpen ? "Close menu" : "Open menu"}
          >
            {isOpen ? <X size={24} className="text-gray-700" /> : <Menu size={24} className="text-gray-700" />}
          </motion.button>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;

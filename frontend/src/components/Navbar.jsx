import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/router";
import { scroller } from "react-scroll";

const homeSections = [
  { name: "Home", id: "hero" },
  { name: "About Us", id: "about" },
  { name: "Announcements", id: "announcement" },
  { name: "Courses", id: "courses" },
  { name: "Roadmap", id: "roadmap" },
  { name: "Testimonial", id: "testimonials" },
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

const navItems = [
  { label: "Home", href: "/", sections: homeSections },
  { label: "Career", href: "/career", sections: careerSections },
  { label: "Psychometric", href: "/psycohmetric", sections: psycohmetricSections },
  { label: "Blogs", href: "/blogs" },
  { label: "Gallery", href: "/gallery" },
  { label: "Contact", href: "/contact" },
  { label: "Trial", href: "/trial" },
  { label: "Login", href: "/login" },
  // Optionally add Admin Panel/Profile with auth (see previous answers)
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(null); // {label: string|null}
  const [scrolled, setScrolled] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Scroll to anchor if exists in sessionStorage after navigation
  useEffect(() => {
    const target = sessionStorage.getItem("scrollToSection");
    if (target && typeof window !== "undefined" && document.getElementById(target)) {
      scroller.scrollTo(target, {
        duration: 800,
        delay: 0,
        smooth: "easeInOutQuart",
        offset: -120,
      });
      sessionStorage.removeItem("scrollToSection");
    }
  }, [router.pathname]);

  // Handle section jump navigation
  const goToSection = async (pageHref, sectionId) => {
    setIsOpen(false);
    setSidebarOpen(false);
    setDropdownOpen(null);
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
  };

  // Handle main page nav + close menus
  const handleMainNav = (href) => {
    setIsOpen(false);
    setSidebarOpen(false);
    setDropdownOpen(null);
    router.push(href);
  };

  return (
    <>
      {/* Navbar */}
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          scrolled ? "bg-white/80 backdrop-blur-xl border-b border-white/20 shadow-lg shadow-black/5" : "bg-white/70 backdrop-blur-md"
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
            onClick={() => handleMainNav("/")}
          >
            <span className="flex gap-1 text-inherit">
              <span className="text-red-600 drop-shadow-sm">Mentor</span>
              <span className="text-yellow-500 drop-shadow-sm">Krish</span>
            </span>
          </motion.div>

          {/* Desktop Top Menu */}
          <div className="hidden md:flex space-x-7 items-center relative">
            {navItems.map((item) =>
              item.sections ? (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => setDropdownOpen(item.label)}
                  onMouseLeave={() => setDropdownOpen(null)}
                >
                  <span
                    className="text-gray-700 hover:text-gray-900 transition-all duration-200 font-medium text-sm tracking-wide cursor-pointer px-2"
                    onClick={() => handleMainNav(item.href)}
                  >
                    {item.label}
                  </span>
                  {/* Dropdown */}
                  <AnimatePresence>
                    {dropdownOpen === item.label && (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        className="absolute left-1/2 -translate-x-1/2 mt-2 min-w-[180px] bg-white shadow-2xl rounded-xl z-40 py-2 border border-gray-50"
                      >
                        {item.sections.map((section) => (
                          <button
                            key={section.id}
                            onClick={() => goToSection(item.href, section.id)}
                            className="w-full text-left px-4 py-2 hover:bg-r1/10 text-g2 text-sm rounded transition whitespace-nowrap"
                          >
                            {section.name}
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <span
                  key={item.label}
                  className="text-gray-700 hover:text-gray-900 transition-all duration-200 font-medium text-sm tracking-wide cursor-pointer px-2"
                  onClick={() => handleMainNav(item.href)}
                >
                  {item.label}
                </span>
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
              className="bg-gradient-to-r from-red-600 to-red-700 text-white px-6 py-2.5 rounded-full font-semibold text-sm shadow-lg hover:shadow-xl transition-all duration-300 border border-red-500/20 cursor-pointer ml-2"
            >
              Book Now
            </motion.a>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="md:hidden">
            <motion.button
              onClick={() => setSidebarOpen(true)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-2 rounded-xl bg-white/50 backdrop-blur-sm border border-white/30 shadow-lg"
              aria-label="Open mobile menu"
            >
              <Menu size={26} className="text-gray-700" />
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            {/* Dark screen overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              onClick={() => setSidebarOpen(false)}
              className="fixed inset-0 bg-black z-40 md:hidden"
            />
            {/* Sidebar */}
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", stiffness: 400, damping: 32 }}
              className="fixed top-0 left-0 h-full w-64 bg-white shadow-2xl z-50 flex flex-col"
              style={{ minHeight: "100dvh" }}
            >
              <div className="flex items-center justify-between px-5 py-4 border-b border-gray-200">
                <span className="font-bold text-lg text-r1">Mentor Krish</span>
                <button
                  onClick={() => setSidebarOpen(false)}
                  className="p-2 rounded hover:bg-gray-100 transition"
                  aria-label="Close menu"
                >
                  <X size={24} />
                </button>
              </div>
              <nav className="flex-1 px-0 py-4 overflow-y-auto">
                {navItems.map((item) =>
                  item.sections ? (
                    <div key={item.label} className="mb-2">
                      {/* Main nav link */}
                      <div
                        className="flex items-center justify-between px-5 py-2 font-semibold text-g1 text-base cursor-pointer hover:bg-w2 rounded-lg transition"
                        onClick={() => handleMainNav(item.href)}
                      >
                        {item.label}
                        <ChevronRight size={18} />
                      </div>
                      {/* Section buttons */}
                      <div className="pl-5">
                        {item.sections.map((section) => (
                          <button
                            key={section.id}
                            className="block w-full text-left px-5 py-1.5 mb-1 rounded hover:bg-r1/10 text-g2 text-sm"
                            onClick={() => goToSection(item.href, section.id)}
                          >
                            {section.name}
                          </button>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div
                      key={item.label}
                      className="px-5 py-2 font-semibold text-g1 text-base cursor-pointer hover:bg-w2 rounded-lg transition"
                      onClick={() => handleMainNav(item.href)}
                    >
                      {item.label}
                    </div>
                  )
                )}
              </nav>
              <div className="px-6 pb-4 mt-auto">
                <a
                  href="tel:+919999999999"
                  className="block w-full text-center bg-gradient-to-r from-red-600 to-red-700 text-white py-2.5 rounded-full font-semibold text-base shadow hover:from-red-700 hover:to-red-900 transition-all duration-300"
                >
                  Book Now
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronRight } from "lucide-react";
import { useRouter } from "next/router";
import { scroller } from "react-scroll";

import { analytics, logEvent, db, addDoc, collection, serverTimestamp } from "../lib/firebase"; // Adjust lib path

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
const psycoSections = [
  { name: "Why Psychometric Testing", id: "why-testing" },
  { name: "What We Offer", id: "what-we-offer-psyco" },
  { name: "Our Approach", id: "our-approach-psyco" },
  { name: "Book a Session", id: "book-a-session-psyco" },
  { name: "Success Stories", id: "success-stories-psyco" },
  { name: "FAQs", id: "faqs-psyco" },
];

const baseNavItems = [
  { label: "Home", href: "/", sections: homeSections },
  { label: "Career", href: "/career", sections: careerSections },
  { label: "Courses", href: "/courses" },
  { label: "Psychometric", href: "/psycohmetric", sections: psycoSections },
  { label: "Blogs", href: "/blogs" },
  { label: "Gallery", href: "/gallery" },
  { label: "Contact", href: "/contact" },
  // { label: "Trial", href: "/trial" },
];

const Navbar = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState(null);

  const router = useRouter();

  // Scroll detection for navbar styling
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Check login & role on mount and route changes
  useEffect(() => {
    // On mount & route change
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('authToken');
      const role = localStorage.getItem('userRole');
      setIsLoggedIn(!!token);
      setUserRole(role);
    }
  }, [router.pathname]);

  // Conditionally show profile or login
  const navItems = [...baseNavItems];
  if (isLoggedIn) {
    navItems.push(userRole === 'ADMIN' ? { label: 'Admin Panel', href: '/admin' } : { label: 'Profile', href: '/profile' });
  } else {
    navItems.push({ label: 'Login', href: '/login' });
  }

  // Helper for logging events (fire and forget)
  const trackNavClick = async (label, extra = {}) => {
    try {
      if (analytics) {
        logEvent(analytics, "navbar_click", { label, ...extra });
      }
      if (db) {
        await addDoc(collection(db, "user_events"), {
          event: "navbar_click",
          label,
          ...extra,
          user: typeof window !== "undefined" ? localStorage.getItem("userEmail") || "guest" : "server",
          path: typeof window !== "undefined" ? window.location.pathname : "server",
          timestamp: serverTimestamp(),
        });
      }
    } catch (e) {
      console.error("Navbar analytics tracking failed", e);
    }
  };

  // Scroll to section or navigate to another page logic
  const goToSection = (href, sectionId) => {
    setMobileMenuOpen(false);
    setDropdownOpen(null);
    if (router.pathname === href) {
      scroller.scrollTo(sectionId, {
        duration: 800,
        smooth: "easeInOutQuart",
        offset: -120,
      });
      // Track section view as navbar click with section
      trackNavClick(`section_${sectionId}`, { page: href });
    } else {
      sessionStorage.setItem("scrollToSection", sectionId);
      router.push(href).then(() => {
        // Track page navigation
        trackNavClick(`navigate_${href}`, { section: sectionId });
      });
    }
  };

  // Navigation click handler
  const handleNavClick = (href, label) => {
    setMobileMenuOpen(false);
    setDropdownOpen(null);
    router.push(href).then(() => {
      trackNavClick(label || href);
    });
  };

  return (
    <>
      {/* Top Navbar */}
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white/80 backdrop-blur-xl border-b border-white/20 shadow-lg"
            : "bg-white/70 backdrop-blur-md"
        }`}
        style={{ backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)" }}
      >
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          {/* Logo */}
          <motion.div
            className="text-2xl font-bold cursor-pointer select-none"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
            onClick={() => {
              handleNavClick("/");
            }}
          >
            <span className="flex gap-1 text-inherit">
              <span className="text-red-600 drop-shadow-sm">Mentor</span>
              <span className="text-yellow-500 drop-shadow-sm">Krish</span>
            </span>
          </motion.div>

          {/* Desktop Menu */}
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
                    className="text-gray-700 hover:text-gray-900 transition px-2 py-1 font-medium text-sm tracking-wide cursor-pointer select-none"
                    onClick={() => handleNavClick(item.href, item.label)}
                  >
                    {item.label}
                  </span>

                  <AnimatePresence>
                    {dropdownOpen === item.label && (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        className="absolute left-1/2 -translate-x-1/2 mt-2 w-44 bg-white border border-gray-100 rounded-xl shadow-lg z-40"
                      >
                        {item.sections.map((section) => (
                          <button
                            key={section.id}
                            onClick={() => goToSection(item.href, section.id)}
                            className="w-full text-left px-4 py-2 text-gray-600 hover:bg-red-50 rounded-tl-lg rounded-tr-lg last:rounded-bl-lg last:rounded-br-lg focus:outline-none focus:bg-red-100"
                          >
                            {section.name}
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <button
                  key={item.label}
                  onClick={() => handleNavClick(item.href, item.label)}
                  className="text-gray-700 hover:text-red-600 transition font-medium text-sm tracking-wide px-2 py-1 cursor-pointer select-none"
                >
                  {item.label}
                </button>
              )
            )}

            <a
              href="tel:+919999999999"
              className="ml-2 bg-gradient-to-r from-red-600 to-red-700 text-white px-6 py-2 rounded-full font-semibold shadow-lg hover:shadow-xl transition select-none whitespace-nowrap"
            >
              Book Now
            </a>
          </div>

          {/* Mobile Hamburger */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open menu"
              className="p-2 rounded-xl bg-white/70 backdrop-blur-sm border border-white/30 shadow-lg"
            >
              <Menu size={26} className="text-gray-700" />
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black z-40 md:hidden"
              onClick={() => setMobileMenuOpen(false)}
            />

            {/* Drawer */}
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', stiffness: 400, damping: 32 }}
              className="fixed top-0 left-0 z-50 h-[100dvh] w-64 bg-white shadow-2xl flex flex-col"
              role="dialog"
              aria-modal="true"
            >
              <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
                <span className="text-xl font-extrabold text-red-600 select-none">Mentor Krish</span>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  aria-label="Close menu"
                  className="p-2 rounded hover:bg-gray-200 transition"
                >
                  <X size={24} />
                </button>
              </div>

              <nav className="flex-1 overflow-y-auto pt-6 px-4">
                <button
                  className="flex items-center gap-2 px-4 py-2 mb-4 text-gray-700 font-semibold rounded-lg hover:bg-red-50 w-full"
                  onClick={() => {
                    handleNavClick("/");
                    setMobileMenuOpen(false);
                  }}
                >
                  <ChevronRight size={18} /> Home
                </button>

                {navItems.map((item) => (
                  <div key={item.label} className="mb-4">
                    <button
                      className="flex items-center justify-between w-full px-4 py-2 font-semibold text-gray-700 rounded-lg hover:bg-gray-100"
                      onClick={() => {
                        handleNavClick(item.href, item.label);
                        setMobileMenuOpen(false);
                      }}
                    >
                      {item.label}
                      {item.sections && (
                        <ChevronRight
                          size={18}
                          className="transform rotate-0 transition-transform group-hover:rotate-90"
                        />
                      )}
                    </button>

                    {item.sections && (
                      <div className="pl-6 mt-2">
                        {item.sections.map((section) => (
                          <button
                            key={section.id}
                            className="block w-full px-4 py-1 text-gray-600 rounded hover:bg-red-50 text-sm text-left"
                            onClick={() => {
                              goToSection(item.href, section.id);
                              setMobileMenuOpen(false);
                            }}
                          >
                            {section.name}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                ))}

                {isLoggedIn && (
                  <button
                    onClick={() => {
                      if (userRole === "ADMIN") router.push("/admin");
                      else router.push("/profile");
                      setMobileMenuOpen(false);
                    }}
                    className="block w-full px-4 py-2 mt-6 text-center bg-red-600 text-white rounded-lg font-semibold shadow hover:bg-red-700"
                  >
                    {userRole === "ADMIN" ? "Admin Panel" : "Profile"}
                  </button>
                )}

                {!isLoggedIn && (
                  <button
                    onClick={() => {
                      router.push("/login");
                      setMobileMenuOpen(false);
                    }}
                    className="block w-full px-4 py-2 mt-6 text-center bg-red-600 text-white rounded-lg font-semibold shadow hover:bg-red-700"
                  >
                    Login
                  </button>
                )}

                {/* Logout Button */}
                {isLoggedIn && (
                  <button
                    onClick={() => {
                      localStorage.removeItem("authToken");
                      localStorage.removeItem("userRole");
                      localStorage.removeItem("userEmail");
                      router.push("/");
                      setMobileMenuOpen(false);
                    }}
                    className="block w-full px-4 py-2 mt-2 text-center bg-gray-200 text-gray-700 rounded-lg font-semibold shadow hover:bg-gray-300"
                  >
                    Logout
                  </button>
                )}

                <button
                  onClick={() => {
                    router.push("/trial")
                  }}
                  
                  className="block mt-8 bg-gradient-to-r from-red-600 to-red-700 text-white py-3 rounded-full font-semibold shadow-lg hover:shadow-xl text-center select-none"
                >
                  Book Now
                </button>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;

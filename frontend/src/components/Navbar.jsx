import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useRouter } from "next/router";
import { Link as ScrollLink, scroller } from "react-scroll";

const navItems = [
  { label: "Home", href: "/", targetId: "hero" },
  { label: "About Us", href: "/", targetId: "about" },
  { label: "Courses", href: "/", targetId: "courses" },
  { label: "Roadmap", href: "/", targetId: "roadmap" },
  { label: "Blogs", href: "/blogs" },
  { label: "Gallery", href: "/gallery" },
  { label: "Testimonials", href: "/", targetId: "testimonials" },
  { label: "Contact", href: "/contact" },
];

const Navbar = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Handle cross-page navigation & recoil scroll
  useEffect(() => {
    if (router.pathname === "/") {
      const targetId = sessionStorage.getItem("scrollToSection");
      if (targetId) {
        sessionStorage.removeItem("scrollToSection");
        setTimeout(() => {
          scroller.scrollTo(targetId, {
            duration: 850,
            delay: 0,
            smooth: "easeInOutQuart",
            offset: -80,
          });
        }, 150);
      }
    }
  }, [router.pathname]);

  const handleNavClick = (item) => {
    setMobileMenuOpen(false);

    if (item.targetId && router.pathname === "/") {
      scroller.scrollTo(item.targetId, {
        duration: 850,
        delay: 0,
        smooth: "easeInOutQuart",
        offset: -80,
      });
      return;
    }

    if (item.targetId && router.pathname !== "/") {
      sessionStorage.setItem("scrollToSection", item.targetId);
      router.push("/");
      return;
    }

    router.push(item.href);
  };

  return (
    <>
      <motion.nav
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs py-3"
            : "bg-white/80 backdrop-blur-xs py-4 border-b border-slate-100"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between">
          {/* Logo */}
          <div
            className="flex items-center gap-3 cursor-pointer select-none"
            onClick={() => handleNavClick({ href: "/", targetId: "hero" })}
          >
            <img
              src="/assets/img/logo.png"
              alt="Mentor Krish Logo"
              className="w-9 h-9 object-contain"
            />
            <div className="flex flex-col">
              <span className="text-xl font-black text-slate-900 tracking-tight leading-none">
                Mentor<span className="text-red-700">Krish</span>
              </span>
              <span className="text-[10px] font-bold tracking-wider text-slate-500 uppercase mt-0.5">
                SAT & Admissions Institute
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => {
              const isPageActive = router.pathname === item.href && !item.targetId;

              if (item.targetId && router.pathname === "/") {
                return (
                  <ScrollLink
                    key={item.label}
                    to={item.targetId}
                    spy={true}
                    smooth={"easeInOutQuart"}
                    duration={850}
                    offset={-80}
                    activeClass="text-red-700 font-extrabold border-b-2 border-red-700 pb-0.5"
                    className="text-xs font-bold uppercase tracking-wider text-slate-700 hover:text-red-700 transition-colors cursor-pointer select-none"
                  >
                    {item.label}
                  </ScrollLink>
                );
              }

              return (
                <button
                  key={item.label}
                  onClick={() => handleNavClick(item)}
                  className={`text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer ${
                    isPageActive
                      ? "text-red-700 font-extrabold border-b-2 border-red-700 pb-0.5"
                      : "text-slate-700 hover:text-red-700"
                  }`}
                >
                  {item.label}
                </button>
              );
            })}

            {/* Clean Executive CTA */}
            <button
              onClick={() => router.push("/trial")}
              className="bg-red-700 hover:bg-red-800 text-white font-bold text-xs uppercase tracking-wider px-5 py-2.5 rounded-lg shadow-xs transition-all duration-200"
            >
              Book Free Trial
            </button>
          </div>

          {/* Mobile Hamburger */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open menu"
              className="p-2 rounded-lg bg-slate-100 text-slate-800 focus:outline-none"
            >
              <Menu size={22} />
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-slate-900 z-50 md:hidden"
              onClick={() => setMobileMenuOpen(false)}
            />

            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.25 }}
              className="fixed top-0 right-0 z-50 h-full w-72 bg-white shadow-xl flex flex-col p-6 border-l border-slate-200"
            >
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <span className="text-lg font-black text-slate-900">
                  Mentor<span className="text-red-700">Krish</span>
                </span>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-600"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="flex-1 py-6 space-y-3">
                {navItems.map((item) => (
                  <button
                    key={item.label}
                    onClick={() => handleNavClick(item)}
                    className="w-full text-left font-bold text-xs uppercase tracking-wider py-2.5 px-3 rounded-lg text-slate-700 hover:bg-slate-50 hover:text-red-700 transition"
                  >
                    {item.label}
                  </button>
                ))}
              </div>

              <div className="pt-4 border-t border-slate-100">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    router.push("/trial");
                  }}
                  className="w-full bg-red-700 hover:bg-red-800 text-white font-bold text-xs uppercase tracking-wider py-3 rounded-lg text-center shadow-xs"
                >
                  Book Free Trial Session
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;

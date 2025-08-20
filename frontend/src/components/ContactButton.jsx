import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronRight } from "lucide-react";

const defaultMenuItems = [
  {
    label: "Login",
    action: () => (window.location.href = "/login"),
    color: "bg-g1 text-w1",
    icon: <ChevronRight size={16} />,
  },
  {
    label: "Register",
    action: () => (window.location.href = "/register"),
    color: "bg-r1 text-w1",
    icon: <ChevronRight size={16} />,
  },
  {
    label: "Book Trial",
    action: () => (window.location.href = "/trial"),
    color: "bg-accent text-g1",
    icon: <ChevronRight size={16} />,
  },
  {
    label: "Logout",
    action: () => {
      localStorage.removeItem("authToken");
      localStorage.removeItem("userEmail");
      localStorage.removeItem("userRole");
      window.location.href = "/";
    },
    color: "bg-g2 text-w1",
    icon: <ChevronRight size={16} />,
  },
];

const adTexts = [
  "Book your FREE trial!",
  "Login for smarter counseling",
  "Register now for exclusive updates",
  "Get started with Mentor Krish",
];

const typingSpeed = 50; // ms per character

export default function ReachButton({ menuItems = defaultMenuItems }) {
  const [open, setOpen] = useState(false);
  const [adIndex, setAdIndex] = useState(0);
  const [typedText, setTypedText] = useState("");
  const [windowWidth, setWindowWidth] = useState(null);
  const containerRef = useRef(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleResize = () => setWindowWidth(window.innerWidth);
      handleResize(); // initial
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  useEffect(() => {
    if (!open) {
      const timer = setInterval(() => {
        setAdIndex((i) => (i + 1) % adTexts.length);
      }, 5000);
      return () => clearInterval(timer);
    }
  }, [open]);

  useEffect(() => {
    if (open) {
      setTypedText("");
      return; // no typing animation when open
    }

    let currentChar = 0;
    const text = adTexts[adIndex];
    setTypedText("");

    const typingInterval = setInterval(() => {
      currentChar++;
      setTypedText(text.substring(0, currentChar));
      if (currentChar === text.length) clearInterval(typingInterval);
    }, typingSpeed);

    return () => clearInterval(typingInterval);
  }, [adIndex, open]);

  // Layout for vertical stacked buttons upwards with space
  const buttonSpacing = 64; // vertical space between buttons

  const buttonVariants = {
    closed: {
      scale: 0,
      x: 0,
      y: 0,
      opacity: 0,
    },
    open: (i) => ({
      scale: 1,
      x: -140, // left offset of buttons (fixed)
      y: -i * buttonSpacing, // vertical spacing
      opacity: 1,
      transition: {
        delay: i * 0.06,
        type: "spring",
        stiffness: 450,
        damping: 28,
      },
    }),
  };

  // Calculate button width based on typed text length, max 220px
  const closedWidthDynamic = Math.min(
    Math.max(typedText.length * (windowWidth && windowWidth < 640 ? 8 : 9), 140),
    220
  );

  // To prevent button height growth, set min and max heights & allow multiline with scroll if needed via styles
  // We'll wrap the typing text container inside a scrollable div with max height.

  return (
    <div
      className="fixed bottom-4 right-4 sm:right-6 sm:bottom-6 z-[999] select-none"
      ref={containerRef}
      style={{ maxWidth: closedWidthDynamic }}
    >
      <div className="relative pointer-events-auto">
        <AnimatePresence>
          {open &&
            menuItems.map((item, i) => (
              <motion.button
                key={item.label}
                initial="closed"
                animate="open"
                exit="closed"
                variants={buttonVariants}
                custom={i}
                onClick={() => {
                  setOpen(false);
                  item.action();
                }}
                className={`absolute rounded-lg px-4 py-2 sm:px-5 sm:py-2 font-semibold shadow-lg text-sm sm:text-base min-w-[120px] flex items-center gap-2 whitespace-nowrap border border-w2 ${item.color}`}
                style={{ boxShadow: "0 4px 12px rgba(0,0,0,0.15)", right: 0, bottom: 0 }}
              >
                {item.icon}
                <span>{item.label}</span>
              </motion.button>
            ))}
        </AnimatePresence>

        <motion.button
          layout
          initial={false}
          animate={{
            width: open
              ? 56
              : windowWidth && windowWidth < 640
              ? closedWidthDynamic
              : Math.min(closedWidthDynamic, 180),
            height: 56,
            borderRadius: open ? 20 : 28,
          }}
          transition={{ type: "spring", stiffness: 350, damping: 26 }}
          className="flex items-center justify-center font-bold text-w1 bg-r1 shadow-lg border border-r2 overflow-hidden cursor-pointer"
          style={{ fontSize: windowWidth && windowWidth < 640 ? 14 : 16, paddingLeft: open ? 0 : 10, paddingRight: open ? 0 : 10 }}
          onClick={() => setOpen((o) => !o)}
          aria-label={open ? "Close quick actions" : "Open quick actions"}
        >
          <AnimatePresence exitBeforeEnter>
            {open ? (
              <motion.div
                key="close"
                initial={{ rotate: 0, opacity: 0 }}
                animate={{ rotate: 90, opacity: 1 }}
                exit={{ rotate: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="flex items-center justify-center w-full h-full"
              >
                <X size={28} />
              </motion.div>
            ) : (
              <motion.div
                key="ad"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3, type: "spring", stiffness: 200, damping: 22 }}
                className="flex items-center justify-center px-4 whitespace-pre-wrap text-center"
                style={{ maxHeight: 56, overflowY: "auto", lineHeight: '1.2' }}
              >
                {typedText}
                <span className="blinking-cursor">|</span>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
      </div>
      <style>{`
        .blinking-cursor {
          font-weight: 100;
          font-size: 16px;
          color: #fff;
          animation: blink 1.2s infinite;
          margin-left: 2px;
          user-select: none;
        }
        @keyframes blink {
          0%, 50% { opacity: 1; }
          50.01%, 100% { opacity: 0; }
        }
      `}</style>
    </div>
  );
}

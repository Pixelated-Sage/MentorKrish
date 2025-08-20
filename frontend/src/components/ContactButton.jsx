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
  "Book a free trial",
  "Login for counseling",
  "Register today",
  "Get started now",
];

const typingSpeed = 75; // slower typing for minimal effect

export default function ReachButton({ menuItems = defaultMenuItems }) {
  const [open, setOpen] = useState(false);
  const [adIndex, setAdIndex] = useState(0);
  const [typedText, setTypedText] = useState("");
  const [windowWidth, setWindowWidth] = useState(null);
  const containerRef = useRef(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleResize = () => setWindowWidth(window.innerWidth);
      handleResize();
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  useEffect(() => {
    if (!open) {
      const timer = setInterval(() => {
        setAdIndex((i) => (i + 1) % adTexts.length);
      }, 7000); // longer interval for less frequent changes
      return () => clearInterval(timer);
    }
  }, [open]);

  useEffect(() => {
    if (open) {
      setTypedText("");
      return; // no typing animation on open
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

  // Vertical stack spacing reduced for a tighter look
  const buttonSpacing = 56;

  const buttonVariants = {
    closed: {
      scale: 0,
      x: 0,
      y: 0,
      opacity: 0,
    },
    open: (i) => ({
      scale: 1,
      x: -140,
      y: -i * buttonSpacing,
      opacity: 1,
      transition: {
        delay: i * 0.04, // shorter delay for faster pop-out
        type: "spring",
        stiffness: 300,
        damping: 22,
      },
    }),
  };

  // Width calculation capped and smooth
  const closedWidthDynamic = Math.min(
    Math.max(typedText.length * (windowWidth && windowWidth < 640 ? 7 : 8), 130),
    190
  );

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
                className={`absolute rounded-md px-4 py-2 sm:px-5 sm:py-2 font-semibold shadow-md text-sm sm:text-base min-w-[110px] flex items-center gap-2 whitespace-nowrap border border-w2 ${item.color}`}
                style={{ boxShadow: "0 3px 10px rgba(0,0,0,0.12)", right: 0, bottom: 0 }}
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
            borderRadius: open ? 18 : 24,
          }}
          transition={{ type: "spring", stiffness: 300, damping: 22 }}
          className="flex items-center justify-center font-bold text-w1 bg-r1 shadow-md border border-r2 overflow-hidden cursor-pointer hover:bg-r2 transition-colors focus:outline-none focus:ring-2 focus:ring-r1 focus:ring-opacity-50"
          style={{
            fontSize: windowWidth && windowWidth < 640 ? 14 : 16,
            paddingLeft: open ? 0 : 12,
            paddingRight: open ? 0 : 12,
            whiteSpace: "nowrap",
          }}
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
                <X size={26} />
              </motion.div>
            ) : (
              <motion.div
                key="ad"
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -16 }}
                transition={{ duration: 0.25, type: "spring", stiffness: 160, damping: 20 }}
                className="flex items-center justify-center px-3 whitespace-pre-wrap text-center"
                style={{ maxHeight: 56, overflowY: "hidden", lineHeight: "1.3" }}
              >
                {typedText}
                <span className="blinking-cursor">|</span>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
      </div>

      <style>{`
        /* Subtle blinking cursor */
        .blinking-cursor {
          font-weight: 300;
          font-size: 16px;
          color: #fff;
          animation: blink 1.4s step-start infinite;
          margin-left: 2px;
          user-select: none;
        }
        @keyframes blink {
          0%, 49% { opacity: 1; }
          50%, 100% { opacity: 0; }
        }
      `}</style>
    </div>
  );
}

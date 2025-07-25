import React from "react";
import { motion } from "framer-motion";

const lineTransition = {
  repeat: Infinity,
  duration: 10,
  ease: "easeInOut",
  repeatType: "mirror",
};

const waveTransition = {
  repeat: Infinity,
  duration: 10,
  ease: "easeInOut",
  repeatType: "mirror",
};

const Herobg = () => {
  return (
    <>
      {/* Bottom Left Corner Lines */}
      <motion.svg
        viewBox="0 0 200 200"
        className="absolute bottom-0 left-0 w-32 opacity-50 z-[-10] pointer-events-none"
        animate={{ rotate: [0, -5, 0] }}
        transition={lineTransition}
      >
        <line x1="0" y1="80" x2="40" y2="80" stroke="#FFFF00" strokeWidth="0.5" />
        <line x1="20" y1="60" x2="20" y2="100" stroke="#FFFF00" strokeWidth="0.5" />
      </motion.svg>

      {/* Bottom Right Corner Lines */}
      <motion.svg
        viewBox="0 0 100 100"
        className="absolute bottom-0 left-0 w-32 opacity-50 z-[-10]"
        animate={{ rotate: [0, 5, 0] }}
        transition={lineTransition}
      >
        <line x1="60" y1="80" x2="100" y2="80" stroke="#6B7280" strokeWidth="0.5" />
        <line x1="80" y1="60" x2="80" y2="100" stroke="#6B7280" strokeWidth="0.5" />
      </motion.svg>

      {/* Bottom Center Wave */}
      <motion.svg
        viewBox="0 0 1440 320"
        className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-full z-[-10]"
        animate={{
          y: [0, 10, 0],
          d: [
            "M0,160 C320,200,1120,80,1440,160 L1440,320 L0,320 Z",
            "M0,160 C320,120,1120,240,1440,160 L1440,320 L0,320 Z",
            "M0,160 C320,200,1120,80,1440,160 L1440,320 L0,320 Z",
          ],
        }}
        transition={waveTransition}
      >
        <path
          fill="#ffd4d4"
          fillOpacity="1"
          d="M0,160 C320,200,1120,80,1440,160 L1440,320 L0,320 Z"
        />
      </motion.svg>
    </>
  );
};

export default Herobg;
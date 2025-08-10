import React from "react";
import { motion } from "framer-motion";

const usps = [
  "Early clarity = lifelong confidence",
  "Supports college admissions and applications",
  "Highlights achievements & experiences for a strong profile",
  "Includes actionable recommendations you can start now",
];

const fadeIn = {
  hidden: { opacity: 0, y: 32 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.7 },
  }),
};

const WhyChooseUs = () => {
  return (
    <section className="bg-w1 py-16 px-3 sm:px-4">
      <div className="max-w-7xl mx-auto w-full">
        {/* Section Heading & Description */}
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-center gap-3 text-xl sm:text-2xl md:text-3xl font-bold text-g1 mb-6 justify-center"
        >
          <img src="/assets/icons/square-bullet.svg" alt="" className="h-7 w-7" />
          Crafting Tomorrow's Success: Building a Strong Personal Profile Today
        </motion.h2>
        <div className="text-g2 text-sm sm:text-base mb-8 text-center max-w-3xl mx-auto">
          In today's competitive landscape, academic excellence is only the beginning. We help you develop a standout profile—showcasing achievements, extra-curriculars, and authentic experiences—empowering you for university admissions and beyond.
        </div>

        {/* USP Points Grid */}
        <div className="
          grid
          grid-cols-1
          sm:grid-cols-2
          lg:grid-cols-4
          gap-6
          max-w-7xl
          mx-auto
        ">
          {usps.map((usp, i) => (
            <motion.div
              key={i}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              className="bg-w1 border border-w2 rounded-2xl p-5 shadow flex items-center justify-center text-center"
              style={{
                minHeight: '100px',
                boxShadow: "0 2px 18px rgba(30,41,59,0.05)",
                borderTop: "4px solid var(--r1)",
              }}
            >
              <span className="text-g1 font-semibold text-xs sm:text-sm md:text-base leading-normal">
                {usp}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;

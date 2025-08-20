import React from 'react';
import { motion } from "framer-motion";

const testimonials = [
  {
    name: "Neha (Parent)",
    quote:
      "The psychometric assessment at Mentor Krish gave both my son and us a clear sense of direction and peace of mind. Highly recommended!",
  },
  {
    name: "Rahul (Class 11 Student)",
    quote:
      "I always felt lost with so many options. After the test and counseling, I know exactly which field excites me — and why.",
  },
];

const fadeIn = {
  hidden: { opacity: 0, y: 32 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.7 },
  }),
};

const Stories = () => {
  return (
    <section className="bg-w1 py-12 px-3 sm:px-4" id = "success-stories-psycohmetric">
      <div className="max-w-7xl mx-auto w-full">
        {/* Section Heading */}
        <motion.h2
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          className="flex items-center gap-3 text-lg sm:text-2xl md:text-3xl font-bold text-g1 mb-8 justify-center text-center"
        >
          <img
            src="/assets/icons/square-bullet.svg"
            alt=""
            className="h-6 w-6 sm:h-7 sm:w-7"
            aria-hidden="true"
          />
          Success Stories
        </motion.h2>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8 max-w-6xl mx-auto">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              className="bg-w1 shadow-lg rounded-2xl border border-w2 p-5 sm:p-7 flex flex-col justify-between transition hover:shadow-xl"
            >
              <blockquote className="italic text-g2 text-sm sm:text-base md:text-lg mb-4 leading-relaxed">
                &quot;{t.quote}&quot;
              </blockquote>
              <span className="block text-g1 font-bold text-xs sm:text-sm md:text-base">
                {t.name}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stories;

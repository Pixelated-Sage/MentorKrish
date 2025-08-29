import React from 'react';
import { motion } from 'framer-motion';

const offerings = [
  {
    title: "Advanced Psychometric Testing",
    desc: "In-depth, scientific tests to reveal true aptitudes and traits.",
    icon: "/assets/icons/brain.svg",
  },
  {
    title: "Student-Parent Sessions",
    desc: "Joint sessions for clarity and family support in decision-making.",
    icon: "/assets/icons/user1.svg",
  },
  {
    title: "Academic & Extra-curricular Planning",
    desc: "Blueprints for balanced, successful profiles.",
    icon: "/assets/icons/open-book.svg",
  },
  {
    title: "Profile Building for College Admissions",
    desc: "Strategic storytelling and activity mapping for global admits.",
    icon: "/assets/icons/graduation.svg",
  },
];

const fadeIn = {
  hidden: { opacity: 0, y: 32 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.7 },
  }),
};

const WhatWeOffer = () => (
  <section className="relative bg-w1 py-16 px-4 sm:px-6" id="what-we-offer">
    {/* Decorative BG pattern */}
    <div
      className="absolute inset-0 opacity-[0.04] pointer-events-none"
      style={{
        backgroundImage: `url('/assets/patterns/grid-light.svg')`,
        backgroundSize: '40px 40px',
      }}
    />

    <div className="relative z-10 max-w-7xl mx-auto w-full">
      {/* Section Title */}
      <div className="text-center mb-12 px-2">
        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-center justify-center gap-3 text-xl sm:text-2xl md:text-3xl font-bold text-g1 mb-3"
        >
          <img src="/assets/icons/square-bullet.svg" alt="" className="h-7 w-7" />
          What We Offer
        </motion.h2>
        <div className="w-20 h-1 bg-r1 rounded-full mx-auto mb-3" />
        <p className="text-g2 max-w-2xl mx-auto text-xs sm:text-sm md:text-base">
          Empowering students and families with clear, data-driven guidance and actionable plans for success.
        </p>
      </div>

      {/* Offerings Grid */}
      <div className="grid grid-cols-1 gap-6 max-w-7xl mx-auto sm:grid-cols-2 lg:grid-cols-4">
        {offerings.map((offer, i) => (
          <motion.div
            key={i}
            custom={i}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="group relative flex flex-col bg-w2 border border-w2 rounded-3xl shadow-md overflow-hidden hover:shadow-lg transition-all min-h-[240px]"
          >
            {/* Top Icon Bar */}
            <div className="flex items-center justify-center bg-g1/5 py-5 sm:py-7">
              <img
                src={offer.icon}
                alt=""
                className="h-10 w-10 sm:h-12 sm:w-12"
              />
            </div>

            {/* Text Content */}
            <div className="flex flex-col flex-grow px-4 py-4 sm:px-5 sm:py-5">
              <h3 className="text-g1 font-semibold text-sm sm:text-base mb-1 sm:mb-2">
                {offer.title}
              </h3>
              <p className="text-g2 text-xs sm:text-sm md:text-base flex-grow leading-snug">
                {offer.desc}
              </p>
              {/* Accent strip */}
              <div className="mt-4 h-1 w-10 md:w-12 bg-r1 rounded-full" />
            </div>

            {/* Decorative hover layer */}
            <div className="absolute inset-0 bg-gradient-to-t from-g1/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
          </motion.div>
        ))}
      </div>

      {/* Footer Note / Tagline */}
      <div className="mt-10 text-center max-w-4xl mx-auto px-2">
        <span className="text-xs sm:text-sm text-g2 italic">
          Each offering is tailored to ensure you stand out with confidence at every stage of your journey.
        </span>
      </div>
    </div>
  </section>
);

export default WhatWeOffer;

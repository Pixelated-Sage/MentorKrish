import React from "react";
import { motion } from "framer-motion";

const mentorKrishItems = [
  {
    title: "Personality",
    desc: "Evaluation of core traits like introversion, extroversion, openness, and conscientiousness to understand your unique style.",
  },
  {
    title: "Emotional Quotient (EQ)",
    desc: "Measures your emotional awareness, empathy, and regulation to support resilient growth.",
  },
  {
    title: "Aptitude",
    desc: "Tests reasoning, logic, numerical, and verbal skills to uncover innate abilities.",
  },
  {
    title: "Interest & Orientation Style",
    desc: "Maps what activities/fields you enjoy and your natural approach to learning, decision-making, and collaboration.",
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

const Testing = () => {
  return (
    <section className="bg-w1 py-16 px-3 sm:px-4" id = "our-approachs-psycohmetric">
      <div className="max-w-7xl mx-auto w-full">
        {/* Section Title */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-center gap-3 text-xl sm:text-2xl md:text-3xl font-bold text-g1 mb-6 justify-center"
        >
          <img src="/assets/icons/square-bullet.svg" alt="" className="h-7 w-7 sm:h-8 sm:w-8" />
          Psychometric Testing at Mentor Krish
        </motion.h2>

        {/* Description */}
        <p className="text-g2 text-sm sm:text-base md:text-lg max-w-3xl mx-auto mb-12 text-center leading-relaxed">
          At Mentor Krish, our psychometric tests go beyond generic templates. We blend science-backed tools with certified expertise and personalized guidance to maximize your results.
        </p>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-8 max-w-4xl mx-auto">
          {mentorKrishItems.map((item, i) => (
            <motion.div
              key={i}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              className="bg-w2 border border-w2 rounded-2xl p-5 sm:p-6 shadow-lg hover:shadow-xl transition flex flex-col"
              style={{ minHeight: 170 }}
            >
              <h4 className="text-g1 font-semibold text-base sm:text-lg md:text-xl mb-3 border-b border-r1 pb-2">
                {item.title}
              </h4>
              <p className="text-g2 text-xs sm:text-sm md:text-base leading-relaxed flex-grow">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Stepper Flow */}
        <div
          className="
            flex flex-col sm:flex-row
            items-center justify-center
            gap-6 sm:gap-8
            mt-14
            max-w-5xl mx-auto
            px-3 sm:px-0
          "
        >
          <Step title="Take the Test" color="bg-r1" />
          <Arrow direction="vertical" className="sm:hidden" />
          <Arrow direction="horizontal" className="hidden sm:inline" />
          <Step title="Receive Detailed Report" color="bg-g1" />
          <Arrow direction="vertical" className="sm:hidden" />
          <Arrow direction="horizontal" className="hidden sm:inline" />
          <Step title="One-on-One Counseling" color="bg-r1" />
          <Arrow direction="vertical" className="sm:hidden" />
          <Arrow direction="horizontal" className="hidden sm:inline" />
          <Step title="Get Your Action Roadmap" color="bg-g1" />
        </div>
      </div>
    </section>
  );
};

const Step = ({ title, color = "bg-r1" }) => (
  <div className="flex flex-col items-center max-w-[140px] text-center">
    <div
      className={`${color} text-w1 rounded-full w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center font-extrabold text-base sm:text-lg mb-2 sm:mb-3 shadow-lg`}
    >
      {title.match(/\b[A-Za-z]/g)?.[0]}
    </div>
    <div className="text-g1 font-semibold text-xs sm:text-sm md:text-base leading-snug">
      {title}
    </div>
  </div>
);

const Arrow = ({ direction = "horizontal", className = "" }) => {
  return direction === "vertical" ? (
    <span className={`text-g2 text-xl sm:text-3xl font-bold select-none ${className}`}>
      ↓
    </span>
  ) : (
    <span className={`text-g2 text-2xl sm:text-3xl font-bold select-none ${className}`}>
      →
    </span>
  );
};

export default Testing;

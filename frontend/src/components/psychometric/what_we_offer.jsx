import React from "react";
import { motion } from "framer-motion";

const offerings = [
  {
    title: "Personalized Psychometric Tests",
    desc: "Scientifically designed assessments analyze strengths, personality traits, and preferences, providing a tailored roadmap for your future.",
    icon: "/assets/icons/brain.svg",
  },
  {
    title: "Personalized Career Counseling",
    desc: "Expert guidance to interpret your results, explore your aspirations, and turn insights into a clear, actionable plan.",
    icon: "/assets/icons/user1.svg",
  },
  {
    title: "Detailed Test Reports & Insights",
    desc: "Comprehensive, easy-to-read reports with insights you can act on immediately to make confident decisions.",
    icon: "/assets/icons/file-chart.svg",
  },
  {
    title: "Actionable Roadmaps",
    desc: "Step-by-step strategies that align academic and career goals, created for both students and parents.",
    icon: "/assets/icons/roadmap1.svg",
  },
];

const fadeIn = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.6 },
  }),
};

const WhatWeOffer = () => {
  return (
    <section className="relative bg-w1 py-20 px-3 sm:px-6" id = "what-we-offer-psycohmetric">
      <div className="max-w-7xl mx-auto w-full">
        {/* Heading + Intro */}
        <div className="mb-14 text-center max-w-3xl mx-auto px-2 sm:px-0">
          <div className="flex items-center gap-3 justify-center mb-3">
            <img src="/assets/icons/square-bullet.svg" alt="" className="h-7 w-7" />
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-g1">
              What We Offer
            </h2>
          </div>
          <div className="w-20 h-1 bg-r1 rounded-full mx-auto mb-4" />
          <p className="text-g2 text-sm sm:text-base leading-relaxed">
            More than just testing — we provide a suite of services to give you clarity, direction, and the tools to succeed.
          </p>
        </div>

        {/* Feature List with Alternating Left/Right Alignment */}
        <div className="space-y-10">
          {offerings.map((offer, i) => {
            const isEven = i % 2 === 1;
            return (
              <motion.div
                key={i}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeIn}
                className={`
                  flex flex-col
                  sm:flex-row
                  items-center
                  gap-5 sm:gap-8
                  ${isEven ? "sm:flex-row-reverse" : ""}
                `}
              >
                {/* Icon Side */}
                <div
                  className={`
                    flex-shrink-0 w-14 h-14 rounded-full bg-g1/5 border border-g2 flex items-center justify-center
                    ${isEven ? "sm:ml-0 sm:mr-8" : "sm:mr-0 sm:ml-8"}
                  `}
                >
                  <img src={offer.icon} alt="" className="w-8 h-8" aria-hidden="true" />
                </div>

                {/* Text Side */}
                <div
                  className={`
                    flex-1
                    ${isEven ? "text-right sm:pr-3" : "text-left sm:pl-3"}
                  `}
                >
                  <h3
                    className={`text-g1 font-semibold text-base sm:text-lg mb-1 ${
                      isEven ? "justify-end" : "justify-start"
                    }`}
                  >
                    {offer.title}
                  </h3>
                  <p className="text-g2 text-sm sm:text-base leading-relaxed">{offer.desc}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhatWeOffer;

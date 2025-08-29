import React from "react";
import { motion } from "framer-motion";

const approachSteps = [
  {
    title: "One-on-one counseling",
    description:
      "Personalized sessions tailored to each student's needs and aspirations. Build trust and clarity with direct interaction. We focus on understanding goals deeply and crafting a unique plan.",
    icon: "/assets/icons/user1.svg",
  },
  {
    title: "Psychometric tests",
    description:
      "In-depth, scientific analysis to reveal each student’s strengths, personality, and potential career directions. Our assessments use validated tools and provide actionable reports.",
    icon: "/assets/icons/brain.svg",
  },
  {
    title: "Goal and profile evaluation",
    description:
      "Expert review of academic and extracurricular profiles to align ambitions with achievable objectives. We consider strengths and growth areas to optimize planning.",
    icon: "/assets/icons/target.svg",
  },
  {
    title: "Personalized action plan",
    description:
      "Step-by-step blueprint created for progress, including timelines, milestones, and recommended resources. Stay accountable and empowered every step of the way.",
    icon: "/assets/icons/list.svg",
  },
  {
    title: "Progress tracking and support",
    description:
      "Ongoing check-ins, feedback, and mentorship to ensure steady advancement and agile correction. We’re with you throughout the journey for success.",
    icon: "/assets/icons/arrow-up.svg",
  },
];

const fadeIn = {
  hidden: { opacity: 0, y: 28 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.6 },
  }),
};

const Approach = () => (
  <section className="relative bg-w1 py-20 px-3 sm:px-6" id="our-approach">
    <div className="max-w-7xl mx-auto w-full">
      {/* Heading + Intro */}
      <div className="mb-14 text-center max-w-3xl mx-auto px-2 sm:px-0">
        <div className="flex items-center gap-3 justify-center mb-3">
          <img src="/assets/icons/square-bullet.svg" alt="" className="h-7 w-7" />
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-g1">
            Our Approach
          </h2>
        </div>
        <div className="w-20 h-1 bg-r1 rounded-full mx-auto mb-4" />
        <p className="text-g2 text-sm sm:text-base leading-relaxed">
          A holistic, student-first process built for real progress—step by step.
        </p>
      </div>

      {/* Steps List, alternating */}
      <div className="space-y-10">
        {approachSteps.map((step, i) => {
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
              {/* Icon side */}
              <div
                className={`
                  flex-shrink-0 w-14 h-14 rounded-full bg-g1/5 border border-g2 flex items-center justify-center
                  ${isEven ? "sm:ml-0 sm:mr-8" : "sm:mr-0 sm:ml-8"}
                `}
              >
                <img src={step.icon} alt="" className="w-8 h-8" aria-hidden="true" />
              </div>
              {/* Text side */}
              <div
                className={`
                  flex-1
                  ${isEven ? "text-right sm:pr-3" : "text-left sm:pl-3"}
                `}
              >
                <div className={`flex items-center ${isEven ? "justify-end" : "justify-start"} gap-2 mb-1`}>
                  <span className="text-r1 font-bold text-base sm:text-lg">{i + 1}.</span>
                  <h3 className="text-g1 font-semibold text-sm sm:text-lg">
                    {step.title}
                  </h3>
                </div>
                <p className="text-g2 text-xs sm:text-base leading-relaxed">{step.description}</p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  </section>
);

export default Approach;

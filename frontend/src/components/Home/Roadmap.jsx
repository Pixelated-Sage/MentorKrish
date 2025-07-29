import React from "react";
import { motion } from "framer-motion";

const roadmapItems = [
  {
    title: "Diagnostic Assessment",
    icon: "🎯",
    description:
      "We begin with a comprehensive diagnostic test to identify each student’s current proficiency level and pinpoint strengths and areas of improvement.",
  },
  {
    title: "In-Depth Performance Analysis",
    icon: "🧠",
    description:
      "Our experts analyze the diagnostic results to create a detailed learning profile. Weak areas are mapped, and a personalized action plan is created.",
  },
  {
    title: "Customized Learning Plan",
    icon: "📚",
    description:
      "We design bespoke classes tailored to the unique needs of each student. Every session is focused on targeted improvement and measurable progress.",
  },
  {
    title: "Access to DSAT Platform",
    icon: "💻",
    description:
      "Each student gets access to our exclusive DSAT platform, offering thousands of SAT-style practice questions that closely simulate actual College Board tests.",
  },
  {
    title: "Data-Driven Feedback Loop",
    icon: "📈",
    description:
      "Student performance is monitored through real-time data. Feedback is provided to both teachers and students for continuous refinement and faster progress.",
  },
  {
    title: "Continuous Reinforcement",
    icon: "🔁",
    description:
      "This cycle of learning, practicing, reviewing, and improving continues until the student achieves mastery in every topic.",
  },
  {
    title: "Sectional Tests (After 25% Course Completion)",
    icon: "🧪",
    description:
      "Once a quarter of the course is completed, we introduce sectional tests to evaluate students on broader topics and ensure deeper understanding.",
  },
  {
    title: "Full-Length Mock Test Series",
    icon: "📝",
    description:
      "Upon course completion, students undertake our flagship Mock Test Series, renowned for being precise simulations of the real SAT.",
  },
  {
    title: "Profile Building & Career Mapping",
    icon: "🎓",
    description:
      "We assist students in building strong academic and extracurricular profiles. Our psychometric testing tools help students in matching their passions, aptitude, and interests to ideal career paths.",
  },
  {
    title: "Career and College Counseling",
    icon: "🧭",
    description:
      "Through in-depth mentoring, we guide students in selecting the right courses, colleges, and countries—factoring in their academic potential, financial situation, and personal preferences.",
  },
  {
    title: "Guaranteed University Admissions & Financial Aid Support",
    icon: "🏫",
    description:
      "We ensure admissions to top universities worldwide and support students in securing scholarships and financial aid packages.",
  },
  {
    title: "IELTS & TOEFL Preparation",
    icon: "🌐",
    description:
      "Our expert-led training for Reading, Writing, Listening, and Speaking ensures students excel in IELTS and TOEFL. Our students consistently score well above the average.",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 50 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.7, type: "spring", stiffness: 80 },
  }),
};

const chevron =
  "M25,0 L75,0 Q92,20 75,40 L25,40 Q8,20 25,0 Z"; // SVG chevron shape

const Roadmap = () => {
  return (
    <section className="bg-w2 py-20 px-2 sm:px-8 md:px-16">
      <div className="max-w-4xl mx-auto flex flex-col items-center">
        <h2 className="text-3xl md:text-4xl font-extrabold text-g1 mb-14 text-center">
          Our Proven Path to Student Success
        </h2>

        {/* Vertical Timeline Roadmap */}
        <div className="relative w-full flex flex-col items-center">
          {/* Vertical line */}
          <div className="hidden sm:block absolute left-1/2 top-0 h-full border-r-2 border-dotted border-g2 z-0" style={{ transform: "translateX(-50%)" }} />

          <ul className="space-y-0 w-full">
            {roadmapItems.map((step, i) => (
              <motion.li
                key={i}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="relative z-10 w-full flex sm:even:flex-row-reverse mb-0 pb-0 group"
              >
                {/* Step Marker & Chevron */}
                <div className={`flex flex-col items-center w-1/6 min-w-[72px] mx-auto sm:mx-0`}>
                  {/* Step dot */}
                  <div className="rounded-full bg-r1 text-w1 flex items-center justify-center w-14 h-14 border-4 border-white shadow-lg text-2xl font-extrabold relative z-20">
                    {step.icon}
                  </div>
                  {/* Vertical line connector except for last */}
                  {i !== roadmapItems.length - 1 && (
                    <div className="hidden sm:block h-12 w-2 bg-g2/30 rounded-full z-0 my-1" />
                  )}
                </div>

                {/* Big Drawn Chevron */}
                <div className={`flex flex-col items-center w-5/6`}>
                  {/* Chevron on alternating side for desktop, same side for mobile */}
                  <svg width={120} height={44} viewBox="0 0 100 40" className="mx-auto sm:mx-0" aria-hidden="true">
                    <path d={chevron} fill="var(--r1)" fillOpacity={i % 2 === 0 ? 0.12 : 0.20} />
                  </svg>
                  {/* Card */}
                  <div
                    className={`
                      relative bg-w1 border-l-4 border-r1 rounded-3xl shadow-md px-4 sm:px-10 py-6 mt-[-18px] mb-7
                      max-w-[400px] sm:max-w-[350px] md:max-w-[430px]
                      ${i % 2 === 0 ? "sm:self-end" : "sm:self-start"}
                      group-hover:shadow-lg transition-shadow
                    `}
                  >
                    <h3 className="font-bold text-lg text-g1 mb-2 flex items-center gap-2">
                      <span className="hidden sm:inline text-xl text-r1 font-extrabold">{i + 1}.</span>
                      {step.title}
                    </h3>
                    <p className="text-g2 text-sm sm:text-base">{step.description}</p>
                  </div>
                </div>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Roadmap;

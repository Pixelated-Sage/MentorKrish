import React from "react";

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

// Multiple SVG wavy arrows with slight shape differences and responsiveness
const ArrowVariants = [
  () => (
    <svg
      className="w-16 h-8 sm:w-20 sm:h-10 md:w-24 md:h-14 flex-shrink-0"
      viewBox="0 0 120 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M2 20 C12 0, 32 40, 42 20 S70 0, 80 20 S108 40, 118 20"
        stroke="var(--g2)"
        strokeWidth="2"
        strokeDasharray="6 6"
        fill="none"
      />
      {/* <polygon points="118,20 110,14 110,26" fill="var(--g2)" /> */}
    </svg>
  ),

  () => (
    <svg
      className="w-16 h-8 sm:w-20 sm:h-10 md:w-24 md:h-14 flex-shrink-0"
      viewBox="0 0 120 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M2 20 C8 12, 24 28, 38 18 C52 8, 64 32, 78 20 C92 8, 106 32, 118 20"
        stroke="var(--g2)"
        strokeWidth="2"
        strokeDasharray="6 6"
        fill="none"
      />
      {/* <polygon points="118,20 110,14 110,26" fill="var(--g2)" /> */}
    </svg>
  ),

  () => (
    <svg
      className="w-16 h-8 sm:w-20 sm:h-10 md:w-24 md:h-14 flex-shrink-0"
      viewBox="0 0 120 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M2 20 Q18 4 36 24 T74 20 Q90 16 108 36"
        stroke="var(--g2)"
        strokeWidth="2"
        strokeDasharray="6 6"
        fill="none"
      />
      {/* <polygon points="118,20 110,14 110,26" fill="var(--g2)" /> */}
    </svg>
  ),
];

const Roadmap = () => {
  return (
    <section className="py-16 px-4 sm:px-8 md:px-12 bg-w2">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-g1">
        Our Proven Path To Student Success
      </h2>

      {/* Horizontal scroll container */}
      <div className="overflow-x-auto pt-10 no-scrollbar">
        <ul className="flex items-center gap-6 max-w-full w-max px-2">
          {roadmapItems.map((item, idx) => (
            <React.Fragment key={item.title}>
              <li className="relative min-w-[220px] max-w-[220px] sm:min-w-[240px] sm:max-w-[240px] bg-w1 border border-g2 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-200 cursor-default flex flex-col items-center px-5 py-7">
                {/* Number Circle */}
                <div className="relative w-12 h-12 rounded-full bg-r1 flex items-center justify-center -mt-10 mb-4 shadow-md border-4 border-w1 overflow-visible z-10">
                  <span className="text-w1 font-semibold select-none">{idx + 1}</span>
                  {/* Icon circle, overflowing upward */}
                  <span className="absolute -top-7 left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-w1 border-2 border-r1 flex items-center justify-center text-xl shadow-lg select-none">
                    {item.icon}
                  </span>
                </div>

                <h3 className="font-semibold text-g1 text-base sm:text-lg text-center mt-3 mb-1">
                  {item.title}
                </h3>
                <p className="text-g2 text-xs sm:text-sm text-center leading-relaxed select-text">
                  {item.description}
                </p>
              </li>

              {/* Add arrow path except after last */}
              {idx !== roadmapItems.length - 1 && (
                // Select arrow by cycling variants
                <div className="flex-shrink-0 mt-10 hidden md:flex">
                  {ArrowVariants[idx % ArrowVariants.length]()}
                </div>
              )}
            </React.Fragment>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Roadmap;

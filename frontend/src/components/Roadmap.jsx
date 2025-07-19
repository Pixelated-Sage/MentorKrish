import React from "react";
import { motion } from "framer-motion";
import { FaCheckCircle } from "react-icons/fa";

const roadmapItems = [
  {
    title: "Diagnostic Assessment",
    icon: "🎯",
    description:
      "We begin with a comprehensive diagnostic test to identify each student’s current proficiency level and pinpoint strengths and areas of improvement."
  },
  {
    title: "In-Depth Performance Analysis",
    icon: "🧠",
    description:
      "Our experts analyze the diagnostic results to create a detailed learning profile. Weak areas are mapped, and a personalized action plan is created."
  },
  {
    title: "Customized Learning Plan",
    icon: "📚",
    description:
      "We design bespoke classes tailored to the unique needs of each student. Every session is focused on targeted improvement and measurable progress."
  },
  {
    title: "Access to DSAT Platform",
    icon: "💻",
    description:
      "Each student gets access to our exclusive DSAT platform, offering thousands of SAT-style practice questions that closely simulate actual College Board tests."
  },
  {
    title: "Data-Driven Feedback Loop",
    icon: "📈",
    description:
      "Student performance is monitored through real-time data. Feedback is provided to both teachers and students for continuous refinement and faster progress."
  },
  {
    title: "Continuous Reinforcement",
    icon: "🔁",
    description:
      "This cycle of learning, practicing, reviewing, and improving continues until the student achieves mastery in every topic."
  },
  {
    title: "Sectional Tests (After 25% Course Completion)",
    icon: "🧪",
    description:
      "Once a quarter of the course is completed, we introduce sectional tests to evaluate students on broader topics and ensure deeper understanding."
  },
  {
    title: "Full-Length Mock Test Series",
    icon: "📝",
    description:
      "Upon course completion, students undertake our flagship Mock Test Series, renowned for being precise simulations of the real SAT."
  },
  {
    title: "Profile Building & Career Mapping",
    icon: "🎓",
    description:
      "We assist students in building strong academic and extracurricular profiles. Our psychometric testing tools help students in matching their passions, aptitude, and interests to ideal career paths."
  },
  {
    title: "Career and College Counseling",
    icon: "🧭",
    description:
      "Through in-depth mentoring, we guide students in selecting the right courses, colleges, and countries—factoring in their academic potential, financial situation, and personal preferences."
  },
  {
    title: "Guaranteed University Admissions & Financial Aid Support",
    icon: "🏫",
    description:
      "We ensure admissions to top universities worldwide and support students in securing scholarships and financial aid packages."
  },
  {
    title: "IELTS & TOEFL Preparation",
    icon: "🌐",
    description:
      "Our expert-led training for Reading, Writing, Listening, and Speaking ensures students excel in IELTS and TOEFL. Our students consistently score well above the average."
  }
];

const Roadmap = () => {
  return (
    <section className="relative py-20 px-4 sm:px-8 lg:px-16 bg-white">
      <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12 text-gray-800">
        Our Strategy: A Proven, Personalized Path to Student Success
      </h2>
      <div className="relative flex flex-col items-center">
        {/* Vertical Line */}
        <div className="absolute w-1 bg-blue-500 h-full left-1/2 transform -translate-x-1/2 z-0" />

        {roadmapItems.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            className={`relative w-full md:w-1/2 px-4 py-6 my-4 z-10 ${
              index % 2 === 0 ? "md:self-start text-left" : "md:self-end text-right"
            }`}
          >
            <div className="relative bg-blue-100 border-l-4 border-blue-500 shadow-lg rounded-lg p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {item.icon} {item.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {item.description}
              </p>
            </div>
            {/* Orb */}
            <span className="absolute top-6 w-4 h-4 rounded-full bg-blue-600 border-4 border-white left-1/2 transform -translate-x-1/2 z-20 shadow-md" />
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Roadmap;
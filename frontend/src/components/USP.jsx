import React from 'react';
import { motion } from 'framer-motion';

const uspData = [
  {
    title: "Psychometric Test",
    icon: "🧠",
    desc: "Discover Your True Potential with Our Psychometric Assessments.",
  },
  {
    title: "DSAT Platform",
    icon: "🖥️",
    desc: "Simulate the official test environment with our Digital SAT platform.",
  },
  {
    title: "Profile Building",
    icon: "📚",
    desc: "Crafting Your Unique Academic and Career Narrative.",
  },
  {
    title: "Expert Mentors",
    icon: "🎓",
    desc: "Personalized guidance to navigate academic challenges.",
  },
  {
    title: "Career Mapping",
    icon: "🗺️",
    desc: "Align aspirations with financial realities through strategic planning.",
  },
  {
    title: "Proven Success",
    icon: "🏆",
    desc: "Our tailored approach has consistently yielded positive outcomes.",
  },
];

const USP = () => {
  return (
    <section className="bg-white py-16 px-4 md:px-20" id="usp">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Our Unique Strengths</h2>
        <p className="text-gray-600 text-lg max-w-3xl mx-auto">
          Unlock Your Potential with Mentor Krish’s Tailored Educational Approach
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {uspData.map((usp, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            viewport={{ once: true }}
            className="bg-gray-50 shadow-xl rounded-2xl p-6 hover:shadow-2xl transition duration-300 border border-gray-100"
          >
            <div className="text-4xl mb-4">{usp.icon}</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">{usp.title}</h3>
            <p className="text-gray-600 text-sm">{usp.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default USP;

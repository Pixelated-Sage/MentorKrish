import React from "react";
import { motion } from "framer-motion";
import { Brain, UserCheck, TrendingUp, FolderKanban, GraduationCap } from "lucide-react";

const uspData = [
  {
    title: "Psychometric Evaluation",
    subtitle: "Cognitive Profiling",
    icon: <Brain size={24} className="text-red-700" />,
    desc: "Identify natural learning styles, cognitive strengths, and career inclinations through scientific assessments.",
  },
  {
    title: "1-on-1 Personalized Class",
    subtitle: "Targeted Coaching",
    icon: <UserCheck size={24} className="text-red-700" />,
    desc: "Individual attention for Verbal & Quantitative sections, customized according to baseline scores.",
  },
  {
    title: "Score Maximization Track",
    subtitle: "High-Yield Drills",
    icon: <TrendingUp size={24} className="text-red-700" />,
    desc: "Accelerate performance with speed revision sessions, topic shortcuts, and error log analytics.",
  },
  {
    title: "Strategic Profile Building",
    subtitle: "Admissions Narrative",
    icon: <FolderKanban size={24} className="text-red-700" />,
    desc: "Craft academic projects, Olympiad preparation, and extracurricular narratives for top applications.",
  },
  {
    title: "College Admissions Guidance",
    subtitle: "End-to-End Counseling",
    icon: <GraduationCap size={24} className="text-red-700" />,
    desc: "Expert guidance from university shortlisting to SOP essays, recommendation letters, and visa prep.",
  },
];

const USP = () => (
  <section className="bg-white py-20 px-4 md:px-8 border-t border-slate-200" id="usp">
    <div className="max-w-7xl mx-auto space-y-12">
      <div className="text-center max-w-2xl mx-auto">
        <span className="text-xs font-bold uppercase text-red-700 tracking-wider">
          Why Choose Mentor Krish
        </span>
        <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight mt-2 mb-3">
          Our Academic Strengths
        </h2>
        <p className="text-slate-600 text-sm md:text-base leading-relaxed">
          From diagnostic evaluation to global university admit—a structured process designed for student success.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
        {uspData.map((usp, idx) => (
          <div
            key={idx}
            className="bg-slate-50 rounded-2xl p-6 border border-slate-200 flex flex-col items-start space-y-3 hover:border-slate-300 transition-colors"
          >
            <div className="p-3 bg-white rounded-xl shadow-xs border border-slate-200">
              {usp.icon}
            </div>
            <h3 className="font-extrabold text-slate-900 text-base leading-snug">
              {usp.title}
            </h3>
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              {usp.subtitle}
            </span>
            <p className="text-slate-600 text-xs leading-relaxed pt-1">
              {usp.desc}
            </p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default USP;

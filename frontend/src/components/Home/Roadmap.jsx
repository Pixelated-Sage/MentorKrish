import React from "react";
import { motion } from "framer-motion";
import {
  Search,
  Brain,
  BookOpen,
  Laptop,
  BarChart3,
  Repeat,
  FileCheck2,
  Award,
  FolderKanban,
  UserCheck,
  GraduationCap,
  Globe,
} from "lucide-react";

const roadmapItems = [
  {
    title: "Diagnostic Assessment",
    icon: <Search size={20} className="text-red-700" />,
    description:
      "We begin with a comprehensive diagnostic test to identify each student’s current proficiency level and pinpoint strengths and areas of improvement.",
  },
  {
    title: "In-Depth Performance Analysis",
    icon: <Brain size={20} className="text-red-700" />,
    description:
      "Our experts analyze the diagnostic results to create a detailed learning profile. Weak areas are mapped, and a personalized action plan is created.",
  },
  {
    title: "Customized Learning Plan",
    icon: <BookOpen size={20} className="text-red-700" />,
    description:
      "We design bespoke classes tailored to the unique needs of each student. Every session is focused on targeted improvement and measurable progress.",
  },
  {
    title: "Access to DSAT Platform",
    icon: <Laptop size={20} className="text-red-700" />,
    description:
      "Each student gets access to our exclusive DSAT platform, offering thousands of SAT-style practice questions that closely simulate actual College Board tests.",
  },
  {
    title: "Data-Driven Feedback Loop",
    icon: <BarChart3 size={20} className="text-red-700" />,
    description:
      "Student performance is monitored through real-time data. Feedback is provided to both teachers and students for continuous refinement and faster progress.",
  },
  {
    title: "Continuous Reinforcement",
    icon: <Repeat size={20} className="text-red-700" />,
    description:
      "This cycle of learning, practicing, reviewing, and improving continues until the student achieves mastery in every topic.",
  },
  {
    title: "Sectional Tests (After 25% Course Completion)",
    icon: <FileCheck2 size={20} className="text-red-700" />,
    description:
      "Once a quarter of the course is completed, we introduce sectional tests to evaluate students on broader topics and ensure deeper understanding.",
  },
  {
    title: "Full-Length Mock Test Series",
    icon: <Award size={20} className="text-red-700" />,
    description:
      "Upon course completion, students undertake our flagship Mock Test Series, renowned for being precise simulations of the real SAT.",
  },
  {
    title: "Profile Building & Career Mapping",
    icon: <FolderKanban size={20} className="text-red-700" />,
    description:
      "We assist students in building strong academic and extracurricular profiles. Our psychometric testing tools help students match their passions to ideal career paths.",
  },
  {
    title: "Career and College Counseling",
    icon: <UserCheck size={20} className="text-red-700" />,
    description:
      "Through in-depth mentoring, we guide students in selecting the right courses, colleges, and countries—factoring in academic potential and personal preferences.",
  },
  {
    title: "Guaranteed Admissions & Financial Aid Support",
    icon: <GraduationCap size={20} className="text-red-700" />,
    description:
      "We assist students in securing admissions to top universities worldwide and support them in obtaining scholarships and financial aid packages.",
  },
  {
    title: "IELTS & TOEFL Preparation",
    icon: <Globe size={20} className="text-red-700" />,
    description:
      "Our expert-led training for Reading, Writing, Listening, and Speaking ensures students excel in IELTS and TOEFL with high scores.",
  },
];

const Roadmap = () => {
  return (
    <section className="bg-white py-20 px-4 md:px-8 border-t border-slate-200" id="roadmap">
      <div className="max-w-5xl mx-auto space-y-12">
        {/* Section Title */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-bold uppercase text-red-700 tracking-wider">
            Structured Academic Journey
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
            Our Path to Student Success
          </h2>
          <p className="text-slate-600 text-sm md:text-base leading-relaxed">
            A step-by-step diagnostic methodology designed to take students from baseline evaluation to top university acceptances.
          </p>
        </div>

        {/* Clean Vertical Timeline */}
        <div className="relative border-l-2 border-slate-200 ml-4 md:ml-32 space-y-8 pl-6 md:pl-10">
          {roadmapItems.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.04 }}
              className="relative group"
            >
              {/* Timeline Bullet Node */}
              <div className="absolute -left-[37px] md:-left-[53px] top-1.5 w-8 h-8 rounded-full bg-white border-2 border-red-700 flex items-center justify-center shadow-xs">
                <span className="text-[10px] font-black text-red-700">{i + 1}</span>
              </div>

              {/* Card Container */}
              <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200 hover:border-slate-300 transition-all duration-200 space-y-3">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-white rounded-lg border border-slate-200 shadow-2xs">
                    {step.icon}
                  </div>
                  <h3 className="text-base md:text-lg font-bold text-slate-900 leading-snug">
                    {step.title}
                  </h3>
                </div>

                <p className="text-slate-600 text-xs md:text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Roadmap;

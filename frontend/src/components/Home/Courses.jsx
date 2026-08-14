import React, { useState } from "react";
import { useRouter } from "next/router";
import { BookOpen, GraduationCap, Target, Award, Globe, ArrowRight, CheckCircle2, Monitor } from "lucide-react";
import { analytics, logEvent, db, addDoc, collection, serverTimestamp } from "../../lib/firebase";

const filterOptions = [
  { label: "All Programs", value: "all" },
  { label: "SAT", value: "SAT" },
  { label: "PSAT", value: "PSAT" },
  { label: "ACT", value: "ACT" },
  { label: "IELTS", value: "IELTS" },
  { label: "TOEFL", value: "TOEFL" },
];

const coursesList = [
  {
    id: "sat",
    badge: "SAT",
    title: "Digital SAT Preparation",
    subtitle: "Target 1500+ Composite Score",
    description: "25–35 hours of intensive 1-on-1 instruction, 250+ topic exercises, 50+ sectional tests, and 15+ real-interface diagnostic mock exams.",
    highlights: [
      "Adaptive Module 2 speed strategy",
      "Desmos graphing calculator mastery",
      "Diagnostic Reading & Writing error log analytics",
    ],
    focus: "Reading, Writing & Advanced Math",
    platform: "DSAT Real-Interface Online Portal",
    icon: <GraduationCap size={24} className="text-red-700" />,
  },
  {
    id: "psat",
    badge: "PSAT",
    title: "PSAT / NMSQT Essentials",
    subtitle: "National Merit Scholarship Track",
    description: "Foundational diagnostic practice and speed strategies designed for high school sophomores & juniors targeting National Merit Scholarships.",
    highlights: [
      "Early diagnostic baseline mapping",
      "Time management drills for PSAT format",
      "Seamless transition to SAT preparation",
    ],
    focus: "Foundation Building & Critical Reading",
    platform: "Diagnostic Practice Suite",
    icon: <Target size={24} className="text-red-700" />,
  },
  {
    id: "act",
    badge: "ACT",
    title: "ACT Complete Accelerator",
    subtitle: "Master Science & Speed",
    description: "Targeted practice on English, Math, Reading, and Science sections with speed drills and formula shortcuts for high composite scores.",
    highlights: [
      "Science section data interpretation drills",
      "Fast-paced grammar & rhetoric shortcuts",
      "Full-length timed ACT practice tests",
    ],
    focus: "English, Math, Reading & Science",
    platform: "Timed ACT Simulation Suite",
    icon: <Award size={24} className="text-red-700" />,
  },
  {
    id: "ielts",
    badge: "IELTS",
    title: "IELTS Academic Band Booster",
    subtitle: "Target Band 8.0+ Score",
    description: "Comprehensive 4-module training covering Listening, Reading, Academic Writing, and live Speaking mock interviews.",
    highlights: [
      "Live 1-on-1 speaking practice with feedback",
      "Task 1 & Task 2 essay structure templates",
      "Official British Council aligned curriculum",
    ],
    focus: "Listening, Reading, Writing & Speaking",
    platform: "Official Practice Portal",
    icon: <Globe size={24} className="text-red-700" />,
  },
  {
    id: "toefl",
    badge: "TOEFL",
    title: "TOEFL iBT Academic",
    subtitle: "US & Global University Track",
    description: "Internet-based test practice, real-time speaking feedback, academic vocabulary drills, and structured essay writing.",
    highlights: [
      "Academic campus conversation drills",
      "Integrated speaking & writing feedback",
      "Real-time online exam simulation",
    ],
    focus: "Academic English & Fluency Drills",
    platform: "Voice & Essay Evaluation Suite",
    icon: <BookOpen size={24} className="text-red-700" />,
  },
];

const Courses = () => {
  const [filter, setFilter] = useState("all");
  const router = useRouter();

  const filteredCourses =
    filter === "all" ? coursesList : coursesList.filter((c) => c.badge === filter);

  const handleStartClick = async (courseKey) => {
    if (analytics) logEvent(analytics, "start_course_preparation", { course: courseKey, location: "home_courses" });
    if (db) {
      try {
        await addDoc(collection(db, "user_events"), {
          event: "start_course_preparation",
          course: courseKey,
          location: "home_courses",
          user: typeof window !== "undefined" ? localStorage.getItem("userEmail") || "guest" : "server",
          timestamp: serverTimestamp(),
          path: typeof window !== "undefined" ? window.location.pathname : "server",
        });
      } catch (e) {
        console.error("Firestore logging error", e);
      }
    }
    router.push({
      pathname: "/courses",
      query: { course: courseKey },
    });
  };

  return (
    <section className="bg-slate-50 py-20 px-4 md:px-8 border-t border-slate-200" id="courses">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-md bg-slate-200 text-slate-800 text-xs font-bold uppercase tracking-wider border border-slate-300">
            <BookOpen size={14} className="text-red-700" /> Standardized Test Preparation
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
            Academic Prep Programs
          </h2>
          <p className="text-slate-600 text-sm md:text-base leading-relaxed">
            Rigorous, diagnostic 1-on-1 test preparation designed to maximize composite scores for global university admissions.
          </p>
        </div>

        {/* Filter Navigation Tabs */}
        <div className="flex flex-wrap justify-center gap-2">
          {filterOptions.map((opt) => (
            <button
              key={opt.value}
              onClick={() => setFilter(opt.value)}
              className={`px-5 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                filter === opt.value
                  ? "bg-slate-900 text-white shadow-xs"
                  : "bg-white text-slate-700 hover:bg-slate-200 border border-slate-200"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>

        {/* Course Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCourses.map((course) => (
            <div
              key={course.id}
              className="bg-white rounded-2xl p-7 shadow-xs border border-slate-200 flex flex-col justify-between space-y-6 hover:shadow-md transition-all duration-200"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="bg-red-50 text-red-700 text-[11px] font-black px-3 py-1 rounded uppercase tracking-wider border border-red-100">
                    {course.badge} Program
                  </span>
                  <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200">
                    {course.icon}
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-slate-900 leading-snug">
                    {course.title}
                  </h3>
                  <p className="text-xs font-semibold text-slate-500 mt-1">
                    {course.subtitle}
                  </p>
                </div>

                <p className="text-slate-600 text-xs leading-relaxed">
                  {course.description}
                </p>

                {/* Highlights List */}
                <div className="space-y-2 pt-2 border-t border-slate-100">
                  {course.highlights.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-slate-700 font-medium">
                      <CheckCircle2 size={14} className="text-red-700 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Card Footer & CTAs */}
              <div className="pt-4 border-t border-slate-100 space-y-3">
                <div className="flex items-center justify-between text-[11px] text-slate-500 font-semibold">
                  <span className="flex items-center gap-1">
                    <Monitor size={13} className="text-slate-400" /> {course.platform}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => router.push("/trial")}
                    className="w-full bg-red-700 hover:bg-red-800 text-white font-bold py-2.5 px-3 rounded-lg text-[11px] uppercase tracking-wider text-center transition"
                  >
                    Book Free Trial
                  </button>
                  <button
                    onClick={() => handleStartClick(course.badge)}
                    className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-2.5 px-3 rounded-lg text-[11px] uppercase tracking-wider text-center transition flex items-center justify-center gap-1"
                  >
                    <span>Curriculum</span>
                    <ArrowRight size={12} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Courses;

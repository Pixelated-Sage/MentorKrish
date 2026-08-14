import React, { useState, useEffect } from "react";
import { fetchAboutLatest } from "../../lib/api";
import { ShieldCheck, CheckCircle2 } from "lucide-react";

const AboutSection = () => {
  const [about, setAbout] = useState(null);

  useEffect(() => {
    async function loadAbout() {
      const data = await fetchAboutLatest();
      setAbout(data);
    }
    loadAbout();
  }, []);

  const description =
    about?.description ||
    "Mentor Krish is a premier test preparation and career counseling institute dedicated to shaping global academic achievers. We specialize in Digital SAT, PSAT, ACT, IELTS, and TOEFL preparation, paired with scientific psychometric career assessment.";

  return (
    <section className="bg-slate-50 py-20 px-4 md:px-8 border-t border-slate-200" id="about">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto">
          <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-md bg-slate-200 text-slate-800 text-xs font-bold uppercase tracking-wider mb-3 border border-slate-300">
            <ShieldCheck size={14} className="text-red-700" /> About Our Institute
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
            Empowering Global Aspirants with Proven Mentorship
          </h2>
          <p className="text-slate-600 text-sm md:text-base leading-relaxed">
            {description}
          </p>
        </div>

        {/* 2-Column Founder & Leadership Grid */}
        <div className="bg-white rounded-2xl p-8 md:p-12 shadow-xs border border-slate-200 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column: Founder Photo - Zoomed & Focused Portrait */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-xs h-96 rounded-2xl overflow-hidden shadow-md border-2 border-slate-200 bg-slate-900 flex flex-col justify-end">
              <div className="w-full h-full overflow-hidden flex items-center justify-center bg-gradient-to-b from-slate-800 via-slate-900 to-slate-950">
                <img
                  src="/assets/img/Owner.png"
                  alt="Ms. Neelam Sharma - Founder & Lead Mentor"
                  className="w-full h-full object-cover object-[50%_15%] scale-125 hover:scale-130 transition-transform duration-300 drop-shadow-xl"
                />
              </div>
              <div className="relative z-10 w-full bg-slate-950/90 backdrop-blur-xs p-3.5 text-white text-center border-t border-slate-800">
                <h3 className="font-black text-base tracking-tight text-white">Ms. Neelam Sharma</h3>
                <p className="text-xs text-red-400 font-bold uppercase tracking-wider mt-0.5">Founder & Lead Mentor (MBA, Symbiosis)</p>
              </div>
            </div>
          </div>

          {/* Right Column: Experience & Pillars */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-3">
              <span className="text-xs font-extrabold uppercase text-red-700 tracking-wider">
                13+ Years of Academic Excellence
              </span>
              <h3 className="text-2xl md:text-3xl font-extrabold text-slate-900 leading-snug">
                "Our mission is to convert academic effort into guaranteed competitive results."
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Having mentored over 1,500+ students targeting Ivy League and top-tier global universities, Ms. Neelam Sharma brings a disciplined, diagnostic approach to standardized testing. Every student receives a customized strategy roadmap tailored to their cognitive baseline.
              </p>
            </div>

            {/* Institute Metrics Grid */}
            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-slate-100">
              <div className="space-y-1">
                <div className="text-2xl font-black text-slate-900">10+ Years</div>
                <div className="text-xs font-bold text-slate-500 uppercase">SAT Specialization</div>
              </div>
              <div className="space-y-1">
                <div className="text-2xl font-black text-red-700">1500+</div>
                <div className="text-xs font-bold text-slate-500 uppercase">Students Mentored</div>
              </div>
              <div className="space-y-1">
                <div className="text-2xl font-black text-slate-900">98%</div>
                <div className="text-xs font-bold text-slate-500 uppercase">Target Score Pass Rate</div>
              </div>
            </div>

            {/* Core Values List */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
              <div className="flex items-center gap-2.5 text-xs font-bold text-slate-800">
                <CheckCircle2 size={16} className="text-red-700 shrink-0" />
                <span>Adaptive Digital SAT Strategy</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs font-bold text-slate-800">
                <CheckCircle2 size={16} className="text-red-700 shrink-0" />
                <span>1-on-1 Faculty Attention</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs font-bold text-slate-800">
                <CheckCircle2 size={16} className="text-red-700 shrink-0" />
                <span>Scientific Psychometric Profiling</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs font-bold text-slate-800">
                <CheckCircle2 size={16} className="text-red-700 shrink-0" />
                <span>Global Admissions Guidance</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;

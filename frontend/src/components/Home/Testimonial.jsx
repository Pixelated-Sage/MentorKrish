import React, { useRef, useState } from "react";
import { Quote, Star } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Rohan Kapoor",
    role: "SAT Score: 1560",
    university: "Admitted to Harvard University",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face",
    quote: "Mentor Krish's 1-on-1 strategy sessions transformed my Math and Reading timing. The Desmos shortcuts and diagnostic analytics made the difference in crossing 1550+.",
    rating: 5,
  },
  {
    id: 2,
    name: "Aanya Verma",
    role: "SAT Score: 1540",
    university: "Admitted to Stanford University",
    image: "https://images.unsplash.com/photo-1494790108755-2616b332c5cd?w=150&h=150&fit=crop&crop=face",
    quote: "The personalized coaching and psychometric counseling helped me align my extracurricular narrative with my top university applications.",
    rating: 5,
  },
  {
    id: 3,
    name: "Arjun Mehta",
    role: "ACT Score: 35",
    university: "Admitted to MIT",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    quote: "The rigorous sectional test practice and timing drills were crucial. Mentor Krish's feedback helped me eliminate critical reading traps.",
    rating: 5,
  },
  {
    id: 4,
    name: "Sneha Patel",
    role: "IELTS Band: 8.5",
    university: "Admitted to Imperial College London",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    quote: "Exceptional mock interviews and academic writing feedback. I received multiple university offers with financial aid.",
    rating: 5,
  },
];

export default function HomeTestimonial() {
  return (
    <section className="py-20 bg-white border-t border-slate-200" id="testimonials">
      <div className="max-w-7xl mx-auto px-4 md:px-8 space-y-12">
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-xs font-bold uppercase text-red-700 tracking-wider">
            Proven Results
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight mt-2 mb-3">
            Student & Parent Testimonials
          </h2>
          <p className="text-slate-600 text-sm md:text-base leading-relaxed">
            Read how our diagnostic strategy and 1-on-1 mentoring helped students secure top SAT scores and Ivy League acceptances.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((t) => (
            <div
              key={t.id}
              className="bg-slate-50 rounded-2xl p-6 border border-slate-200 flex flex-col justify-between space-y-4 hover:border-slate-300 transition-colors"
            >
              <div className="space-y-3">
                <div className="flex items-center space-x-1">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} size={14} className="fill-amber-400 text-amber-400" />
                  ))}
                </div>

                <p className="text-slate-700 text-xs leading-relaxed italic">
                  "{t.quote}"
                </p>
              </div>

              <div className="pt-4 border-t border-slate-200 flex items-center gap-3">
                <img
                  src={t.image}
                  alt={t.name}
                  className="w-10 h-10 rounded-full object-cover border border-slate-300"
                />
                <div>
                  <h4 className="font-extrabold text-slate-900 text-sm">{t.name}</h4>
                  <span className="text-[11px] font-bold text-red-700 block">{t.role}</span>
                  <span className="text-[10px] text-slate-500 block">{t.university}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

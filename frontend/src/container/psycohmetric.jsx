// container/Psychometric.jsx

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "../components/Navbar";
import Footer from "@/components/Footer";

// ------------- SECTION DATA -------------

const whyPoints = [
  "Identifies strengths, aptitudes, and personality",
  "Scientific, unbiased assessment for career clarity",
  "Reduces guesswork and stress in career decisions",
  "Used by top corporates and universities worldwide",
];

const offerings = [
  {
    title: "Personalized Psychometric Tests",
    desc: "Scientifically designed assessments analyze your strengths, personality traits, and preferences, providing a tailored roadmap for your future.",
  },
  {
    title: "Personalized Career Counseling",
    desc: "Get expert guidance to interpret your results, discuss your aspirations, and create a clear, actionable plan for academic and career decisions.",
  },
  {
    title: "Detailed Test Reports & Insights",
    desc: "Receive comprehensive, easy-to-understand reports with actionable insights for confident decision-making.",
  },
  {
    title: "Actionable Roadmaps",
    desc: "Our advisors help translate assessments into step-by-step action plans for students and parents.",
  },
];

const mentorKrishItems = [
  {
    title: "Personality",
    desc: "Evaluation of core traits like introversion, extroversion, openness, and conscientiousness to understand your unique style.",
  },
  {
    title: "Emotional Quotient (EQ)",
    desc: "Measures your emotional awareness, empathy, and regulation to support resilient growth.",
  },
  {
    title: "Aptitude",
    desc: "Tests reasoning, logic, numerical, and verbal skills to uncover innate abilities.",
  },
  {
    title: "Interest & Orientation Style",
    desc: "Maps what activities/fields you enjoy and your natural approach to learning, decision-making, and collaboration.",
  },
];

const usps = [
  "Early clarity = lifelong confidence",
  "Supports college admissions and applications",
  "Highlights achievements & experiences for a strong profile",
  "Includes actionable recommendations you can start now",
];

// Testimonials (optional)
const testimonials = [
  {
    name: "Neha (Parent)",
    quote: "The psychometric assessment at Mentor Krish gave both my son and us a clear sense of direction and peace of mind. Highly recommended!"
  },
  {
    name: "Rahul (Class 11 Student)",
    quote: "I always felt lost with so many options. After the test and counseling, I know exactly which field excites me — and why."
  },
];

// FAQs (optional)
const faqList = [
  {
    q: "Who should take a psychometric test?",
    a: "Students and young adults seeking clarity in academic subject and career path choices, as well as anyone looking to better understand their strengths.",
  },
  {
    q: "How is the test conducted?",
    a: "The tests are conducted online or in-person, followed by an expert-guided counseling session and detailed report delivery.",
  },
  {
    q: "Is psychometric testing suitable for all ages?",
    a: "We offer modules tailored for high schoolers, college students, and young professionals.",
  },
  {
    q: "How soon do I get the results?",
    a: "Reports and insights are delivered within 48 hours of completing the assessment.",
  },
  {
    q: "Is further guidance included?",
    a: "Yes, each assessment includes a one-on-one counseling session to interpret results and plan actionable steps.",
  },
];

// ------------- VARIANTS -------------

const fadeIn = {
  hidden: { opacity: 0, y: 32 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.7 }
  }),
};

// ------------- MAIN COMPONENT -------------

const Psychometric = () => {
  const [faqOpen, setFaqOpen] = React.useState(null);

  return (
    <>
      <Navbar />

      {/* Hero / Intro */}
      <section className="relative min-h-[38vh] sm:min-h-[44vh] flex flex-col justify-center items-center bg-w2 pt-20 pb-12 overflow-hidden">
        <div className="absolute inset-0 z-0 pointer-events-none" style={{
          backgroundImage: `
            linear-gradient(to right, rgba(200,200,200,0.14) 1px, transparent 2px),
            linear-gradient(to bottom, rgba(200,200,200,0.14) 1px, transparent 2px)
          `,
          backgroundSize: "34px 34px",
        }} aria-hidden="true" />
        <div className="relative z-10 flex flex-col items-center text-center px-3 sm:px-0">
          <h1 className="text-3xl md:text-5xl font-extrabold mb-3 text-g1">
            Psychometric Testing & Career Guidance
          </h1>
          <p className="text-g2 text-base sm:text-lg max-w-2xl mb-2 leading-snug">
            Discover your true strengths—choose with confidence. <br />
            Unlock your potential and build a successful career with expert assessment at Mentor Krish.
          </p>
          {/* Optional: Academic SVG/icon here, e.g. brain, gears, or compass */}
        </div>
      </section>

      {/* Why Psychometric Testing? */}
      <section className="bg-w1 py-12">
        <div className="max-w-5xl mx-auto">
          <motion.h2 className="flex items-center gap-3 text-2xl md:text-3xl font-bold text-g1 mb-6 justify-center">
            <img src="/assets/icons/square-bullet.svg" alt="" className="h-7 w-7" aria-hidden="true" />
            Why Psychometric Testing?
          </motion.h2>
          <div className="flex flex-wrap justify-center gap-5">
            {whyPoints.map((point, i) => (
              <motion.div
                key={i}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeIn}
                className="bg-w2 border border-w2 rounded-2xl p-6 min-w-[220px] flex-1 text-center shadow transition"
              >
                <span className="text-lg text-g1 font-semibold">{point}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* What We Offer */}
      <section className="bg-w2 py-12">
        <div className="max-w-5xl mx-auto">
          <motion.h2 className="flex items-center gap-3 text-2xl md:text-3xl font-bold text-g1 mb-6 justify-center">
            <img src="/assets/icons/square-bullet.svg" alt="" className="h-7 w-7" aria-hidden="true" />
            What We Offer
          </motion.h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
            {offerings.map((offer, i) => (
              <motion.div
                key={i}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeIn}
                className="bg-w1 border border-w2 rounded-2xl p-6 shadow flex flex-col"
              >
                <h3 className="text-g1 font-semibold text-lg mb-2">{offer.title}</h3>
                <p className="text-g2 text-sm">{offer.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Psychometric Testing at Mentor Krish (with Stepper) */}
      <section className="bg-w1 py-12">
        <div className="max-w-4xl mx-auto">
          <motion.h2 className="flex items-center gap-3 text-2xl md:text-3xl font-bold text-g1 mb-6">
            <img src="/assets/icons/square-bullet.svg" alt="" className="h-7 w-7" aria-hidden="true" />
            Psychometric Testing at Mentor Krish
          </motion.h2>
          <p className="text-g2 text-base mb-8">
            At Mentor Krish, our psychometric tests go beyond generic templates. We blend science-backed tools with certified expertise and personalized guidance to maximize your results.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {mentorKrishItems.map((item, i) => (
              <motion.div
                key={i}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeIn}
                className="bg-w2 border border-w2 rounded-xl p-5 shadow flex flex-col"
              >
                <h4 className="text-g1 font-semibold text-lg mb-2">{item.title}</h4>
                <p className="text-g2 text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </div>
          {/* Optional: Flow stepper/infographic */}
          <div className="flex flex-col items-center mt-10">
            <div className="flex flex-col sm:flex-row items-center gap-5">
              <Step title="Take the Test" />
              <Arrow />
              <Step title="Receive Detailed Report" />
              <Arrow />
              <Step title="One-on-One Counseling" />
              <Arrow />
              <Step title="Get Your Action Roadmap" />
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us / Strong Profile */}
      <section className="bg-w2 py-12">
        <div className="max-w-5xl mx-auto">
          <motion.h2 className="flex items-center gap-3 text-2xl md:text-3xl font-bold text-g1 mb-6 justify-center">
            <img src="/assets/icons/square-bullet.svg" alt="" className="h-7 w-7" aria-hidden="true" />
            Crafting Tomorrow's Success: Building a Strong Personal Profile Today
          </motion.h2>
          <div className="text-g2 text-base mb-8 text-center max-w-3xl mx-auto">
            In today's competitive landscape, academic excellence is only the beginning. We help you develop a standout profile—showcasing achievements, extra-curriculars, and authentic experiences—empowering you for university admissions and beyond.
          </div>
          <div className="flex flex-wrap justify-center gap-5">
            {usps.map((usp, i) => (
              <motion.div
                key={i}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeIn}
                className="bg-w1 border border-w2 rounded-xl p-4 text-center shadow min-w-[180px]"
              >
                <span className="text-g1 font-semibold">{usp}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Book a Psychometric Test / CTA */}
      <section className="bg-w1 py-12 flex flex-col items-center">
        <h2 className="text-2xl font-bold text-g1 mb-4 text-center">Ready to unlock your strengths?</h2>
        <a
          href="/trial"
          className="bg-r1 text-w1 text-lg font-semibold px-10 py-4 rounded-full shadow-lg hover:bg-r2 focus:outline-none focus:ring-2 focus:ring-r1 focus:ring-offset-2 transition"
        >
          Book Your Psychometric Test
        </a>
        <p className="text-g2 mt-4 text-center text-sm max-w-xl">
          Get a science-backed assessment and personal guidance to start your journey with confidence.
        </p>
      </section>

      {/* (Optional) Success Stories */}
      <section className="bg-w2 py-12">
        <motion.h2 className="flex items-center gap-3 text-2xl md:text-3xl font-bold text-g1 mb-6 justify-center">
          <img src="/assets/icons/square-bullet.svg" alt="" className="h-7 w-7" aria-hidden="true" />
          Success Stories
        </motion.h2>
        <div className="flex flex-wrap gap-7 justify-center max-w-4xl mx-auto">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              className="bg-w1 shadow-xl rounded-2xl border border-w2 p-7 max-w-sm"
            >
              <blockquote className="italic text-g2 text-base mb-4">&quot;{t.quote}&quot;</blockquote>
              <span className="block text-g1 font-bold">{t.name}</span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-w1 py-12">
        <motion.h2 className="flex items-center gap-3 text-2xl md:text-3xl font-bold text-g1 mb-6 justify-center">
          <img src="/assets/icons/square-bullet.svg" alt="" className="h-7 w-7" aria-hidden="true" />
          FAQs
        </motion.h2>
        <div className="max-w-3xl mx-auto divide-y bg-w2 rounded-2xl shadow">
          {faqList.map((faq, idx) => (
            <div key={idx} className="py-4 px-6 select-none cursor-pointer" onClick={() => setFaqOpen(faqOpen === idx ? null : idx)}>
              <div className="flex items-center justify-between">
                <span className="text-g1 font-medium text-base">{faq.q}</span>
                <span className="ml-2">{faqOpen === idx ? "–" : "+"}</span>
              </div>
              <AnimatePresence>
                {faqOpen === idx && (
                  <motion.p
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="text-g2 text-sm mt-3"
                  >
                    {faq.a}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </>
  );
};


// --- Helper Components: Stepper
function Step({ title }) {
  return (
    <div className="flex flex-col items-center">
      <div className="bg-g1 text-w1 rounded-full w-10 h-10 flex items-center justify-center font-bold text-lg mb-2 shadow">{title.match(/\b[A-Za-z]/g)?.[0]}</div>
      <div className="text-g1 text-xs font-semibold">{title}</div>
    </div>
  );
}
function Arrow() {
  return <span className="mx-2 text-g2 text-xl font-bold">→</span>;
}

export default Psychometric;

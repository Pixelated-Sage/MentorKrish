import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '@/components/Footer';

// "Why Career Counseling" short cards
const whyPoints = [
  "Discover your strengths and interests",
  "Match skills to career opportunities",
  "Make informed study & career decisions",
  "Avoid costly mistakes & confusion",
];

// Mentor Krish approach steps
const approachSteps = [
  "One-on-one counseling",
  "Psychometric tests",
  "Goal and profile evaluation",
  "Personalized action plan",
  "Progress tracking and support",
];

// Service cards ("What We Offer")
const offerings = [
  { title: "Advanced Psychometric Testing", desc: "In-depth, scientific tests to reveal true aptitudes and traits." },
  { title: "Student-Parent Sessions", desc: "Joint sessions for clarity and family support in decision-making." },
  { title: "Academic & Extra-curricular Planning", desc: "Blueprints for balanced, successful profiles." },
  { title: "Profile Building for College Admissions", desc: "Strategic storytelling and activity mapping for global admits." },
];

// Sample testimonials (success stories)
const testimonials = [
  {
    name: "Aarav Jain",
    quote: "Mentor Krish helped me clear my confusion and find my true calling. Their counseling and psychometric testing turned my dreams into a well-charted roadmap.",
  },
  {
    name: "Priya Sharma",
    quote: "After just two sessions, my daughter had clarity and confidence—and so did we as parents! Highly recommend their holistic approach.",
  },
];

// FAQ data
const faqList = [
  {
    q: "Who is career counseling for?",
    a: "Anyone from school-level students to graduates who want to make smart, confident education and career choices."
  },
  {
    q: "What happens in a typical session?",
    a: "You meet a certified counselor, explore your goals and abilities, undergo relevant assessments, and get a detailed, personalized plan."
  },
  {
    q: "Is psychometric testing necessary?",
    a: "While optional, these tests often reveal deep personality traits and aptitudes that help you (and your counselor) chart the best course."
  },
  {
    q: "Do you offer support after the session?",
    a: "Yes, we provide ongoing progress tracking and are available for follow-up questions as you implement your plan."
  },
];

const fadeIn = {
  hidden: { opacity: 0, y: 32 },
  visible: (i=0) => ({ opacity: 1, y: 0, transition: { delay: i*0.1, duration: 0.7 }}),
};

const Career = () => {
  const [faqOpen, setFaqOpen] = React.useState(null);

  return (
    <>
      <Navbar />
      {/* Hero */}
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
            Career Counseling
          </h1>
          <p className="text-g2 text-base sm:text-lg mb-2 max-w-xl leading-snug">
            Expert guidance for finding your unique path and transforming ambition into reality.
          </p>
          {/* Optional: Add an SVG or illustration here if you have it */}
        </div>
      </section>

      {/* Why Career Counseling */}
      <section className="bg-w1 py-12">
        <motion.h2 className="flex items-center gap-3 text-2xl md:text-3xl font-bold text-g1 mb-6 justify-center">
          <img src="/assets/icons/square-bullet.svg" alt="" className="h-7 w-7" aria-hidden="true" />
          Why Career Counseling?
        </motion.h2>
        <div className="flex flex-wrap justify-center gap-5 max-w-3xl mx-auto">
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
      </section>

      {/* Mentor Krish Approach */}
      <section className="bg-w2 py-12 px-2">
        <div className="max-w-3xl mx-auto">
          <motion.h2 className="flex items-center gap-3 text-2xl md:text-3xl font-bold text-g1 mb-6">
            <img src="/assets/icons/square-bullet.svg" alt="" className="h-7 w-7" aria-hidden="true" />
            The Mentor Krish Approach
          </motion.h2>
          <div className="flex flex-col md:flex-row gap-6 md:gap-0 md:justify-between">
            <ol className="space-y-5 max-w-2xl mx-auto">
              {approachSteps.map((step, i) => (
                <motion.li 
                  key={i}
                  custom={i}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeIn}
                  className="flex items-center gap-4"
                >
                  <span className="text-g1 text-xl font-bold">{i + 1}.</span>
                  <span className="text-g1 text-base font-medium">{step}</span>
                </motion.li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* What We Offer */}
      <section className="bg-w1 py-12">
        <motion.h2 className="flex items-center gap-3 text-2xl md:text-3xl font-bold text-g1 mb-6 justify-center">
          <img src="/assets/icons/square-bullet.svg" alt="" className="h-7 w-7" aria-hidden="true" />
          What We Offer
        </motion.h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5 max-w-5xl mx-auto">
          {offerings.map((offer, i) => (
            <motion.div
              key={i}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              className="bg-w2 border border-w2 rounded-2xl p-6 shadow flex flex-col"
            >
              <h3 className="text-g1 font-semibold text-lg mb-2">{offer.title}</h3>
              <p className="text-g2 text-sm">{offer.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Success Stories */}
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

      {/* CTA / Book Now */}
      <section className="bg-w2 py-12 flex justify-center items-center flex-col">
        <h2 className="text-2xl font-bold text-g1 mb-4 text-center">Ready to Plan Your Future?</h2>
        <a
          href="/trial"
          className="bg-r1 text-w1 text-lg font-semibold px-10 py-4 rounded-full shadow-lg hover:bg-r2 focus:outline-none focus:ring-2 focus:ring-r1 focus:ring-offset-2 transition"
        >
          Book Your First Counseling Session
        </a>
        <p className="text-g2 mt-4 text-center text-sm">Get a no-obligation consultation with a certified mentor.</p>
      </section>
      <Footer />
    </>
  );
};

export default Career;
    
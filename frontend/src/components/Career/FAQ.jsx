import React from 'react'
import { motion, AnimatePresence } from 'framer-motion';

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

const FAQ = () => {
  const [faqOpen, setFaqOpen] = React.useState(null);

  return (
    <section className="bg-w1 py-12" id="faqs">
      <motion.h2 className="flex items-center gap-3 text-2xl md:text-3xl font-bold text-g1 mb-6 justify-center">
        <img src="/assets/icons/square-bullet.svg" alt="" className="h-7 w-7" aria-hidden="true" />
        FAQs
      </motion.h2>

      <div className="max-w-xl sm:max-w-3xl mx-auto divide-y bg-w2 rounded-2xl shadow px-4 sm:px-6">
        {faqList.map((faq, idx) => (
          <div 
            key={idx} 
            className="py-4 select-none cursor-pointer"
            onClick={() => setFaqOpen(faqOpen === idx ? null : idx)}
          >
            <div className="flex items-center justify-between">
              <span className="text-g1 font-medium text-base leading-relaxed">{faq.q}</span>
              <span className="ml-2 font-bold text-lg">{faqOpen === idx ? "–" : "+"}</span>
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
  );
}

export default FAQ;

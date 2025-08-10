import React from 'react'
import { motion, AnimatePresence } from "framer-motion";

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

const FAQ = () => {
    const [faqOpen, setFaqOpen] = React.useState(null);
  return (
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

  )
}

export default FAQ
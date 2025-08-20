import React from 'react'
import { motion, AnimatePresence } from 'framer-motion';



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



const fadeIn = {
  hidden: { opacity: 0, y: 32 },
  visible: (i=0) => ({ opacity: 1, y: 0, transition: { delay: i*0.1, duration: 0.7 }}),
};

const Stories = () => {
  return (
    <section className="bg-w1 py-12" id="success-stories">
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
  )
}

export default Stories
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Expanded course data with multiple sections for each course
const courses = [
  {
    key: 'SAT',
    label: 'SAT',
    overview: {
      heading: 'SAT Overview',
      content: `The SAT course thoroughly prepares students for Reading, Writing, and Math sections using real test simulations and analytics.`,
    },
    why: {
      heading: 'Why Choose SAT?',
      content: `SAT is the most widely recognized college admission test in the US that opens doors to top universities worldwide.`,
    },
    benefits: {
      heading: 'Benefits of SAT Course',
      content: `Gain structured learning, expert mentorship, practice with real exam simulations, and sharpen test-taking skills.`,
    },
    audience: {
      heading: 'Who Should Pursue',
      content: `High school students aiming for undergraduate admissions, seeking strong foundational skills for higher education.`,
    },
    curriculum: {
      heading: 'Course Curriculum',
      content: `Reading comprehension, Writing and Language, Math (Algebra, Geometry, Data Analysis), and Essay optional.`,
    },
  },
  {
    key: 'PSAT',
    label: 'PSAT',
    overview: {
      heading: 'PSAT Overview',
      content: `PSAT builds foundational test skills, time management, and critical reading to prepare for SAT success.`,
    },
    why: {
      heading: 'Why Choose PSAT?',
      content: `PSAT acts as a practice tool and qualifying test for National Merit Scholarships, fueling academic excellence.`,
    },
    benefits: {
      heading: 'Benefits of PSAT Course',
      content: `Strengthen critical thinking, early test readiness, and benchmark academic progress effectively.`,
    },
    audience: {
      heading: 'Who Should Pursue',
      content: `Students in 10th and 11th grade preparing to step confidently into SAT and college admissions.`,
    },
    curriculum: {
      heading: 'Course Curriculum',
      content: `Diagnostic tests, timed drills, critical reading improvement, writing strategies, and math fundamentals.`,
    },
  },
  {
    key: 'ACT',
    label: 'ACT',
    overview: {
      heading: 'ACT Overview',
      content: `ACT Accelerator focuses on English, Math, Reading, and Science reasoning with extensive question banks and strategy sessions.`,
    },
    why: {
      heading: 'Why Choose ACT?',
      content: `ACT is widely accepted by US universities and emphasizes science and time management skills.`,
    },
    benefits: {
      heading: 'Benefits of ACT Course',
      content: `Enhance quick problem solving, integrated reasoning, and develop confidence under timed conditions.`,
    },
    audience: {
      heading: 'Who Should Pursue',
      content: `Students targeting US colleges who want a comprehensive and competitive exam prep alternative to SAT.`,
    },
    curriculum: {
      heading: 'Course Curriculum',
      content: `English grammar, math topics through pre-calculus, reading comprehension, science interpretation.`,
    },
  },
  {
    key: 'IELTS',
    label: 'IELTS',
    overview: {
      heading: 'IELTS Overview',
      content: `The IELTS Band Booster covers Listening, Reading, Writing, and Speaking with British Council-aligned curriculum and live mocks.`,
    },
    why: {
      heading: 'Why Choose IELTS?',
      content: `IELTS is accepted globally for work, study, and migration in English-speaking countries.`,
    },
    benefits: {
      heading: 'Benefits of IELTS Course',
      content: `Expert coaching in four modules with focus on fluency, pronunciation, and exam strategy.`,
    },
    audience: {
      heading: 'Who Should Pursue',
      content: `Students and professionals aspiring to validate English proficiency for international goals.`,
    },
    curriculum: {
      heading: 'Course Curriculum',
      content: `Listening practices, academic and general reading, essay writing, speaking drills and mock interviews.`,
    },
  },
  {
    key: 'TOEFL',
    label: 'TOEFL',
    overview: {
      heading: 'TOEFL Overview',
      content: `TOEFL Pathfinder includes intensive fluency training, grammar drills, and real-time speaking feedback for high scores.`,
    },
    why: {
      heading: 'Why Choose TOEFL?',
      content: `TOEFL is recognized by most US universities and measures academic English proficiency.`,
    },
    benefits: {
      heading: 'Benefits of TOEFL Course',
      content: `Comprehensive training of reading, listening, speaking, and writing with personalized feedback.`,
    },
    audience: {
      heading: 'Who Should Pursue',
      content: `International students planning to study in English-speaking academic settings.`,
    },
    curriculum: {
      heading: 'Course Curriculum',
      content: `Internet-based test prep, integrated skills practice, grammar and vocabulary building.`,
    },
  },
];

// Variants for fade word-by-word animations
const lineVariants = {
  hidden: { opacity: 0, y: -5 },
  visible: i => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.4,
      duration: 0.45,
      ease: "easeInOut"
    }
  })
};

const wordVariants = {
  hidden: { opacity: 0 },
  visible: i => ({
    opacity: 1,
    transition: {
      delay: i * 0.06,
      duration: 0.07
    }
  })
};

const AnimatedContent = ({ heading, content }) => {
  const lines = content.split('\n').map(line => line.trim()).filter(Boolean);

  return (
    <motion.div initial="hidden" animate="visible" exit="hidden" className="space-y-4">
      <h3 className="flex items-center gap-3 text-2xl font-bold text-g1 mb-2">
        <img
          src="/assets/icons/square-bullet.svg"
          alt=""
          className="h-7 w-7"
          aria-hidden="true"
        />
        {heading}
      </h3>
      {lines.map((line, i) => (
        <motion.div
          key={i}
          custom={i}
          variants={lineVariants}
          className="overflow-hidden text-g2 text-base leading-relaxed"
        >
          {line.split(' ').map((word, j) => (
            <motion.span
              key={j}
              custom={j}
              variants={wordVariants}
              className="inline-block mr-1"
            >
              {word}
            </motion.span>
          ))}
        </motion.div>
      ))}
    </motion.div>
  );
};

const CoursesDetails = () => {
  const [active, setActive] = useState(0);

  const activeCourse = courses[active];

  return (
    <section className="bg-w2 pt-12 pb-16 px-6 relative min-h-[60vh]">
      {/* Course Buttons */}
      <div className="flex justify-center mb-10 flex-wrap gap-5">
        {courses.map((course, idx) => (
          <button
            key={course.key}
            onClick={() => setActive(idx)}
            className={`rounded-full font-semibold text-base px-8 py-2 border transition-colors duration-300 min-w-[112px] whitespace-nowrap ${
              active === idx
                ? 'bg-g1 text-w1 border-g1 shadow'
                : 'bg-g2/30 text-g2 border-g2/50 opacity-80 hover:opacity-100'
            }`}
            aria-pressed={active === idx}
          >
            {course.label}
          </button>
        ))}
      </div>

      {/* Course Content Sections with typewriter animations */}
      <div className="max-w-6xl mx-auto space-y-10">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={activeCourse.key}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <AnimatedContent heading={activeCourse.overview.heading} content={activeCourse.overview.content} />
            <AnimatedContent heading={activeCourse.why.heading} content={activeCourse.why.content} />
            <AnimatedContent heading={activeCourse.benefits.heading} content={activeCourse.benefits.content} />
            <AnimatedContent heading={activeCourse.audience.heading} content={activeCourse.audience.content} />
            <AnimatedContent heading={activeCourse.curriculum.heading} content={activeCourse.curriculum.content} />

            {/* Enroll Button */}
            <div className="mt-10 flex justify-center">
              <a
                href="#enroll-form"
                className="bg-r1 text-w1 font-semibold rounded-full px-10 py-4 shadow-lg hover:bg-r2 transition-colors"
              >
                Enroll Now
              </a>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default CoursesDetails;

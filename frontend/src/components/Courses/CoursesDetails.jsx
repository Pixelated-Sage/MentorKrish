import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { analytics, logEvent, db, addDoc, collection, serverTimestamp } from '../../lib/firebase'; // Adjust path if needed

// Expanded course data with multiple sections for each course
const courses = [
	{
		key: 'PSAT',
		label: 'PSAT',
		overview: {
			heading: 'PSAT Overview',
			content: `The PSAT (Preliminary SAT) is a standardized test for students in grades 8–11. It serves as a practice for the SAT and a qualifier for the National Merit Scholarship (for 11th graders).`,
		},
		why: {
			heading: 'Why Choose PSAT?',
			content: `It builds foundational skills for the SAT, identifies academic strengths, and boosts confidence for future college entrance exams.`,
		},
		benefits: {
			heading: 'Benefits of PSAT Course',
			content: `Early exposure to SAT-style questions.\nTargeted improvement in Math, Reading, and Writing.\nDiagnostic reports to track progress.\nPersonalized feedback and strategy sessions.`,
		},
		audience: {
			heading: 'Who Should Pursue PSAT?',
			content: `Students from Grade 8 to 11 aiming to build strong test-taking skills and secure a competitive edge for college admissions.`,
		},
		curriculum: {
			heading: 'Course Curriculum',
			content: `Our PSAT course mirrors the SAT structure and prepares students across both Math and Reading & Writing modules:\n
🔹 Reading & Writing — Craft and Structure, Central Ideas, English Conventions, Expression of Ideas.\n
🔹 Math — Algebra, Advanced Math, Data Analysis, Geometry & Trigonometry.`,
		},
	},
	{
		key: 'SAT',
		label: 'SAT',
		overview: {
			heading: 'SAT Overview',
			content: `The SAT is a globally recognized standardized test used for college admissions, assessing students' readiness in Reading, Writing, and Math. It is accepted by universities across the world, especially in the U.S.`,
		},
		why: {
			heading: 'Why Choose SAT?',
			content: `It opens doors to top global universities, scholarship opportunities, and builds strong academic and analytical skills essential for future success.`,
		},
		benefits: {
			heading: 'Benefits of SAT Course',
			content: `In-depth practice on Digital SAT format.\nConcept-based learning with targeted drills.\nAI-driven performance tracking.\nExpert strategies for time and stress management.\nReal-time doubt-solving and detailed feedback.`,
		},
		audience: {
			heading: 'Who Should Pursue SAT?',
			content: `Students in grades 10–12 aiming for undergraduate programs in top universities abroad, especially those targeting the U.S., Canada, or global scholarships.`,
		},
		curriculum: {
			heading: 'Course Curriculum',
			content: `🔹 Reading & Writing — Words in Context, Central Ideas, Grammar, Rhetorical Skills.\n
🔹 Math — Algebra, Advanced Math, Data Analysis, Geometry & Trigonometry.`,
		},
	},
	{
		key: 'ACT',
		label: 'ACT',
		overview: {
			heading: 'ACT Overview',
			content: `The ACT is a standardized test used for college admissions in the U.S. and accepted by universities worldwide. It assesses skills in English, Math, Reading, and Science Reasoning, with an optional Writing section.`,
		},
		why: {
			heading: 'Why Choose ACT?',
			content: `The ACT suits students who prefer straightforward questions and strong time management. It offers broader content coverage and includes a Science section, making it ideal for STEM-focused students.`,
		},
		benefits: {
			heading: 'Benefits of ACT Course',
			content: `Covers all four core sections plus optional writing.\nEmphasis on speed, accuracy, and time-saving techniques.\nScience reasoning strategies unique to ACT.\nFull-length practice tests simulating real exam conditions.\nPersonalized performance analysis and feedback.`,
		},
		audience: {
			heading: 'Who Should Pursue ACT?',
			content: `Students in grades 10–12 aiming to study in the U.S. or globally, especially those with strengths in science, fast-paced environments, or seeking an alternative to the SAT.`,
		},
		curriculum: {
			heading: 'Course Curriculum',
			content: `🔹 English — Grammar, punctuation, sentence structure, rhetorical skills.\n
🔹 Math — Algebra, Geometry, Trigonometry, Elementary Statistics.\n
🔹 Reading — Comprehension across prose, humanities, social sciences, and fiction.\n
🔹 Science — Graph interpretation, experimental analysis, scientific reasoning.`,
		},
	},
	{
		key: 'IELTS',
		label: 'IELTS',
		overview: {
			heading: 'IELTS Overview',
			content: `The IELTS (International English Language Testing System) is an English proficiency test required by universities, employers, and immigration authorities in English-speaking countries like the UK, Canada, Australia, and New Zealand.`,
		},
		why: {
			heading: 'Why Choose IELTS?',
			content: `IELTS is accepted by over 11,000 institutions globally and evaluates real-life language skills through speaking, listening, reading, and writing tasks.`,
		},
		benefits: {
			heading: 'Benefits of IELTS Course',
			content: `Comprehensive practice for Academic and General Training modules.\nPersonalized feedback on speaking and writing.\nVocabulary-building and grammar correction sessions.\nFull-length mock tests with scoring and analysis.\nTips to manage time and improve fluency.`,
		},
		audience: {
			heading: 'Who Should Pursue IELTS?',
			content: `Students, professionals, or immigrants applying for higher education, job opportunities, or PR in countries like the UK, Australia, or Canada.`,
		},
		curriculum: {
			heading: 'Course Curriculum',
			content: `🔹 Listening — Practice across 4 sections with multiple accents.\n
🔹 Reading — Skimming, scanning, main idea identification.\n
🔹 Writing — Task 1: Reports or Letters; Task 2: Essays.\n
🔹 Speaking — Interview, cue card, and follow-up practice.`,
		},
	},
	{
		key: 'TOEFL',
		label: 'TOEFL',
		overview: {
			heading: 'TOEFL Overview',
			content: `The TOEFL (Test of English as a Foreign Language) is a computer-based test accepted by universities and institutions worldwide, especially in the U.S. and Canada, to assess academic English proficiency.`,
		},
		why: {
			heading: 'Why Choose TOEFL?',
			content: `TOEFL focuses on academic language and integrated skills, making it ideal for university readiness. It is preferred by U.S. institutions and has a structured online format.`,
		},
		benefits: {
			heading: 'Benefits of TOEFL Course',
			content: `Training in integrated tasks (Reading + Speaking/Writing).\nPractice in academic listening and note-taking.\nAI-based speaking evaluations and writing reviews.\nReal-time mock test simulations.\nStrategic tips for navigating online format.`,
		},
		audience: {
			heading: 'Who Should Pursue TOEFL?',
			content: `Students applying to U.S. and Canadian universities or seeking scholarships, especially where TOEFL is the preferred English language test.`,
		},
		curriculum: {
			heading: 'Course Curriculum',
			content: `🔹 Reading — Academic texts, vocabulary-based and inference questions.\n
🔹 Listening — Lectures and conversations from campus contexts.\n
🔹 Speaking — 4 integrated and independent tasks.\n
🔹 Writing — Summarizing listening + reading, and opinion essays.`,
		},
	},
];

// Variants for fade word-by-word animations
const lineVariants = {
	hidden: { opacity: 0, y: -5 },
	visible: (i) => ({
		opacity: 1,
		y: 0,
		transition: {
			delay: i * 0.4,
			duration: 0.45,
			ease: 'easeInOut',
		},
	}),
};

const wordVariants = {
	hidden: { opacity: 0 },
	visible: (i) => ({
		opacity: 1,
		transition: {
			delay: i * 0.06,
			duration: 0.07,
		},
	}),
};

const AnimatedContent = ({ heading, content }) => {
	const lines = content.split('\n').map((line) => line.trim()).filter(Boolean);

	return (
		<motion.div
			initial="hidden"
			animate="visible"
			exit="hidden"
			className="space-y-4"
		>
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

const CoursesDetails = ({ selectedCourseKey }) => {
	const [active, setActive] = useState(0);

	// Track page view & tab change
	useEffect(() => {
		if (selectedCourseKey) {
			const idx = courses.findIndex(
				(c) => c.key.toLowerCase() === selectedCourseKey.toLowerCase()
			);
			if (idx !== -1) setActive(idx);
			// Track via analytics (page landed with key)
			if (analytics) logEvent(analytics, "courses_page_view", { course: selectedCourseKey });
			if (db) {
				addDoc(collection(db, "user_events"), {
					event: "courses_page_view",
					course: selectedCourseKey,
					user: typeof window !== "undefined" ? localStorage.getItem("userEmail") || "guest" : "server",
					timestamp: serverTimestamp(),
					path: typeof window !== "undefined" ? window.location.pathname : "server",
				});
			}
		} else {
			if (analytics) logEvent(analytics, "courses_page_view", { course: courses[active].key });
			if (db) {
				addDoc(collection(db, "user_events"), {
					event: "courses_page_view",
					course: courses[active].key,
					user: typeof window !== "undefined" ? localStorage.getItem("userEmail") || "guest" : "server",
					timestamp: serverTimestamp(),
					path: typeof window !== "undefined" ? window.location.pathname : "server",
				});
			}
		}
		// Only run on mount and selectedCourseKey change
		// eslint-disable-next-line
	}, [selectedCourseKey]);

	// Tab click tracker
	const handleTabClick = (idx, course) => {
		setActive(idx);
		if (analytics) logEvent(analytics, "course_tab_switch", { course: course.key });
		if (db) {
			addDoc(collection(db, "user_events"), {
				event: "course_tab_switch",
				course: course.key,
				user: typeof window !== "undefined" ? localStorage.getItem("userEmail") || "guest" : "server",
				timestamp: serverTimestamp(),
				path: typeof window !== "undefined" ? window.location.pathname : "server",
			});
		}
	};

	// Enroll click tracker
	const activeCourse = courses[active];
	const handleEnrollClick = async () => {
		if (analytics) logEvent(analytics, "course_enroll_click", { course: activeCourse.key });
		if (db) {
			await addDoc(collection(db, "user_events"), {
				event: "course_enroll_click",
				course: activeCourse.key,
				user: typeof window !== "undefined" ? localStorage.getItem("userEmail") || "guest" : "server",
				timestamp: serverTimestamp(),
				path: typeof window !== "undefined" ? window.location.pathname : "server",
			});
		}
		// Scroll to enroll form or route as needed
		window.location.hash = "#enroll-form";
	};

	return (
		<section className="bg-w2 pt-12 pb-16 px-6 relative min-h-[60vh]">
			{/* Course Buttons */}
			<div className="flex justify-center mb-10 flex-wrap gap-5">
				{courses.map((course, idx) => (
					<button
						key={course.key}
						onClick={() => handleTabClick(idx, course)}
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
						<AnimatedContent
							heading={activeCourse.overview.heading}
							content={activeCourse.overview.content}
						/>
						<AnimatedContent
							heading={activeCourse.why.heading}
							content={activeCourse.why.content}
						/>
						<AnimatedContent
							heading={activeCourse.benefits.heading}
							content={activeCourse.benefits.content}
						/>
						<AnimatedContent
							heading={activeCourse.audience.heading}
							content={activeCourse.audience.content}
						/>
						<AnimatedContent
							heading={activeCourse.curriculum.heading}
							content={activeCourse.curriculum.content}
						/>
						{/* Enroll Button */}
						<div className="mt-10 flex justify-center">
							<button
								onClick={handleEnrollClick}
								className="bg-r1 text-w1 font-semibold rounded-full px-10 py-4 shadow-lg hover:bg-r2 transition-colors"
							>
								Enroll Now
							</button>
						</div>
					</motion.div>
				</AnimatePresence>
			</div>
		</section>
	);
};

export default CoursesDetails;

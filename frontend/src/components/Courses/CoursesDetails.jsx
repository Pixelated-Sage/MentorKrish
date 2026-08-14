import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { analytics, logEvent, db, addDoc, collection, serverTimestamp } from '../../lib/firebase';

const courses = [
	{
		key: 'PSAT',
		label: 'PSAT',
		overview: {
			heading: 'PSAT Overview',
			content: `The PSAT (Preliminary SAT) is a standardized test for students in grades 8–11. It serves as practice for the SAT and a qualifier for the National Merit Scholarship program.`,
		},
		why: {
			heading: 'Why Choose?',
			content: `It builds foundational skills for the SAT, identifies academic strengths, and boosts confidence for future college entrance exams.`,
		},
		benefits: {
			heading: 'Benefits of this Course',
			content: `Early exposure to SAT-style questions.\nTargeted improvement in Math, Reading, and Writing.\nDiagnostic reports to track progress.\nPersonalized feedback and strategy sessions.`,
		},
		audience: {
			heading: 'Who Should Pursue this Course?',
			content: `Students from Grade 8 to 11 aiming to build strong test-taking skills and secure a competitive edge for college admissions.`,
		},
		curriculum: {
			heading: 'Course Curriculum',
			content: `Our PSAT course mirrors the SAT structure and prepares students across both Math and Reading & Writing modules:\n
• Reading & Writing — Craft and Structure, Central Ideas, English Conventions, Expression of Ideas.\n
• Math — Algebra, Advanced Math, Data Analysis, Geometry & Trigonometry.`,
		},
	},
	{
		key: 'SAT',
		label: 'SAT',
		overview: {
			heading: 'SAT Overview',
			content: `The SAT is a globally recognized standardized test used for college admissions, assessing students' readiness in Reading, Writing, and Math. It is accepted by top universities worldwide.`,
		},
		why: {
			heading: 'Why Choose?',
			content: `It opens doors to top global universities, scholarship opportunities, and builds strong analytical skills essential for future academic success.`,
		},
		benefits: {
			heading: 'Benefits of this Course',
			content: `In-depth practice on Digital SAT format.\nConcept-based learning with targeted drills.\nPerformance tracking and diagnostic analytics.\nExpert strategies for time and stress management.\nReal-time doubt-solving and detailed feedback.`,
		},
		audience: {
			heading: 'Who Should Pursue this Course?',
			content: `Students in grades 10–12 aiming for undergraduate programs in top universities abroad, especially those targeting the U.S., Canada, UK, or global scholarships.`,
		},
		curriculum: {
			heading: 'Course Curriculum',
			content: `• Reading & Writing — Words in Context, Central Ideas, Grammar, Rhetorical Skills.\n
• Math — Algebra, Advanced Math, Data Analysis, Geometry & Trigonometry.`,
		},
	},
	{
		key: 'ACT',
		label: 'ACT',
		overview: {
			heading: 'ACT Overview',
			content: `The ACT is a standardized test used for college admissions in the U.S. and accepted by universities worldwide. It assesses skills in English, Math, Reading, and Science Reasoning.`,
		},
		why: {
			heading: 'Why Choose?',
			content: `The ACT suits students who prefer straightforward questions and strong time management. It offers broader content coverage and includes a Science section.`,
		},
		benefits: {
			heading: 'Benefits of this Course',
			content: `Covers all four core sections plus optional writing.\nEmphasis on speed, accuracy, and time-saving techniques.\nScience reasoning strategies unique to ACT.\nFull-length practice tests simulating real exam conditions.\nPersonalized performance analysis and feedback.`,
		},
		audience: {
			heading: 'Who Should Pursue this Course?',
			content: `Students in grades 10–12 aiming to study in the U.S. or globally, especially those with strengths in science or fast-paced problem solving.`,
		},
		curriculum: {
			heading: 'Course Curriculum',
			content: `• English — Grammar, punctuation, sentence structure, rhetorical skills.\n
• Math — Algebra, Geometry, Trigonometry, Elementary Statistics.\n
• Reading — Comprehension across prose, humanities, social sciences, and fiction.\n
• Science — Graph interpretation, experimental analysis, scientific reasoning.`,
		},
	},
	{
		key: 'IELTS',
		label: 'IELTS',
		overview: {
			heading: 'IELTS Overview',
			content: `The IELTS is an English proficiency test required by universities, employers, and immigration authorities in English-speaking countries like the UK, Canada, Australia, and New Zealand.`,
		},
		why: {
			heading: 'Why Choose?',
			content: `IELTS is accepted by over 11,000 institutions globally and evaluates real-life language skills through speaking, listening, reading, and writing tasks.`,
		},
		benefits: {
			heading: 'Benefits of this Course',
			content: `Comprehensive practice for Academic and General Training modules.\nPersonalized feedback on speaking and writing.\nVocabulary-building and grammar correction sessions.\nFull-length mock tests with scoring and analysis.\nTips to manage time and improve fluency.`,
		},
		audience: {
			heading: 'Who Should Pursue this Course?',
			content: `Students or professionals applying for higher education or job opportunities in countries like the UK, Australia, or Canada.`,
		},
		curriculum: {
			heading: 'Course Curriculum',
			content: `• Listening — Practice across 4 sections with multiple accents.\n
• Reading — Skimming, scanning, main idea identification.\n
• Writing — Task 1: Reports or Letters; Task 2: Essays.\n
• Speaking — Interview, cue card, and follow-up practice.`,
		},
	},
	{
		key: 'TOEFL',
		label: 'TOEFL',
		overview: {
			heading: 'TOEFL Overview',
			content: `The TOEFL is a computer-based test accepted by universities and institutions worldwide, especially in the U.S. and Canada, to assess academic English proficiency.`,
		},
		why: {
			heading: 'Why Choose?',
			content: `TOEFL focuses on academic language and integrated skills, making it ideal for university readiness. It has a structured online format.`,
		},
		benefits: {
			heading: 'Benefits of this Course',
			content: `Training in integrated tasks (Reading + Speaking/Writing).\nPractice in academic listening and note-taking.\nSpeaking evaluations and writing reviews.\nReal-time mock test simulations.\nStrategic tips for navigating online format.`,
		},
		audience: {
			heading: 'Who Should Pursue this Course?',
			content: `Students applying to U.S. and Canadian universities or seeking scholarships where TOEFL is accepted.`,
		},
		curriculum: {
			heading: 'Course Curriculum',
			content: `• Reading — Academic texts, vocabulary-based and inference questions.\n
• Listening — Lectures and conversations from campus contexts.\n
• Speaking — Integrated and independent tasks.\n
• Writing — Summarizing listening + reading, and opinion essays.`,
		},
	},
];

const CoursesDetails = ({ selectedCourseKey }) => {
	const [active, setActive] = useState(0);

	useEffect(() => {
		if (selectedCourseKey) {
			const idx = courses.findIndex(
				(c) => c.key.toLowerCase() === selectedCourseKey.toLowerCase()
			);
			if (idx !== -1) setActive(idx);
		}
	}, [selectedCourseKey]);

	const activeCourse = courses[active];

	return (
		<section className="bg-slate-50 py-16 px-4 md:px-8 border-t border-slate-200">
			<div className="max-w-6xl mx-auto space-y-10">
				{/* Course Filter Tabs */}
				<div className="flex justify-center flex-wrap gap-2">
					{courses.map((course, idx) => (
						<button
							key={course.key}
							onClick={() => setActive(idx)}
							className={`rounded-lg font-bold text-xs uppercase tracking-wider px-6 py-2.5 transition-all ${
								active === idx
									? 'bg-slate-900 text-white shadow-sm'
									: 'bg-white text-slate-700 hover:bg-slate-200 border border-slate-200'
							}`}
						>
							{course.label}
						</button>
					))}
				</div>

				{/* Course Content Details */}
				<div className="bg-white rounded-2xl p-8 md:p-10 shadow-sm border border-slate-200 space-y-8">
					<div>
						<span className="bg-red-50 text-red-700 text-xs font-extrabold px-3 py-1 rounded uppercase tracking-wider">
							{activeCourse.label} Program Overview
						</span>
						<h2 className="text-3xl font-extrabold text-slate-900 mt-2">
							{activeCourse.overview.heading}
						</h2>
						<p className="text-slate-600 text-sm md:text-base leading-relaxed mt-3">
							{activeCourse.overview.content}
						</p>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						<div className="bg-slate-50 p-6 rounded-xl border border-slate-200 space-y-2">
							<h3 className="text-base font-bold text-slate-900">{activeCourse.why.heading}</h3>
							<p className="text-slate-600 text-xs leading-relaxed">{activeCourse.why.content}</p>
						</div>

						<div className="bg-slate-50 p-6 rounded-xl border border-slate-200 space-y-2">
							<h3 className="text-base font-bold text-slate-900">{activeCourse.audience.heading}</h3>
							<p className="text-slate-600 text-xs leading-relaxed">{activeCourse.audience.content}</p>
						</div>
					</div>

					<div className="bg-slate-50 p-6 rounded-xl border border-slate-200 space-y-3">
						<h3 className="text-base font-bold text-slate-900">{activeCourse.benefits.heading}</h3>
						<p className="text-slate-600 text-xs leading-relaxed whitespace-pre-line">{activeCourse.benefits.content}</p>
					</div>

					<div className="bg-slate-50 p-6 rounded-xl border border-slate-200 space-y-3">
						<h3 className="text-base font-bold text-slate-900">{activeCourse.curriculum.heading}</h3>
						<p className="text-slate-600 text-xs leading-relaxed whitespace-pre-line">{activeCourse.curriculum.content}</p>
					</div>

					<div className="pt-4 flex justify-center">
						<a
							href="/trial"
							className="bg-red-700 hover:bg-red-800 text-white font-bold text-xs uppercase tracking-wider px-8 py-3.5 rounded-lg shadow-sm transition"
						>
							Book Free Trial Session for {activeCourse.label}
						</a>
					</div>
				</div>
			</div>
		</section>
	);
};

export default CoursesDetails;

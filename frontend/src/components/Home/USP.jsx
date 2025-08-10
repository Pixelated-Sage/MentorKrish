import React from 'react';
import { motion } from 'framer-motion';

// Data updated to match your screenshot content
const uspData = [
	{
		title: 'Psychometric Testing',
		subtitle: 'Know Yourself',
		icon: '🧠',
		desc: 'Identify your learning style, strengths, weaknesses and career inclinations through comprehensive, scientific assessments.',
	},
	{
		title: 'One-on-One Class for Verbal & Quant',
		subtitle: 'Personalized Prep',
		icon: '👨‍🏫',
		desc: 'Get individual attention for both verbal and quantitative sections, customized according to your needs and progress.',
	},
	{
		title: 'Bumper Score Booster',
		subtitle: 'Maximum Improvement',
		icon: '🚀',
		desc: 'Accelerate your performance with strategic revision sessions, advanced practice, and last-mile tips for score maximization.',
	},
	{
		title: 'Profile Building',
		subtitle: 'Stand Out Globally',
		icon: '🗂️',
		desc: 'Strategically craft your academic, extracurricular, and leadership narrative for a compelling college application.',
	},
	{
		title: 'College Admission Assistance',
		subtitle: 'Guided Admissions',
		icon: '🎯',
		desc: 'Expert support from shortlist to application, essays, interview prep, scholarship, and final admit—every step handled.',
	},
];

const USP = () => (
	<section className="bg-w1 py-14 px-2 sm:px-4 md:px-8" id="usp">
		<div className="text-center mb-8">
			<h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-g1 mb-2">
				Our Unique Strengths
			</h2>
			<p className="text-g2 text-sm sm:text-base max-w-xl mx-auto">
				From assessment to admission—Mentor Krish’s approach ensures every student
				has an edge.
			</p>
		</div>

		{/* Responsive, multi-column, clean grid */}
		<div className="grid px-2 grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-5 md:gap-7 max-w-7xl mx-auto">
			{uspData.map((usp, idx) => (
				<motion.div
					key={idx}
					className="bg-w2 rounded-2xl shadow-md hover:shadow-xl border border-w1 p-3 sm:p-4 flex flex-col items-center text-center transition-all duration-200"
					initial={{ opacity: 0, y: 30 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ delay: idx * 0.08, duration: 0.5 }}
				>
					<div className="text-xl sm:text-2xl mb-2">{usp.icon}</div>
					<h3 className="font-semibold text-sm sm:text-base text-g1 mb-1">
						{usp.title}
					</h3>
					<p className="text-g2 text-xs sm:text-xs mb-1 italic font-medium">
						{usp.subtitle}
					</p>
					<p className="text-g1 text-xs sm:text-xs">{usp.desc}</p>
				</motion.div>
			))}
		</div>
	</section>
);

export default USP;

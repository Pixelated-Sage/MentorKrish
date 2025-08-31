import React from "react";
import { motion } from "framer-motion";

const roadmapItems = [
	{
		title: "Diagnostic Assessment",
		icon: "diagnostic.svg",
		description:
			"We begin with a comprehensive diagnostic test to identify each student’s current proficiency level and pinpoint strengths and areas of improvement.",
	},
	{
		title: "In-Depth Performance Analysis",
		icon: "brain.svg",
		description:
			"Our experts analyze the diagnostic results to create a detailed learning profile. Weak areas are mapped, and a personalized action plan is created.",
	},
	{
		title: "Customized Learning Plan",
		icon: "book.svg",
		description:
			"We design bespoke classes tailored to the unique needs of each student. Every session is focused on targeted improvement and measurable progress.",
	},
	{
		title: "Access to DSAT Platform",
		icon: "laptop.svg",
		description:
			"Each student gets access to our exclusive DSAT platform, offering thousands of SAT-style practice questions that closely simulate actual College Board tests.",
	},
	{
		title: "Data-Driven Feedback Loop",
		icon: "chart.svg",
		description:
			"Student performance is monitored through real-time data. Feedback is provided to both teachers and students for continuous refinement and faster progress.",
	},
	{
		title: "Continuous Reinforcement",
		icon: "repeat.svg",
		description:
			"This cycle of learning, practicing, reviewing, and improving continues until the student achieves mastery in every topic.",
	},
	{
		title: "Sectional Tests (After 25% Course Completion)",
		icon: "test.svg",
		description:
			"Once a quarter of the course is completed, we introduce sectional tests to evaluate students on broader topics and ensure deeper understanding.",
	},
	{
		title: "Full-Length Mock Test Series",
		icon: "mocktest.svg",
		description:
			"Upon course completion, students undertake our flagship Mock Test Series, renowned for being precise simulations of the real SAT.",
	},
	{
		title: "Profile Building & Career Mapping",
		icon: "profile.svg",
		description:
			"We assist students in building strong academic and extracurricular profiles. Our psychometric testing tools help students in matching their passions, aptitude, and interests to ideal career paths.",
	},
	{
		title: "Career and College Counseling",
		icon: "counseling.svg",
		description:
			"Through in-depth mentoring, we guide students in selecting the right courses, colleges, and countries—factoring in their academic potential, financial situation, and personal preferences.",
	},
	{
		title: "Guaranteed University Admissions & Financial Aid Support",
		icon: "university.svg",
		description:
			"We ensure admissions to top universities worldwide and support students in securing scholarships and financial aid packages.",
	},
	{
		title: "IELTS & TOEFL Preparation",
		icon: "globe.svg",
		description:
			"Our expert-led training for Reading, Writing, Listening, and Speaking ensures students excel in IELTS and TOEFL. Our students consistently score well above the average.",
	},
];

const fadeUp = {
	hidden: { opacity: 0, y: 50 },
	visible: (i = 0) => ({
		opacity: 1,
		y: 0,
		transition: { delay: i * 0.08, duration: 0.7, type: "spring", stiffness: 80 },
	}),
};

const chevron = "M25,0 L75,0 Q92,20 75,40 L25,40 Q8,20 25,0 Z"; // SVG shape

const Roadmap = () => {
	return (
		<section className="bg-white py-20 px-2 sm:px-8 md:px-16" id="roadmap">
			<div className="max-w-4xl mx-auto flex flex-col items-center">
				<h2 className="text-3xl md:text-4xl font-extrabold text-primary mb-14 text-center">
					Our Proven Path to Student Success
				</h2>

				<div className="relative w-full flex flex-col items-center">
					{/* Vertical timeline line */}
					<div
						className="hidden sm:block absolute left-1/2 top-0 h-full border-r-2 border-dotted border-gray-300 z-0"
						style={{ transform: "translateX(-50%)" }}
					/>

					<ul className="space-y-10 w-full">
						{roadmapItems.map((step, i) => {
							const isEven = i % 2 === 0;

							return (
								<motion.li
									key={i}
									custom={i}
									initial="hidden"
									whileInView="visible"
									viewport={{ once: true }}
									variants={fadeUp}
									className={`relative z-10 w-full flex flex-col sm:flex-row ${
										isEven ? "sm:flex-row-reverse" : "sm:flex-row"
									} items-center`}
								>
									{/* Icon bullet above card */}
									<div
										className={`flex flex-col items-center sm:items-center w-full sm:w-1/6 min-w-[72px] mx-auto`}
									>
										{/* Icon as bullet */}
										<div className="mb-4 flex justify-center w-full">
											<div className="flex items-center justify-center w-14 h-14 rounded-full bg-red-600 shadow-lg select-none">
												<img
													src={`/assets/icons/roadmap-home/${step.icon}`}
													alt={`${step.title} icon`}
													className="w-8 h-8 md:w-12 md:h-12"
													loading="lazy"
												/>
											</div>
										</div>

										{/* Large chevron below icon */}
										<svg
											width={120}
											height={44}
											viewBox="0 0 100 40"
											className={`mx-auto ${isEven ? "sm:rotate-0" : "sm:rotate-180"}`}
											aria-hidden="true"
										>
											<path
												d={chevron}
												fill="#dc2626"
												fillOpacity={isEven ? 0.12 : 0.2}
											/>
										</svg>

										{/* Vertical connecting line if NOT last item */}
										{i !== roadmapItems.length - 1 && (
											<div className="hidden sm:block h-12 w-1 bg-gray-300 opacity-40 rounded mt-2" />
										)}
									</div>

									{/* Card Content */}
									<div
										className={`w-full sm:w-5/6 bg-white border-l-4 border-red-600 rounded-3xl shadow p-6 max-w-lg ${
											isEven ? "sm:mr-16" : "sm:ml-16"
										}`}
									>
										<h3 className="text-xl font-bold text-gray-900 mb-2">
											<span className="hidden sm:inline mr-3 font-extrabold text-red-600">
												{i + 1}.
											</span>
											{step.title}
										</h3>
										<p className="text-gray-700 leading-relaxed">
											{step.description}
										</p>
									</div>
								</motion.li>
							);
						})}
					</ul>
				</div>
			</div>
		</section>
	);
};

export default Roadmap;

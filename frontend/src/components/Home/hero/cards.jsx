import React from 'react';
import { analytics, logEvent, db, addDoc, collection, serverTimestamp } from "../../../lib/firebase"; // Adjust path if needed
import { useRouter } from 'next/router';

const cardData = [
	{
		title: "Integrated Courses",
		subtitle: "Your Gateway to Global Education",
		tagline: "IELTS • SAT • PSAT • ACT • TOEFL",
		description: "Comprehensive test preparation programs designed to unlock opportunities at world-class universities and institutions.",
		button: {
			label: "Book Consultation",
			link: "/trial"
		},
		contact: {
			phone: "+91-9999999999",
			website: "www.mentorkrish.com"
		},
		image: "/assets/img/integrated.jpg", // <-- Add image for all cards
		icon: ""
	},
	{
		title: "Profile & Placement",
		subtitle: "Strategic Career Development",
		tagline: "Build • Guide • Place",
		description: "End-to-end career counseling with personalized profile building and comprehensive placement support for global opportunities.",
		button: {
			label: "Get Expert Guidance",
			link: "/contact"
		},
		image: "/assets/img/profile.jpg", // <-- Add image for all cards
		icon: ""
	},
	{
		title: "Career Discovery",
		subtitle: "Find Your True Calling",
		tagline: "75% are in the wrong profession",
		description: "Join the 6.3% who are confident about their career path. Take our scientifically-designed career assessment test.",
		button: {
			label: "Discover Your Path",
			link: "/register"
		},
		stats: "93.7% students need career clarity",
		image: "/assets/img/career.jpg", // <-- Add image for all cards
		icon: ""
	},
	{
		title: "DSAT Platform",
		subtitle: "Digital SAT Excellence",
		tagline: "Practice • Perfect • Perform",
		image: "/assets/img/dsat.jpg",
		description: "Experience authentic SAT preparation with our advanced digital platform featuring real-time analytics and adaptive learning.",
		button: {
			label: "Start Free Trial",
			link: "/trial"
		},
		icon: ""
	}
];

const CardRevealSection = () => {
	const router = useRouter();

	// Unified click handler for all card buttons
	const handleCardButtonClick = async (card, index) => {
		// Analytics event for Google
		if (analytics) {
			logEvent(analytics, "card_button_click", {
				card_title: card.title,
				button_label: card.button.label,
				location: "home_cards",
			});
		}

		// Firestore event for advanced analytics
		if (db) {
			try {
				await addDoc(collection(db, "user_events"), {
					event: "card_button_click",
					card_title: card.title,
					button_label: card.button.label,
					card_index: index,
					location: "home_cards",
					user: typeof window !== "undefined" ? localStorage.getItem("userEmail") || "guest" : "server",
					timestamp: serverTimestamp(),
					path: typeof window !== "undefined" ? window.location.pathname : "server",
				});
			} catch (e) {
				console.error("Failed to log card event to Firestore", e);
			}
		}

		// Navigate to button link
		router.push(card.button.link);
	};

	return (
		<section className="relative -mt-[13rem] bg-transparent pb-32 pt-16 z-10" id="cards">
			<div className="max-w-8xl mx-auto flex flex-wrap justify-center items-stretch gap-6 md:gap-8 px-4 sm:px-6 lg:px-0">
				{cardData.map((card, index) => (
					<div
						key={index}
						className="bg-r1 text-w1 rounded-3xl shadow-2xl p-4 md:p-5 w-full max-w-sm mx-auto lg:mx-0 lg:w-2/6 xl:w-1/5 min-h-[300px] flex flex-col justify-between hover:scale-[1.05] hover:shadow-3xl transition-all duration-300 ease-in-out border border-white/10"
					>
						{/* Image at the top for all cards */}
						{card.image && (
							<div className="mb-3">
								<img
									src={card.image}
									alt={card.title}
									className="w-full h-24 object-cover rounded-xl shadow-lg border border-white/20"
								/>
							</div>
						)}
						{/* Header Section */}
						<div className="space-y-2 mb-4">
							<div className="flex items-center space-x-2">
								<h2 className="text-lg md:text-xl font-bold tracking-tight leading-tight">
									{card.title}
								</h2>
							</div>
							<h3 className="text-xs font-semibold text-accent leading-snug">
								{card.subtitle}
							</h3>
							<div className="inline-block">
								<span className="text-xs font-medium text-w2 bg-white/10 px-2 py-1 rounded-full backdrop-blur-sm border border-white/20">
									{card.tagline}
								</span>
							</div>
							<p className="text-xs text-w1/90 leading-relaxed font-light">
								{card.description}
							</p>
							{card.stats && (
								<div className="bg-white/10 rounded-lg p-2 border border-white/20">
									<p className="text-xs font-medium text-accent text-center">
										📊 {card.stats}
									</p>
								</div>
							)}
						</div>
						{/* Footer Section */}
						<div className="space-y-2">
							<button
								type="button"
								className="block w-full bg-accent text-black font-bold py-2 px-4 rounded-xl hover:bg-w1 hover:scale-[1.02] transition-all duration-200 ease-in-out text-center shadow-lg hover:shadow-xl border-2 border-transparent hover:border-accent text-xs sm:text-sm"
								onClick={() => handleCardButtonClick(card, index)}
							>
								{card.button.label}
							</button>

						</div>
					</div>
				))}
			</div>
		</section>
	);
};

export default CardRevealSection;

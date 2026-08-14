import React from "react";
import { analytics, logEvent, db, addDoc, collection, serverTimestamp } from "../../../lib/firebase";
import { useRouter } from "next/router";
import { BookOpen, UserCheck, Compass, Monitor } from "lucide-react";

const cardData = [
  {
    title: "Integrated Test Prep",
    subtitle: "Gateway to Overseas Universities",
    tagline: "IELTS • SAT • PSAT • ACT • TOEFL",
    description: "Structured test preparation programs designed to unlock admissions at leading international universities.",
    button: {
      label: "Explore Courses",
      link: "/courses",
    },
    image: "/assets/img/courses.jpg",
    icon: <BookOpen size={20} className="text-red-700" />,
  },
  {
    title: "Profile & Counseling",
    subtitle: "Strategic Career Guidance",
    tagline: "Build • Guide • Admit",
    description: "End-to-end career counseling with personalized profile building and university application mentoring.",
    button: {
      label: "Schedule Consultation",
      link: "/contact",
    },
    image: "/assets/img/career.jpg",
    icon: <UserCheck size={20} className="text-red-700" />,
  },
  {
    title: "Career Discovery",
    subtitle: "Psychometric Assessment",
    tagline: "Scientific Stream Selection",
    description: "Discover your cognitive strengths and ideal career pathways through standardized aptitude testing.",
    button: {
      label: "Take Assessment",
      link: "/trial",
    },
    image: "/assets/img/discovery.jpg",
    icon: <Compass size={20} className="text-red-700" />,
  },
  {
    title: "DSAT Platform",
    subtitle: "Digital SAT Diagnostic Suite",
    tagline: "Practice • Perform • Excel",
    description: "Experience authentic Digital SAT practice with real-interface adaptive testing and diagnostic analytics.",
    button: {
      label: "Access DSAT Prep",
      link: "https://prepsmart.mentorkrish.in/",
    },
    image: "/assets/img/platform.jpg",
    icon: <Monitor size={20} className="text-red-700" />,
  },
];

const CardRevealSection = () => {
  const router = useRouter();

  const handleCardButtonClick = async (card, index) => {
    if (analytics) {
      logEvent(analytics, "card_button_click", {
        card_title: card.title,
        button_label: card.button.label,
        location: "home_cards",
      });
    }

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

    if (card.button.link.startsWith("http")) {
      window.open(card.button.link, "_blank");
    } else {
      router.push(card.button.link);
    }
  };

  return (
    <section className="relative -mt-36 pb-20 pt-8 z-10" id="cards">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {cardData.map((card, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-6 shadow-md border border-slate-200 flex flex-col justify-between hover:shadow-lg transition-all duration-200"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="p-2.5 bg-slate-100 rounded-xl border border-slate-200">
                    {card.icon}
                  </span>
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500 bg-slate-100 px-2.5 py-1 rounded">
                    {card.tagline}
                  </span>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-slate-900 leading-snug">
                    {card.title}
                  </h3>
                  <p className="text-xs font-semibold text-red-700 mt-0.5">
                    {card.subtitle}
                  </p>
                </div>

                <p className="text-slate-600 text-xs leading-relaxed">
                  {card.description}
                </p>
              </div>

              <div className="pt-6">
                <button
                  type="button"
                  className="w-full bg-slate-900 hover:bg-red-700 text-white font-bold py-2.5 px-4 rounded-lg transition-colors text-xs uppercase tracking-wider text-center"
                  onClick={() => handleCardButtonClick(card, index)}
                >
                  {card.button.label}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CardRevealSection;

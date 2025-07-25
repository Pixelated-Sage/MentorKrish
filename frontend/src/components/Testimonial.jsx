import { useRef, useEffect, useState } from "react";

const testimonials = [
  {
    id: 1,
    name: "Sarah Chen",
    role: "Senior Software Engineer",
    company: "Meta",
    image: "https://images.unsplash.com/photo-1494790108755-2616b332c5cd?w=150&h=150&fit=crop&crop=face",
    quote: "Super60 transformed my career trajectory. The community's focus on real-world projects and mentorship helped me land my dream role at Meta. The professional network I built here is invaluable.",
    rating: 5,
    project: "AI-Powered Analytics Dashboard"
  },
  {
    id: 2,
    name: "Marcus Rodriguez",
    role: "Product Manager",
    company: "Google",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    quote: "The caliber of professionals in Super60 is exceptional. Working alongside industry leaders on challenging projects accelerated my growth exponentially. It's not just a community—it's a career catalyst.",
    rating: 5,
    project: "Enterprise SaaS Platform"
  },
  {
    id: 3,
    name: "Priya Sharma",
    role: "Lead Designer",
    company: "Adobe",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    quote: "Super60's emphasis on excellence and innovation pushed me beyond my comfort zone. The collaborative environment and high standards helped me secure my leadership position at Adobe.",
    rating: 5,
    project: "Design System Architecture"
  },
  {
    id: 4,
    name: "David Kim",
    role: "Technical Lead",
    company: "Microsoft",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    quote: "The technical depth and professional standards at Super60 are unmatched. Every project is a masterclass in engineering excellence. This community shapes industry leaders.",
    rating: 5,
    project: "Cloud Infrastructure Platform"
  },
  {
    id: 5,
    name: "Elena Volkov",
    role: "Data Scientist",
    company: "Tesla",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face",
    quote: "Super60's data-driven approach and cutting-edge projects gave me the expertise to contribute to Tesla's autonomous driving technology. The community's impact on my career is immeasurable.",
    rating: 5,
    project: "Machine Learning Pipeline"
  }
];

// Tailwind: hide scrollbar helper
const noScrollbar = `
  scrollbar-hide
  /* custom for webkit-browsers */
  [&::-webkit-scrollbar]:hidden
  [-ms-overflow-style:none]
  [scrollbar-width:none]
`;

export default function HomeTestimonial() {
  const scrollRef = useRef(null);
  const [active, setActive] = useState(0);

  // Listen to scroll and set active (center) card index
  const handleScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    const scrollLeft = el.scrollLeft;
    const cardWidth = el.offsetWidth / getCardsPerView();
    const center = Math.round(scrollLeft / cardWidth);
    setActive(center);
  };

  // How many cards per view?
  function getCardsPerView() {
    if (typeof window === "undefined") return 1;
    const width = window.innerWidth;
    if (width < 640) return 1;
    if (width < 1024) return 2;
    return 3;
  }

  // On dot click: scroll to that card (centered)
  const scrollToIdx = i => {
    const el = scrollRef.current;
    if (!el) return;
    const cardsPerView = getCardsPerView();
    const cardWidth = el.offsetWidth / cardsPerView;
    el.scrollTo({
      left: i * cardWidth,
      behavior: 'smooth'
    });
  };

  // Handle resize: update "active" to be the one most in view
  useEffect(() => {
    function handleResize() {
      handleScroll();
    }
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    // Initially center first card
    if (scrollRef.current) {
      scrollToIdx(0);
    }
  }, []);

  return (
    <section className="px-0 py-10 md:py-16 bg-w2">
      <div className="max-w-9xl mx-auto">
        <h2 className="text-center text-2xl sm:text-3xl font-bold mb-12 text-g1">
          Alumni Success Stories
        </h2>
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className={`
            flex pt-6 gap-6 md:gap-8 overflow-x-auto ${noScrollbar}
            scroll-smooth snap-x snap-mandatory pb-6
            w-full
          `}
        >
          {testimonials.map((t, i) => (
            <div
              key={t.id}
              className={`
                flex-shrink-0
                w-72 sm:w-96 lg:w-[420px]
                bg-w1/90 backdrop-blur-lg
                border border-w2
                rounded-3xl shadow-lg 
                transition-all duration-300
                hover:shadow-2xl hover:scale-[1.03]
                px-4 sm:px-8
                py-6 pb-8
                snap-center
                mx-auto
              `}
              style={{ minHeight: 420, maxWidth: "100%" }}
              tabIndex={0}
            >
              <div className="flex flex-col items-center">
                {/* Avatar Image */}
                <div className="mb-2 mt-0 relative">
                  <img
                    src={t.image}
                    alt={t.name}
                    className="rounded-full border-4 border-w1 shadow-xl mx-auto w-20 h-20 sm:w-24 sm:h-24 object-cover"
                    loading="lazy"
                  />
                  {/* Wavy orange bar at bottom */}
                  {/* <svg className="absolute bottom-[-6px] left-1/2 -translate-x-1/2 w-24 h-24" viewBox="0 100 100 200">
                    <path
                      d="M 0 18 Q 25 8 50 18 T 100 18 V 20 H 0 Z"
                      fill="var(--r1)"
                      opacity="0.25"
                    />
                  </svg> */}
                </div>
                {/* Name, role, company */}
                <h3 className="text-lg sm:text-xl font-bold text-g1">{t.name}</h3>
                <p className="text-xs sm:text-sm text-g2">{t.role} <span className="text-g1 font-semibold">@ {t.company}</span></p>

                {/* Quote */}
                <blockquote className="mt-3 text-g1 italic text-xs sm:text-base font-medium min-h-[4rem]">
                  “{t.quote}”
                </blockquote>
                {/* Rating */}
                <div className="flex justify-center mt-3">
                  {[...Array(t.rating)].map((_, j) => (
                    <svg key={j} className="w-4 h-4 sm:w-5 sm:h-5 text-accent" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  ))}
                </div>
                {/* Project badge */}
                <p className="inline-block px-4 py-1 mt-4 text-xs sm:text-sm font-medium text-black rounded-full bg-accent/20 border border-accent/40">
                  Project: {t.project}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Dots */}
        {/* <div className="flex justify-center gap-2 sm:gap-3 mt-5">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => scrollToIdx(i)}
              aria-label={`Go to testimonial ${i + 1}`}
              className={`w-2.5 h-2.5 rounded-full border border-g2 transition duration-200
                ${i === active
                  ? "bg-r1 border-r1 scale-110"
                  : "bg-w2 hover:bg-r2 hover:border-r2"
                }`}
            />
          ))}
        </div> */}
      </div>
    </section>
  );
}

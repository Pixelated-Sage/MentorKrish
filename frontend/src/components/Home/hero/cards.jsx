import React from 'react';

const cardData = [
  {
    title: "Integrated Courses",
    subtitle: "Your Gateway to Global Education",
    tagline: "IELTS • SAT • PSAT • ACT • TOEFL",
    description: "Comprehensive test preparation programs designed to unlock opportunities at world-class universities and institutions.",
    button: {
      label: "Book Consultation",
      link: "tel:+919999999999"
    },
    contact: {
      phone: "+91-9999999999",
      website: "www.mentorkrish.com"
    },
    icon: ""
  },
  {
    title: "Profile & Placement",
    subtitle: "Strategic Career Development",
    tagline: "Build • Guide • Place",
    description: "End-to-end career counseling with personalized profile building and comprehensive placement support for global opportunities.",
    button: {
      label: "Get Expert Guidance",
      link: "#"
    },
    icon: ""
  },
  {
    title: "Career Discovery",
    subtitle: "Find Your True Calling",
    tagline: "75% are in the wrong profession",
    description: "Join the 6.3% who are confident about their career path. Take our scientifically-designed career assessment test.",
    button: {
      label: "Discover Your Path",
      link: "#"
    },
    stats: "93.7% students need career clarity",
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
      link: "#"
    },
    icon: ""
  }
];

const CardRevealSection = () => {
  return (
    <section className="relative -mt-[13rem] bg-transparent pb-32 pt-16 z-10">
      <div className="w-[90%] mx-auto flex flex-wrap justify-center items-stretch gap-6 md:gap-8">
        {cardData.map((card, index) => (
          <div
            key={index}
            className="bg-r1 text-w1 rounded-3xl shadow-2xl p-4 md:p-6 w-full lg:w-2/6 xl:w-1/5 min-h-[380px] flex flex-col justify-between hover:scale-[1.05] hover:shadow-3xl transition-all duration-300 ease-in-out border border-white/10"
          >
            {/* Header Section */}
            <div className="space-y-2 mb-6">
              <div className="flex items-center space-x-2">
                <h2 className="text-xl md:text-2xl font-bold tracking-tight leading-tight">
                  {card.title}
                </h2>
              </div>
              <h3 className="text-xs md:text-sm font-semibold text-accent leading-snug">
                {card.subtitle}
              </h3>
              <div className="inline-block">
                <span className="text-xs sm:text-sm font-medium text-w2 bg-white/10 px-2 py-1 rounded-full backdrop-blur-sm border border-white/20">
                  {card.tagline}
                </span>
              </div>
              {card.image && (
                <div className="my-4">
                  <img
                    src={card.image}
                    alt={card.title}
                    className="w-full h-36 object-cover rounded-xl shadow-lg border border-white/20"
                  />
                </div>
              )}
              <p className="text-xs sm:text-sm md:text-base text-w1/90 leading-relaxed font-light">
                {card.description}
              </p>
              {card.stats && (
                <div className="bg-white/10 rounded-lg p-3 border border-white/20">
                  <p className="text-xs font-medium text-accent text-center">
                    📊 {card.stats}
                  </p>
                </div>
              )}
            </div>
            {/* Footer Section */}
            <div className="space-y-3">
              <a
                href={card.button.link}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full bg-accent text-black font-bold py-3 px-6 rounded-xl hover:bg-w1 hover:scale-[1.02] transition-all duration-200 ease-in-out text-center shadow-lg hover:shadow-xl border-2 border-transparent hover:border-accent text-sm sm:text-base"
              >
                {card.button.label}
              </a>
              {card.contact && (
                <div className="bg-white/5 rounded-lg p-3 border border-white/10">
                  <div className="flex flex-col space-y-1 text-center">
                    <p className="text-xs text-w2 flex items-center justify-center space-x-2">
                      <span>📞</span>
                      <span className="font-medium">{card.contact.phone}</span>
                    </p>
                    <p className="text-xs text-w2 flex items-center justify-center space-x-2">
                      <span>🌐</span>
                      <span className="font-medium">{card.contact.website}</span>
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CardRevealSection;

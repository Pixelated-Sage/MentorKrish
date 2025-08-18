import React from 'react';

const approachSteps = [
  {
    title: "One-on-one counseling",
    description: "Personalized sessions tailored to each student's needs and aspirations. Build trust and clarity with direct interaction. We focus on understanding goals deeply and crafting a unique plan.",
    icon: <img src="/assets/icons/users.svg" alt="" className="w-8 h-8" aria-hidden="true" />,
  },
  {
    title: "Psychometric tests",
    description: "In-depth, scientific analysis to reveal each student’s strengths, personality, and potential career directions. Our assessments use validated tools and provide actionable reports.",
    icon: <img src="/assets/icons/brain.svg" alt="" className="w-8 h-8" aria-hidden="true" />,
  },
  {
    title: "Goal and profile evaluation",
    description: "Expert review of academic and extracurricular profiles to align ambitions with achievable objectives. We consider strengths and growth areas to optimize planning.",
    icon: <img src="/assets/icons/target.svg" alt="" className="w-8 h-8" aria-hidden="true" />,
  },
  {
    title: "Personalized action plan",
    description: "Step-by-step blueprint created for progress, including timelines, milestones, and recommended resources. Stay accountable and empowered every step of the way.",
    icon: <img src="/assets/icons/list.svg" alt="" className="w-8 h-8" aria-hidden="true" />,
  },
  {
    title: "Progress tracking and support",
    description: "Ongoing check-ins, feedback, and mentorship to ensure steady advancement and agile course correction. We’re with you throughout the journey for success.",
    icon: <img src="/assets/icons/arrow-trend-up.svg" alt="" className="w-8 h-8" aria-hidden="true" />,
  },
];

const Approach = () => {
  return (
    <section className="bg-w1 py-16 px-3 sm:px-4" id="our-approach">
      <div className="max-w-7xl mx-auto w-full">
        {/* Section Heading */}
        <div className="flex items-center gap-3 mb-10 px-1 sm:px-0">
          <img src="/assets/icons/square-bullet.svg" alt="" className="h-7 w-7" aria-hidden="true" />
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-g1">
            The Mentor Krish Approach
          </h2>
        </div>

        {/* Vertical Timeline with alternating content */}
        <div className="relative px-2 sm:px-4">
          {/* Timeline line */}
          <div
            className="absolute left-[30px] sm:left-[34px] md:left-[36px] top-0 bottom-0 w-1 bg-g2/10"
            aria-hidden="true"
          />
          <ol className="list-none m-0 p-0 space-y-0">
            {approachSteps.map((step, idx) => {
              const isEven = idx % 2 === 1;
              return (
                <li
                  key={idx}
                  className={`relative flex flex-col sm:flex-row items-start gap-4 sm:gap-8 pb-10 last:pb-0 ${
                    isEven ? "sm:flex-row-reverse" : ""
                  }`}
                >
                  {/* Step icon circle */}
                  <div className="flex flex-col items-center z-10">
                    <span className="w-12 h-12 sm:w-14 sm:h-14 rounded-full border-4 border-w1 bg-r1 flex items-center justify-center text-w1 font-bold text-lg shadow-xl relative mb-4 sm:mb-0">
                      {step.icon}
                    </span>
                    {idx !== approachSteps.length - 1 && (
                      <div className="hidden sm:block flex-1 w-px bg-g2/20 h-full" />
                    )}
                  </div>

                  {/* Step content */}
                  <div
                    className={`flex-grow min-w-0 max-w-xl 
                      ${isEven ? "text-right sm:pr-7 sm:pl-0" : "text-left sm:pl-7 sm:pr-0"}
                    `}
                  >
                    <div
                      className={`flex items-baseline gap-2 sm:gap-3 mb-2 ${
                        isEven ? "justify-end" : "justify-start"
                      }`}
                    >
                      <span className="text-r1 font-bold text-base sm:text-lg">{idx + 1}.</span>
                      <span className="text-g1 font-semibold text-sm sm:text-base md:text-lg">
                        {step.title}
                      </span>
                    </div>
                    <p className="text-g2 text-xs sm:text-sm md:text-base leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </li>
              );
            })}


          </ol>
        </div>
      </div>
    </section>
  );
};

export default Approach;

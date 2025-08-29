import React from 'react';

const whyPoints = [
  {
    icon: <img src="/assets/icons/compass.svg" alt="" className="w-8 h-8 sm:w-9 sm:h-9 mb-2" aria-hidden="true" />,
    title: "Discover Strengths & Interests",
    detail: "Uncover your authentic talents with in-depth profile analysis and expert guidance.",
    helper: "Build a career on what you love & excel at.",
  },
  {
    icon: <img src="/assets/icons/target.svg" alt="" className="w-8 h-8 sm:w-9 sm:h-9 mb-2" aria-hidden="true" />,
    title: "Match Skills to Opportunities",
    detail: "Bridge academic and personal skillsets to matching careers and fields of growth.",
    helper: "See future options aligned to your natural abilities.",
  },
  {
    icon: <img src="/assets/icons/decision1.svg" alt="" className="w-10 h-10  sm:w-12 sm:h-12 mb-2" aria-hidden="true" />,
    title: "Informed Decisions, No Guesswork",
    detail: "Structured reports and consultations provide absolute clarity and direction.",
    helper: "Make choices backed by data, not chance.",
  },
  {
    icon: <img src="/assets/icons/shield.svg" alt="" className="w-8 h-8 sm:w-9 sm:h-9 mb-2" aria-hidden="true" />,
    title: "Avoid Mistakes & Anxiety",
    detail: "Get objective advice to sidestep costly detours and academic stress.",
    helper: "Start ahead, stay ahead in your academic journey.",
  }
];

const Counselings = () => {
  return (
    <section className="relative bg-w1 py-12 sm:py-16 px-4 sm:px-6 lg:px-8" id="why-career-counselling">
      <div className="mx-auto max-w-7xl w-full">
        <div className="mb-10 sm:mb-12 text-center">
          <div className="flex items-center gap-2 sm:gap-3 justify-center mb-2">
            <img src="/assets/icons/square-bullet.svg" alt="" className="h-6 w-6 sm:h-7 sm:w-7" />
            <h2 className="text-lg sm:text-2xl md:text-3xl font-bold text-g1">
              Why Career Counseling?
            </h2>
          </div>
          <div className="w-16 sm:w-20 h-1 bg-r1 rounded-full mx-auto mb-3 sm:mb-4" />
          <p className="text-g2 max-w-xl sm:max-w-2xl mx-auto text-xs sm:text-sm md:text-base leading-relaxed">
            Make the smartest investment in your future with Mentor Krish—trust, clarity, and success in every step.
          </p>
        </div>
        <div className="
          grid
          gap-5 sm:gap-6
          grid-cols-1
          sm:grid-cols-2
          lg:grid-cols-4
        ">
          {whyPoints.map((item, i) => (
            <div
              key={i}
              className="
                bg-w2 rounded-2xl sm:rounded-3xl border border-g2/30
                shadow-sm hover:shadow-lg transition group flex flex-col items-center
                py-6 sm:py-7 px-4 sm:px-5 xl:px-6
                w-full
              "
              style={{
                boxShadow: "0 2px 18px 0 rgba(30,41,59,0.05)",
                borderTop: "3px solid var(--r1)"
              }}
            >
              <div
                className="rounded-full flex items-center justify-center mb-3"
                style={{ width: 52, height: 52 }}
              >
                {item.icon}
              </div>
              <h3 className="text-g1 text-sm sm:text-base md:text-lg font-bold mb-1 text-center leading-snug">{item.title}</h3>
              <div className="h-1 w-8 sm:w-10 bg-r1/70 rounded-full mb-2 sm:mb-3" />
              <p className="text-g2 text-xs sm:text-sm mb-2 text-center leading-relaxed">{item.detail}</p>
              <div className="text-[11px] sm:text-xs text-g2/70 font-medium text-center">{item.helper}</div>
              <span className="block w-7 sm:w-9 h-1 bg-g2/10 rounded-full mt-5 sm:mt-6" />
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-10 sm:mt-12 text-center max-w-4xl mx-auto">
          <div>
            <div className="text-lg sm:text-xl md:text-2xl font-bold text-g1">500+</div>
            <div className="text-g2 text-xs sm:text-sm md:text-base">Students Guided to Success</div>
          </div>
          <div>
            <div className="text-lg sm:text-xl md:text-2xl font-bold text-g1">20+ Years</div>
            <div className="text-g2 text-xs sm:text-sm md:text-base">Combined Expert Experience</div>
          </div>
          <div>
            <div className="text-lg sm:text-xl md:text-2xl font-bold text-g1">98%</div>
            <div className="text-g2 text-xs sm:text-sm md:text-base">Satisfaction & Recommendation</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Counselings;

import React from "react";

const whyPoints = [
  {
    icon: (
      <img
        src="/assets/icons/compass.svg"
        alt=""
        className="w-9 h-9 mb-2"
        aria-hidden="true"
      />
    ),
    title: "Identifies Strengths & Personality",
    detail: "Deep assessments uncover natural aptitudes, learning style, and unique personality traits.",
    helper: "Reveals potential for academic and career match.",
  },
  {
    icon: (
      <img
        src="/assets/icons/target.svg"
        alt=""
        className="w-9 h-9 mb-2"
        aria-hidden="true"
      />
    ),
    title: "Scientific, Unbiased Guidance",
    detail: "Validated tools and expert interpretation ensure every recommendation is data-backed.",
    helper: "No more guesswork in planning your future.",
  },
  {
    icon: (
      <img
        src="/assets/icons/decision.svg"
        alt=""
        className="w-12 h-12 mb-2"
        aria-hidden="true"
      />
    ),
    title: "Clarity in Decisions, Less Stress",
    detail: "Feel empowered to make choices—psychometric insights remove confusion and anxiety.",
    helper: "Helps you confidently select your next step.",
  },
  {
    icon: (
      <img
        src="/assets/icons/globe.svg"
        alt=""
        className="w-12 h-12 mb-2"
        aria-hidden="true"
      />
    ),
    title: "Trusted Worldwide by Institutions",
    detail: "Our assessments are benchmarked and adopted across top corporates and premier universities.",
    helper: "Recognized and valued globally.",
  },
];

const Why_psychometric = () => {
  return (
    <section className="relative bg-w1 py-16 px-2 sm:px-4" id= "why-testing">
      <div className="mx-auto max-w-7xl w-full">
        {/* Heading */}
        <div className="mb-12 text-center px-2 sm:px-0">
          <div className="flex items-center gap-3 justify-center mb-2">
            <img src="/assets/icons/square-bullet.svg" alt="" className="h-7 w-7" />
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-g1">
              Why Psychometric Testing?
            </h2>
          </div>
          <div className="w-20 h-1 bg-r1 rounded-full mx-auto mb-4" />
          <p className="text-g2 max-w-2xl mx-auto text-sm md:text-base">
            Transformative guidance starts with reliable, objective psychometric testing. Here’s why thousands trust Mentor Krish for clarity and confidence:
          </p>
        </div>

        {/* Card Grid */}
        <div className="
          grid
          gap-6
          grid-cols-1
          sm:grid-cols-2
          lg:grid-cols-4
          max-w-7xl
          mx-auto
        ">
          {whyPoints.map((item, i) => (
            <div
              key={i}
              className="
                bg-w2 rounded-3xl border border-g2/40
                shadow-sm hover:shadow-lg transition group flex flex-col items-center
                py-7 px-4 sm:px-5 xl:px-6
                relative
                w-full
                max-w-full
              "
              style={{
                boxShadow: "0 2px 24px 0 rgba(30,41,59,0.06)",
                borderTop: "4px solid var(--r1)"
              }}
            >
              <div
                className="rounded-full  flex items-center justify-center mb-3"
                style={{ width: 56, height: 56 }}
              >
                {item.icon}
              </div>
              <h3 className="text-g1 text-base sm:text-lg font-bold mb-1 text-center">{item.title}</h3>
              <div className="h-1 w-10 bg-r1/70 rounded-full mb-3" />
              <p className="text-g2 text-xs sm:text-sm mb-2 text-center">{item.detail}</p>
              <div className="text-xs text-g2/70 font-medium text-center">{item.helper}</div>
              <span className="block w-9 h-1 bg-g2/10 rounded-full mt-6 mb-0" />
            </div>
          ))}
        </div>

        {/* Trust signals below cards */}
        {/* <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-12 text-center max-w-7xl mx-auto px-2">
          <div>
            <div className="text-lg sm:text-2xl font-bold text-g1">1000+</div>
            <div className="text-g2 text-xs sm:text-sm">Tests Successfully Completed</div>
          </div>
          <div>
            <div className="text-lg sm:text-2xl font-bold text-g1">15+ Years</div>
            <div className="text-g2 text-xs sm:text-sm">Assessment Expertise</div>
          </div>
          <div>
            <div className="text-lg sm:text-2xl font-bold text-g1">Global</div>
            <div className="text-g2 text-xs sm:text-sm">Recognition & Validation</div>
          </div>
        </div> */}
      </div>
    </section>
  );
};

export default Why_psychometric;

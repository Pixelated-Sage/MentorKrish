import React from "react";

const CTA = () => {
  return (
    <section className="bg-w1 py-12 px-2 sm:px-4" >
      <div className="max-w-7xl mx-auto w-full flex flex-col items-center">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-g1 mb-4 text-center">
          Ready to unlock your strengths?
        </h2>
        <a
          href="/trial"
          className="
            bg-r1 text-w1
            text-base sm:text-lg font-semibold
            px-6 sm:px-10 py-3 sm:py-4
            rounded-full shadow-lg
            hover:bg-r2 focus:outline-none
            focus:ring-2 focus:ring-r1 focus:ring-offset-2
            transition
            w-full max-w-sm sm:max-w-md text-center
          "
        >
          Book Your Psychometric Test
        </a>
        <p className="text-g2 mt-4 text-center text-sm max-w-xl px-2">
          Get a science-backed assessment and personal guidance to start your journey with confidence.
        </p>
      </div>
    </section>
  );
};

export default CTA;

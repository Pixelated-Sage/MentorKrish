import React from "react";

const Hero = () => (
  <section className="relative min-h-[40vh] sm:min-h-[54vh] flex flex-col justify-center items-center bg-w2 pt-20 pb-10 overflow-hidden">
    {/* Subtle CSS grid background */}
    <div
      className="absolute inset-0 z-0 pointer-events-none"
      style={{
        backgroundImage: `
          linear-gradient(to right, rgba(200,200,200,0.15) 1px, transparent 2px),
          linear-gradient(to bottom, rgba(200,200,200,0.15) 1px, transparent 2px)
        `,
        backgroundSize: "30px 30px",
      }}
      aria-hidden="true"
    />
    {/* Main content */}
    <div className="relative z-10 flex flex-col items-center text-center px-3 sm:px-0">
      <h1 className="text-3xl md:text-5xl font-extrabold mb-3 text-g1">
        Unlock Your Future:
        <br />
        <span className="text-r1">Explore Our Top Courses</span>
      </h1>
      <p className="text-g2 text-base sm:text-lg mb-6 max-w-xl leading-snug">
        Choose from industry-leading programs—SAT, PSAT, ACT, IELTS, TOEFL, and more. Each course is powered by expert guidance, real-world practice, and a proven system for your academic dreams.
      </p>

    </div>
  </section>
);

export default Hero;

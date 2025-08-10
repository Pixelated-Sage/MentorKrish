import React from 'react'

const Hero = () => {
  return (
      <section className="relative min-h-[38vh] sm:min-h-[44vh] flex flex-col justify-center items-center bg-w2 pt-20 pb-12 overflow-hidden">
        <div className="absolute inset-0 z-0 pointer-events-none" style={{
          backgroundImage: `
            linear-gradient(to right, rgba(200,200,200,0.14) 1px, transparent 2px),
            linear-gradient(to bottom, rgba(200,200,200,0.14) 1px, transparent 2px)
          `,
          backgroundSize: "34px 34px",
        }} aria-hidden="true" />
        <div className="relative z-10 flex flex-col items-center text-center px-3 sm:px-0">
          <h1 className="text-3xl md:text-5xl font-extrabold mb-3 text-g1">
            Career Counseling
          </h1>
          <p className="text-g2 text-base sm:text-lg mb-2 max-w-xl leading-snug">
            Expert guidance for finding your unique path and transforming ambition into reality.
          </p>
          {/* Optional: Add an SVG or illustration here if you have it */}
        </div>
      </section>
  )
}

export default Hero
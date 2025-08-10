import React from 'react'

const CTA = () => {
  return (
    <section className="bg-w1 py-12 flex justify-center items-center flex-col">
        <h2 className="text-2xl font-bold text-g1 mb-4 text-center">Ready to Plan Your Future?</h2>
        <a
          href="/trial"
          className="bg-r1 text-w1 text-lg font-semibold px-10 py-4 rounded-full shadow-lg hover:bg-r2 focus:outline-none focus:ring-2 focus:ring-r1 focus:ring-offset-2 transition"
        >
          Book Your First Counseling Session
        </a>
        <p className="text-g2 mt-4 text-center text-sm">Get a no-obligation consultation with a certified mentor.</p>
      </section>
  )
}

export default CTA
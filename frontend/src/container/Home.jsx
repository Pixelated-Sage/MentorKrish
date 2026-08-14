import React from 'react'
import Hero from "../components/Home/hero/Hero"
import Cards from "../components/Home/hero/cards"
import Navbar from '../components/Navbar'
import ContactButton from '../components/ContactButton'
import About from '../components/Home/About'
import Announcement from '../components/Home/Announcement'
import USP from '../components/Home/USP'
import Courses from '../components/Home/Courses'
import Roadmap from '../components/Home/Roadmap'
import Gallery from '../components/Home/Gallery'
import HomeTestimonial from '../components/Home/Testimonial'
import Footer from '../components/Footer'
import Head from 'next/head'
const Home = () => {
  return (
    <div>
      <Head>
        {/* --- Usual SEO tags here --- */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Mentor Krish",
              "url": "https://mentorkrish.in",
              "logo": "https://mentorkrish.in/assets/img/logo.png", // update if needed
              "sameAs": [
                "https://www.instagram.com/mentorkrish", // add real social
                "https://www.linkedin.com/company/mentorkrish"
              ],
              "contactPoint": [
                {
                  "@type": "ContactPoint",
                  "telephone": "+91-9983322553",
                  "contactType": "customer service",
                  "areaServed": "IN"
                }
              ]
            })
          }}
        />
      </Head>
      <Navbar/>
      <ContactButton/>
        <Hero/>
        <Cards/>
        <About id = "about"/>
        <Announcement id = "announcement"/>
        <USP id = "usp"/>
        <Courses  id = "courses"/>
        <Roadmap id = "roadmap"/>
        <Gallery id = "gallery"/>
        <HomeTestimonial id = "testimonials"/>
        <Footer  id = "footer"/>
    </div>
  )
}

export default Home
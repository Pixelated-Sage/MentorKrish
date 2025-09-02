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
        <title>Mentor Krish | Trusted Mentorship & Admission Guidance</title>
        <meta name="description" content="Mentor Krish provides expert SAT/IELTS tutoring, psychometric analysis, and guaranteed university admission support. Book your consultation today!" />
        <link rel="canonical" href="https://mentorkrish.in/" />
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
        {/* <Gallery id = "gallery"/> */}
        <HomeTestimonial id = "testimonials"/>
        <Footer  id = "footer"/>
    </div>
  )
}

export default Home
import React from 'react'
import Hero from "../components/hero/Hero"
import Cards from "../components/hero/cards"
import Navbar from '@/components/Navbar'
import About from '@/components/About'
import Announcement from '@/components/Announcement'
import USP from '@/components/USP'
import Courses from '@/components/Courses'
import Roadmap from '@/components/Roadmap'
import Gallery from '@/components/Gallery'
import HomeTestimonial from '@/components/Testimonial'
import Footer from '@/components/Footer'
// import Footer from '@/components/Footer'
const Home = () => {
  return (
    <div>
      <Navbar/>
        <Hero/>
        <Cards/>
        <About/>
        <Announcement/>
        <USP/>
        <Courses/>
        <Roadmap/>
        <Gallery/>
        <HomeTestimonial/>
        <Footer/>
    </div>
  )
}

export default Home
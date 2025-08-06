import React from 'react'
import Hero from "../components/Home/hero/Hero"
import Cards from "../components/Home/hero/cards"
import Navbar from '../components/Navbar'
import About from '@/components/Home/About'
import Announcement from '@/components/Home/Announcement'
import USP from '@/components/Home/USP'
import Courses from '@/components/Home/Courses'
import Roadmap from '../components/Home/Roadmap'
import Gallery from '@/components/Home/Gallery'
import HomeTestimonial from '@/components/Home/Testimonial'
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
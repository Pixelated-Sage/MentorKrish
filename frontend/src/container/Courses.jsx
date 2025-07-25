import React from 'react'
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Hero from '@/components/Courses/Hero';
import CoursesDetails from '@/components/Courses/CoursesDetails';
const CoursesPage = () => {
  return (
    <div>
        <Navbar />
        <Hero />
        <CoursesDetails />
        <Footer/>
    </div>
  );
};

export default CoursesPage;

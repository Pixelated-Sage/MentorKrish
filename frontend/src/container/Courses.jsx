import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Hero from '../components/Courses/Hero';
import CoursesDetails from '../components/Courses/CoursesDetails';
import { useRouter } from 'next/router';
import Head from 'next/head';
const CoursesPage = () => {
  const router = useRouter();
  const { course } = router.query; // the course key from query param

  return (
    <div>
      <Head>
        <title>Courses | Mentor Krish</title>
        <meta name="description" content="Explore a wide range of academic and standardized test preparation courses offered by Mentor Krish" />
        <link rel="canonical" href="https://mentorkrish.in/courses" />
      </Head>

      <Navbar />
      <Hero />
      <CoursesDetails selectedCourseKey={course} />
      <Footer />
    </div>
  );
};

export default CoursesPage;

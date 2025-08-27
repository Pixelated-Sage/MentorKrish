import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Hero from '../components/Courses/Hero';
import CoursesDetails from '../components/Courses/CoursesDetails';
import { useRouter } from 'next/router';

const CoursesPage = () => {
  const router = useRouter();
  const { course } = router.query; // the course key from query param

  return (
    <div>
      <Navbar />
      <Hero />
      <CoursesDetails selectedCourseKey={course} />
      <Footer />
    </div>
  );
};

export default CoursesPage;

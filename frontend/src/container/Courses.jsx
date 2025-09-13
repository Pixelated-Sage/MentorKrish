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
        <title>{course.title} | Mentor Krish</title>
        <meta name="description" content={course.description} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Course",
              "name": course.title,
              "description": course.description,
              "provider": {
                "@type": "Organization",
                "name": "Mentor Krish",
                "sameAs": "https://mentorkrish.in"
              }
            })
          }}
        />
      </Head>

      <Navbar />
      <Hero />
      <CoursesDetails selectedCourseKey={course} />
      <Footer />
    </div>
  );
};

export default CoursesPage;

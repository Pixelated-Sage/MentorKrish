import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Hero from "../components/Courses/Hero";
import CoursesDetails from "../components/Courses/CoursesDetails";
import { useRouter } from "next/router";
import Head from "next/head";

const CoursesPage = () => {
  const router = useRouter();
  const { course } = router.query;

  const courseTitle = typeof course === "string" ? `${course} Program` : course?.title || "Test Prep Courses";
  const courseDesc = course?.description || "Comprehensive test preparation for SAT, PSAT, ACT, IELTS, and TOEFL with Mentor Krish.";

  return (
    <div>
      <Head>
        <title>{courseTitle} | Mentor Krish</title>
        <meta name="description" content={courseDesc} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Course",
              "name": courseTitle,
              "description": courseDesc,
              "provider": {
                "@type": "Organization",
                "name": "Mentor Krish",
                "sameAs": "https://mentorkrish.in",
              },
            }),
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

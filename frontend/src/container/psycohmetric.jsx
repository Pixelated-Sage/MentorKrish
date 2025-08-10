import Navbar from "../components/Navbar";
import Hero from "../components/psychometric/hero";
import Why_psychometric from "../components/psychometric/why_psychometric";
import WhatWeOffer from "../components/psychometric/what_we_offer";
import Testing from "../components/psychometric/testing";
import WhyChooseUs from "../components/psychometric/why"; 
import CTA from "../components/psychometric/CTA"
import Stories from "../components/psychometric/stories";
import FAQ from "../components/psychometric/FAQ";
import Footer from "../components/Footer";


const Psychometric = () => {
  return (
    <>
      <Navbar />
      <Hero/>
      <Why_psychometric/>
      <WhatWeOffer/>
      <Testing/>
      <WhyChooseUs/>
      <CTA/>
      <Stories/>
      <FAQ/>      
      <Footer />
    </>
  );
};


export default Psychometric;

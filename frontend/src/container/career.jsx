import Navbar from '../components/Navbar';
import Hero from '../components/Career/Hero';
import Counselings from '../components/Career/Counselings';
import Approach from '../components/Career/Approach';
import What_we_offer from '../components/Career/What_we_offer';
import Stories from '../components/Career/Stories';
import Faq from '../components/Career/FAQ';
import CTA from '../components/Career/CTA';
import Footer from '../components/Footer';



const fadeIn = {
  hidden: { opacity: 0, y: 32 },
  visible: (i=0) => ({ opacity: 1, y: 0, transition: { delay: i*0.1, duration: 0.7 }}),
};

const Career = () => {
  

  return (
    <>
      <Navbar />
      <Hero />
      <Counselings />
      <Approach />
      <What_we_offer />
      <Stories />
      <Faq />
      <CTA/>
      <Footer />
    </>
  );
};

export default Career;
    
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Companies from "../components/Companies";
import Features from "../components/Features";
import Collaboration from "../components/Collaboration";
import HowItWorks from "../components/HowItWorks";
import AISection from "../components/AISection";
import Security from "../components/Security";
import Testimonials from "../components/Testimonials";
import CTA from "../components/CTA";
import Footer from "../components/Footer";

const Homepage = () => {
  return (
    <>
      <Navbar />
       
      <main className="bg-[#030712] text-white overflow-hidden">

        <Hero />

        <Companies />

        <Features />

        <HowItWorks />

        <Collaboration />

        <AISection />

        <Security />

        <Testimonials />

        <CTA />

      </main>
       
      <Footer />
    </>
  );
};

export default Homepage;
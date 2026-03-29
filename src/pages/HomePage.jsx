import React from 'react';
import Hero from '../components/Hero';
import Services from '../components/Services';
import ReadyMade from '../components/ReadyMade';
import Portfolio from '../components/Portfolio';
import WhyChooseUs from '../components/WhyChooseUs';
import Pricing from '../components/Pricing';
import Testimonials from '../components/Testimonials';
import FAQ from '../components/FAQ';
import ContactSection from '../components/ContactSection';

const HomePage = () => {
  return (
    <>
      <Hero />
      <Services />
      <ReadyMade />
      <Portfolio />
      <WhyChooseUs />
      <Pricing />
      <Testimonials />
      <FAQ />
      <ContactSection />
    </>
  );
};

export default HomePage;

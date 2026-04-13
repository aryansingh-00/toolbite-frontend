import React from 'react';
import SEO from '../components/SEO';
import Hero from '../components/Hero';
import Services from '../components/Services';
import ReadyMade from '../components/ReadyMade';
import Portfolio from '../components/Portfolio';
import WhyChooseUs from '../components/WhyChooseUs';
import Pricing from '../components/Pricing';
import Testimonials from '../components/Testimonials';
import FAQ from '../components/FAQ';
import TrustSection from '../components/TrustSection';
import ProjectStrategist from '../components/ProjectStrategist';

const HomePage = () => {
  return (
    <>
      <SEO 
        title="Premium Web Design Agency & Ready-Made Templates"
        description="ToolBite helps modern brands grow with high-performance custom websites and premium landing page templates. Launch your digital presence today."
        keywords="web design agency, custom website development, premium templates, landing pages, react web development, toolbite agency"
      />
      <Hero />
      <TrustSection />
      <Services />
      <ReadyMade />
      <Portfolio />
      <WhyChooseUs />
      <Pricing />
      <Testimonials />
      <ProjectStrategist />
      <FAQ />
    </>
  );
};

export default HomePage;

import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Check } from 'lucide-react';

import SEO from '../components/SEO';
import Hero from '../components/Hero';
import Services from '../components/Services';
import ReadyMade from '../components/ReadyMade';
import WhyChooseUs from '../components/WhyChooseUs';
import Testimonials from '../components/Testimonials';
import FAQ from '../components/FAQ';
import GrowthAuditSection from '../components/GrowthAuditSection';
import TrustSection from '../components/TrustSection';
import ProjectStrategist from '../components/ProjectStrategist';
import ROICalculator from '../components/ROICalculator';
import ScrollReveal from '../components/ScrollReveal';


const PortfolioTeaser = () => {
  return (
    <section className="py-24 bg-white dark:bg-slate-950 relative overflow-hidden transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Text & CTA */}
          <div className="text-left">
            <span className="text-black font-black tracking-widest uppercase text-xs mb-4 block">Proven Excellence</span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-black mb-6 tracking-tighter leading-[1.1]">
              World-Class <br className="hidden md:block"/>
              Digital Architectures
            </h2>
            <p className="text-black/80 leading-relaxed text-lg mb-10 max-w-xl font-medium">
              We don't just build websites; we engineer digital assets that drive massive ROI. 
              Explore our full portfolio of high-performance client success stories.
            </p>
            <Link
              to="/portfolio"
              className="inline-flex items-center gap-2 px-10 py-4 rounded-full bg-black text-white font-black hover:bg-black/90 transition-all shadow-xl group hover:scale-105"
            >
              Explore All Client Projects <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Right Column: Premium Generated Colorful Illustration (No border line) */}
          <div className="relative w-full h-[400px] lg:h-[450px] overflow-hidden flex items-center justify-center group">
            <img 
              src="/images/portfolio_collaboration_color.png" 
              alt="World-Class Digital Architectures Illustration" 
              className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-700"
            />
          </div>

        </div>
      </div>
    </section>
  );
};



const HomePage = () => {
  return (
    <>
      <SEO
        title="Premium Web Design Agency & Ready-Made Templates"
        description="Elevate your brand with ToolBite, a premium digital engineering agency. We build high-performance custom websites, mobile apps, and premium landing page templates designed for maximum conversion."
        keywords="web design agency, custom website development, premium templates, landing pages, react web development, toolbite agency"
      />
      <Hero />
      <ScrollReveal><Services /></ScrollReveal>
      <ScrollReveal><ReadyMade /></ScrollReveal>
      <ScrollReveal><PortfolioTeaser /></ScrollReveal>
      <ScrollReveal><WhyChooseUs /></ScrollReveal>
      <ScrollReveal><Testimonials /></ScrollReveal>
      <ScrollReveal><TrustSection /></ScrollReveal>
      <ScrollReveal><ProjectStrategist /></ScrollReveal>
      <ScrollReveal><GrowthAuditSection /></ScrollReveal>
      <ScrollReveal><FAQ /></ScrollReveal>
    </>
  );
};

export default HomePage;

import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

import SEO from '../components/SEO';
import Hero from '../components/Hero';
import TrustedBy from '../components/premium/TrustedBy';
import FeaturesGrid from '../components/premium/FeaturesGrid';
import MetricsSection from '../components/premium/MetricsSection';
import Services from '../components/Services';
import ReadyMade from '../components/ReadyMade';
import WhyChooseUs from '../components/WhyChooseUs';
import Testimonials from '../components/Testimonials';
import FAQ from '../components/FAQ';
import GrowthAuditSection from '../components/GrowthAuditSection';
import TrustSection from '../components/TrustSection';
import ProjectStrategist from '../components/ProjectStrategist';
import ScrollReveal from '../components/ScrollReveal';

const PortfolioTeaser = () => {
  return (
    <section className="py-24 bg-background relative overflow-hidden border-t border-border">
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary/5 to-transparent pointer-events-none"></div>
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          <div className="text-left">
            <span className="text-primary font-bold tracking-widest uppercase text-xs mb-4 block">Proven Excellence</span>
            <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-6 tracking-tighter leading-[1.1]">
              World-Class <br className="hidden md:block"/>
              Digital Architectures
            </h2>
            <p className="text-secondary-text leading-relaxed text-lg mb-10 max-w-xl">
              We don't just build websites; we engineer digital assets that drive massive ROI. 
              Explore our full portfolio of high-performance client success stories.
            </p>
            <Link
              to="/portfolio"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white text-background font-medium hover:scale-105 transition-all shadow-glow-primary group"
            >
              Explore All Client Projects <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="relative w-full aspect-video rounded-3xl overflow-hidden flex items-center justify-center group border border-white/10 shadow-premium">
            <img 
              src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80" 
              alt="World-Class Digital Architectures" 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-80 mix-blend-screen"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent"></div>
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
        title="ToolBite: AI Tools, Web & App Development Agency"
        description="Build custom websites, scale with SaaS, and boost productivity with free AI tools and a smart resume builder at ToolBite. Explore our solutions today!"
        keywords="AI tools and development agency"
      />
      
      {/* New Premium Sections */}
      <Hero />
      <TrustedBy />
      <FeaturesGrid />
      <MetricsSection />

      {/* Existing Sections (will adapt to global CSS and be restyled incrementally) */}
      <ScrollReveal><Services /></ScrollReveal>
      <ScrollReveal><ReadyMade /></ScrollReveal>
      <ScrollReveal><PortfolioTeaser /></ScrollReveal>
      
      {/* Replaced WhyChooseUs & TrustSection with new FeaturesGrid & MetricsSection functionally, 
          but keeping Testimonials & FAQ */}
      <ScrollReveal><Testimonials /></ScrollReveal>
      <ScrollReveal><ProjectStrategist /></ScrollReveal>
      <ScrollReveal><GrowthAuditSection /></ScrollReveal>
      <ScrollReveal><FAQ /></ScrollReveal>
    </>
  );
};

export default HomePage;

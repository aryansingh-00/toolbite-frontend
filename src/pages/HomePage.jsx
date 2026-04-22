import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Check } from 'lucide-react';
import { motion } from 'framer-motion';
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

const PricingTeaser = () => {
  return (
    <section className="py-16 bg-slate-900 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-teal-900/20 to-slate-900/50 pointer-events-none" />
      <div className="max-w-[1000px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <span className="inline-block text-teal-400 font-semibold tracking-wide uppercase text-xs mb-3">Transparent Pricing</span>
        <h2 className="text-3xl md:text-4xl font-black text-white mb-4">Simple, Honest Plans</h2>
        <p className="text-slate-400 text-lg mb-8 max-w-2xl mx-auto">
          We believe in complete transparency. No hidden fees, no scope creep. Just premium engineering at fixed, predictable costs. 
          Discover the plan that fits your vision.
        </p>
        <Link
          to="/pricing"
          className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-teal-500 text-slate-900 font-bold hover:bg-teal-400 transition-all shadow-lg hover:shadow-teal-500/25"
        >
          View Full Pricing & Plans <ArrowRight size={18} />
        </Link>
      </div>
    </section>
  );
};

const PortfolioTeaser = () => {
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <span className="text-teal-600 font-bold tracking-widest uppercase text-xs mb-4 block">Proven Excellence</span>
        <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight">World-Class <span className="text-teal-500">Digital Architectures</span></h2>
        <p className="text-slate-600 text-lg mb-10 max-w-2xl mx-auto">
          We don't just build websites; we engineer digital assets that drive massive ROI. 
          Explore our full portfolio of high-performance client success stories.
        </p>
        <Link
          to="/portfolio"
          className="inline-flex items-center gap-2 px-10 py-4 rounded-full bg-slate-900 text-white font-bold hover:bg-teal-600 transition-all shadow-xl hover:shadow-teal-500/25"
        >
          Explore All Client Projects <ArrowRight size={20} />
        </Link>
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
      <TrustSection />
      <Services />
      <ReadyMade />
      <PortfolioTeaser />
      <WhyChooseUs />
      <PricingTeaser />
      <Testimonials />
      <ProjectStrategist />
      <GrowthAuditSection />
      <FAQ />
    </>
  );
};

export default HomePage;

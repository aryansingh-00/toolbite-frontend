 
import React from 'react';
import { motion } from 'framer-motion';
import { Code, Layout, Zap, Shield, Smartphone, PenTool, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import MagicText from './MagicText';
import TypingText from './TypingText';
import ScrollVelocityGallery from './ScrollVelocityGallery';
import { usePersona } from '../hooks/usePersona';
import MagneticButton from './MagneticButton';

const Hero = () => {
  const { persona } = usePersona();

  const getPersonaContent = () => {
    switch (persona) {
      case 'templates':
        return {
          headline: "The World's Most Powerful Templates for",
          subtext: "Deploy enterprise-grade digital foundations in days. We architect sub-second, conversion-optimized React blueprints that transform your vision into an immediate revenue engine."
        };
      case 'custom':
        return {
          headline: "Digital Engineering for Elite",
          subtext: "We dismantle legacy boundaries. Our team architects bespoke, high-performance web and mobile ecosystems for ambitious brands that demand absolute market dominance."
        };
      default:
        return {
          headline: "Digital Engineering for",
          subtext: "We architect high-performance web applications and premium mobile apps for iOS and Android that transform casual traffic into qualified revenue."
        };
    }
  };

  const content = getPersonaContent();

  return (
    <section id="home" className="relative pt-16 pb-10 lg:pt-24 lg:pb-16 overflow-hidden bg-transparent">
      {/* Refined Animated Background Blobs */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-teal-500/10 rounded-full mix-blend-screen filter blur-[150px] opacity-50 animate-blob pointer-events-none" />
      <div className="absolute top-40 left-0 w-[600px] h-[600px] bg-emerald-500/10 rounded-full mix-blend-screen filter blur-[150px] animate-blob animation-delay-2000 pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">

          {/* Left Column: Text & CTAs */}
          <div className="text-left">

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-6xl lg:text-7xl xl:text-[80px] font-extrabold tracking-tighter text-white mb-8 leading-[1.05]"
            >
              {content.headline}
              <br /> <MagicText><TypingText /></MagicText>
              <br />
              Brands
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-xl text-slate-400 mb-12 max-w-lg leading-relaxed font-medium"
            >
              {content.subtext}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row flex-wrap items-center gap-5 mb-14"
            >
              <MagneticButton strength={0.2} className="w-full sm:w-auto">
                <Link to="/start-project" className="w-full px-12 py-5 rounded-full bg-emerald-500 text-slate-950 font-black flex items-center justify-center gap-3 hover:bg-emerald-400 transition-all shadow-[0_0_30px_rgba(16,185,129,0.3)] hover:scale-105">
                  <Code size={20} />
                  Start Custom Project
                </Link>
              </MagneticButton>
              
              <MagneticButton strength={0.2} className="w-full sm:w-auto">
                <a href="/#ready-made" className="w-full px-12 py-5 rounded-full bg-white/5 text-white font-black flex items-center justify-center gap-3 hover:bg-white/10 border border-white/10 transition-all backdrop-blur-xl">
                  <Layout size={20} className="text-teal-400" />
                  Browse Templates
                </a>
              </MagneticButton>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="grid grid-cols-2 gap-y-6 gap-x-8 pt-10 border-t border-white/5"
            >
              <div className="flex items-center gap-3 text-slate-300 font-bold tracking-tight">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center flex-shrink-0">
                  <Zap size={18} className="text-amber-400" />
                </div>
                Sub-second Loading
              </div>
              <div className="flex items-center gap-3 text-slate-300 font-bold tracking-tight">
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center flex-shrink-0">
                  <Smartphone size={18} className="text-blue-400" />
                </div>
                Native & Cross-Platform
              </div>
              <div className="flex items-center gap-3 text-slate-300 font-bold tracking-tight">
                <div className="w-10 h-10 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center flex-shrink-0">
                  <PenTool size={18} className="text-rose-400" />
                </div>
                Conversion Optimized
              </div>
              <div className="flex items-center gap-3 text-slate-300 font-bold tracking-tight">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center flex-shrink-0">
                  <Shield size={18} className="text-emerald-400" />
                </div>
                Enterprise Security
              </div>
            </motion.div>
          </div>

          {/* Right Column: Scroll Velocity 3D Gallery */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative h-[850px] w-full mt-12 lg:mt-0 hidden lg:block xl:h-[900px]"
          >
            {/* Gallery container with soft edge fade effect to blend seamlessly into background */}
            <div 
              className="absolute inset-0 rounded-[2.5rem] overflow-hidden"
              style={{
                WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 10%, black 90%, transparent), linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
                WebkitMaskComposite: 'source-in',
                maskImage: 'linear-gradient(to bottom, transparent, black 10%, black 90%, transparent), linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
                maskComposite: 'intersect',
              }}
            >
              <ScrollVelocityGallery />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;


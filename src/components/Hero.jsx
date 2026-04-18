 
import React from 'react';
import { motion } from 'framer-motion';
import { Code, Layout, Zap, Shield, Smartphone, PenTool, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import MagicText from './MagicText';
import TypingText from './TypingText';
import ScrollVelocityGallery from './ScrollVelocityGallery';

const Hero = () => {
  return (
    <section id="home" className="relative pt-16 pb-10 lg:pt-24 lg:pb-16 overflow-hidden bg-[#fafafa]">
      {/* Animated Background Blobs */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-teal-200/40 rounded-full mix-blend-multiply filter blur-[120px] opacity-70 animate-blob pointer-events-none" />
      <div className="absolute top-40 left-0 w-[600px] h-[600px] bg-emerald-200/40 rounded-full mix-blend-multiply filter blur-[120px] animate-blob animation-delay-2000 pointer-events-none" />
      <div className="absolute -bottom-20 left-1/3 w-[800px] h-[800px] bg-blue-200/30 rounded-full mix-blend-multiply filter blur-[100px] animate-blob animation-delay-4000 pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">

          {/* Left Column: Text & CTAs */}
          <div className="text-left">

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-6xl lg:text-7xl xl:text-[80px] font-extrabold tracking-tighter text-slate-900 mb-8 leading-[1.05]"
            >
              Digital Engineering for
              <br /> <MagicText><TypingText /></MagicText>
              <br />
              Brands
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-xl text-slate-600 mb-12 max-w-lg leading-relaxed font-medium"
            >
              We architect high-performance web applications and premium mobile apps for iOS and Android that transform casual traffic into qualified revenue.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row flex-wrap items-center gap-5 mb-14"
            >
              <Link to="/start-project" className="w-full sm:w-auto px-8 py-4 rounded-full bg-slate-900 text-white font-bold flex items-center justify-center gap-3 hover:bg-teal-600 transition-all shadow-glow-slate hover:shadow-glow transform hover:-translate-y-1">
                <Code size={20} />
                Start Custom Project
              </Link>
              <a href="/#ready-made" className="w-full sm:w-auto px-8 py-4 rounded-full bg-white text-slate-900 font-bold flex items-center justify-center gap-3 hover:bg-slate-50 border border-slate-200 transition-all shadow-sm hover:shadow-md transform hover:-translate-y-1">
                <Layout size={20} className="text-teal-500" />
                Browse Premium Vault
              </a>
              <a href="/#contact" className="w-full sm:w-auto flex items-center justify-center gap-2 font-bold text-slate-600 hover:text-teal-600 transition-colors mt-4 sm:mt-0 px-4">
                Talk to an Expert <ArrowRight size={18} />
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="grid grid-cols-2 gap-y-6 gap-x-8 pt-10 border-t border-slate-200/60"
            >
              <div className="flex items-center gap-3 text-slate-800 font-bold tracking-tight">
                <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center flex-shrink-0 shadow-inner">
                  <Zap size={18} className="text-amber-600" />
                </div>
                Sub-second Loading
              </div>
              <div className="flex items-center gap-3 text-slate-800 font-bold tracking-tight">
                <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center flex-shrink-0 shadow-inner">
                  <Smartphone size={18} className="text-blue-600" />
                </div>
                Native & Cross-Platform
              </div>
              <div className="flex items-center gap-3 text-slate-800 font-bold tracking-tight">
                <div className="w-10 h-10 rounded-xl bg-rose-100 flex items-center justify-center flex-shrink-0 shadow-inner">
                  <PenTool size={18} className="text-rose-600" />
                </div>
                Conversion Optimized
              </div>
              <div className="flex items-center gap-3 text-slate-800 font-bold tracking-tight">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center flex-shrink-0 shadow-inner">
                  <Shield size={18} className="text-emerald-600" />
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


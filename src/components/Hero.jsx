 
import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Code, Layout, Zap, Shield, Smartphone, PenTool, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import MagicText from './MagicText';
import TypingText from './TypingText';
import ScrollVelocityGallery from './ScrollVelocityGallery';
import { usePersona } from '../hooks/usePersona';
import MagneticButton from './MagneticButton';

const Hero = () => {
  const { persona } = usePersona();
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 100]);
  const y2 = useTransform(scrollY, [0, 500], [0, -150]);
  const y3 = useTransform(scrollY, [0, 500], [0, 50]);

  const getPersonaContent = () => {
    switch (persona) {
      case 'templates':
        return {
          prefix: "We architect & deploy",
          typedWords: ['React blueprints', 'Next.js templates', 'conversion pages', 'web frameworks'],
          suffix: "to launch startups",
          finalWord: "instantly",
          subtext: "Deploy enterprise-grade digital foundations in days. We architect sub-second, conversion-optimized React blueprints that transform your vision into an immediate revenue engine."
        };
      case 'custom':
        return {
          prefix: "We engineer & scale",
          typedWords: ['bespoke software', 'enterprise apps', 'mobile systems', 'digital products'],
          suffix: "for ambitious brands",
          finalWord: "globally",
          subtext: "We dismantle legacy boundaries. Our team architects bespoke, high-performance web and mobile ecosystems for ambitious brands that demand absolute market dominance."
        };
      default:
        return {
          prefix: "We design & build",
          typedWords: ['websites & apps', 'digital platforms', 'e-commerce systems', 'custom software'],
          suffix: "that move brands",
          finalWord: "forward",
          subtext: "We architect high-performance web applications and premium mobile apps for iOS and Android that transform casual traffic into qualified revenue."
        };
    }
  };

  const content = getPersonaContent();

  return (
    <section 
      id="home" 
      className="relative pt-32 pb-24 lg:pt-48 lg:pb-32 overflow-hidden bg-cover bg-center text-white flex items-center min-h-screen"
      style={{ backgroundImage: "url('/images/hero-bg.jpg')" }}
    >
      {/* Bottom Gradient Fade to White */}
      <div className="absolute bottom-0 left-0 right-0 h-36 bg-gradient-to-t from-white to-transparent pointer-events-none z-10" />

      {/* Top overlay to blend navbar */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-black/40 to-transparent pointer-events-none z-10" />

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-20 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">

          {/* Left Column: Text & CTAs */}
          <div className="text-left animate-fade-in">

            {/* Pill Badge */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.05 }}
              className="inline-flex items-center gap-2.5 px-4 py-1.5 bg-[#090d16]/70 border border-white/10 rounded-full text-xs font-semibold text-slate-300 mb-6 backdrop-blur-md hover:border-indigo-500/30 transition-colors cursor-default"
            >
              <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse shadow-[0_0_8px_#818cf8]"></span>
              Now booking Q3 — 2 spots left
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-6xl lg:text-7xl xl:text-[80px] font-extrabold tracking-tighter text-white mb-8 leading-[1.05]"
            >
              {content.prefix}
              <br />
              <span className="text-[#c084fc]">
                <MagicText>
                  <TypingText words={content.typedWords} />
                </MagicText>
              </span>
              <br />
              {content.suffix}{' '}
              {content.finalWord && (
                <span className="block sm:inline">{content.finalWord}</span>
              )}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-xl text-slate-300 mb-12 max-w-lg leading-relaxed font-medium"
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
                <Link to="/start-project" className="w-full px-12 py-5 rounded-full bg-white text-slate-900 font-black flex items-center justify-center gap-3 hover:bg-slate-100 hover:text-black transition-all shadow-xl hover:scale-105">
                  <Code size={20} />
                  Claim Free System Blueprint
                </Link>
              </MagneticButton>
              
              <MagneticButton strength={0.2} className="w-full sm:w-auto">
                <a href="/#ready-made" className="w-full px-12 py-5 rounded-full bg-transparent text-white font-black flex items-center justify-center gap-3 hover:bg-white/10 border-2 border-white/20 hover:border-white transition-all">
                  <Layout size={20} className="text-slate-300" />
                  Browse Templates
                </a>
              </MagneticButton>
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


import React from 'react';
import { motion } from 'framer-motion';
import { Code, Layout } from 'lucide-react';
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
    <section id="home" className="relative pt-16 pb-0 lg:pt-24 lg:pb-0 overflow-hidden bg-transparent">
      {/* CSS Animated Gradient Mesh Background — zero JS cost, replaces Vanta.js/Three.js */}
      <div className="absolute inset-0 z-0 pointer-events-none hero-gradient-bg" aria-hidden="true" />

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">

          {/* Left Column: Text & CTAs */}
          <div className="text-left">

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-6xl lg:text-7xl xl:text-[80px] font-extrabold tracking-tighter text-black dark:text-white mb-8 leading-[1.05]"
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
              className="text-xl text-black dark:text-slate-400 mb-12 max-w-lg leading-relaxed font-medium"
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
                <Link to="/start-project" className="w-full px-12 py-5 rounded-full bg-slate-900 text-white font-black flex items-center justify-center gap-3 hover:bg-black transition-all shadow-xl hover:scale-105">
                  <Code size={20} />
                  Claim Free System Blueprint
                </Link>
              </MagneticButton>
              
              <MagneticButton strength={0.2} className="w-full sm:w-auto">
                <a href="/#ready-made" className="w-full px-12 py-5 rounded-full bg-transparent text-black font-black flex items-center justify-center gap-3 hover:bg-slate-50 border-2 border-slate-200 transition-all">
                  <Layout size={20} className="text-slate-500" />
                  Browse Templates
                </a>
              </MagneticButton>
            </motion.div>

          </div>

          {/* Right Column: Scroll Velocity Gallery */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative h-[850px] w-full mt-12 lg:mt-0 hidden lg:block xl:h-[900px]"
          >
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

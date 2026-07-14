import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section 
      id="home" 
      className="relative min-h-[100vh] flex items-center pt-24 pb-20 overflow-hidden"
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=2560&q=80" 
          alt="Professionals in a meeting" 
          className="w-full h-full object-cover object-right"
        />
        {/* Dark Gradient Overlay for text readability (stronger on left) */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-black/30 md:to-transparent z-10"></div>
        <div className="absolute inset-0 bg-black/30 z-10"></div>
      </div>

      <div className="max-w-[1400px] w-full mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
        
        <div className="flex flex-col justify-between h-full min-h-[60vh]">
          {/* Main Content (Left aligned) */}
          <div className="max-w-3xl mt-12 md:mt-24">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="text-5xl md:text-7xl lg:text-[85px] font-sans font-bold tracking-tight text-white leading-[1.05] mb-8"
            >
              Trusted engineering for sustainable <br className="hidden lg:block"/>
              <span className="text-[#c4f82a]">business growth.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
              className="text-lg md:text-xl text-gray-300 mb-10 max-w-xl leading-relaxed"
            >
              ToolBite partners with founders and executive teams to solve complex technical challenges, engineer high-performance platforms, and build digital assets that scale.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4, ease: "easeOut" }}
            >
              <Link 
                to="/contact" 
                className="inline-flex items-center gap-4 px-3 py-3 pr-8 rounded-full bg-white text-black font-bold hover:scale-105 transition-transform duration-300 group shadow-2xl"
              >
                <div className="w-10 h-10 rounded-full bg-[#c4f82a] flex items-center justify-center group-hover:rotate-45 transition-transform duration-300">
                  <ArrowRight size={18} className="text-black" />
                </div>
                <span className="text-sm tracking-wider uppercase">Get in touch</span>
              </Link>
            </motion.div>
          </div>

          {/* Trusted Logos (Bottom Right) */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="hidden md:flex justify-end items-center gap-8 mt-32 w-full"
          >
            <div className="flex items-center gap-2 opacity-70 hover:opacity-100 transition-opacity">
              <div className="w-4 h-4 bg-white transform rotate-45"></div>
              <span className="text-white font-bold text-lg">Clandestine</span>
            </div>
            <div className="flex items-center gap-2 opacity-70 hover:opacity-100 transition-opacity">
              <div className="w-4 h-4 border-2 border-white rounded-br-lg"></div>
              <span className="text-white font-bold text-lg">Command+R</span>
            </div>
            <div className="flex items-center gap-2 opacity-70 hover:opacity-100 transition-opacity">
              <div className="w-4 h-4 border-[3px] border-white rounded-full border-r-transparent"></div>
              <span className="text-white font-bold text-lg">ContrastAI</span>
            </div>
            <div className="flex items-center gap-2 opacity-70 hover:opacity-100 transition-opacity">
              <div className="w-5 h-5 flex flex-wrap gap-[2px]">
                <div className="w-[8px] h-[8px] bg-white"></div>
                <div className="w-[8px] h-[8px] bg-white"></div>
                <div className="w-[8px] h-[8px] bg-white"></div>
                <div className="w-[8px] h-[8px] bg-white"></div>
              </div>
              <span className="text-white font-bold text-lg">Elasticware</span>
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
};

export default Hero;

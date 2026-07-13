import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section id="home" className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-background">
      {/* Aurora Background Effects */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] opacity-50 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/30 to-secondary/30 blur-[120px] rounded-full animate-blob"></div>
      </div>

      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-secondary-text text-sm font-medium mb-8 backdrop-blur-md"
          >
            <Sparkles size={14} className="text-primary" />
            <span>The New Standard in Web Engineering</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-5xl md:text-7xl lg:text-[80px] font-display font-bold tracking-tighter text-white leading-[1.1] mb-8"
          >
            Build Digital Assets That <span className="text-gradient">Dominate.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg md:text-xl text-secondary-text mb-12 max-w-2xl mx-auto leading-relaxed"
          >
            We engineer high-performance web applications, SaaS platforms, and premium landing pages designed to maximize conversion and outpace the competition.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link to="/start-project" className="w-full sm:w-auto px-8 py-4 rounded-full bg-primary text-white font-medium flex items-center justify-center gap-2 hover:bg-primary/90 hover:scale-105 transition-all shadow-glow-primary">
              Start Your Project <ArrowRight size={18} />
            </Link>
            
            <a href="#ready-made" className="w-full sm:w-auto px-8 py-4 rounded-full bg-white/5 text-white font-medium flex items-center justify-center gap-2 hover:bg-white/10 border border-white/10 transition-all">
              Browse Templates
            </a>
          </motion.div>
        </div>

        {/* Dashboard Mockup / Floating UI Element */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="mt-20 relative mx-auto max-w-5xl"
        >
          <div className="relative rounded-2xl md:rounded-[2.5rem] border border-white/10 bg-card/40 p-2 md:p-4 backdrop-blur-xl shadow-premium">
            <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent rounded-2xl md:rounded-[2.5rem] pointer-events-none"></div>
            <img 
              src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=2000&q=80" 
              alt="Dashboard Preview" 
              className="rounded-xl md:rounded-3xl w-full object-cover aspect-video border border-white/5 opacity-80 mix-blend-screen"
            />
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default Hero;

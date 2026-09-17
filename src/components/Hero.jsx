import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Code2, Rocket, ShieldCheck, Sparkles, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section 
      id="home" 
      className="relative min-h-[92vh] flex items-center pt-28 pb-20 overflow-hidden bg-slate-950 text-white"
    >
      {/* Ambient Radial Gradient Background Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[450px] bg-gradient-to-r from-teal-500/15 via-emerald-500/10 to-cyan-500/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,#000_70%,transparent_100%)] opacity-25 pointer-events-none" />

      <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          
          {/* Premium Glass Badge */}
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/80 border border-teal-500/30 text-teal-400 text-xs font-bold uppercase tracking-widest mb-8 backdrop-blur-xl shadow-lg shadow-teal-500/5"
          >
            <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
            High-Performance Web, Mobile & AI Product Engineering
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white leading-[1.08] mb-6"
          >
            Engineering Custom Digital Platforms & <br className="hidden sm:block"/>
            <span className="bg-gradient-to-r from-teal-300 via-emerald-400 to-cyan-300 bg-clip-text text-transparent">
              AI Tools That Scale.
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-slate-300 text-base sm:text-xl max-w-2xl mx-auto leading-relaxed mb-10 font-normal"
          >
            ToolBite partners with founders and ambitious brands to architect ultra-fast web applications, native mobile apps, and custom AI tools engineered for sustainable growth.
          </motion.p>

          {/* Action CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex flex-wrap items-center justify-center gap-4 mb-16"
          >
            <Link 
              to="/start-project" 
              className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-extrabold text-sm uppercase tracking-wider transition-all shadow-xl shadow-teal-500/20 group hover:scale-105"
            >
              Start Project Blueprint
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>

            <button 
              onClick={() => window.dispatchEvent(new CustomEvent('open-appointment-modal'))}
              className="inline-flex items-center gap-2.5 px-7 py-4 rounded-2xl bg-slate-900/90 text-white font-bold hover:bg-slate-800 transition-all border border-slate-700/80 text-sm tracking-wider uppercase backdrop-blur-md hover:border-slate-600"
            >
              Book Appointment
            </button>
          </motion.div>

          {/* Authentic Proof Stats Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="w-full grid grid-cols-2 md:grid-cols-4 gap-4 pt-8 border-t border-slate-800/80 text-left"
          >
            <div className="p-4 rounded-2xl bg-slate-900/40 border border-slate-800/60 backdrop-blur-md">
              <p className="text-2xl font-black text-white">Google Play</p>
              <p className="text-xs text-slate-400 font-medium">DailySpark App Featured</p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-900/40 border border-slate-800/60 backdrop-blur-md">
              <p className="text-2xl font-black text-teal-400">sub-100ms</p>
              <p className="text-xs text-slate-400 font-medium">Core Web Vitals Optimized</p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-900/40 border border-slate-800/60 backdrop-blur-md">
              <p className="text-2xl font-black text-white">91+ Routes</p>
              <p className="text-xs text-slate-400 font-medium">Static Edge Prerendered</p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-900/40 border border-slate-800/60 backdrop-blur-md">
              <p className="text-2xl font-black text-teal-400">100% Free</p>
              <p className="text-xs text-slate-400 font-medium">Browser AI Tools Suite</p>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Hero;

import React from 'react';
import { motion } from 'framer-motion';
import { Code, Layout, Zap, Shield, Smartphone, PenTool, ArrowRight } from 'lucide-react';

const Hero = () => {
  return (
    <section className="relative pt-40 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-[#fafafa]">
      {/* Animated Background Blobs */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-teal-200/40 rounded-full mix-blend-multiply filter blur-[120px] opacity-70 animate-blob pointer-events-none" />
      <div className="absolute top-40 left-0 w-[600px] h-[600px] bg-emerald-200/40 rounded-full mix-blend-multiply filter blur-[120px] animate-blob animation-delay-2000 pointer-events-none" />
      <div className="absolute -bottom-20 left-1/3 w-[800px] h-[800px] bg-blue-200/30 rounded-full mix-blend-multiply filter blur-[100px] animate-blob animation-delay-4000 pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">
          
          {/* Left Column: Text & CTAs */}
          <div className="text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-white border border-slate-200 shadow-sm mb-8 relative overflow-hidden group hover:border-teal-300 transition-colors"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-teal-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <span className="flex h-2 w-2 rounded-full bg-teal-500 animate-pulse"></span>
              <span className="text-sm font-bold text-slate-800 tracking-tight">Award-Winning Digital Agency</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-6xl lg:text-7xl xl:text-[80px] font-extrabold tracking-tighter text-slate-900 mb-8 leading-[1.05]"
            >
              Digital Engineering for <span className="text-gradient">Ambitious Brands.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-xl text-slate-600 mb-12 max-w-lg leading-relaxed font-medium"
            >
              We architect high-performance web applications and conversion-optimized websites that transform casual traffic into qualified revenue.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row flex-wrap items-center gap-5 mb-14"
            >
              <a href="/#custom-order" className="w-full sm:w-auto px-8 py-4 rounded-full bg-slate-900 text-white font-bold flex items-center justify-center gap-3 hover:bg-teal-600 transition-all shadow-glow-slate hover:shadow-glow transform hover:-translate-y-1">
                <Code size={20} />
                Start Custom Project
              </a>
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
                Omnichannel UX
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

          {/* Right Column: Premium Mockups */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative h-[650px] w-full flex items-center justify-center lg:justify-end mt-12 lg:mt-0"
          >
            <div className="relative w-full max-w-lg h-full">
              
              {/* Massive Main Dashboard Card */}
              <div className="absolute inset-0 bg-white/60 backdrop-blur-3xl rounded-[2.5rem] border border-white shadow-premium overflow-hidden z-10 flex flex-col transform lg:translate-x-8">
                {/* Browser Header */}
                <div className="h-16 border-b border-indigo-50/50 bg-white/50 flex items-center px-6 gap-3">
                  <div className="flex gap-2.5">
                    <div className="w-3.5 h-3.5 rounded-full bg-rose-400 shadow-sm border border-rose-500/20"></div>
                    <div className="w-3.5 h-3.5 rounded-full bg-amber-400 shadow-sm border border-amber-500/20"></div>
                    <div className="w-3.5 h-3.5 rounded-full bg-emerald-400 shadow-sm border border-emerald-500/20"></div>
                  </div>
                  <div className="mx-auto w-1/2 h-8 bg-slate-100/50 rounded-lg border border-slate-200/50 flex items-center justify-center">
                    <div className="w-1/3 h-2 bg-slate-300 rounded-full"></div>
                  </div>
                </div>
                {/* Dashboard Content */}
                <div className="flex-1 p-8 relative overflow-hidden flex flex-col gap-6">
                  <div className="w-1/3 h-8 bg-slate-200/60 rounded-lg"></div>
                  
                  <div className="flex gap-4">
                    <div className="flex-1 h-32 bg-gradient-to-br from-teal-500 to-emerald-400 rounded-2xl shadow-inner p-5 flex flex-col justify-between group cursor-pointer hover:shadow-glow transition-shadow border border-teal-400">
                      <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                        <Zap size={20} className="text-white" />
                      </div>
                      <div>
                        <div className="w-1/2 h-3 bg-white/50 rounded-sm mb-2"></div>
                        <div className="w-3/4 h-5 bg-white rounded-sm"></div>
                      </div>
                    </div>
                    <div className="flex-1 h-32 bg-white border border-slate-200 rounded-2xl shadow-sm p-5 flex flex-col justify-between hover:shadow-md transition-shadow">
                      <div className="w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center">
                        <Layout size={20} className="text-indigo-500" />
                      </div>
                      <div>
                        <div className="w-1/2 h-3 bg-slate-200 rounded-sm mb-2"></div>
                        <div className="w-3/4 h-5 bg-slate-800 rounded-sm"></div>
                      </div>
                    </div>
                  </div>

                  <div className="w-full flex-1 bg-slate-50 border border-slate-200 rounded-2xl shadow-sm p-6 flex flex-col gap-4">
                     <div className="w-1/4 h-4 bg-slate-300 rounded-sm mb-4"></div>
                     <div className="w-full h-10 bg-white border border-slate-200 rounded-xl shadow-sm"></div>
                     <div className="w-full h-10 bg-white border border-slate-200 rounded-xl shadow-sm"></div>
                     <div className="w-3/4 h-10 bg-white border border-slate-200 rounded-xl shadow-sm"></div>
                  </div>
                </div>
              </div>

              {/* Floating Mobile Mockup */}
              <div className="absolute -left-16 top-32 w-56 h-[400px] bg-slate-900 rounded-[2.5rem] border-[6px] border-slate-800 shadow-2xl z-20 overflow-hidden flex flex-col hidden sm:flex animate-float shadow-slate-900/40">
                <div className="w-full h-2/5 bg-gradient-to-br from-teal-400 to-blue-500 p-6 flex flex-col justify-end relative">
                  <div className="absolute top-2 left-1/2 -translate-x-1/2 w-1/3 h-4 bg-slate-800 rounded-b-xl"></div>
                  <div className="w-1/2 h-4 bg-white/80 rounded-sm mb-2"></div>
                  <div className="w-3/4 h-6 bg-white rounded-sm"></div>
                </div>
                <div className="flex-1 bg-white p-5 space-y-4">
                  <div className="w-full h-12 bg-slate-100 rounded-xl"></div>
                  <div className="w-full h-12 bg-slate-100 rounded-xl"></div>
                  <div className="w-full h-14 bg-teal-500 rounded-xl mt-auto shadow-sm shadow-teal-500/50"></div>
                </div>
              </div>

              {/* Floating Profile/Stats Card */}
              <div className="absolute -right-12 bottom-20 w-64 glass-card rounded-3xl z-30 p-5 shadow-2xl animate-float" style={{ animationDelay: '2s' }}>
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-rose-400 to-orange-400 p-1">
                    <div className="w-full h-full bg-white rounded-full flex items-center justify-center">
                      <span className="font-bold text-slate-800 text-sm tracking-tighter">TB</span>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 leading-none mb-1">Conversion Rate</h4>
                    <p className="text-emerald-500 text-sm font-extrabold">+48.5%</p>
                  </div>
                </div>
                <div className="flex gap-1 h-12 items-end">
                  {[40, 60, 45, 80, 65, 90, 100].map((h, i) => (
                    <div key={i} className="flex-1 bg-teal-500 rounded-t-sm" style={{ height: `${h}%` }}></div>
                  ))}
                </div>
              </div>
              
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Hero;


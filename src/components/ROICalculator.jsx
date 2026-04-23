import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TrendingUp, AlertTriangle, Zap, ArrowRight, Mail, Calculator as CalcIcon } from 'lucide-react';

const ROICalculator = () => {
  const [traffic, setTraffic] = useState(5000);
  const [convRate, setConvRate] = useState(2);
  const [aov, setAov] = useState(100);

  // Constants for ToolBite optimization
  const TB_CONV_BOOST = 1.35; // 35% improvement
  const TB_SPEED_BOOST = 0.15; // 15% revenue lift from speed

  const currentRevenue = (traffic * (convRate / 100) * aov);
  const optimizedRevenue = (currentRevenue * TB_CONV_BOOST * (1 + TB_SPEED_BOOST));
  const monthlyLeak = optimizedRevenue - currentRevenue;
  const annualLeak = monthlyLeak * 12;

  return (
    <section className="py-24 bg-slate-900 relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-teal-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Side: Inputs */}
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-400 text-xs font-black uppercase tracking-widest mb-6">
              <CalcIcon size={14} />
              Revenue Leak Audit
            </div>
            <h2 className="text-4xl md:text-6xl font-black text-white mb-8 tracking-tighter leading-tight">
              Stop Losing <span className="text-teal-400">Revenue</span> to Poor Engineering.
            </h2>
            <p className="text-slate-400 text-lg mb-12 max-w-lg font-medium">
              Most digital brands lose 30-50% of their potential revenue due to sub-optimal conversion paths and slow load times. Calculate your annual leak below.
            </p>

            <div className="space-y-10 bg-slate-800/50 p-8 md:p-10 rounded-[40px] border border-slate-700/50 backdrop-blur-xl">
              {/* Traffic Slider */}
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-black text-slate-300 uppercase tracking-widest">Monthly Traffic</label>
                  <span className="text-2xl font-black text-teal-400">{traffic.toLocaleString()}</span>
                </div>
                <input 
                  type="range" min="1000" max="100000" step="1000"
                  value={traffic} onChange={(e) => setTraffic(Number(e.target.value))}
                  className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-teal-500"
                />
              </div>

              {/* Conversion Rate Slider */}
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-black text-slate-300 uppercase tracking-widest">Current Conv. Rate</label>
                  <span className="text-2xl font-black text-teal-400">{convRate}%</span>
                </div>
                <input 
                  type="range" min="0.1" max="10" step="0.1"
                  value={convRate} onChange={(e) => setConvRate(Number(e.target.value))}
                  className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-teal-500"
                />
              </div>

              {/* AOV Slider */}
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-black text-slate-300 uppercase tracking-widest">Avg. Order Value ($)</label>
                  <span className="text-2xl font-black text-teal-400">${aov}</span>
                </div>
                <input 
                  type="range" min="10" max="1000" step="10"
                  value={aov} onChange={(e) => setAov(Number(e.target.value))}
                  className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-teal-500"
                />
              </div>
            </div>
          </div>

          {/* Right Side: Results */}
          <div className="relative">
            <motion.div 
              layout
              className="bg-white rounded-[48px] p-8 md:p-14 shadow-2xl relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-rose-500/5 rounded-full -mr-16 -mt-16 pointer-events-none" />
              
              <div className="flex items-center gap-3 text-rose-500 mb-8">
                <AlertTriangle size={24} className="animate-pulse" />
                <span className="font-black uppercase tracking-widest text-xs">Annual Revenue Leak Identified</span>
              </div>

              <div className="mb-12">
                <motion.span 
                  key={annualLeak}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-6xl md:text-8xl font-black text-slate-900 tracking-tighter block mb-2"
                >
                  ${Math.round(annualLeak).toLocaleString()}
                </motion.span>
                <p className="text-slate-500 font-bold text-lg">Total annual revenue lost to sub-optimal architecture.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100">
                  <Zap className="text-teal-500 mb-3" size={20} />
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Speed Impact</p>
                  <p className="text-xl font-black text-slate-900">+${Math.round(currentRevenue * TB_SPEED_BOOST * 12).toLocaleString()}/yr</p>
                </div>
                <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100">
                  <TrendingUp className="text-emerald-500 mb-3" size={20} />
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Conv. Optimization</p>
                  <p className="text-xl font-black text-slate-900">+35% Lift</p>
                </div>
              </div>

              <div className="space-y-4">
                <button className="w-full py-5 bg-teal-500 text-slate-900 font-black rounded-2xl flex items-center justify-center gap-3 hover:bg-teal-400 transition-all shadow-xl shadow-teal-500/20 group">
                  <Mail size={20} />
                  Claim My Full Audit Report
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </button>
                <p className="text-center text-slate-400 text-xs font-bold">
                  *Based on average ToolBite performance benchmarks for 2026.
                </p>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ROICalculator;

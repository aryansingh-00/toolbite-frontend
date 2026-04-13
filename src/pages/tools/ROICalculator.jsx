import React, { useState, useMemo } from 'react';
import { 
  TrendingUp, 
  Target, 
  DollarSign, 
  Users, 
  Zap, 
  ArrowRight,
  Sparkles,
  ChevronRight,
  ShieldCheck,
  Rocket
} from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '../../components/SEO';
import ToolLayout from '../../components/tools/ToolLayout';

const ROICalculator = () => {
  const [traffic, setTraffic] = useState(50000);
  const [conversion, setConversion] = useState(1.5);
  const [aov, setAov] = useState(150);

  const results = useMemo(() => {
    const currentMonthlyRevenue = traffic * (conversion / 100) * aov;
    
    // ToolBite Benchmarks: +1.5% absolute conversion boost
    const upgradedConversion = conversion + 1.5;
    const upgradedMonthlyRevenue = traffic * (upgradedConversion / 100) * aov;
    
    const monthlyGain = upgradedMonthlyRevenue - currentMonthlyRevenue;
    const annualGain = monthlyGain * 12;
    const percentageGrowth = (monthlyGain / currentMonthlyRevenue) * 100;

    return {
      currentMonthlyRevenue,
      upgradedMonthlyRevenue,
      monthlyGain,
      annualGain,
      percentageGrowth
    };
  }, [traffic, conversion, aov]);

  return (
    <ToolLayout
      title="ROI Growth Predictor"
      description="Stop leaving money on the table. Calculate how ToolBite's elite design and performance benchmarks can scale your revenue."
    >
      <SEO 
        title="ROI Growth Predictor — Calculate Website Revenue Potential"
        description="Free tool to predict revenue growth by optimizing website conversion rates and performance. See how much your agency can scale."
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Left: Controls */}
        <div className="lg:col-span-5 space-y-8">
          <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-8 border border-slate-200 dark:border-slate-800 shadow-xl">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-8 flex items-center gap-2">
              <Zap className="text-teal-500" size={20} />
              Growth Parameters
            </h3>

            <div className="space-y-10">
              {/* Traffic Slider */}
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
                    <Users size={16} /> Monthly Visitors
                  </label>
                  <span className="text-lg font-black text-teal-600 px-3 py-1 bg-teal-50 dark:bg-teal-500/10 rounded-lg">
                    {traffic.toLocaleString()}
                  </span>
                </div>
                <input 
                  type="range" 
                  min="1000" 
                  max="1000000" 
                  step="1000"
                  value={traffic}
                  onChange={(e) => setTraffic(parseInt(e.target.value))}
                  className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-teal-500"
                />
              </div>

              {/* Conversion Slider */}
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
                    <Target size={16} /> Current Conv. Rate
                  </label>
                  <span className="text-lg font-black text-teal-600 px-3 py-1 bg-teal-50 dark:bg-teal-500/10 rounded-lg">
                    {conversion}%
                  </span>
                </div>
                <input 
                  type="range" 
                  min="0.1" 
                  max="10" 
                  step="0.1"
                  value={conversion}
                  onChange={(e) => setConversion(parseFloat(e.target.value))}
                  className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-teal-500"
                />
              </div>

              {/* AOV Slider */}
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
                    <DollarSign size={16} /> Avg. Sale Value
                  </label>
                  <span className="text-lg font-black text-teal-600 px-3 py-1 bg-teal-50 dark:bg-teal-500/10 rounded-lg">
                    ${aov}
                  </span>
                </div>
                <input 
                  type="range" 
                  min="10" 
                  max="5000" 
                  step="10"
                  value={aov}
                  onChange={(e) => setAov(parseInt(e.target.value))}
                  className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-teal-500"
                />
              </div>
            </div>
          </div>

          <div className="p-6 bg-teal-500/5 border border-teal-500/20 rounded-3xl">
            <h4 className="font-bold text-teal-700 dark:text-teal-400 mb-2 flex items-center gap-2">
              <ShieldCheck size={18} /> ToolBite Benchmark
            </h4>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
              We assume a baseline conversion lift of **+1.5%** through mobile-first performance, ultra-fast LCP, and psychological design patterns.
            </p>
          </div>
        </div>

        {/* Right: Results Display */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-slate-900 rounded-[2.5rem] p-10 text-white relative overflow-hidden shadow-2xl">
            {/* Background Accent */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-teal-500/10 blur-[100px] -z-0"></div>
            
            <div className="relative z-10 space-y-12">
              <div>
                <p className="text-sm font-black text-teal-400 uppercase tracking-widest mb-4">Estimated Growth Potential</p>
                <div className="text-6xl md:text-8xl font-black tracking-tighter text-white">
                  ${Math.floor(results.annualGain).toLocaleString()}
                  <span className="text-2xl text-slate-500 ml-4 font-bold uppercase tracking-widest">/ Year</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="p-6 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-sm">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Monthly Increase</p>
                  <p className="text-3xl font-bold text-emerald-400">+${Math.floor(results.monthlyGain).toLocaleString()}</p>
                </div>
                <div className="p-6 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-sm">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Conv. Yield Boost</p>
                  <p className="text-3xl font-bold text-teal-400">+{results.percentageGrowth.toFixed(1)}%</p>
                </div>
              </div>

              <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-6">
                <div>
                  <h4 className="text-xl font-bold mb-1">Ready to unlock this growth?</h4>
                  <p className="text-slate-400 text-sm">Our AI strategists are ready to implement these benchmarks.</p>
                </div>
                <Link 
                  to="/#ai-strategist"
                  className="w-full md:w-auto px-8 py-4 bg-teal-500 hover:bg-teal-400 text-slate-900 font-bold rounded-2xl flex items-center justify-center gap-2 transition-all shadow-xl shadow-teal-500/20 group"
                >
                  Start Strategic Roadmap
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { label: "Performance", val: "99+", icon: <Zap /> },
              { label: "Stability", val: "99.9%", icon: <ShieldCheck /> },
              { label: "Velocity", val: "2.4x", icon: <Rocket /> }
            ].map((stat, i) => (
              <div key={i} className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-100 dark:border-slate-800 flex items-center gap-4">
                <div className="text-teal-500">{stat.icon}</div>
                <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{stat.label}</p>
                  <p className="text-xl font-bold text-slate-900 dark:text-white">{stat.val}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </ToolLayout>
  );
};

export default ROICalculator;

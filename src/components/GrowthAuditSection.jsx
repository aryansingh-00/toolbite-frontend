import React from 'react';
import { TrendingUp, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const GrowthAuditSection = () => {
  return (
    <section className="py-12 bg-slate-900 border-y border-slate-800 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-teal-900/10 to-transparent pointer-events-none" />
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 bg-slate-800/40 border border-slate-700/50 rounded-2xl p-8 backdrop-blur-sm">
          <div className="max-w-2xl text-center md:text-left">
            <h2 className="text-2xl font-bold text-white mb-2">Stop Guessing. <span className="text-teal-400">Project Your Growth.</span></h2>
            <p className="text-slate-400 text-sm">
              Use our proprietary ROI Predictor to see exactly how ToolBite's performance stack can scale your annual revenue before you spend a dime.
            </p>
          </div>
          <div className="flex-shrink-0 flex gap-4">
            <Link 
              to="/tools/roi-calculator"
              className="px-6 py-3 bg-teal-500 hover:bg-teal-400 text-slate-900 font-bold rounded-xl shadow-md flex items-center gap-2 transition-all"
            >
              Predict My ROI <TrendingUp size={18} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GrowthAuditSection;

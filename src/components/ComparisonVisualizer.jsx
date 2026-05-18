import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DollarSign, Clock, ShieldCheck, Zap, AlertTriangle, Building2, User2 } from 'lucide-react';

const ComparisonVisualizer = () => {
  const [projectSize, setProjectSize] = useState('startup'); // startup, scaleup, enterprise

  const getMetrics = () => {
    switch (projectSize) {
      case 'startup':
        return {
          title: 'Startup MVP Blueprint',
          toolbite: { cost: '$99+', speed: '1-2 Weeks', reliability: 'Dedicated Lead Architect', quality: 'Clean hand-coded React' },
          freelancer: { cost: '$800 - $2,500', speed: '4-8 Weeks', reliability: 'High risk (no support)', quality: 'Substandard / Templated' },
          agency: { cost: '$8,000+', speed: '8-12 Weeks', reliability: 'Assigned to B-team intern', quality: 'Over-engineered overhead' },
          savings: '$6,500+'
        };
      case 'scaleup':
        return {
          title: 'Scaleup Core Application',
          toolbite: { cost: '$3,500', speed: '3-4 Weeks', reliability: 'Dedicated Lead Architect', quality: 'Bespoke modern architecture' },
          freelancer: { cost: '$2,500 - $6,000', speed: '8-16 Weeks', reliability: 'Communication gaps', quality: 'Inconsistent codebases' },
          agency: { cost: '$20,000+', speed: '16-24 Weeks', reliability: 'Account Manager buffer', quality: 'Heavy bureaucratic stack' },
          savings: '$16,500+'
        };
      case 'enterprise':
        default:
        return {
          title: 'Enterprise Bespoke System',
          toolbite: { cost: '$9,500', speed: '4-6 Weeks', reliability: 'Dedicated Engineering Director', quality: 'Pre-optimized production' },
          freelancer: { cost: 'Not recommended', speed: 'Unknown timeline', reliability: 'Critical operational risk', quality: 'Lack of security compliance' },
          agency: { cost: '$50,000+', speed: '24-36 Weeks', reliability: 'Multiple meetings / delays', quality: 'High margin, slow deployment' },
          savings: '$40,500+'
        };
    }
  };

  const current = getMetrics();

  return (
    <div className="w-full bg-slate-50 border border-slate-200 rounded-3xl p-6 md:p-8 shadow-sm">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
        <div>
          <h4 className="text-xl font-black text-black tracking-tight mb-1">
            Compare The Alternatives
          </h4>
          <p className="text-sm text-slate-500 font-medium">
            Select a scope to see how ToolBite optimizes your launch resources.
          </p>
        </div>
        
        {/* Toggle Controls */}
        <div className="flex bg-white border border-slate-200 p-1.5 rounded-2xl self-start md:self-auto shadow-sm">
          {['startup', 'scaleup', 'enterprise'].map((size) => (
            <button title="Interactive Button" aria-label="Interactive Button"
              key={size}
              onClick={() => setProjectSize(size)}
              className={`px-4 py-2 rounded-xl text-xs font-black transition-all capitalize ${
                projectSize === size
                  ? 'bg-black text-white shadow-sm'
                  : 'text-slate-500 hover:text-black hover:bg-slate-50'
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      {/* Comparison Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
        
        {/* Option 1: Freelancer */}
        <div className="bg-white border border-slate-100 rounded-2xl p-6 relative overflow-hidden transition-all duration-300">
          <div className="flex items-center gap-2 mb-4 text-slate-400">
            <User2 size={18} />
            <span className="text-xs font-black uppercase tracking-wider">Freelancers</span>
          </div>
          
          <div className="space-y-4">
            <div>
              <span className="text-[10px] uppercase tracking-wider text-slate-400 font-bold block mb-1">Estimated Cost</span>
              <p className="text-lg font-bold text-slate-800">{current.freelancer.cost}</p>
            </div>
            <div>
              <span className="text-[10px] uppercase tracking-wider text-slate-400 font-bold block mb-1">Delivery Time</span>
              <p className="text-sm font-semibold text-slate-700">{current.freelancer.speed}</p>
            </div>
            <div>
              <span className="text-[10px] uppercase tracking-wider text-slate-400 font-bold block mb-1">Reliability Risk</span>
              <p className="text-sm text-slate-600 flex items-center gap-1">
                <AlertTriangle size={14} className="text-amber-500 shrink-0" />
                {current.freelancer.reliability}
              </p>
            </div>
            <div>
              <span className="text-[10px] uppercase tracking-wider text-slate-400 font-bold block mb-1">Code Integrity</span>
              <p className="text-sm text-slate-600">{current.freelancer.quality}</p>
            </div>
          </div>
        </div>

        {/* Option 2: ToolBite (Featured Column) */}
        <div className="bg-white border-2 border-black rounded-2xl p-6 relative overflow-hidden shadow-md transform hover:scale-[1.02] transition-all duration-300">
          <div className="absolute top-0 right-0 bg-black text-white text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-bl-xl">
            Optimized Choice
          </div>

          <div className="flex items-center gap-2 mb-4 text-black">
            <Zap size={18} className="fill-black" />
            <span className="text-xs font-black uppercase tracking-wider">ToolBite Model</span>
          </div>

          <div className="space-y-4">
            <div>
              <span className="text-[10px] uppercase tracking-wider text-slate-400 font-bold block mb-1">Flat Invested Rate</span>
              <p className="text-2xl font-black text-black">{current.toolbite.cost}</p>
            </div>
            <div>
              <span className="text-[10px] uppercase tracking-wider text-slate-400 font-bold block mb-1">Speed-To-Market</span>
              <p className="text-sm font-black text-black">{current.toolbite.speed}</p>
            </div>
            <div>
              <span className="text-[10px] uppercase tracking-wider text-slate-400 font-bold block mb-1">Dedicated Support</span>
              <p className="text-sm font-bold text-black flex items-center gap-1">
                <ShieldCheck size={14} className="text-black shrink-0 fill-black/10" />
                {current.toolbite.reliability}
              </p>
            </div>
            <div>
              <span className="text-[10px] uppercase tracking-wider text-slate-400 font-bold block mb-1">Architecture Standard</span>
              <p className="text-sm font-bold text-black">{current.toolbite.quality}</p>
            </div>
          </div>
        </div>

        {/* Option 3: Agency */}
        <div className="bg-white border border-slate-100 rounded-2xl p-6 relative overflow-hidden transition-all duration-300">
          <div className="flex items-center gap-2 mb-4 text-slate-400">
            <Building2 size={18} />
            <span className="text-xs font-black uppercase tracking-wider">Traditional Agency</span>
          </div>

          <div className="space-y-4">
            <div>
              <span className="text-[10px] uppercase tracking-wider text-slate-400 font-bold block mb-1">Minimum Budget</span>
              <p className="text-lg font-bold text-slate-800">{current.agency.cost}</p>
            </div>
            <div>
              <span className="text-[10px] uppercase tracking-wider text-slate-400 font-bold block mb-1">Bureaucratic Timeline</span>
              <p className="text-sm font-semibold text-slate-700">{current.agency.speed}</p>
            </div>
            <div>
              <span className="text-[10px] uppercase tracking-wider text-slate-400 font-bold block mb-1">Operation Model</span>
              <p className="text-sm text-slate-600 flex items-center gap-1">
                <AlertTriangle size={14} className="text-slate-400 shrink-0" />
                {current.agency.reliability}
              </p>
            </div>
            <div>
              <span className="text-[10px] uppercase tracking-wider text-slate-400 font-bold block mb-1">Implementation</span>
              <p className="text-sm text-slate-600">{current.agency.quality}</p>
            </div>
          </div>
        </div>

      </div>

      {/* Dynamic Saving Ribbon */}
      <motion.div 
        key={projectSize}
        initial={{ opacity: 0, y: 5 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-6 pt-5 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left"
      >
        <div>
          <p className="text-sm font-semibold text-slate-600">
            Estimated capital saved with ToolBite for a <span className="font-extrabold text-black capitalize">{projectSize}</span> project:
          </p>
        </div>
        <div className="bg-black text-white px-5 py-2.5 rounded-2xl font-black text-sm tracking-tight shrink-0 shadow-sm">
          Save {current.savings} + 3x Faster Launch
        </div>
      </motion.div>
    </div>
  );
};

export default ComparisonVisualizer;

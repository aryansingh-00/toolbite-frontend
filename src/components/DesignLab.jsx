import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Palette, Type, RefreshCw, Smartphone, Tablet, Monitor, X } from 'lucide-react';

const DesignLab = ({ template, isOpen, onClose }) => {
  const [brandName, setBrandName] = useState("My Brand");
  const [primaryColor, setPrimaryColor] = useState("#14b8a6");
  const [accentColor, setAccentColor] = useState("#0f172a");

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ x: 400 }}
      animate={{ x: 0 }}
      exit={{ x: 400 }}
      className="fixed top-0 right-0 w-80 h-full bg-white dark:bg-slate-900 border-l border-slate-200 dark:border-slate-800 z-[100] shadow-2xl flex flex-col"
    >
      <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
        <h3 className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Palette className="text-teal-500" size={20} />
          Design Lab
        </h3>
        <button onClick={onClose} className="text-slate-400 hover:text-slate-600 dark:hover:text-white">
          <X size={20} />
        </button>
      </div>

      <div className="flex-1 p-6 space-y-8 overflow-y-auto">
        <div className="space-y-4">
          <label className="text-xs font-black uppercase tracking-widest text-slate-400 flex items-center gap-2">
            <Type size={14} /> Brand Identity
          </label>
          <input 
            type="text" 
            value={brandName}
            onChange={(e) => setBrandName(e.target.value)}
            className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700 text-sm font-bold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500/20"
            placeholder="Enter your brand name..."
          />
        </div>

        <div className="space-y-4">
          <label className="text-xs font-black uppercase tracking-widest text-slate-400 flex items-center gap-2">
            <Palette size={14} /> Color Palette
          </label>
          <div className="space-y-4">
             <div>
                <p className="text-[10px] font-bold text-slate-500 mb-2 uppercase">Primary Color</p>
                <div className="flex items-center gap-3">
                   <input 
                     type="color" 
                     value={primaryColor}
                     onChange={(e) => setPrimaryColor(e.target.value)}
                     className="w-10 h-10 rounded-lg cursor-pointer bg-transparent border-none"
                   />
                   <span className="text-sm font-mono text-slate-600 dark:text-slate-400">{primaryColor}</span>
                </div>
             </div>
             <div>
                <p className="text-[10px] font-bold text-slate-500 mb-2 uppercase">Accent Color</p>
                <div className="flex items-center gap-3">
                   <input 
                     type="color" 
                     value={accentColor}
                     onChange={(e) => setAccentColor(e.target.value)}
                     className="w-10 h-10 rounded-lg cursor-pointer bg-transparent border-none"
                   />
                   <span className="text-sm font-mono text-slate-600 dark:text-slate-400">{accentColor}</span>
                </div>
             </div>
          </div>
        </div>

        {/* Live Preview Sync Info */}
        <div className="p-4 bg-teal-500/10 rounded-2xl border border-teal-500/20">
           <div className="flex gap-3">
              <RefreshCw size={16} className="text-teal-500 animate-spin-slow" />
              <p className="text-[10px] font-bold text-teal-700 dark:text-teal-400 uppercase leading-relaxed">
                 SYNCING PREVIEW...
                 <span className="block mt-1 font-medium lowercase italic first-letter:uppercase normal-case">Changes are reflected in real-time.</span>
              </p>
           </div>
        </div>
      </div>

      <div className="p-6 border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
         <button className="w-full py-4 bg-slate-900 dark:bg-teal-500 text-white dark:text-slate-900 font-bold rounded-2xl shadow-xl hover:scale-[1.02] transition-transform">
            Save Configuration
         </button>
      </div>

      {/* Styled injecter (Mocks the "Live" feel) */}
      <style>{`
        :root {
          --design-primary: ${primaryColor};
          --design-accent: ${accentColor};
        }
        .design-lab-preview .brand-text { content: "${brandName}"; }
        .animate-spin-slow { animation: spin 4s linear infinite; }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>
    </motion.div>
  );
};

export default DesignLab;

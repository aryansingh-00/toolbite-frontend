import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Camera, 
  Download, 
  Share2, 
  Palette, 
  Type, 
  Sparkles,
  Layout,
  RefreshCw,
  Zap
} from 'lucide-react';
import { FiTwitter as Twitter, FiInstagram as Instagram, FiLinkedin as Linkedin } from 'react-icons/fi';
import toast from 'react-hot-toast';

const AssetGenerator = () => {
  const [projectName, setProjectName] = useState('Monarch Real Estate');
  const [platform, setPlatform] = useState('Instagram');
  const [accentColor, setAccentColor] = useState('#14b8a6');
  const [theme, setTheme] = useState('Dark');

  const generateAsset = () => {
    toast.success(`${platform} card generated!`);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h3 className="text-2xl font-black text-slate-900 dark:text-white flex items-center gap-3">
             <Sparkles className="text-teal-500" />
             Marketing Hub
          </h3>
          <p className="text-slate-500 dark:text-slate-400 font-medium">Generate high-fidelity social assets for your brand launch.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* Left: Controls */}
        <div className="lg:col-span-4 space-y-6">
           <div className="bg-white dark:bg-slate-900 rounded-[2rem] p-8 border border-slate-200 dark:border-slate-800 shadow-sm">
              <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-6">Customization</h4>
              
              <div className="space-y-6">
                <div>
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2">Project Display Name</label>
                  <div className="relative">
                    <Type className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                    <input 
                      type="text" 
                      value={projectName}
                      onChange={(e) => setProjectName(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2">Format</label>
                  <div className="grid grid-cols-3 gap-2">
                    {['Instagram', 'LinkedIn', 'Twitter'].map(p => (
                      <button 
                        key={p}
                        onClick={() => setPlatform(p)}
                        className={`py-2 rounded-xl text-xs font-bold transition-all ${platform === p ? 'bg-teal-500 text-white' : 'bg-slate-50 dark:bg-slate-800 text-slate-500'}`}
                      >
                        {p}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2">Accent Color</label>
                  <div className="flex gap-2">
                    {['#14b8a6', '#6366f1', '#f43f5e', '#f59e0b', '#0f172a'].map(c => (
                      <button 
                        key={c}
                        onClick={() => setAccentColor(c)}
                        className="w-8 h-8 rounded-full border-2 border-white dark:border-slate-800 transition-transform hover:scale-110"
                        style={{ backgroundColor: c, ring: accentColor === c ? '2px' : '0px' }}
                      />
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2">Visual Theme</label>
                  <select 
                    value={theme}
                    onChange={(e) => setTheme(e.target.value)}
                    className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-xl font-bold text-sm"
                  >
                    <option>Dark Minimal</option>
                    <option>Light Clean</option>
                    <option>Glassmorphism</option>
                    <option>Blueprint</option>
                  </select>
                </div>
              </div>

              <div className="mt-8 pt-8 border-t border-slate-100 dark:border-slate-800">
                <button 
                  onClick={generateAsset}
                  className="w-full py-4 bg-slate-900 dark:bg-teal-500 text-white dark:text-slate-900 font-black rounded-2xl flex items-center justify-center gap-2 shadow-xl shadow-teal-500/10 hover:translate-y-[-2px] transition-all"
                >
                  <Download size={20} />
                  Download Card
                </button>
              </div>
           </div>
        </div>

        {/* Right: Preview Card */}
        <div className="lg:col-span-8">
           <div className="bg-slate-50 dark:bg-slate-800/20 rounded-[3rem] p-12 flex items-center justify-center border-2 border-dashed border-slate-200 dark:border-slate-800 relative">
              
              <div className="absolute top-6 left-1/2 -translate-x-1/2 px-4 py-1.5 bg-white dark:bg-slate-800 rounded-full border border-slate-200 dark:border-slate-700 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] z-20">
                 Preview Rendering
              </div>

              <motion.div 
                key={`${theme}-${accentColor}-${platform}`}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className={`w-full max-w-[400px] aspect-square rounded-[2rem] p-10 shadow-2xl relative overflow-hidden flex flex-col justify-between ${theme === 'Light Clean' ? 'bg-white' : 'bg-slate-950'}`}
              >
                 {/* Background Elements */}
                 <div 
                   className="absolute -right-20 -top-20 w-64 h-64 blur-[100px] opacity-40 rounded-full"
                   style={{ backgroundColor: accentColor }}
                 ></div>
                 
                 <div className="relative z-10 flex justify-between items-start">
                    <div className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white">
                       <Layout size={24} />
                    </div>
                    {platform === 'Instagram' && <Instagram size={24} className="text-white/30" />}
                    {platform === 'LinkedIn' && <Linkedin size={24} className="text-white/30" />}
                    {platform === 'Twitter' && <Twitter size={24} className="text-white/30" />}
                 </div>

                 <div className="relative z-10">
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] mb-4" style={{ color: accentColor }}>Engineering Update</p>
                    <h4 className={`text-4xl font-black leading-tight mb-6 ${theme === 'Light Clean' ? 'text-slate-900' : 'text-white'}`}>
                       {projectName} <br /> 
                       <span className="opacity-40">Build v1.0.2</span>
                    </h4>
                    <div className="flex items-center gap-3">
                       <div className="w-8 h-8 rounded-full bg-teal-500 flex items-center justify-center text-slate-900">
                          <Zap size={16} fill="currentColor" />
                       </div>
                       <span className={`text-xs font-bold ${theme === 'Light Clean' ? 'text-slate-500' : 'text-slate-400'}`}>Authenticated ToolBite Project</span>
                    </div>
                 </div>

                 <div className="relative z-10 pt-8 border-t border-white/10 flex justify-between items-center text-[10px] font-black text-white/20 uppercase tracking-[0.4em]">
                    <span>Secure Portal</span>
                    <span>2026</span>
                 </div>
              </motion.div>

              <div className="absolute bottom-8 right-8">
                 <button className="p-3 bg-white dark:bg-slate-900 rounded-full shadow-lg text-slate-400 hover:text-teal-500 transition-colors border border-slate-100 dark:border-slate-800">
                    <RefreshCw size={20} />
                 </button>
              </div>
           </div>

           <div className="mt-8 flex items-center gap-4 text-slate-500 font-medium bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-100 dark:border-slate-800">
              <div className="p-2 bg-indigo-50 dark:bg-indigo-500/10 text-indigo-500 rounded-lg">
                 <Share2 size={20} />
              </div>
              <p className="text-sm">These cards are generated using your live project metadata for maximum brand alignment. More templates coming soon.</p>
           </div>
        </div>
      </div>
    </div>
  );
};

export default AssetGenerator;

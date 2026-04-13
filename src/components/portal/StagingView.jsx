import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Shield, Globe, Lock } from 'lucide-react';

const StagingView = ({ stagingUrl = "https://staging.client-site-demo.toolbite.app" }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      className="space-y-6"
    >
      <div className="bg-white dark:bg-slate-900 p-8 rounded-[2rem] border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-2 flex items-center gap-3">
            <Globe className="text-teal-500" />
            Live Staging Environment
          </h3>
          <p className="text-slate-500 dark:text-slate-400 font-medium">View the current development build of your project.</p>
        </div>
        <a 
          href={stagingUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="px-6 py-3 bg-teal-500 text-slate-900 font-bold rounded-xl shadow-lg shadow-teal-500/20 hover:bg-teal-400 transition-all flex items-center gap-2"
        >
          Open Staging Link
          <ExternalLink size={18} />
        </a>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-slate-100 dark:bg-slate-800/50 p-6 rounded-3xl border border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-10 h-10 bg-teal-500/10 text-teal-600 dark:text-teal-400 rounded-xl flex items-center justify-center">
              <Lock size={20} />
            </div>
            <h4 className="font-bold text-slate-900 dark:text-white">Credentials</h4>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-slate-500 dark:text-slate-400 font-bold uppercase tracking-widest text-[10px]">Username</span>
              <span className="text-slate-900 dark:text-white font-mono bg-white dark:bg-slate-900 px-2 py-0.5 rounded border border-slate-200 dark:border-slate-700">admin_staging</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-500 dark:text-slate-400 font-bold uppercase tracking-widest text-[10px]">Password</span>
              <span className="text-slate-900 dark:text-white font-mono bg-white dark:bg-slate-900 px-2 py-0.5 rounded border border-slate-200 dark:border-slate-700">tb_2026_demo</span>
            </div>
          </div>
        </div>

        <div className="bg-slate-900 text-white p-6 rounded-3xl border border-slate-800 relative overflow-hidden group">
          <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-emerald-500/20 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700"></div>
          <div className="flex items-center gap-4 mb-4">
            <div className="w-10 h-10 bg-emerald-500/10 text-emerald-400 rounded-xl flex items-center justify-center">
              <Shield size={20} />
            </div>
            <h4 className="font-bold">Security Info</h4>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            All staging site data is isolated from production. Changes made here will not affect your live users until the deployment phase is approved.
          </p>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-[2rem] border border-slate-200 dark:border-slate-800 shadow-sm p-4 overflow-hidden h-[400px]">
        <div className="w-full h-full bg-slate-50 dark:bg-slate-800 rounded-2xl flex items-center justify-center relative group">
          <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center z-10">
             <button className="px-8 py-4 bg-teal-500 text-slate-900 font-bold rounded-2xl shadow-xl transform scale-90 group-hover:scale-100 transition-transform">
                Enter Fullscreen Preview
             </button>
          </div>
          <div className="text-center p-8">
            <Globe size={48} className="text-slate-300 mx-auto mb-4 animate-pulse" />
            <h4 className="font-bold text-slate-400">Interactive Preview Disabled</h4>
            <p className="text-sm text-slate-500 max-w-xs mx-auto mt-2">To prevent session conflicts, interactive preview is limited within the dashboard. Click "Open Staging Link" for full access.</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default StagingView;

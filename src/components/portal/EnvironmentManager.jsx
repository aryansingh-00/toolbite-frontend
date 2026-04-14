import React from 'react';
import { motion } from 'framer-motion';
import { 
  Server, 
  ExternalLink, 
  Terminal, 
  Activity, 
  ShieldCheck, 
  Code2, 
  History,
  Copy,
  Check
} from 'lucide-react';
import toast from 'react-hot-toast';

const EnvironmentCard = ({ title, url, status, build, color, credentials }) => {
  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    toast.success('Copied to clipboard');
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-[2rem] p-8 border border-slate-200 dark:border-slate-800 shadow-sm relative overflow-hidden group">
      {/* Glow Effect */}
      <div className={`absolute top-0 right-0 w-32 h-32 bg-${color}-500/5 blur-[50px] group-hover:bg-${color}-500/10 transition-colors`}></div>
      
      <div className="flex justify-between items-start mb-8 relative z-10">
        <div className="flex items-center gap-4">
          <div className={`w-12 h-12 rounded-2xl bg-${color}-500/10 text-${color}-500 flex items-center justify-center`}>
            {title === 'Production' ? <ShieldCheck size={24} /> : <Terminal size={24} />}
          </div>
          <div>
            <h4 className="text-xl font-bold text-slate-900 dark:text-white">{title}</h4>
            <div className="flex items-center gap-2 mt-1">
              <div className={`w-2 h-2 rounded-full bg-${status === 'online' ? 'emerald' : 'amber'}-500 animate-pulse`}></div>
              <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">{status}</span>
            </div>
          </div>
        </div>
        <a 
          href={url} 
          target="_blank" 
          rel="noopener noreferrer"
          className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl text-slate-400 hover:text-teal-500 hover:bg-teal-50 dark:hover:bg-teal-500/10 transition-all"
        >
          <ExternalLink size={20} />
        </a>
      </div>

      <div className="space-y-4 relative z-10">
        <div className="flex justify-between items-center p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-800">
          <span className="text-sm font-bold text-slate-500">Active URL</span>
          <div className="flex items-center gap-3">
            <code className="text-sm text-slate-600 dark:text-slate-300 font-mono">{url.replace('https://', '')}</code>
            <button onClick={() => copyToClipboard(url)} className="text-slate-400 hover:text-teal-500 transition-colors">
              <Copy size={16} />
            </button>
          </div>
        </div>

        {credentials && (
          <div className="p-4 bg-amber-500/5 border border-amber-500/10 rounded-2xl space-y-2">
            <p className="text-[10px] font-black text-amber-600 uppercase tracking-wider mb-2">Access Credentials</p>
            <div className="flex justify-between text-xs">
              <span className="text-slate-500 font-bold tracking-tight">User:</span>
              <span className="text-slate-700 dark:text-slate-300 font-mono">{credentials.username}</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-slate-500 font-bold tracking-tight">Pass:</span>
              <div className="flex items-center gap-2">
                <span className="text-slate-700 dark:text-slate-300 font-mono">••••••••</span>
                <button onClick={() => copyToClipboard(credentials.password)} className="text-slate-400 hover:text-teal-500 transition-colors">
                  <Copy size={12} />
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="flex items-center gap-6 pt-4 border-t border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <History size={14} className="text-slate-400" />
            <span className="text-xs text-slate-500 font-bold">Build: <span className="text-slate-700 dark:text-slate-300">v{build}</span></span>
          </div>
          <div className="flex items-center gap-2">
            <Activity size={14} className="text-slate-400" />
            <span className="text-xs text-slate-500 font-bold">Health: <span className="text-emerald-500">100%</span></span>
          </div>
        </div>
      </div>
    </div>
  );
};

const EnvironmentManager = ({ envData }) => {
  // Mock data if none provided
  const data = envData || [
    {
      title: 'Production',
      url: 'https://monarch-realestate.toolbite.app',
      status: 'online',
      build: '1.4.2-stable',
      color: 'teal'
    },
    {
      title: 'Staging',
      url: 'https://staging.monarch.toolbite.app',
      status: 'online',
      build: '1.5.0-rc1',
      color: 'blue',
      credentials: {
        username: 'client_admin',
        password: 'premium_access_2024'
      }
    }
  ];

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h3 className="text-2xl font-black text-slate-900 dark:text-white flex items-center gap-3">
             <Server className="text-teal-500" />
             Environment Manager
          </h3>
          <p className="text-slate-500 dark:text-slate-400 font-medium">Manage your active builds and access secrets.</p>
        </div>
        <div className="flex gap-2">
           <button className="px-5 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-sm font-bold flex items-center gap-2 hover:bg-slate-50 transition-colors">
              <Code2 size={16} /> Update Config
           </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {data.map((env, i) => (
          <motion.div
            key={env.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <EnvironmentCard {...env} />
          </motion.div>
        ))}
      </div>

      {/* Infrastructure Summary */}
      <div className="bg-slate-900 rounded-3xl p-8 text-white relative overflow-hidden">
         <div className="absolute top-0 right-0 w-64 h-64 bg-teal-500/10 blur-[100px] pointer-events-none"></div>
         <div className="relative z-10 flex flex-col md:flex-row items-center gap-8 justify-between">
            <div className="flex items-center gap-6">
               <div className="p-4 bg-white/5 border border-white/10 rounded-2xl">
                  <Activity size={32} className="text-teal-400" />
               </div>
               <div>
                  <h4 className="text-lg font-bold">Infrasctructure Health</h4>
                  <p className="text-slate-400 text-sm">Edge Network: Global | SSL: Active | CDN: Purged 2h ago</p>
               </div>
            </div>
            <button className="px-6 py-3 bg-teal-500 text-slate-900 font-bold rounded-xl shadow-lg shadow-teal-500/20 hover:scale-105 transition-transform">
               Purge Global Cache
            </button>
         </div>
      </div>
    </div>
  );
};

export default EnvironmentManager;

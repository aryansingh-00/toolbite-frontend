import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  CreditCard, TrendingUp, Sliders, Smartphone, Wifi, Battery,
  ChevronRight, ArrowUpRight, ArrowDownLeft, Zap, Sparkles, Moon, Sun
} from 'lucide-react';

const MobileSimulator = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [isSimDarkMode, setIsSimDarkMode] = useState(true);
  const [activeChartFilter, setActiveChartFilter] = useState('revenue');
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMsg, setNotificationMsg] = useState('');

  // Simulated live data
  const transactions = [
    { name: 'Stripe Payout', time: '10:42 AM', amount: '+$3,450.00', positive: true, icon: <ArrowDownLeft className="text-emerald-500 w-4 h-4" /> },
    { name: 'Server Hosting', time: 'Yesterday', amount: '-$89.00', positive: false, icon: <ArrowUpRight className="text-rose-500 w-4 h-4" /> },
    { name: 'Figma Pro subscription', time: 'May 24', amount: '-$15.00', positive: false, icon: <ArrowUpRight className="text-rose-500 w-4 h-4" /> }
  ];

  const chartData = {
    revenue: "M 10 90 Q 60 20 110 50 T 210 10 T 290 30",
    customers: "M 10 90 Q 60 70 110 30 T 210 40 T 290 10",
    conversion: "M 10 90 Q 60 40 110 60 T 210 20 T 290 15"
  };

  const triggerNotification = (msg) => {
    setNotificationMsg(msg);
    setShowNotification(true);
    setTimeout(() => {
      setShowNotification(false);
    }, 2500);
  };

  return (
    <div className="relative flex justify-center items-center py-6 w-full select-none">
      
      {/* 3D Glassmorphism back glow */}
      <div className="absolute -inset-10 bg-gradient-to-tr from-[#B19CD9]/20 via-[#FFB6C1]/20 to-[#87CEEB]/20 blur-3xl rounded-[4rem] pointer-events-none"></div>

      {/* Simulator Side Buttons */}
      <div className="absolute left-[calc(50%-165px)] top-[140px] w-[5px] h-[50px] bg-slate-800 rounded-l-md z-0 shadow-lg"></div>
      <div className="absolute left-[calc(50%-165px)] top-[200px] w-[5px] h-[40px] bg-slate-800 rounded-l-md z-0 shadow-lg"></div>
      <div className="absolute left-[calc(50%-165px)] top-[250px] w-[5px] h-[40px] bg-slate-800 rounded-l-md z-0 shadow-lg"></div>
      <div className="absolute right-[calc(50%-165px)] top-[170px] w-[5px] h-[65px] bg-slate-800 rounded-r-md z-0 shadow-lg"></div>

      {/* Main Phone Chassis Container */}
      <div className="w-[320px] aspect-[9/18.5] bg-slate-950 rounded-[50px] p-[10px] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.5)] border-2 border-slate-800/80 z-10 flex flex-col items-stretch overflow-hidden relative">
        
        {/* Screen Bezel / Glass finish */}
        <div className={`w-full h-full rounded-[42px] overflow-hidden flex flex-col justify-between relative transition-colors duration-500 ${isSimDarkMode ? 'bg-slate-900 text-white' : 'bg-slate-50 text-slate-900'}`}>
          
          {/* Dynamic Island Notch */}
          <div className="absolute top-3 left-1/2 -translate-x-1/2 w-[110px] h-[26px] bg-slate-950 rounded-full z-30 flex items-center justify-between px-3 shadow-md">
            <div className="w-1.5 h-1.5 rounded-full bg-slate-800"></div>
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              <div className="w-2.5 h-2.5 rounded-full bg-indigo-900/60 flex items-center justify-center">
                <div className="w-1 h-1 rounded-full bg-blue-400"></div>
              </div>
            </div>
          </div>

          {/* iOS Status Bar */}
          <div className={`h-11 flex justify-between items-end px-6 pb-1 text-[10px] font-black tracking-tight z-20 ${isSimDarkMode ? 'text-white' : 'text-slate-950'}`}>
            <span>9:41</span>
            <div className="flex items-center gap-1.5">
              <Smartphone size={10} className="opacity-90" />
              <Wifi size={10} className="opacity-90" />
              <Battery size={12} className="opacity-90" />
            </div>
          </div>

          {/* Active Toast Notification Inside Simulator */}
          <AnimatePresence>
            {showNotification && (
              <motion.div
                initial={{ opacity: 0, y: -50, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.9 }}
                className="absolute top-14 left-4 right-4 bg-slate-950/90 dark:bg-white/95 text-white dark:text-black p-3 rounded-2xl shadow-xl z-50 flex items-center gap-2 border border-white/10 dark:border-black/5"
              >
                <Sparkles size={16} className="text-teal-400 dark:text-teal-600 flex-shrink-0" />
                <p className="text-[10px] font-extrabold leading-tight">{notificationMsg}</p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Central App Workspace */}
          <div className="flex-1 overflow-y-auto overflow-x-hidden hide-scrollbar px-4 pt-2 flex flex-col justify-start">
            <AnimatePresence mode="wait">
              
              {/* 1. HOME TAB */}
              {activeTab === 'home' && (
                <motion.div
                  key="home"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  transition={{ duration: 0.25 }}
                  className="flex flex-col flex-1"
                >
                  {/* Greeting & Quick balance */}
                  <div className="mb-4 mt-1 flex justify-between items-center">
                    <div>
                      <p className={`text-[10px] font-black uppercase tracking-wider ${isSimDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>Operational Cash</p>
                      <h5 className="text-2xl font-black tracking-tight">$42,950.00</h5>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-teal-400 to-indigo-500 p-[1.5px] shadow-md flex items-center justify-center">
                      <div className="w-full h-full rounded-full bg-slate-950 flex items-center justify-center text-[10px] font-bold text-white">AS</div>
                    </div>
                  </div>

                  {/* Dynamic Swipeable Credit Card */}
                  <motion.div 
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => triggerNotification('Card copied to clipboard! 💳')}
                    className="w-full aspect-[1.6/1] rounded-3xl bg-gradient-to-br from-indigo-600 via-fuchsia-600 to-pink-500 p-5 flex flex-col justify-between shadow-lg relative overflow-hidden group cursor-pointer mb-5 border border-white/10"
                  >
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl pointer-events-none group-hover:scale-125 transition-transform duration-700"></div>
                    <div className="flex justify-between items-start z-10">
                      <div>
                        <p className="text-[8px] font-bold tracking-widest text-white/70 uppercase">ToolBite Corporate</p>
                        <p className="text-sm font-black tracking-wider text-white mt-0.5">Titanium Black</p>
                      </div>
                      <Zap size={16} className="text-teal-300 animate-pulse" />
                    </div>
                    <div className="z-10 mt-auto">
                      <p className="text-xs font-black tracking-[0.25em] text-white">••••  ••••  ••••  2026</p>
                      <div className="flex justify-between items-end mt-2">
                        <span className="text-[8px] font-semibold text-white/60">ARYAN SINGH</span>
                        <span className="text-[9px] font-black text-white bg-slate-950/40 px-2 py-0.5 rounded-md">VISA</span>
                      </div>
                    </div>
                  </motion.div>

                  {/* App Action Grid */}
                  <div className="grid grid-cols-3 gap-2.5 mb-5">
                    {['Send', 'Request', 'Analytics'].map((act, i) => (
                      <button title="Interactive Button" aria-label="Interactive Button"
                        key={act}
                        onClick={() => {
                          if (act === 'Analytics') {
                            setActiveTab('analytics');
                          } else {
                            triggerNotification(`Submitting custom ${act.toLowerCase()} request...`);
                          }
                        }}
                        className={`py-3.5 rounded-2xl flex flex-col items-center gap-1.5 transition-all active:scale-95 border ${isSimDarkMode ? 'bg-slate-800/40 border-white/5 hover:bg-slate-800/70 text-white' : 'bg-white border-slate-200 hover:bg-slate-50 text-slate-800 shadow-sm'}`}
                      >
                        {i === 0 ? <ArrowUpRight size={14} className="text-teal-400" /> : i === 1 ? <ArrowDownLeft size={14} className="text-pink-400" /> : <TrendingUp size={14} className="text-indigo-400" />}
                        <span className="text-[9px] font-black uppercase tracking-wider">{act}</span>
                      </button>
                    ))}
                  </div>

                  {/* Transaction Feed */}
                  <div className="flex justify-between items-center mb-3">
                    <p className={`text-[10px] font-black uppercase tracking-wider ${isSimDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>Recent Events</p>
                    <span className="text-[9px] font-black text-indigo-400 cursor-pointer hover:underline">See All</span>
                  </div>
                  <div className="flex flex-col gap-2 mb-4">
                    {transactions.map((tx, idx) => (
                      <div
                        key={idx}
                        onClick={() => triggerNotification(`Details: ${tx.name} (${tx.amount})`)}
                        className={`p-3 rounded-2xl flex items-center justify-between border cursor-pointer active:scale-[0.99] transition-all ${isSimDarkMode ? 'bg-slate-800/25 border-white/5 hover:bg-slate-800/50' : 'bg-white border-slate-100 hover:bg-slate-50/80 shadow-sm'}`}
                      >
                        <div className="flex items-center gap-2.5">
                          <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${isSimDarkMode ? 'bg-slate-800' : 'bg-slate-100'}`}>
                            {tx.icon}
                          </div>
                          <div>
                            <p className="text-[10px] font-black tracking-tight leading-tight">{tx.name}</p>
                            <p className={`text-[8px] font-semibold ${isSimDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>{tx.time}</p>
                          </div>
                        </div>
                        <span className={`text-[10px] font-black tracking-tight ${tx.positive ? 'text-emerald-500' : 'text-rose-500'}`}>{tx.amount}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* 2. ANALYTICS TAB */}
              {activeTab === 'analytics' && (
                <motion.div
                  key="analytics"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  transition={{ duration: 0.25 }}
                  className="flex flex-col flex-1"
                >
                  <div className="mb-4 mt-1">
                    <p className={`text-[10px] font-black uppercase tracking-wider ${isSimDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>Performance Index</p>
                    <h5 className="text-2xl font-black tracking-tight flex items-center gap-2">
                      98.7%
                      <span className="text-[10px] font-black text-emerald-500 px-2 py-0.5 bg-emerald-500/10 rounded-full">+4.2% ↑</span>
                    </h5>
                  </div>

                  {/* Filter Buttons */}
                  <div className="flex gap-1.5 p-1 bg-slate-950/20 dark:bg-slate-200/50 rounded-xl mb-4 border border-white/5">
                    {['revenue', 'customers', 'conversion'].map((filter) => (
                      <button title="Interactive Button" aria-label="Interactive Button"
                        key={filter}
                        onClick={() => {
                          setActiveChartFilter(filter);
                          triggerNotification(`Viewing simulated ${filter} parameters...`);
                        }}
                        className={`flex-1 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all ${activeChartFilter === filter ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-md scale-105' : 'text-slate-400 hover:text-white'}`}
                      >
                        {filter.substring(0, 4)}
                      </button>
                    ))}
                  </div>

                  {/* Core Vector Chart SVG Canvas */}
                  <div className={`w-full aspect-[1.5/1] rounded-3xl p-4 border relative overflow-hidden flex flex-col justify-between ${isSimDarkMode ? 'bg-slate-800/30 border-white/5' : 'bg-white border-slate-100 shadow-sm'}`}>
                    <div className="absolute top-3 left-4 flex gap-1 items-center">
                      <div className="w-2 h-2 rounded-full bg-teal-400 animate-ping"></div>
                      <span className="text-[8px] font-black uppercase tracking-wider text-teal-400">Live Metric Stream</span>
                    </div>

                    <svg className="w-full h-32 mt-4" viewBox="0 0 300 100" fill="none">
                      {/* Grid Lines */}
                      <line x1="0" y1="20" x2="300" y2="20" stroke={isSimDarkMode ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.04)"} strokeDasharray="3 3" />
                      <line x1="0" y1="50" x2="300" y2="50" stroke={isSimDarkMode ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.04)"} strokeDasharray="3 3" />
                      <line x1="0" y1="80" x2="300" y2="80" stroke={isSimDarkMode ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.04)"} strokeDasharray="3 3" />

                      {/* Smooth Area Gradient */}
                      <defs>
                        <linearGradient id="chartGlow" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#14b8a6" stopOpacity="0.4" />
                          <stop offset="100%" stopColor="#14b8a6" stopOpacity="0.0" />
                        </linearGradient>
                      </defs>

                      {/* Vector line chart */}
                      <motion.path
                        key={activeChartFilter}
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 0.8, ease: 'easeOut' }}
                        d={chartData[activeChartFilter]}
                        stroke="url(#chartLineGradient)"
                        strokeWidth="4"
                        strokeLinecap="round"
                      />

                      <defs>
                        <linearGradient id="chartLineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#14b8a6" />
                          <stop offset="50%" stopColor="#6366f1" />
                          <stop offset="100%" stopColor="#ec4899" />
                        </linearGradient>
                      </defs>
                    </svg>

                    <div className="flex justify-between items-center text-[8px] font-black tracking-wider text-slate-500 mt-2">
                      <span>MON</span>
                      <span>WED</span>
                      <span>FRI</span>
                      <span>SUN</span>
                    </div>
                  </div>

                  {/* Core Web Vitals Micro Benchmarks */}
                  <div className="mt-4 flex flex-col gap-2">
                    <div className={`p-3 rounded-2xl flex items-center justify-between border ${isSimDarkMode ? 'bg-slate-800/25 border-white/5' : 'bg-white border-slate-100 shadow-sm'}`}>
                      <span className="text-[9px] font-black uppercase tracking-wider text-slate-400">Response Speed</span>
                      <span className="text-[10px] font-black text-teal-400">120ms (Sub-second)</span>
                    </div>
                    <div className={`p-3 rounded-2xl flex items-center justify-between border ${isSimDarkMode ? 'bg-slate-800/25 border-white/5' : 'bg-white border-slate-100 shadow-sm'}`}>
                      <span className="text-[9px] font-black uppercase tracking-wider text-slate-400">Core Web Vitals</span>
                      <span className="text-[10px] font-black text-emerald-400">Perfect 100/100</span>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* 3. SETTINGS TAB */}
              {activeTab === 'settings' && (
                <motion.div
                  key="settings"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  transition={{ duration: 0.25 }}
                  className="flex flex-col flex-1"
                >
                  <div className="mb-4 mt-1">
                    <p className={`text-[10px] font-black uppercase tracking-wider ${isSimDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>App Preferences</p>
                    <h5 className="text-2xl font-black tracking-tight">System Settings</h5>
                  </div>

                  {/* Settings Stack */}
                  <div className="flex flex-col gap-3">
                    
                    {/* Toggle Simulated Dark Mode */}
                    <div 
                      onClick={() => {
                        setIsSimDarkMode(!isSimDarkMode);
                        triggerNotification(`Theme toggled to ${!isSimDarkMode ? 'Dark' : 'Light'} Mode!`);
                      }}
                      className={`p-4 rounded-2xl flex justify-between items-center border cursor-pointer transition-all active:scale-[0.99] ${isSimDarkMode ? 'bg-slate-800/25 border-white/5 hover:bg-slate-800/50' : 'bg-white border-slate-100 hover:bg-slate-50/80 shadow-sm'}`}
                    >
                      <div className="flex items-center gap-2.5">
                        {isSimDarkMode ? <Moon size={14} className="text-indigo-400" /> : <Sun size={14} className="text-amber-500" />}
                        <span className="text-[10px] font-black uppercase tracking-wider">Device Theme</span>
                      </div>
                      <div className={`w-8 h-4 rounded-full p-0.5 transition-colors duration-300 ${isSimDarkMode ? 'bg-teal-500' : 'bg-slate-300'}`}>
                        <div className={`w-3 h-3 bg-white rounded-full transition-transform duration-300 ${isSimDarkMode ? 'translate-x-4' : 'translate-x-0'}`}></div>
                      </div>
                    </div>

                    {/* App Platform Toggle */}
                    <div 
                      onClick={() => triggerNotification('Native compilation initialized! 🚀')}
                      className={`p-4 rounded-2xl flex justify-between items-center border cursor-pointer transition-all active:scale-[0.99] ${isSimDarkMode ? 'bg-slate-800/25 border-white/5 hover:bg-slate-800/50' : 'bg-white border-slate-100 hover:bg-slate-50/80 shadow-sm'}`}
                    >
                      <div className="flex items-center gap-2.5">
                        <Smartphone size={14} className="text-teal-400" />
                        <span className="text-[10px] font-black uppercase tracking-wider">Cross-Platform</span>
                      </div>
                      <span className="text-[9px] font-extrabold text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded-md uppercase">React Native</span>
                    </div>

                    {/* Developer Credit Info */}
                    <div className={`p-5 rounded-[2rem] border mt-4 text-center ${isSimDarkMode ? 'bg-gradient-to-tr from-indigo-950/20 to-slate-900 border-white/5' : 'bg-slate-100 border-slate-200'}`}>
                      <Sparkles size={20} className="text-indigo-400 mx-auto mb-2 animate-spin-slow" />
                      <p className="text-[9px] font-black uppercase tracking-wider text-indigo-400 mb-1">Architected by</p>
                      <p className="text-xs font-black tracking-tight">ToolBite Engineering</p>
                      <p className={`text-[8px] font-semibold mt-2 ${isSimDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>Sub-second compiled layouts, clean state controllers, and 60FPS fluid motions.</p>
                    </div>

                  </div>
                </motion.div>
              )}

            </AnimatePresence>
          </div>

          {/* Bottom Simulated Tab Navigation Bar */}
          <div className={`h-[68px] border-t flex justify-around items-center px-4 backdrop-blur-md z-20 transition-colors duration-500 ${isSimDarkMode ? 'bg-slate-900/90 border-white/5' : 'bg-white/90 border-slate-100'}`}>
            {[
              { id: 'home', icon: <CreditCard size={18} />, label: 'Home' },
              { id: 'analytics', icon: <TrendingUp size={18} />, label: 'Stats' },
              { id: 'settings', icon: <Sliders size={18} />, label: 'Settings' }
            ].map((tab) => (
              <button title="Interactive Button" aria-label="Interactive Button"
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  triggerNotification(`Switched screen to simulated ${tab.label}...`);
                }}
                className="flex flex-col items-center justify-center gap-0.5 w-12 h-12 transition-all relative"
              >
                {activeTab === tab.id && (
                  <motion.div
                    layoutId="simActiveTabGlow"
                    className="absolute -top-1 w-5 h-1 rounded-full bg-teal-400"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                <div className={`transition-colors duration-300 ${activeTab === tab.id ? 'text-teal-400' : isSimDarkMode ? 'text-slate-400 hover:text-white' : 'text-slate-400 hover:text-slate-900'}`}>
                  {tab.icon}
                </div>
                <span className={`text-[8px] font-black tracking-widest uppercase transition-colors duration-300 ${activeTab === tab.id ? 'text-teal-400' : 'text-slate-500'}`}>
                  {tab.label}
                </span>
              </button>
            ))}
          </div>

          {/* iOS Bottom Simulated Gesture Pill */}
          <div className="h-4 w-full flex justify-center items-center pb-1">
            <div className={`h-[4px] w-24 rounded-full ${isSimDarkMode ? 'bg-white/20' : 'bg-slate-350'}`}></div>
          </div>

        </div>
      </div>
      
    </div>
  );
};

export default MobileSimulator;

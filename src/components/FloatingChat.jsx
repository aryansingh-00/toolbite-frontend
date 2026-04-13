 
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Sparkles, Phone } from 'lucide-react';

const FloatingChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showNudge, setShowNudge] = useState(false);

  useEffect(() => {
    // Auto-nudge after 5 seconds
    const timer = setTimeout(() => {
      setShowNudge(true);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      
      {/* Mini Nudge Message */}
      <AnimatePresence>
        {showNudge && !isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5, x: 20 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.5, x: 20 }}
            onClick={() => { setIsOpen(true); setShowNudge(false); }}
            className="bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 p-5 rounded-[2rem] shadow-2xl mb-4 cursor-pointer max-w-[240px] relative transition-all hover:scale-105"
          >
            <div className="absolute -bottom-2 right-6 w-4 h-4 bg-white dark:bg-slate-900 border-r-2 border-b-2 border-slate-200 dark:border-slate-800 rotate-45"></div>
            <div className="flex items-center gap-2 mb-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">Online Now</span>
            </div>
            <p className="text-sm font-bold text-slate-800 dark:text-slate-200 leading-tight">
              👋 Need a custom quote or have a question? I'm available!
            </p>
          </motion.div>
        )}
      </AnimatePresence>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="bg-white rounded-2xl shadow-2xl border border-slate-100 w-80 mb-4 overflow-hidden origin-bottom-right"
          >
            <div className="bg-gradient-to-r from-teal-600 to-emerald-500 p-6 text-white text-center">
              <div className="w-16 h-16 rounded-full bg-white/20 border-2 border-white/30 flex items-center justify-center mx-auto mb-3 shadow-inner">
                <span className="font-black text-xl">TB</span>
              </div>
              <h4 className="font-bold text-xl mb-1 capitalize">ToolBite Support</h4>
              <div className="flex items-center justify-center gap-1.5 opacity-80">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-300 animate-pulse"></div>
                <p className="text-sm font-medium">Replies in under 5 minutes</p>
              </div>
            </div>
            
            <div className="p-6 bg-slate-50 dark:bg-slate-800/50 space-y-4">
              <div className="flex gap-3">
                <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl rounded-tl-sm shadow-sm border border-slate-100 dark:border-slate-700 text-sm font-medium text-slate-700 dark:text-slate-300 leading-relaxed">
                  Welcome back! 👋 <br/><br/> Looking for a custom build or interested in one of our premium templates?
                </div>
              </div>
            </div>

            <div className="p-6 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 flex flex-col gap-3">
              <a href="https://wa.me/919598037255" target="_blank" rel="noreferrer" className="w-full flex items-center justify-center gap-3 py-4 bg-[#25D366] text-white rounded-2xl font-black text-sm hover:opacity-90 hover:scale-[1.02] transition-all shadow-lg shadow-[#25D366]/20">
                <span className="bg-white/20 p-1 rounded-lg"><Phone size={14} fill="white" /></span>
                Open WhatsApp Chat
              </a>
              <a href="/#ai-strategist" onClick={() => setIsOpen(false)} className="w-full flex items-center justify-center gap-2 py-3 bg-teal-50 dark:bg-teal-900/30 text-teal-700 dark:text-teal-400 border border-teal-200 dark:border-teal-800 rounded-2xl font-bold text-sm hover:bg-teal-100 dark:hover:bg-teal-900/50 transition-colors">
                <Sparkles size={16} />
                Chat with AI Strategist
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-16 h-16 bg-slate-900 text-white rounded-full flex items-center justify-center shadow-2xl hover:bg-teal-600 transition-all duration-300 relative group"
        aria-label="Toggle chat"
      >
        {!isOpen && (
          <div className="absolute inset-0 w-full h-full bg-teal-500 rounded-full animate-ping opacity-20 group-hover:opacity-0 transition-opacity"></div>
        )}
        {isOpen ? <X size={28} className="transform rotate-90 hover:rotate-0 transition-transform duration-300" /> : <MessageCircle size={28} className="group-hover:animate-pulse" />}
      </button>

    </div>
  );
};

export default FloatingChat;


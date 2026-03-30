/* eslint-disable */
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Navigation, Phone } from 'lucide-react';

const FloatingChat = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="bg-white rounded-2xl shadow-2xl border border-slate-100 w-80 mb-4 overflow-hidden origin-bottom-right"
          >
            <div className="bg-gradient-to-r from-teal-600 to-emerald-500 p-5 text-white">
              <h4 className="font-bold text-lg mb-1">Hey there! 👋</h4>
              <p className="text-teal-50 text-sm">We usually reply within a few minutes.</p>
            </div>
            
            <div className="p-5 bg-slate-50 space-y-4">
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-teal-100 text-teal-600 flex items-center justify-center shrink-0 mt-1 font-extrabold text-xs uppercase shadow-sm">
                  TB
                </div>
                <div className="bg-white p-4 rounded-2xl rounded-tl-sm shadow-sm border border-slate-100 text-sm font-medium text-slate-700 leading-relaxed">
                  Welcome to ToolBite! Are you looking for a ready-made template or a completely custom website build?
                </div>
              </div>
            </div>

            <div className="p-4 bg-white border-t border-slate-100 flex flex-col gap-2">
              <a href="https://wa.me/919598037255" target="_blank" rel="noreferrer" className="w-full flex items-center justify-center gap-2 py-3 bg-[#25D366] text-white rounded-xl font-bold text-sm hover:opacity-90 transition-opacity shadow-sm shadow-[#25D366]/20">
                <Phone size={16} fill="currentColor" />
                Chat on WhatsApp
              </a>
              <a href="/#contact" onClick={() => setIsOpen(false)} className="w-full flex items-center justify-center gap-2 py-3 bg-slate-50 text-slate-700 border border-slate-200 rounded-xl font-bold text-sm hover:bg-slate-100 transition-colors">
                <Navigation size={16} />
                Leave a Message
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


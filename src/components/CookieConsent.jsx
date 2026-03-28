import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX } from 'react-icons/fi';

const CookieConsent = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if user has already made a choice
    const consent = localStorage.getItem('toolbite_cookie_consent');
    if (!consent) {
      // Delay showing it slightly for a better user experience
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('toolbite_cookie_consent', 'accepted');
    setIsVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem('toolbite_cookie_consent', 'declined');
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 50, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          className="fixed bottom-4 left-4 right-4 md:left-auto md:right-6 md:w-[400px] bg-white rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.1)] border border-slate-100 p-6 z-[100]"
        >
          <div className="flex justify-between items-start mb-3">
            <div className="flex items-center gap-2">
              <span className="text-xl">🍪</span>
              <h3 className="font-bold text-slate-800">We value your privacy</h3>
            </div>
            <button 
              onClick={handleDecline}
              className="text-slate-400 hover:text-slate-600 transition-colors p-1"
              aria-label="Close"
            >
              <FiX className="w-5 h-5" />
            </button>
          </div>
          
          <p className="text-sm text-slate-600 mb-5 leading-relaxed">
            We use cookies to enhance your browsing experience, display personalized content, and analyze our traffic. By clicking "<span className="font-semibold text-slate-700">Accept All</span>", you consent to our use of cookies according to our{' '}
            <Link to="/cookie-policy" onClick={handleDecline} className="text-blue-600 hover:text-blue-800 font-medium underline-offset-2 hover:underline">
              Cookie Policy
            </Link>.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={handleDecline}
              className="w-full sm:w-1/2 px-4 py-2.5 rounded-xl border-2 border-slate-100 text-slate-700 font-semibold hover:bg-slate-50 transition-colors text-sm"
            >
              Decline
            </button>
            <button
              onClick={handleAccept}
              className="w-full sm:w-1/2 px-4 py-2.5 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 shadow-md shadow-blue-600/20 transition-all text-sm"
            >
              Accept All
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CookieConsent;

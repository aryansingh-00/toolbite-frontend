
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Gift, Check, Send } from 'lucide-react';

const ExitIntentModal = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [hasShown, setHasShown] = useState(false);
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // idle, sending, success

  useEffect(() => {
    // Check if modal has already been shown in this session
    const shown = sessionStorage.getItem('exit_intent_shown');
    if (shown) setHasShown(true);

    const handleMouseOut = (e) => {
      // Trigger if mouse leaves the top of the viewport and hasn't shown yet
      if (!hasShown && e.clientY <= 0) {
        setIsVisible(true);
        setHasShown(true);
        sessionStorage.setItem('exit_intent_shown', 'true');
      }
    };

    document.addEventListener('mouseleave', handleMouseOut);
    return () => document.removeEventListener('mouseleave', handleMouseOut);
  }, [hasShown]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;

    setStatus('sending');
    
    try {
      const response = await fetch("https://formsubmit.co/ajax/hello.toolbite@gmail.com", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          email: email,
          type: "Exit Intent - Web ROI Checklist Request"
        })
      });

      if (response.ok) {
        setStatus('success');
      } else {
        setStatus('idle');
        alert("Something went wrong. Please try again.");
      }
    } catch {
      setStatus('idle');
      alert("Submission failed. Please check your connection.");
    }
  };

  const closePortal = () => setIsVisible(false);

  return (
    <AnimatePresence>
      {isVisible && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closePortal}
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative bg-white dark:bg-slate-900 w-full max-w-xl rounded-[2.5rem] overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-800"
          >
            {/* Close Button */}
            <button
              onClick={closePortal}
              className="absolute top-6 right-6 p-2 text-slate-400 hover:text-slate-600 dark:hover:text-white transition-colors z-10"
            >
              <X size={24} />
            </button>

            <div className="flex flex-col md:flex-row h-full">
              {/* Left Side: Visual/Accent */}
              <div className="hidden md:flex md:w-40 bg-gradient-to-br from-teal-500 to-emerald-600 items-center justify-center">
                <Gift size={64} className="text-white opacity-40 animate-bounce" />
              </div>

              {/* Right Side: Form */}
              <div className="flex-1 p-8 md:p-12">
                {status === 'success' ? (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center py-8"
                  >
                    <div className="w-20 h-20 bg-emerald-100 dark:bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                      <Check className="text-emerald-600" size={40} />
                    </div>
                    <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-4">Request Sent!</h2>
                    <p className="text-slate-600 dark:text-slate-400">
                      Chek your inbox! We've sent the **Web ROI Checklist** directly to your email.
                    </p>
                    <button
                      onClick={closePortal}
                      className="mt-8 px-8 py-3 bg-slate-900 dark:bg-white dark:text-slate-900 text-white font-bold rounded-xl hover:scale-105 transition-transform"
                    >
                      Awesome, thanks!
                    </button>
                  </motion.div>
                ) : (
                  <>
                    <h2 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white mb-4 leading-tight">
                      Wait! Don't Miss <span className="text-teal-500">Your Gift.</span>
                    </h2>
                    <p className="text-slate-600 dark:text-slate-400 mb-8 text-lg font-medium">
                      Get our exclusive **Web ROI Checklist** (valued at $99) absolutely free before you leave.
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="relative">
                        <input
                          type="email"
                          required
                          placeholder="Your professional email..."
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full px-6 py-4 bg-slate-50 dark:bg-slate-800 border-2 border-slate-100 dark:border-slate-700 rounded-2xl focus:outline-none focus:ring-4 focus:ring-teal-500/10 focus:border-teal-500 dark:text-white transition-all text-lg"
                        />
                      </div>
                      <button
                        type="submit"
                        disabled={status === 'sending'}
                        className="w-full py-5 bg-teal-500 hover:bg-teal-400 text-slate-900 font-black text-lg rounded-2xl shadow-xl shadow-teal-500/20 transition-all active:scale-95 flex items-center justify-center gap-3 disabled:opacity-50"
                      >
                        {status === 'sending' ? (
                          'sending...'
                        ) : (
                          <>
                            Claim My Free Checklist
                            <Send size={20} />
                          </>
                        )}
                      </button>
                    </form>
                    <p className="text-center text-xs text-slate-400 mt-6 font-bold uppercase tracking-widest">
                      🔒 Your data is safe. NO spam, ever.
                    </p>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ExitIntentModal;

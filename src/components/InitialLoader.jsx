import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const MIN_DISPLAY_TIME = 800; // 800ms minimum display time to prevent flashing
const MAX_FALLBACK_TIME = 5000; // 5s safety fallback

const InitialLoader = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    // 1. Check prefers-reduced-motion
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    const handleMotionChange = (e) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handleMotionChange);

    const startTime = Date.now();
    let minTimer = null;
    let fallbackTimer = null;

    const completeLoading = () => {
      const elapsedTime = Date.now() - startTime;
      const remainingTime = Math.max(0, MIN_DISPLAY_TIME - elapsedTime);

      minTimer = setTimeout(() => {
        setIsVisible(false);
      }, remainingTime);
    };

    // Check readiness state
    if (document.readyState === 'complete') {
      completeLoading();
    } else {
      window.addEventListener('load', completeLoading, { once: true });
    }

    // Safety fallback maximum timeout (5 seconds)
    fallbackTimer = setTimeout(() => {
      setIsVisible(false);
    }, MAX_FALLBACK_TIME);

    return () => {
      window.removeEventListener('load', completeLoading);
      if (minTimer) clearTimeout(minTimer);
      if (fallbackTimer) clearTimeout(fallbackTimer);
      mediaQuery.removeEventListener('change', handleMotionChange);
    };
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="initial-loader"
          role="status"
          aria-live="polite"
          initial={{ opacity: 1, y: 0 }}
          exit={
            prefersReducedMotion
              ? { opacity: 0 }
              : {
                  opacity: 0,
                  y: -10,
                  transition: {
                    duration: 0.5,
                    ease: [0.22, 1, 0.36, 1],
                  },
                }
          }
          className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-[#050816] text-white select-none overflow-hidden"
        >
          {/* Subtle Ambient Background Gradient Blur */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/10 rounded-full blur-[120px] pointer-events-none" />

          {/* Centered Brand Content */}
          <motion.div
            initial={
              prefersReducedMotion
                ? { opacity: 1 }
                : { opacity: 0, scale: 0.95 }
            }
            animate={
              prefersReducedMotion
                ? { opacity: 1 }
                : { opacity: 1, scale: 1 }
            }
            exit={
              prefersReducedMotion
                ? { opacity: 0 }
                : { scale: 0.96, opacity: 0 }
            }
            transition={{
              duration: 0.6,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="flex flex-col items-center relative z-10 px-4 text-center"
          >
            {/* Logo Mark & Text */}
            <div className="flex items-center gap-3 mb-8">
              <motion.svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 80 80"
                fill="none"
                animate={
                  prefersReducedMotion
                    ? {}
                    : {
                        opacity: [1, 0.85, 1],
                      }
                }
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="w-10 h-10 md:w-12 md:h-12 text-white"
              >
                <path
                  d="M 68,32 L68,23 L 40,5 L 10,22 L 10,58 L 40,75 L 68,57 L 68,48"
                  stroke="currentColor"
                  strokeWidth="4.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M 61,32 L 61,26 L 40,12 L 16,26 L 16,54 L 40,68 L 61,54 L 61,48"
                  stroke="currentColor"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <polygon points="30,28 30,52 52,40" fill="currentColor" />
              </motion.svg>
              <span className="text-2xl md:text-3xl font-display font-bold tracking-tight text-white">
                ToolBite
              </span>
            </div>

            {/* Option A — Technical Sweep Progress Line */}
            <div className="w-36 md:w-44 h-[2px] bg-white/10 rounded-full overflow-hidden relative mb-4">
              <motion.div
                animate={
                  prefersReducedMotion
                    ? {}
                    : {
                        x: ['-100%', '200%'],
                      }
                }
                transition={{
                  duration: 1.4,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="w-1/2 h-full bg-gradient-to-r from-transparent via-primary to-accent"
              />
            </div>

            {/* Subtle Loading Text */}
            <span className="text-[11px] font-mono tracking-[0.2em] text-slate-400 uppercase font-medium">
              Loading experience...
            </span>

            {/* Optional Brand Phrase */}
            <p className="mt-4 text-xs font-sans text-slate-500 font-normal tracking-wide max-w-xs leading-relaxed">
              Building digital products that move businesses forward.
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default InitialLoader;

import React, { useEffect, useRef } from 'react';

const NativeAdBanner = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = document.getElementById('container-e6c3136c705594e9810bbde998a3a2b4');
    if (!container) return;

    // Define option details if needed, then append the script
    const script = document.createElement('script');
    script.async = true;
    script.setAttribute('data-cfasync', 'false');
    script.src = 'https://pl30167311.effectivecpmnetwork.com/e6c3136c705594e9810bbde998a3a2b4/invoke.js';
    
    // Append to container directly so it executes inside the DOM scope
    container.appendChild(script);

    return () => {
      // Clean up the script tag when component unmounts
      try {
        if (container.contains(script)) {
          container.removeChild(script);
        }
      } catch (e) {
        console.warn("Clean up failed:", e);
      }
    };
  }, []);

  return (
    <div className="w-full flex flex-col items-center justify-center my-10 not-prose">
      <div className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-3">
        Sponsored / Advertisement
      </div>
      <div 
        id="container-e6c3136c705594e9810bbde998a3a2b4" 
        className="w-full max-w-4xl overflow-hidden min-h-[120px] rounded-3xl border border-slate-200/60 dark:border-slate-800/50 bg-slate-50/50 dark:bg-slate-900/10 backdrop-blur-sm flex items-center justify-center"
      >
        <div className="text-xs text-slate-400 animate-pulse py-6">
          Loading sponsored content...
        </div>
      </div>
    </div>
  );
};

export default NativeAdBanner;

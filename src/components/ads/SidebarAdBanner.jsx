import React, { useEffect, useRef } from 'react';

const SidebarAdBanner = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    let script = null;
    if (containerRef.current) {
      window.atOptions = {
        'key' : '6734a3c6fcb8987e6e07123dc6a479c5',
        'format' : 'iframe',
        'height' : 250,
        'width' : 300,
        'params' : {}
      };

      script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = 'https://www.highperformanceformat.com/6734a3c6fcb8987e6e07123dc6a479c5/invoke.js';
      
      containerRef.current.appendChild(script);
    }

    return () => {
      try {
        delete window.atOptions;
        if (containerRef.current && script && containerRef.current.contains(script)) {
          containerRef.current.removeChild(script);
        }
      } catch (e) {
        window.atOptions = undefined;
      }
    };
  }, []);

  return (
    <div className="w-full flex flex-col items-center justify-center my-8 not-prose">
      <div className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-3">
        Sponsored / Advertisement
      </div>
      <div 
        ref={containerRef}
        className="w-[300px] h-[250px] overflow-hidden rounded-2xl border border-slate-200/60 dark:border-slate-800/50 bg-slate-50/50 dark:bg-slate-900/10 backdrop-blur-sm flex items-center justify-center shadow-sm"
      >
        <div className="text-xs text-slate-400 animate-pulse">
          Loading sponsored content...
        </div>
      </div>
    </div>
  );
};

export default SidebarAdBanner;

import React from 'react';
import { motion } from 'framer-motion';

const logos = [
  "Acme Corp", "Quantum", "Nexus", "Starlight", "Vortex", "Apex", "Horizon", "Zephyr"
];

const TrustedBy = () => {
  return (
    <section className="py-20 border-t border-border overflow-hidden bg-background relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background/50 pointer-events-none z-10" />
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-20">
        <p className="text-sm font-medium text-secondary-text uppercase tracking-widest mb-10">
          Trusted by innovative teams worldwide
        </p>
        
        <div className="relative flex overflow-hidden group mask-image-gradient">
          <div className="animate-marquee flex whitespace-nowrap group-hover:[animation-play-state:paused]">
            {[...logos, ...logos, ...logos].map((logo, index) => (
              <div 
                key={index} 
                className="mx-8 flex items-center justify-center min-w-[120px]"
              >
                <span className="text-2xl font-display font-bold text-white/20 hover:text-white/80 transition-colors duration-500 cursor-default">
                  {logo}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* CSS for gradient mask to fade edges */}
      <style dangerouslySetInnerHTML={{__html: `
        .mask-image-gradient {
          mask-image: linear-gradient(to right, transparent, black 15%, black 85%, transparent);
          -webkit-mask-image: linear-gradient(to right, transparent, black 15%, black 85%, transparent);
        }
      `}} />
    </section>
  );
};

export default TrustedBy;

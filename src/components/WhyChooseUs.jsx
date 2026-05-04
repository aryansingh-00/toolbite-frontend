 
import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { whyChooseUsData } from '../data/content';
import SpotlightCard from './SpotlightCard';
import Magnetic from './Magnetic';

const WhyChooseUs = () => {
  const features = whyChooseUsData;

  return (
    <section id="why-toolbite" className="py-16 bg-transparent relative overflow-hidden">
      <div className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-[#B19CD9]/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute -bottom-40 -left-40 w-[600px] h-[600px] bg-[#FFB6C1]/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-8">
          <div className="text-center md:text-left max-w-3xl md:mx-0">
            <h2 className="text-[#B19CD9] font-bold tracking-widest uppercase text-xs mb-4">Why Choose Us</h2>
            <h3 className="text-3xl md:text-5xl lg:text-6xl font-black text-white mb-6 tracking-tighter">Better than freelancers.<br className="hidden md:block"/>Faster than agencies.</h3>
            <p className="text-lg text-slate-400 font-medium leading-relaxed">
              We bridge the gap between expensive, slow agencies and unreliable generic freelancers. Here is why ambitious brands naturally choose ToolBite.
            </p>
          </div>
          
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-12 gap-4 auto-rows-[180px]">
          {features.map((feat, i) => {
            // Define specific spans for Bento look
            const gridSpans = [
              "lg:col-span-8 lg:row-span-2", // Large Featured
              "lg:col-span-4 lg:row-span-2", // Vertical Side
              "lg:col-span-4 lg:row-span-2", // Square
              "lg:col-span-4 lg:row-span-2", // Square
              "lg:col-span-4 lg:row-span-2", // Square
              "lg:col-span-6 lg:row-span-2", // Horizontal wide
              "lg:col-span-6 lg:row-span-2", // Horizontal wide
              "lg:col-span-4 lg:row-span-2",
              "lg:col-span-4 lg:row-span-2",
              "lg:col-span-4 lg:row-span-2",
            ];
            
            const currentSpan = gridSpans[i] || "lg:col-span-4 lg:row-span-2";

            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className={`${currentSpan}`}
              >
                <SpotlightCard className="h-full group">
                  <div className="p-8 flex flex-col h-full">
                    <Magnetic strength={0.3}>
                      <div className={`w-14 h-14 rounded-2xl ${feat.bg} flex items-center justify-center mb-6 shadow-lg shadow-emerald-500/10 group-hover:scale-110 transition-transform duration-500`}>
                        {feat.icon}
                      </div>
                    </Magnetic>
                    
                    <h4 className="text-xl font-black text-white mb-3 tracking-tight group-hover:text-[#B19CD9] transition-colors duration-300">
                      {feat.title}
                    </h4>
                    <p className="relative z-10 text-slate-400 font-medium leading-relaxed text-sm">
                      {feat.desc}
                    </p>

                    {/* 3D Illustration Overlay - Centered and High Visibility */}
                    {feat.image && (
                      <div className="absolute inset-0 w-full h-full opacity-60 group-hover:opacity-100 transition-all duration-700 pointer-events-none select-none overflow-hidden z-0 flex items-center justify-center">
                        <img 
                          src={feat.image} 
                          alt="" 
                          className="w-[80%] h-[80%] object-contain transform translate-x-1/3 translate-y-1/4 scale-125 group-hover:scale-150 group-hover:-rotate-12 transition-transform duration-1000 ease-out grayscale group-hover:grayscale-0 opacity-40 group-hover:opacity-100" 
                        />
                      </div>
                    )}
                    
                    {/* Decorative abstract element for featured card */}
                    {i === 0 && (
                      <div className="mt-auto pt-8 flex items-end justify-between">
                        <div className="flex -space-x-2">
                          {[1,2,3,4].map(x => (
                            <div key={x} className="w-8 h-8 rounded-full border-2 border-slate-900 bg-slate-800 flex items-center justify-center text-[10px] font-bold text-slate-400">
                              TB
                            </div>
                          ))}
                        </div>
                        <div className="text-[10px] font-black uppercase tracking-widest text-[#B19CD9]/50">System Core v4.0</div>
                      </div>
                    )}
                  </div>
                </SpotlightCard>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-8 text-center">
          <div className="inline-flex items-center gap-4 px-8 py-4 rounded-full bg-white/5 border border-white/10 shadow-xl backdrop-blur-md cursor-default">
            <div className="flex -space-x-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#B19CD9] to-[#87CEEB] border-2 border-slate-900 shadow-xl"></div>
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#FFB6C1] to-[#B19CD9] border-2 border-slate-900 shadow-xl"></div>
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#87CEEB] to-[#FFB6C1] border-2 border-slate-900 shadow-xl"></div>
            </div>
            <span className="text-sm font-bold text-slate-300">Join 500+ happy clients worldwide</span>
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}} />
    </section>
  );
};

export default WhyChooseUs;


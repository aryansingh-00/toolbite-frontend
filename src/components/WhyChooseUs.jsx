 
import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { whyChooseUsData } from '../data/content';
import TiltCard from './TiltCard';

const WhyChooseUs = () => {
  const features = whyChooseUsData;
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = window.innerWidth >= 1024 
        ? window.innerWidth * 0.5 
        : window.innerWidth * 0.85;
      scrollRef.current.scrollBy({ left: direction === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section id="why-toolbite" className="py-8 bg-slate-50 relative overflow-hidden">
      <div className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-teal-500/5 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute -bottom-40 -left-40 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <div className="text-center md:text-left max-w-3xl md:mx-0">
            <h2 className="text-teal-600 font-semibold tracking-wide uppercase text-sm mb-3">Why Choose Us</h2>
            <h3 className="text-3xl md:text-5xl font-bold text-slate-900 mb-4 tracking-tight">Better than freelancers.<br className="hidden md:block"/>Faster than agencies.</h3>
            <p className="text-lg text-slate-600">
              We bridge the gap between expensive, slow agencies and unreliable generic freelancers. Here is why ambitious brands naturally choose ToolBite.
            </p>
          </div>
          
          {/* Navigation Arrows for Slider Header */}
          <div className="flex gap-3 mt-4 md:mt-0">
            <button onClick={() => scroll('left')} className="w-12 h-12 rounded-full border border-slate-200 bg-white flex items-center justify-center text-slate-600 hover:bg-slate-50 hover:text-teal-600 transition-colors shadow-sm">
              <ChevronLeft size={24} />
            </button>
            <button onClick={() => scroll('right')} className="w-12 h-12 rounded-full bg-slate-900 border border-slate-900 flex items-center justify-center text-white hover:bg-teal-600 hover:border-teal-600 transition-colors shadow-lg shadow-teal-500/20">
              <ChevronRight size={24} />
            </button>
          </div>
        </div>

        {/* Navigation Wrapper */}
        <div className="relative w-full group/slider">

          {/* Left Arrow overlay */}
          <div className="absolute left-0 top-1/2 -translate-y-1/2 -ml-4 z-20 hidden lg:block opacity-0 group-hover/slider:opacity-100 transition-opacity duration-300">
            <button onClick={() => scroll('left')} className="w-14 h-14 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-700 hover:bg-slate-50 hover:text-teal-600 transition-all shadow-xl hover:scale-110">
              <ChevronLeft size={28} />
            </button>
          </div>

          {/* Right Arrow overlay */}
          <div className="absolute right-0 top-1/2 -translate-y-1/2 -mr-4 z-20 hidden lg:block opacity-0 group-hover/slider:opacity-100 transition-opacity duration-300">
            <button onClick={() => scroll('right')} className="w-14 h-14 rounded-full bg-slate-900 border border-slate-900 flex items-center justify-center text-white hover:bg-teal-600 hover:border-teal-600 transition-all shadow-xl shadow-teal-500/20 hover:scale-110">
              <ChevronRight size={28} />
            </button>
          </div>

          {/* Carousel Container */}
          <div 
            ref={scrollRef}
            className="flex overflow-x-auto gap-4 pb-12 pt-4 px-2 snap-x snap-mandatory hide-scrollbar"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {features.map((feat, i) => {
              const cardStyles = [
                {
                  bg: "hover:from-violet-600 hover:via-fuchsia-500 hover:to-pink-500",
                  shadow: "hover:shadow-glow-purple"
                },
                {
                  bg: "hover:from-blue-600 hover:via-cyan-500 hover:to-teal-400",
                  shadow: "hover:shadow-glow-blue"
                },
                {
                  bg: "hover:from-emerald-500 hover:via-teal-500 hover:to-cyan-500",
                  shadow: "hover:shadow-glow-emerald"
                },
                {
                  bg: "hover:from-teal-500 hover:via-indigo-500 hover:to-purple-500",
                  shadow: "hover:shadow-glow-teal"
                }
              ];
              const currentStyle = cardStyles[i % cardStyles.length];

              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: (i % 5) * 0.05 }}
                  className="snap-center sm:snap-start flex-shrink-0"
                >
                  <TiltCard className="w-[85vw] sm:w-[45vw] lg:w-[28vw] xl:w-[260px]">
                    <div className={`group bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm ${currentStyle.shadow} hover:border-transparent hover:bg-gradient-to-br ${currentStyle.bg} hover:-translate-y-1 transition-all duration-300 flex flex-col text-left items-start h-full relative overflow-hidden z-10`}>
                      <div className={`relative z-10 w-12 h-12 rounded-2xl ${feat.bg} group-hover:bg-white/20 flex items-center justify-center mb-5 group-hover:scale-110 !group-hover:text-white transition-all duration-300 flex-shrink-0`}>
                        {feat.icon}
                      </div>
                      <h4 className="relative z-10 text-lg font-bold text-slate-900 dark:text-white group-hover:text-white mb-2 transition-colors duration-300">{feat.title}</h4>
                      <p className="relative z-10 text-slate-600 dark:text-slate-400 group-hover:text-white/90 text-sm leading-relaxed transition-colors duration-300">
                        {feat.desc}
                      </p>
                    </div>
                  </TiltCard>
                </motion.div>
              );
            })}
          </div>
        </div>

        <div className="mt-2 text-center">
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white border border-slate-200 shadow-sm hover:shadow-md transition-shadow cursor-default">
            <div className="flex -space-x-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-teal-400 to-emerald-500 border-2 border-white"></div>
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-indigo-500 border-2 border-white"></div>
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-rose-400 to-pink-500 border-2 border-white"></div>
            </div>
            <span className="text-sm font-semibold text-slate-700">Join 500+ happy clients worldwide</span>
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


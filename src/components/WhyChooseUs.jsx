import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { ChevronUp, ChevronDown } from 'lucide-react';
import { whyChooseUsData } from '../data/content';
import SpotlightCard from './SpotlightCard';
import Magnetic from './Magnetic';
import ComparisonVisualizer from './ComparisonVisualizer';

const WhyChooseUs = () => {
  const features = whyChooseUsData;
  const scrollContainerRef = useRef(null);

  const handleScroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = 240; // Height of card + gap approx
      scrollContainerRef.current.scrollBy({
        top: direction === 'down' ? scrollAmount : -scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section id="why-toolbite" className="py-24 bg-white relative overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Vertically Stacked Dynamic scrollable features list */}
          <div className="order-2 lg:order-1 lg:col-span-6 w-full">
            <div 
              ref={scrollContainerRef}
              className="flex flex-col gap-4 overflow-y-auto max-h-[620px] pr-2 scroll-smooth hide-scrollbar rounded-2xl"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {features.map((feat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  className="w-full flex-shrink-0"
                >
                  <SpotlightCard className="w-full group">
                    <div className="p-6 md:p-8 flex flex-col md:flex-row items-start gap-6">
                      <Magnetic strength={0.3}>
                        <div className="w-14 h-14 rounded-2xl bg-black flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-500 flex-shrink-0">
                          {React.cloneElement(feat.icon, { className: "w-6 h-6 text-white" })}
                        </div>
                      </Magnetic>
                      
                      <div className="flex-grow">
                        <h4 className="text-xl font-black text-black mb-2 tracking-tight transition-colors duration-300">
                          {feat.title}
                        </h4>
                        <p className="relative z-10 text-black/80 font-medium leading-relaxed text-sm">
                          {feat.desc}
                        </p>
                      </div>
                    </div>
                  </SpotlightCard>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right Column: Title & Description & Navigation */}
          <div className="order-1 lg:order-2 lg:col-span-6 text-left flex flex-col justify-center lg:h-[620px] lg:sticky lg:top-32">
            <div>
              <h2 className="text-black font-bold tracking-widest uppercase text-xs mb-4">Why Choose Us</h2>
              <h3 className="text-3xl md:text-5xl lg:text-5xl font-black text-black mb-6 tracking-tighter leading-[1.1]">
                Better than freelancers.<br />
                Faster than agencies.
              </h3>
              <p className="text-lg text-black/80 font-medium leading-relaxed mb-8 max-w-xl">
                We bridge the gap between expensive, slow agencies and unreliable generic freelancers. Here is why ambitious brands naturally choose ToolBite.
              </p>

              {/* Navigation Arrows for Scrolling the Right Stack */}
              <div className="flex gap-4">
                <button
                  onClick={() => handleScroll('up')}
                  className="w-14 h-14 rounded-full border border-slate-200 bg-white text-black flex items-center justify-center hover:bg-black hover:text-white transition-all shadow-md active:scale-95 group"
                  aria-label="Scroll Up"
                >
                  <ChevronUp size={24} className="group-hover:-translate-y-0.5 transition-transform" />
                </button>
                <button
                  onClick={() => handleScroll('down')}
                  className="w-14 h-14 rounded-full border border-slate-200 bg-white text-black flex items-center justify-center hover:bg-black hover:text-white transition-all shadow-md active:scale-95 group"
                  aria-label="Scroll Down"
                >
                  <ChevronDown size={24} className="group-hover:translate-y-0.5 transition-transform" />
                </button>
              </div>
            </div>

          </div>

        </div>

        {/* Interactive Comparison & ROI Visualizer */}
        <div className="mt-20">
          <ComparisonVisualizer />
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

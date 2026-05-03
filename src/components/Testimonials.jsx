import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { testimonialsData } from '../data/content';

/**
 * Minimal Testimonial Card
 */
const TestimonialCard = ({ review, index, containerRef }) => {
  const cardRef = useRef(null);
  
  const { scrollXProgress } = useScroll({
    target: cardRef,
    container: containerRef,
    axis: "x",
    offset: ["start end", "end start"]
  });

  const opacity = useTransform(scrollXProgress, [0, 0.2, 0.5, 0.8, 1], [0.4, 1, 1, 1, 0.4]);
  const scale = useTransform(scrollXProgress, [0, 0.5, 1], [0.95, 1, 0.95]);
  
  const smoothOpacity = useSpring(opacity, { stiffness: 100, damping: 20 });
  const smoothScale = useSpring(scale, { stiffness: 100, damping: 20 });

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

  const currentStyle = cardStyles[index % cardStyles.length];

  return (
    <motion.div
      ref={cardRef}
      style={{ opacity: smoothOpacity, scale: smoothScale }}
      className="snap-center flex-shrink-0 w-[85vw] sm:w-[350px] group cursor-pointer"
    >
      <div className={`bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm ${currentStyle.shadow} hover:border-transparent hover:bg-gradient-to-br ${currentStyle.bg} transition-all duration-500 p-6 rounded-2xl flex flex-col h-full relative overflow-hidden z-10`}>
        <div className="flex gap-1 mb-4 relative z-10">
          {[...Array(review.rating)].map((_, idx) => (
            <Star key={idx} size={14} fill="currentColor" className="text-amber-400 drop-shadow-sm" />
          ))}
        </div>
        <p className="text-slate-600 dark:text-slate-400 group-hover:text-white/95 text-sm leading-relaxed mb-6 italic flex-1 relative z-10 transition-colors duration-300">
          "{review.text}"
        </p>
        <div className="flex items-center gap-3 mt-auto pt-4 border-t border-slate-50 group-hover:border-white/20 relative z-10 transition-colors duration-300">
          <div className={`w-10 h-10 rounded-full ${review.avatar} flex items-center justify-center font-bold text-sm shadow-sm ring-2 ring-white/50 group-hover:ring-white`}>
            {review.name.charAt(0)}
          </div>
          <div>
            <h4 className="font-bold text-slate-900 dark:text-white group-hover:text-white text-sm leading-tight transition-colors duration-300">{review.name}</h4>
            <p className="text-[11px] text-teal-600 group-hover:text-white/80 font-bold uppercase tracking-wider mt-0.5 transition-colors duration-300">{review.business}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const Testimonials = () => {
  const reviews = testimonialsData;
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 350;
      scrollRef.current.scrollBy({ left: direction === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section id="testimonials" className="py-12 bg-slate-50 dark:bg-[#030712] transition-colors duration-300">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex flex-col md:flex-row justify-between items-end mb-8 gap-4">
          <div className="max-w-xl">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-2 tracking-tight">
              Real results from real founders.
            </h2>
            <p className="text-slate-500 dark:text-slate-400 text-sm">
              We help ambitious teams build world-class digital products. Here's what they say.
            </p>
          </div>
          
          <div className="flex gap-2">
            <button 
              onClick={() => scroll('left')} 
              className="w-10 h-10 rounded-xl border border-slate-200 bg-white flex items-center justify-center text-slate-600 hover:text-teal-600 transition-colors shadow-sm"
            >
              <ChevronLeft size={20} />
            </button>
            <button 
              onClick={() => scroll('right')} 
              className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center text-white hover:bg-teal-500 transition-colors shadow-sm"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* Carousel Container */}
        <div className="relative">
          <div 
            ref={scrollRef}
            className="flex overflow-x-auto gap-4 pb-6 pt-2 px-1 snap-x snap-mandatory hide-scrollbar"
            style={{ 
              scrollbarWidth: 'none', 
              msOverflowStyle: 'none'
            }}
          >
            {reviews.map((review, i) => (
              <TestimonialCard 
                key={i} 
                review={review} 
                index={i} 
                containerRef={scrollRef} 
              />
            ))}
            {/* Spacer */}
            <div className="flex-shrink-0 w-[5vw]"></div>
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

export default Testimonials;


 
import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import { testimonialsData } from '../data/content';

/**
 * Enhanced Testimonial Card with 3D Perspective
 */
const TestimonialCard = ({ review, index, containerRef }) => {
  const cardRef = useRef(null);
  
  // Track scroll progress of this specific card relative to the container
  const { scrollXProgress } = useScroll({
    target: cardRef,
    container: containerRef,
    axis: "x",
    offset: ["start end", "end start"]
  });

  // Perspective and scale transforms
  // As the card moves through the viewport (0 to 1), we map its values
  // 0.5 is the center of the container
  const scale = useTransform(scrollXProgress, [0, 0.5, 1], [0.85, 1.1, 0.85]);
  const rotateY = useTransform(scrollXProgress, [0, 0.5, 1], ["25deg", "0deg", "-25deg"]);
  const opacity = useTransform(scrollXProgress, [0, 0.2, 0.5, 0.8, 1], [0.3, 0.6, 1, 0.6, 0.3]);
  const shadowOpacity = useTransform(scrollXProgress, [0, 0.5, 1], [0, 1, 0]);
  const zIndex = useTransform(scrollXProgress, [0, 0.5, 1], [1, 10, 1]);

  // Smooth out the motion
  const smoothScale = useSpring(scale, { stiffness: 100, damping: 20 });
  const smoothRotate = useSpring(rotateY, { stiffness: 100, damping: 20 });
  const smoothOpacity = useSpring(opacity, { stiffness: 100, damping: 20 });

  return (
    <motion.div
      ref={cardRef}
      style={{
        scale: smoothScale,
        rotateY: smoothRotate,
        opacity: smoothOpacity,
        zIndex,
        perspective: "1200px",
        transformStyle: "preserve-3d"
      }}
      className="snap-center flex-shrink-0 w-[85vw] sm:w-[45vw] lg:w-[32vw] xl:w-[420px] h-[400px] relative group"
    >
      {/* Dynamic Glow Shadow */}
      <motion.div 
        style={{ opacity: shadowOpacity }}
        className="absolute inset-4 bg-teal-500/20 blur-[40px] rounded-[3rem] -z-10 group-hover:bg-teal-500/30 transition-colors"
      />

      <div className="h-full bg-white/80 backdrop-blur-xl p-10 rounded-[2.5rem] border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_50px_rgba(20,184,166,0.15)] hover:border-teal-100 transition-all duration-500 flex flex-col justify-between overflow-hidden relative">
        {/* Animated Background Accent */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-teal-50/50 to-transparent rounded-bl-full opacity-50"></div>
        
        <Quote size={80} className="absolute -top-4 -right-4 text-slate-50 group-hover:text-teal-50/50 transition-colors duration-500 pointer-events-none" />
        
        <div className="relative z-10">
          <div className="flex gap-1 mb-8">
            {[...Array(review.rating)].map((_, idx) => (
              <Star key={idx} size={20} fill="currentColor" className="text-amber-400 drop-shadow-sm" />
            ))}
          </div>
          <p className="text-slate-700 text-lg leading-relaxed mb-8 italic font-medium">
            "{review.text}"
          </p>
        </div>

        <div className="flex items-center gap-5 mt-auto relative z-10 pt-6 border-t border-slate-50">
          <div className={`w-14 h-14 rounded-2xl ${review.avatar} flex items-center justify-center font-bold text-xl shadow-inner transform group-hover:rotate-6 transition-transform duration-500`}>
            {review.name.charAt(0)}
          </div>
          <div>
            <h4 className="font-bold text-slate-900 text-lg leading-tight">{review.name}</h4>
            <p className="text-sm text-teal-600 font-bold uppercase tracking-wider mt-1">{review.business}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const Testimonials = () => {
  const reviews = testimonialsData;
  const scrollRef = useRef(null);

  const { scrollXProgress } = useScroll({
    container: scrollRef,
    axis: "x"
  });

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = window.innerWidth >= 1024 
        ? window.innerWidth * 0.4 
        : window.innerWidth * 0.8;
      scrollRef.current.scrollBy({ left: direction === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section id="testimonials" className="py-24 bg-white relative overflow-hidden">
      {/* Enhanced decorative background */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-teal-50/50 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-slate-50/50 rounded-full blur-[100px] pointer-events-none"></div>
      
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div className="text-center md:text-left max-w-2xl">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 text-teal-600 text-xs font-bold uppercase tracking-widest mb-4"
            >
              <div className="w-2 h-2 rounded-full bg-teal-500 animate-pulse"></div>
              Client Stories
            </motion.div>
            <h2 className="text-4xl md:text-6xl font-bold text-slate-900 mb-6 tracking-tight leading-tight">
              Real results from <span className="text-teal-500">real founders.</span>
            </h2>
            <p className="text-xl text-slate-600 leading-relaxed">
              We help ambitious teams build world-class digital products. Here's what they say about our partnership.
            </p>
          </div>
          
          <div className="flex gap-4">
            <button 
              onClick={() => scroll('left')} 
              className="w-14 h-14 rounded-2xl border border-slate-200 bg-white flex items-center justify-center text-slate-600 hover:bg-slate-50 hover:text-teal-600 hover:border-teal-100 transition-all shadow-sm hover:shadow-md"
            >
              <ChevronLeft size={28} />
            </button>
            <button 
              onClick={() => scroll('right')} 
              className="w-14 h-14 rounded-2xl bg-slate-900 flex items-center justify-center text-white hover:bg-teal-600 transition-all shadow-xl shadow-slate-200"
            >
              <ChevronRight size={28} />
            </button>
          </div>
        </div>

        {/* Carousel Container */}
        <div className="relative">
          <div 
            ref={scrollRef}
            className="flex overflow-x-auto gap-8 pb-20 pt-10 px-12 snap-x snap-mandatory hide-scrollbar"
            style={{ 
              scrollbarWidth: 'none', 
              msOverflowStyle: 'none',
              perspective: "1500px"
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
            {/* Spacer for proper centering of last card */}
            <div className="flex-shrink-0 w-[5vw]"></div>
          </div>

          {/* Progress Indicator */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-48 h-1.5 bg-slate-100 rounded-full overflow-hidden">
            <motion.div 
              style={{ scaleX: scrollXProgress }}
              className="h-full bg-teal-500 origin-left"
            />
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


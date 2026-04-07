 
import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import { testimonialsData } from '../data/content';

const Testimonials = () => {
  const reviews = testimonialsData;
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = window.innerWidth >= 1024 
        ? window.innerWidth * 0.45 
        : window.innerWidth * 0.85;
      scrollRef.current.scrollBy({ left: direction === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section id="testimonials" className="py-8 bg-white relative overflow-hidden">
      {/* Decorative blurred background shapes */}
      <div className="absolute top-0 right-1/3 w-[500px] h-[500px] bg-teal-50 rounded-full blur-[100px] pointer-events-none"></div>
      
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <div className="text-center md:text-left max-w-3xl md:mx-0">
            <h2 className="text-teal-600 font-semibold tracking-wide uppercase text-sm mb-3">Client Success</h2>
            <h3 className="text-3xl md:text-5xl font-bold text-slate-900 mb-4 tracking-tight">Trusted by Ambitious Brands</h3>
            <p className="text-lg text-slate-600">
              Don't just take our word for it. Read what founders, creators, and business leaders have to say about working with ToolBite.
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
            className="flex overflow-x-auto gap-6 pb-12 pt-4 px-2 snap-x snap-mandatory hide-scrollbar"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {reviews.map((review, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: (i % 3) * 0.1 }}
                className="snap-center sm:snap-start flex-shrink-0 w-[85vw] sm:w-[45vw] lg:w-[30vw] xl:w-[400px] h-[350px] bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-slate-200/50 hover:border-teal-100 transition-all duration-300 relative group flex flex-col justify-between"
              >
                <Quote size={60} className="absolute top-6 right-6 text-slate-50 group-hover:text-teal-50 transition-colors duration-300 pointer-events-none" />
                
                <div>
                  <div className="flex gap-1 mb-6">
                    {[...Array(review.rating)].map((_, idx) => (
                      <Star key={idx} size={18} fill="currentColor" className="text-amber-400" />
                    ))}
                  </div>
                  <p className="text-slate-700 leading-relaxed mb-8 relative z-10 italic">
                    "{review.text}"
                  </p>
                </div>

                <div className="flex items-center gap-4 mt-auto">
                  <div className={`w-12 h-12 rounded-full ${review.avatar} flex items-center justify-center font-bold text-lg`}>
                    {review.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 leading-tight">{review.name}</h4>
                    <p className="text-sm text-slate-500 font-medium">{review.business}</p>
                  </div>
                </div>
              </motion.div>
            ))}
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


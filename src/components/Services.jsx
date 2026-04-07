 
import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { servicesData } from '../data/content';

const Services = () => {
  const services = servicesData;
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = window.innerWidth >= 1024 
        ? window.innerWidth * 0.7 
        : window.innerWidth * 0.85;
      scrollRef.current.scrollBy({ left: direction === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section id="services" className="py-8 bg-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-teal-50/50 rounded-bl-[100px] -z-10"></div>
      
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <h2 className="text-teal-600 font-semibold tracking-wide uppercase text-sm mb-3">What We Do</h2>
          <h3 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6 tracking-tight">Digital Solutions for <br className="hidden md:block"/> Every Need.</h3>
          <p className="text-lg text-slate-600">
            From simple landing pages to complex web applications, we provide end-to-end development services tailored exactly to your business goals.
          </p>
        </div>

        {/* Navigation Wrapper */}
        <div className="relative w-full group/slider">
          
          {/* Left Arrow */}
          <div className="absolute left-0 top-1/2 -translate-y-1/2 -ml-4 z-20 hidden md:block opacity-0 group-hover/slider:opacity-100 transition-opacity duration-300">
            <button onClick={() => scroll('left')} className="w-14 h-14 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-700 hover:bg-slate-50 hover:text-teal-600 transition-all shadow-xl hover:scale-110">
              <ChevronLeft size={28} />
            </button>
          </div>

          {/* Right Arrow */}
          <div className="absolute right-0 top-1/2 -translate-y-1/2 -mr-4 z-20 hidden md:block opacity-0 group-hover/slider:opacity-100 transition-opacity duration-300">
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
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: (index % 4) * 0.1 }}
                className={`snap-center sm:snap-start flex-shrink-0 w-[85vw] sm:w-[45vw] lg:w-[28vw] xl:w-[300px] p-8 rounded-3xl border border-slate-100 hover:${service.border} hover:shadow-2xl hover:shadow-slate-200/50 transition-all duration-300 bg-white group cursor-pointer relative overflow-hidden flex flex-col items-start text-left`}
              >
                {/* Decorative Background blob */}
                <div className={`absolute top-0 right-0 w-32 h-32 ${service.bg} rounded-bl-[100px] -z-10 opacity-50 group-hover:scale-125 transition-transform duration-500`}></div>
                
                <div className={`w-14 h-14 rounded-2xl ${service.bg} flex items-center justify-center mb-6 group-hover:-translate-y-1 transition-transform duration-300 shadow-sm flex-shrink-0`}>
                  {service.icon}
                </div>
                <h4 className="text-xl font-bold text-slate-900 mb-3">{service.title}</h4>
                <p className="text-slate-600 leading-relaxed text-sm flex-grow">
                  {service.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-center mt-2"
        >
          <a href="/#contact" className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-slate-900 text-white font-semibold hover:bg-teal-600 transition-all shadow-lg hover:shadow-teal-500/25 group">
            Discuss Your Project 
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </a>
        </motion.div>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}} />
    </section>
  );
};

export default Services;


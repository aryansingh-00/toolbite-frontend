import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { servicesData } from '../data/content';
import TiltCard from './TiltCard';

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
            From high-performance mobile apps to complex web applications, we provide end-to-end development services tailored exactly to your business goals.
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
            {services.map((service, index) => {
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
                  key={index}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: (index % 4) * 0.1 }}
                  className="snap-center sm:snap-start flex-shrink-0"
                >
                  <TiltCard className="w-[85vw] sm:w-[45vw] lg:w-[28vw] xl:w-[300px]">
                    <Link 
                      to={service.slug ? `/services/${service.slug}` : `/#contact`}
                      className={`p-8 rounded-3xl border border-slate-100 dark:border-slate-800 ${currentStyle.shadow} hover:border-transparent hover:bg-gradient-to-br ${currentStyle.bg} hover:-translate-y-1 transition-all duration-300 bg-white dark:bg-slate-900 group cursor-pointer relative overflow-hidden flex flex-col items-start text-left h-full min-h-[320px] z-10 block`}
                    >
                      <div className={`relative z-10 w-14 h-14 rounded-2xl ${service.bg} group-hover:bg-white/20 flex items-center justify-center mb-6 group-hover:-translate-y-1 group-hover:!text-white transition-all duration-300 shadow-sm group-hover:shadow-none flex-shrink-0`}>
                        {service.icon}
                      </div>
                      <h4 className="relative z-10 text-xl font-bold text-slate-900 dark:text-white group-hover:text-white mb-3 transition-colors duration-300">{service.title}</h4>
                      <p className="relative z-10 text-slate-600 dark:text-slate-400 group-hover:text-white/90 leading-relaxed text-sm flex-grow transition-colors duration-300">
                        {service.description}
                      </p>
                      <div className="relative z-10 mt-6 flex items-center gap-2 text-xs font-bold text-teal-600 group-hover:text-white transition-colors opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 duration-300">
                        Learn More <ArrowRight size={14} />
                      </div>
                    </Link>
                  </TiltCard>
                </motion.div>
              );
            })}
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


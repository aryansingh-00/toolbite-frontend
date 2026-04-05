/* eslint-disable */
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { servicesData } from '../data/content';

const Services = () => {
  const services = servicesData;

  return (
    <section id="services" className="py-12 bg-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-teal-50/50 rounded-bl-[100px] -z-10"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-teal-600 font-semibold tracking-wide uppercase text-sm mb-3">What We Do</h2>
          <h3 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6 tracking-tight">Digital Solutions for <br className="hidden md:block"/> Every Need.</h3>
          <p className="text-lg text-slate-600">
            From simple landing pages to complex web applications, we provide end-to-end development services tailored exactly to your business goals.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`p-8 rounded-3xl border border-slate-100 hover:${service.border} hover:shadow-2xl hover:shadow-slate-200/50 transition-all duration-300 bg-white group cursor-pointer relative overflow-hidden flex flex-col h-full`}
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

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center"
        >
          <a href="/#contact" className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-slate-900 text-white font-semibold hover:bg-teal-600 transition-all shadow-lg hover:shadow-teal-500/25 group">
            Discuss Your Project 
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Services;


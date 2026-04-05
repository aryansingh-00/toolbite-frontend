/* eslint-disable */
import React from 'react';
import { motion } from 'framer-motion';
import { whyChooseUsData } from '../data/content';

const WhyChooseUs = () => {
  const features = whyChooseUsData;

  return (
    <section id="why-toolbite" className="py-12 bg-slate-50 relative overflow-hidden">
      <div className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-teal-500/5 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute -bottom-40 -left-40 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-teal-600 font-semibold tracking-wide uppercase text-sm mb-3">Why Choose Us</h2>
          <h3 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6 tracking-tight">Better than freelancers.<br className="hidden md:block"/>Faster than agencies.</h3>
          <p className="text-lg text-slate-600">
            We bridge the gap between expensive, slow agencies and unreliable generic freelancers. Here is why ambitious brands naturally choose ToolBite.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {features.map((feat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="group bg-white rounded-3xl p-6 border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 hover:border-teal-200 transition-all duration-300"
            >
              <div className={`w-12 h-12 rounded-2xl ${feat.bg} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}>
                {feat.icon}
              </div>
              <h4 className="text-lg font-bold text-slate-900 mb-2">{feat.title}</h4>
              <p className="text-slate-600 text-sm leading-relaxed">
                {feat.desc}
              </p>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 text-center">
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
    </section>
  );
};

export default WhyChooseUs;


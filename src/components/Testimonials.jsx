/* eslint-disable */
import React from 'react';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';
import { testimonialsData } from '../data/content';

const Testimonials = () => {
  const reviews = testimonialsData;

  return (
    <section id="testimonials" className="py-24 bg-white relative overflow-hidden">
      {/* Decorative blurred background shapes */}
      <div className="absolute top-0 right-1/3 w-[500px] h-[500px] bg-teal-50 rounded-full blur-[100px] pointer-events-none"></div>
      
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-teal-600 font-semibold tracking-wide uppercase text-sm mb-3">Client Success</h2>
          <h3 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6 tracking-tight">Trusted by Ambitious Brands</h3>
          <p className="text-lg text-slate-600">
            Don't just take our word for it. Read what founders, creators, and business leaders have to say about working with ToolBite.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((review, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-slate-200/50 hover:border-teal-100 transition-all duration-300 relative group flex flex-col justify-between"
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
    </section>
  );
};

export default Testimonials;


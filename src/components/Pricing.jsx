/* eslint-disable */
import React from 'react';
import { motion } from 'framer-motion';
import { Check, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { pricingPlans } from '../data/content';

const Pricing = () => {
  const plans = pricingPlans;

  return (
    <section id="pricing" className="py-12 bg-slate-900 text-white relative flex justify-center overflow-hidden">
      <div className="absolute top-0 inset-x-0 h-[500px] bg-gradient-to-b from-teal-900/20 to-transparent pointer-events-none"></div>
      
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 w-full z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-teal-400 font-semibold tracking-wide uppercase text-sm mb-3">Transparent Pricing</h2>
          <h3 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight">Choose Your Best Plan</h3>
          <p className="text-lg text-slate-400">
            Simple, honest pricing with no hidden fees. All plans include top-tier development and premium customer support designed exclusively for business growth.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {plans.map((plan, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`rounded-3xl p-8 flex flex-col border transition-all duration-300 ${plan.highlight ? 'border-teal-500 bg-slate-800 shadow-2xl shadow-teal-500/20 relative lg:-translate-y-4 hover:shadow-teal-500/30' : 'border-slate-800 bg-slate-800/50 hover:border-slate-700'}`}
            >
              {plan.highlight && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-5 py-1.5 bg-gradient-to-r from-teal-500 to-emerald-400 rounded-full text-xs font-extrabold tracking-widest uppercase shadow-lg shadow-teal-500/30 text-white">
                  Most Popular
                </div>
              )}
              
              <div className="mb-6 mt-2">
                <h4 className="text-2xl font-bold mb-2 text-white">{plan.name}</h4>
                <p className="text-slate-400 text-sm h-10">{plan.audience}</p>
              </div>
              
              <div className="mb-8 flex items-baseline gap-1 border-b border-slate-700/50 pb-8">
                <span className="text-5xl font-extrabold text-white">{plan.price}</span>
                <span className="text-slate-400 font-medium text-sm">/project</span>
              </div>

              <div className="space-y-4 flex-1 mb-8">
                {plan.features.map((feat, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    {feat.included ? (
                      <div className={`flex items-center justify-center rounded-full p-0.5 shrink-0 ${plan.highlight ? 'bg-teal-500/20 text-teal-400' : 'bg-slate-700/50 text-slate-300'}`}>
                        <Check size={16} className="stroke-[3]" />
                      </div>
                    ) : (
                      <div className="flex items-center justify-center rounded-full p-0.5 bg-slate-800/50 text-slate-600 shrink-0">
                        <X size={16} className="stroke-[3]" />
                      </div>
                    )}
                    <span className={`text-sm tracking-wide ${feat.included ? 'text-slate-300' : 'text-slate-500 line-through'}`}>{feat.name}</span>
                  </div>
                ))}
              </div>
              
              <Link to="/start-project" className={`w-full py-4 text-center rounded-xl font-bold transition-all shadow-sm ${plan.highlight ? 'bg-gradient-to-r from-teal-500 to-emerald-400 text-slate-900 hover:shadow-teal-500/25 hover:scale-[1.02]' : 'bg-slate-700 text-white hover:bg-slate-600 hover:scale-[1.02] border border-slate-600 hover:border-slate-500'}`}>
                {plan.buttonText}
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;


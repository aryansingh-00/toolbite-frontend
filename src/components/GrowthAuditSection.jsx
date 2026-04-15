import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, TrendingUp, ArrowRight, Zap, Target } from 'lucide-react';
import { Link } from 'react-router-dom';

const GrowthAuditSection = () => {
  return (
    <section className="py-24 bg-slate-900 relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-teal-500/10 rounded-full blur-[120px] -z-0" />
      <div className="absolute -bottom-40 -left-20 w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-[120px] -z-0" />

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="bg-slate-800/50 backdrop-blur-xl rounded-[3rem] p-10 md:p-16 border border-white/10 shadow-2xl relative overflow-hidden">
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            {/* Left: Content */}
            <div className="space-y-8">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-2 px-4 py-2 bg-teal-500/10 text-teal-400 rounded-full font-bold text-sm border border-teal-500/20"
              >
                <Sparkles size={16} />
                Strategic Growth Audit
              </motion.div>
              
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-4xl md:text-6xl font-black text-white leading-[1.1] tracking-tighter"
              >
                Stop Guessing. <br />
                <span className="text-teal-400">Start Projecting Growth.</span>
              </motion.h2>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-xl text-slate-400 font-medium leading-relaxed max-w-xl"
              >
                Use our proprietary ROI Predictor to see exactly how ToolBite's performance stack can scale your annual revenue.
              </motion.p>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="flex flex-col sm:flex-row gap-5"
              >
                <Link 
                  to="/tools/roi-calculator"
                  className="px-10 py-5 bg-teal-500 hover:bg-teal-400 text-slate-900 font-black rounded-2xl shadow-xl shadow-teal-500/20 flex items-center justify-center gap-3 transition-all transform hover:-translate-y-1 group"
                >
                  Predict My Growth ROI
                  <TrendingUp size={22} className="group-hover:scale-110 transition-transform" />
                </Link>
                <a 
                  href="/#ai-strategist"
                  className="px-10 py-5 bg-white/5 hover:bg-white/10 text-white font-bold rounded-2xl border border-white/10 flex items-center justify-center gap-3 transition-all"
                >
                  Chat with AI Strategist
                  <ArrowRight size={20} />
                </a>
              </motion.div>
            </div>

            {/* Right: Feature Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                { icon: <Zap className="text-amber-400" />, title: "Performance Lift", desc: "Average 40% faster load times compared to standard builds." },
                { icon: <Target className="text-teal-400" />, title: "Conversion Depth", desc: "Psychological UX patterns that drive 2x more actions." },
                { icon: <TrendingUp className="text-emerald-400" />, title: "SEO Authority", desc: "Built-in schema and LCP optimization for instant ranking." },
                { icon: <Sparkles className="text-blue-400" />, title: "AI Integration", desc: "Smart search and automation features built as standard." }
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 + 0.3 }}
                  className="p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-sm"
                >
                  <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center mb-6">
                    {item.icon}
                  </div>
                  <h4 className="font-bold text-white mb-2">{item.title}</h4>
                  <p className="text-xs text-slate-500 leading-relaxed">{item.desc}</p>
                </motion.div>
              ))}
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default GrowthAuditSection;

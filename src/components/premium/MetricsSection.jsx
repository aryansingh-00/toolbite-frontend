import React from 'react';
import { motion } from 'framer-motion';

const metrics = [
  { value: "500+", label: "Brands Launched" },
  { value: "3.2x", label: "Average ROI Increase" },
  { value: "99.9%", label: "Platform Uptime" },
  { value: "24/7", label: "Expert Support" }
];

const MetricsSection = () => {
  return (
    <section className="py-24 border-t border-border bg-background relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[300px] bg-primary/20 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="glass-panel p-10 md:p-16 rounded-[40px] border border-white/10 shadow-premium">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            {metrics.map((metric, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl md:text-5xl font-display font-bold text-white mb-2 tracking-tight">
                  {metric.value}
                </div>
                <div className="text-sm md:text-base font-medium text-secondary-text uppercase tracking-wider">
                  {metric.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MetricsSection;

import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Shield, Sparkles, Code, Smartphone, BarChart3 } from 'lucide-react';

const features = [
  {
    title: "Lightning Fast Performance",
    description: "Built on a modern React architecture with static generation, delivering sub-second load times that maximize conversion.",
    icon: <Zap className="text-primary w-6 h-6" />,
    colSpan: "col-span-1 md:col-span-2 lg:col-span-2",
    bgClass: "bg-gradient-to-br from-card/80 to-primary/10"
  },
  {
    title: "Bank-Grade Security",
    description: "Enterprise-level data protection and compliance out of the box.",
    icon: <Shield className="text-success w-6 h-6" />,
    colSpan: "col-span-1 md:col-span-1 lg:col-span-1",
    bgClass: "bg-card/60"
  },
  {
    title: "AI-Powered",
    description: "Automate workflows and generate content with integrated AI tools.",
    icon: <Sparkles className="text-secondary w-6 h-6" />,
    colSpan: "col-span-1 md:col-span-1 lg:col-span-1",
    bgClass: "bg-card/60"
  },
  {
    title: "Clean Code Architecture",
    description: "Scalable, maintainable, and deeply extensible code built for the future.",
    icon: <Code className="text-accent w-6 h-6" />,
    colSpan: "col-span-1 md:col-span-2 lg:col-span-2",
    bgClass: "bg-gradient-to-br from-card/80 to-accent/10"
  },
  {
    title: "Mobile First",
    description: "Flawless experience across all devices and screen sizes.",
    icon: <Smartphone className="text-white w-6 h-6" />,
    colSpan: "col-span-1 md:col-span-2 lg:col-span-1",
    bgClass: "bg-card/60"
  },
  {
    title: "Advanced Analytics",
    description: "Real-time insights and conversion tracking built directly into the core platform.",
    icon: <BarChart3 className="text-blue-400 w-6 h-6" />,
    colSpan: "col-span-1 md:col-span-1 lg:col-span-2",
    bgClass: "bg-gradient-to-tr from-card/80 to-blue-500/10"
  }
];

const FeaturesGrid = () => {
  return (
    <section className="py-24 bg-background relative" id="features">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">
            Engineered for <span className="text-gradient">Scale</span>
          </h2>
          <p className="text-xl text-secondary-text">
            Every feature is designed to reduce friction, increase performance, and maximize your ROI from day one.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`rounded-3xl p-8 border border-white/5 backdrop-blur-xl hover:border-white/20 transition-all group ${feature.colSpan} ${feature.bgClass}`}
            >
              <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                {feature.icon}
              </div>
              <h3 className="text-2xl font-display font-bold text-white mb-3 tracking-tight">
                {feature.title}
              </h3>
              <p className="text-secondary-text text-lg leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default FeaturesGrid;

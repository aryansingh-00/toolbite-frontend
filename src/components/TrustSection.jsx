import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Award, Zap, Users } from 'lucide-react';

const stats = [
  { label: 'Projects Delivered', value: 150, suffix: '+', icon: <Zap className="text-amber-500" /> },
  { label: 'Client Satisfaction', value: 99, suffix: '%', icon: <SmileIcon /> },
  { label: 'Security Audits', value: 500, suffix: '+', icon: <ShieldCheck className="text-teal-500" /> },
  { label: 'Active Users', value: 25, suffix: 'k', icon: <Users className="text-blue-500" /> },
];

function SmileIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-rose-500"><circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/></svg>
  );
}

const partners = [
  { name: 'TechFlow', logo: 'TF' },
  { name: 'Nexus', logo: 'NX' },
  { name: 'Quantum', logo: 'QT' },
  { name: 'Aura', logo: 'AR' },
  { name: 'Stylekat Salon', logo: 'SS' },
  { name: 'Bytesool', logo: 'BS' },
];

const TrustSection = () => {
  return (
    <section className="py-24 bg-white dark:bg-slate-950 transition-colors relative overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Logos Marquee */}
        <div className="mb-20">
          <p className="text-center text-slate-400 dark:text-slate-500 font-bold uppercase tracking-widest text-xs mb-10">
            Trusted by Industry Leaders Worldwide
          </p>
          <div className="relative flex overflow-hidden group">
            <div className="flex animate-marquee whitespace-nowrap py-4">
              {[...partners, ...partners].map((partner, i) => (
                <div key={i} className="flex items-center gap-3 px-12 opacity-40 hover:opacity-100 transition-opacity cursor-default grayscale hover:grayscale-0">
                  <div className="w-10 h-10 rounded-lg bg-slate-900 text-white flex items-center justify-center font-black text-xs">
                    {partner.logo}
                  </div>
                  <span className="text-xl font-bold tracking-tighter text-slate-900 dark:text-white uppercase">{partner.name}</span>
                </div>
              ))}
            </div>
            {/* Gradient Mask */}
            <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-white dark:from-slate-950 to-transparent z-10"></div>
            <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-white dark:from-slate-950 to-transparent z-10"></div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center p-8 rounded-[32px] bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800 transition-all hover:shadow-xl hover:shadow-slate-200/50 dark:hover:shadow-none"
            >
              <div className="w-12 h-12 rounded-2xl bg-white dark:bg-slate-800 shadow-sm flex items-center justify-center mx-auto mb-6">
                {stat.icon}
              </div>
              <div className="flex items-center justify-center gap-1 mb-2">
                <span className="text-4xl font-black text-slate-900 dark:text-white tracking-tighter">
                  {stat.value}{stat.suffix}
                </span>
              </div>
              <p className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
      `}} />
    </section>
  );
};

export default TrustSection;

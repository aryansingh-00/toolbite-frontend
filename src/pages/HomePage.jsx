import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Check } from 'lucide-react';
import { motion } from 'framer-motion';
import SEO from '../components/SEO';
import Hero from '../components/Hero';
import Services from '../components/Services';
import ReadyMade from '../components/ReadyMade';
import Portfolio from '../components/Portfolio';
import WhyChooseUs from '../components/WhyChooseUs';
import Testimonials from '../components/Testimonials';
import FAQ from '../components/FAQ';
import GrowthAuditSection from '../components/GrowthAuditSection';
import TrustSection from '../components/TrustSection';
import ProjectStrategist from '../components/ProjectStrategist';

const PricingTeaser = () => {
  const plans = [
    { name: 'Growth', price: '$99', color: 'from-slate-700 to-slate-900', highlight: false, features: ['Up to 5 Pages', '1 Month Support', 'SEO Ready'] },
    { name: 'Enterprise', price: '$199', color: 'from-teal-500 to-emerald-400', highlight: true, features: ['Up to 15 Pages', '3 Months Support', 'Custom UI/UX'] },
    { name: 'SaaS / App', price: '$499', color: 'from-violet-600 to-indigo-600', highlight: false, features: ['Unlimited Pages', '6 Months Support', 'Full-Stack App'] },
  ];

  return (
    <section className="py-16 bg-slate-900 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-teal-900/10 to-transparent pointer-events-none" />
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-10">
          <span className="inline-block text-teal-400 font-semibold tracking-wide uppercase text-xs mb-3">Transparent Pricing</span>
          <h2 className="text-3xl md:text-4xl font-black text-white mb-3">Simple, Honest Plans</h2>
          <p className="text-slate-400 max-w-xl mx-auto text-sm">No hidden fees. No scope creep. Just premium engineering at fixed cost.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
          {plans.map((plan, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`rounded-2xl p-6 border flex flex-col ${plan.highlight ? 'border-teal-500 bg-slate-800 shadow-xl shadow-teal-500/10' : 'border-slate-800 bg-slate-800/40'}`}
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-lg font-bold text-white">{plan.name}</span>
                <span className={`px-3 py-1 rounded-full text-sm font-black bg-gradient-to-r ${plan.color} text-white`}>{plan.price}</span>
              </div>
              <ul className="space-y-2 flex-1">
                {plan.features.map((f, j) => (
                  <li key={j} className="flex items-center gap-2 text-slate-300 text-sm">
                    <Check size={14} className="text-teal-400 stroke-[3] shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <div className="text-center">
          <Link
            to="/pricing"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-teal-500 text-slate-900 font-bold hover:bg-teal-400 transition-all shadow-lg hover:shadow-teal-500/25"
          >
            View Full Pricing & Plans <ArrowRight size={18} />
          </Link>
          <p className="text-slate-500 text-xs mt-3">Includes comparison table, FAQ & free consultation</p>
        </div>
      </div>
    </section>
  );
};

const HomePage = () => {
  return (
    <>
      <SEO
        title="Premium Web Design Agency & Ready-Made Templates"
        description="ToolBite helps modern brands grow with high-performance custom websites and premium landing page templates. Launch your digital presence today."
        keywords="web design agency, custom website development, premium templates, landing pages, react web development, toolbite agency"
      />
      <Hero />
      <TrustSection />
      <Services />
      <ReadyMade />
      <Portfolio />
      <WhyChooseUs />
      <PricingTeaser />
      <Testimonials />
      <ProjectStrategist />
      <GrowthAuditSection />
      <FAQ />
    </>
  );
};

export default HomePage;

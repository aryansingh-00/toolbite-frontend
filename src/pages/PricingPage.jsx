import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, X, ArrowRight, Zap, Shield, HeadphonesIcon, Clock, Star, HelpCircle, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import { pricingPlans, faqData } from '../data/content.jsx';
import SEO from '../components/SEO';

const perks = [
  { icon: <Zap size={20} className="text-amber-500" />, label: 'Fast Delivery', desc: 'Ship in days, not months' },
  { icon: <Shield size={20} className="text-teal-500" />, label: 'Secure Code', desc: 'Enterprise-grade security' },
  { icon: <HeadphonesIcon size={20} className="text-blue-500" />, label: 'Priority Support', desc: 'Dedicated dev access' },
  { icon: <Star size={20} className="text-purple-500" />, label: '50% Off Launch', desc: 'Limited-time pricing' },
];

const comparisonRows = [
  { feature: 'Pages', Growth: 'Up to 5', Enterprise: 'Up to 15', SaaS: 'Unlimited' },
  { feature: 'Responsive Design', Growth: true, Enterprise: true, SaaS: true },
  { feature: 'Technical SEO', Growth: true, Enterprise: true, SaaS: true },
  { feature: 'Custom UI/UX', Growth: false, Enterprise: true, SaaS: true },
  { feature: 'CMS Integration', Growth: false, Enterprise: true, SaaS: true },
  { feature: 'Custom Auth Logic', Growth: false, Enterprise: false, SaaS: true },
  { feature: 'Dashboard / App', Growth: false, Enterprise: false, SaaS: true },
  { feature: 'Revision Cycles', Growth: '2', Enterprise: 'Unlimited', SaaS: 'Unlimited' },
  { feature: 'Priority Support', Growth: '1 Month', Enterprise: '3 Months', SaaS: '6 Months' },
  { feature: 'Price', Growth: '$99', Enterprise: '$199', SaaS: '$499' },
];

const PricingFAQ = () => {
  const [open, setOpen] = useState(null);
  const pricingFaqs = faqData.slice(0, 6);

  return (
    <div className="space-y-3">
      {pricingFaqs.map((faq, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.05 }}
          className="border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden"
        >
          <button
            onClick={() => setOpen(open === i ? null : i)}
            className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
          >
            <span className="font-bold text-slate-800 dark:text-slate-100 text-sm pr-4">{faq.question}</span>
            <ChevronDown size={18} className={`text-slate-500 shrink-0 transition-transform ${open === i ? 'rotate-180' : ''}`} />
          </button>
          {open === i && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="px-6 pb-4 text-sm text-slate-500 dark:text-slate-400 leading-relaxed"
            >
              {faq.answer}
            </motion.div>
          )}
        </motion.div>
      ))}
    </div>
  );
};

const PricingPage = () => {
  const plans = pricingPlans;

  return (
    <>
      <SEO
        title="Transparent Pricing Plans — ToolBite Agency"
        description="Simple, honest pricing for premium web design and development. Choose the Growth, Enterprise, or SaaS plan that matches your business needs. No hidden fees."
        keywords="web design pricing, website cost, agency pricing plans, toolbite pricing"
      />

      <main className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-28 pb-20">
        {/* Hero */}
        <section className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 text-center mb-16">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <span className="inline-flex items-center gap-2 px-3 py-1 bg-teal-500/10 text-teal-600 dark:text-teal-400 rounded-full text-xs font-black uppercase tracking-widest mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-500 animate-pulse" />
              Transparent Pricing
            </span>
            <h1 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white tracking-tight mb-5">
              Choose Your <span className="text-gradient">Best Plan</span>
            </h1>
            <p className="text-lg text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">
              Simple, honest pricing with no hidden fees. All plans include top-tier development and premium customer support designed exclusively for business growth.
            </p>
          </motion.div>

          {/* Perks Bar */}
          <div className="flex flex-wrap items-center justify-center gap-6 mt-10">
            {perks.map((p, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.08 }}
                className="flex items-center gap-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-full px-4 py-2 shadow-sm"
              >
                {p.icon}
                <div className="text-left">
                  <p className="text-xs font-bold text-slate-800 dark:text-slate-100">{p.label}</p>
                  <p className="text-[10px] text-slate-500">{p.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Pricing Cards */}
        <section className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 mb-24">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {plans.map((plan, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className={`rounded-3xl p-8 flex flex-col border transition-all duration-300 relative ${
                  plan.highlight
                    ? 'border-teal-500 bg-slate-900 text-white shadow-2xl shadow-teal-500/20 lg:-translate-y-4 hover:shadow-teal-500/30'
                    : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 hover:border-slate-300 dark:hover:border-slate-700'
                }`}
              >
                {plan.highlight && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-5 py-1.5 bg-gradient-to-r from-teal-500 to-emerald-400 rounded-full text-xs font-extrabold tracking-widest uppercase shadow-lg shadow-teal-500/30 text-white">
                    Most Popular
                  </div>
                )}

                <div className="absolute -top-3 -right-2 px-3 py-1 bg-rose-500 rounded-lg text-xs font-black tracking-widest uppercase shadow-lg shadow-rose-500/30 text-white transform rotate-6 z-10">
                  50% OFF
                </div>

                <div className="mb-6 mt-2">
                  <h2 className={`text-2xl font-bold mb-2 ${plan.highlight ? 'text-white' : 'text-slate-900 dark:text-white'}`}>{plan.name}</h2>
                  <p className={`text-sm h-10 ${plan.highlight ? 'text-slate-300' : 'text-slate-500 dark:text-slate-400'}`}>{plan.audience}</p>
                </div>

                <div className={`mb-8 flex flex-col border-b pb-8 ${plan.highlight ? 'border-slate-700/50' : 'border-slate-100 dark:border-slate-800'}`}>
                  {plan.originalPrice && (
                    <span className={`text-xl font-bold line-through mb-1 ${plan.highlight ? 'text-slate-500' : 'text-slate-400'}`}>{plan.originalPrice}</span>
                  )}
                  <div className="flex items-baseline gap-1">
                    <span className={`text-5xl font-extrabold ${plan.highlight ? 'text-white' : 'text-slate-900 dark:text-white'}`}>{plan.price}</span>
                    <span className={`font-medium text-sm ${plan.highlight ? 'text-slate-400' : 'text-slate-500'}`}>/project</span>
                  </div>
                </div>

                <div className="space-y-4 flex-1 mb-8">
                  {plan.features.map((feat, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      {feat.included ? (
                        <div className={`flex items-center justify-center rounded-full p-0.5 shrink-0 ${plan.highlight ? 'bg-teal-500/20 text-teal-400' : 'bg-slate-100 dark:bg-slate-800 text-teal-600 dark:text-teal-400'}`}>
                          <Check size={16} className="stroke-[3]" />
                        </div>
                      ) : (
                        <div className="flex items-center justify-center rounded-full p-0.5 bg-slate-100 dark:bg-slate-800/50 text-slate-400 shrink-0">
                          <X size={16} className="stroke-[3]" />
                        </div>
                      )}
                      <span className={`text-sm tracking-wide ${feat.included ? (plan.highlight ? 'text-slate-200' : 'text-slate-700 dark:text-slate-300') : 'text-slate-400 line-through'}`}>{feat.name}</span>
                    </div>
                  ))}
                </div>

                <Link
                  to="/start-project"
                  className={`w-full py-4 text-center rounded-xl font-bold transition-all shadow-sm flex items-center justify-center gap-2 ${
                    plan.highlight
                      ? 'bg-gradient-to-r from-teal-500 to-emerald-400 text-slate-900 hover:shadow-teal-500/25 hover:scale-[1.02]'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white hover:bg-slate-200 dark:hover:bg-slate-700 hover:scale-[1.02]'
                  }`}
                >
                  {plan.buttonText} <ArrowRight size={16} />
                </Link>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Comparison Table */}
        <section className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 mb-24">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-3">Plan Comparison</h2>
            <p className="text-slate-500 dark:text-slate-400">See exactly what's included in each tier</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800">
                  <th className="text-left py-4 px-4 font-bold text-slate-500 dark:text-slate-400 w-1/4">Feature</th>
                  {['Growth', 'Enterprise', 'SaaS / App'].map((plan) => (
                    <th key={plan} className={`py-4 px-4 font-black text-center ${plan === 'Enterprise' ? 'text-teal-600 dark:text-teal-400' : 'text-slate-800 dark:text-slate-100'}`}>{plan}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map((row, i) => (
                  <motion.tr
                    key={i}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.03 }}
                    className="border-b border-slate-100 dark:border-slate-800/60 hover:bg-slate-50 dark:hover:bg-slate-900/50 transition-colors"
                  >
                    <td className="py-3.5 px-4 font-medium text-slate-700 dark:text-slate-300">{row.feature}</td>
                    {['Growth', 'Enterprise', 'SaaS'].map((key) => (
                      <td key={key} className="py-3.5 px-4 text-center">
                        {typeof row[key] === 'boolean' ? (
                          row[key]
                            ? <Check size={18} className="text-teal-500 mx-auto stroke-[3]" />
                            : <X size={18} className="text-slate-300 dark:text-slate-600 mx-auto stroke-[3]" />
                        ) : (
                          <span className={`font-semibold ${key === 'Enterprise' ? 'text-teal-600 dark:text-teal-400' : 'text-slate-700 dark:text-slate-300'}`}>{row[key]}</span>
                        )}
                      </td>
                    ))}
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* FAQ */}
        <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
          <div className="text-center mb-10">
            <div className="flex items-center justify-center gap-2 mb-3">
              <HelpCircle size={20} className="text-teal-500" />
              <h2 className="text-3xl font-black text-slate-900 dark:text-white">Pricing FAQ</h2>
            </div>
            <p className="text-slate-500 dark:text-slate-400">Everything you need to know before starting</p>
          </div>
          <PricingFAQ />
        </section>

        {/* CTA */}
        <section className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 rounded-3xl p-12 text-center relative overflow-hidden border border-slate-700/50"
          >
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-teal-400 via-emerald-400 to-blue-500" />
            <div className="absolute inset-0 bg-teal-500/5 pointer-events-none" />
            <h2 className="text-3xl md:text-4xl font-black text-white mb-4">Ready to Launch?</h2>
            <p className="text-slate-400 mb-8 max-w-xl mx-auto">
              Not sure which plan fits? Start a free project consultation and we'll recommend the perfect tier for your goals.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/start-project"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-teal-500 text-slate-900 font-bold hover:bg-teal-400 transition-all shadow-lg hover:shadow-teal-500/25"
              >
                Start Your Project <ArrowRight size={18} />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full border border-slate-600 text-slate-300 font-bold hover:border-slate-400 hover:text-white transition-all"
              >
                Talk to an Expert
              </Link>
            </div>
          </motion.div>
        </section>
      </main>
    </>
  );
};

export default PricingPage;

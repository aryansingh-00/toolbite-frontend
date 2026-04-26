import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Zap, Rocket, CheckCircle2, Globe, Sparkles, Layout, Smartphone, Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '../../components/SEO';

const WebsiteBuilder = () => {
  const demos = [
    { title: 'Nexus Financial OS', category: 'Fintech', slug: 'nexus-finance', image: '/images/projects/nexus-finance.png' },
    { title: 'Aura Streetwear', category: 'E-Commerce', slug: 'aura-streetwear', image: '/images/projects/aura-streetwear.png' },
    { title: 'The Monarch Group', category: 'Real Estate', slug: 'monarch-realestate', image: '/images/projects/monarch-realestate.png' },
    { title: 'Quantix AI Landing', category: 'B2B Tech', slug: 'quantix-ai', image: '/images/projects/quantix-ai.png' },
  ];

  return (
    <div className="pt-32 pb-24 bg-white min-h-screen">
      <SEO 
        title="Ready-Made Website Builder | Rapid Deployment Platforms | ToolBite"
        description="Launch an enterprise-grade website in 3-7 days. Our Ready-Made Platforms combine high-performance engineering with rapid deployment architecture. Best for B2B, Fintech, and E-commerce."
        keywords="website builder, rapid web development, ready made website, professional website templates, toolbite builder, b2b website builder, fintech website templates, high performance web design"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center max-w-4xl mx-auto mb-24">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 text-indigo-700 font-bold text-sm mb-6 border border-indigo-100"
          >
            <Sparkles size={16} fill="currentColor" />
            <span>Rapid Deployment Infrastructure</span>
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-black text-slate-900 mb-8 tracking-tight leading-[1.1]"
          >
            Don't Just Build. <br/>
            <span className="text-indigo-600">Launch with Authority.</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed mb-12"
          >
            Bypass the 3-month development cycle. Our Ready-Made Platforms provide enterprise-grade architecture that we brand, populate, and deploy for you in under 7 days.
          </motion.p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/start-project" className="px-10 py-5 bg-slate-900 text-white font-black rounded-2xl shadow-xl hover:bg-indigo-600 transition-all hover:-translate-y-1">
              Start Your Build
            </Link>
            <a href="#how-it-works" className="px-10 py-5 bg-slate-50 text-slate-600 font-bold rounded-2xl border border-slate-200 hover:bg-slate-100 transition-all">
              See How It Works
            </a>
          </div>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-32">
          {[
            { icon: Rocket, title: 'Sub-7 Day Launch', desc: 'Our modular codevault allows us to bypass the sluggish "start from scratch" phase, focusing immediately on your branding and content.', color: 'text-rose-500', bg: 'bg-rose-50' },
            { icon: Zap, title: 'Extreme Performance', desc: 'Every platform is pre-optimized to pass Google Core Web Vitals with near-perfect scores (95+), ensuring instant load times.', color: 'text-amber-500', bg: 'bg-amber-50' },
            { icon: Layout, title: 'Bespoke Branding', desc: 'We don\'t just swap logos. We universally scale your brand\'s unique typography, color tokens, and personality across the architecture.', color: 'text-indigo-500', bg: 'bg-indigo-50' },
          ].map((feature, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-10 bg-white rounded-[3rem] border border-slate-100 shadow-sm hover:shadow-xl transition-all"
            >
              <div className={`w-14 h-14 ${feature.bg} ${feature.color} rounded-2xl flex items-center justify-center mb-6`}>
                <feature.icon size={28} />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">{feature.title}</h3>
              <p className="text-slate-600 leading-relaxed">{feature.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* The Vault Section */}
        <div className="bg-slate-900 rounded-[4rem] p-12 md:p-24 overflow-hidden relative mb-32">
          <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 blur-[120px] rounded-full"></div>
          <div className="relative z-10 text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-white mb-6 tracking-tight">The Ready-Made Vault</h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              Select your industry archetype. We handle the engineering; you handle the growth.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {demos.map((demo, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -10 }}
                className="group cursor-pointer"
              >
                <div className="aspect-[4/5] bg-slate-800 rounded-3xl overflow-hidden mb-6 border border-white/5 relative">
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-60 z-10"></div>
                  <img src={demo.image} alt={demo.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute bottom-6 left-6 right-6 z-20">
                    <span className="text-[10px] font-black uppercase tracking-widest text-indigo-400 mb-2 block">{demo.category}</span>
                    <h4 className="text-xl font-bold text-white">{demo.title}</h4>
                  </div>
                </div>
                <Link to={`/demos/${demo.slug}/index.html`} target="_blank" className="flex items-center justify-center gap-2 text-white/50 group-hover:text-white font-bold transition-colors">
                  Live Preview <ArrowRight size={16} />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Pricing Comparison */}
        <div id="how-it-works" className="max-w-5xl mx-auto mb-32">
          <h2 className="text-4xl font-black text-slate-900 mb-16 text-center tracking-tight">Rapid Deployment vs. Custom Build</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-slate-200 rounded-[3rem] overflow-hidden border border-slate-200 shadow-2xl">
            <div className="bg-white p-12">
              <h3 className="text-2xl font-bold text-slate-900 mb-8 flex items-center gap-3">
                <div className="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center text-slate-400 italic font-serif">C</div>
                Traditional Custom Build
              </h3>
              <ul className="space-y-6">
                {[
                  'Development Time: 4-12 Weeks',
                  'Cost: $5,000 - $50,000+',
                  'Sluggish Scoping & Feedback Loops',
                  'High Technical Debt Risk',
                  'Manual Performance Optimization'
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-slate-500 font-medium line-through decoration-slate-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-300"></span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-slate-50 p-12 relative overflow-hidden">
              <div className="absolute top-0 right-0 px-6 py-2 bg-indigo-600 text-white text-[10px] font-black uppercase tracking-widest -rotate-0 rounded-bl-2xl">
                Recommended for Speed
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-8 flex items-center gap-3">
                <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white">
                  <Zap size={16} fill="currentColor" />
                </div>
                ToolBite Ready-Made
              </h3>
              <ul className="space-y-6">
                {[
                  'Deployment Time: 3-7 Days',
                  'Fixed, Transparent Pricing ($99 - $499)',
                  'Immediate Launch & Market Presence',
                  'Zero Technical Debt (Vetted Code)',
                  '95+ Performance Scores Guaranteed'
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-slate-900 font-bold">
                    <CheckCircle2 className="text-indigo-600" size={20} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-indigo-600 rounded-[4rem] p-12 md:p-24 text-center text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
          <h2 className="text-4xl md:text-6xl font-black mb-8 tracking-tight relative z-10">Scale Beyond the Generic.</h2>
          <p className="text-indigo-50 text-xl mb-12 max-w-2xl mx-auto leading-relaxed relative z-10">
            Why wait months to see if your idea works? Launch a world-class digital presence next week.
          </p>
          <Link to="/start-project" className="inline-flex items-center gap-3 px-12 py-6 bg-slate-900 text-white font-black rounded-2xl shadow-2xl hover:scale-105 transition-transform group relative z-10">
            Launch Your Platform <ArrowRight size={24} className="group-hover:translate-x-2 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default WebsiteBuilder;

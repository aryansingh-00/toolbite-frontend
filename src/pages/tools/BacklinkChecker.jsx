import React from 'react';
import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  Link2, 
  Target, 
  ExternalLink, 
  ShieldCheck, 
  Search,
  Zap,
  ArrowRight,
  Globe
} from 'lucide-react';
import SEO from '../../components/SEO';
import ToolLayout from '../../components/tools/ToolLayout';

const BacklinkChecker = () => {
  return (
    <ToolLayout
      title="Backlink Analysis Guide"
      description="Understand the relevance and authority of your digital footprint. Learn how to leverage inbound links for elite search rankings."
      extendedContent={
        <div className="space-y-16">
          {/* Main Educational Section */}
          <section className="relative">
            <div className="absolute -left-4 top-0 w-1 h-full bg-teal-500 rounded-full opacity-50"></div>
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-8 tracking-tight">What are Backlinks?</h2>
            <div className="prose prose-lg text-slate-600 max-w-none space-y-6">
              <p className="text-xl leading-relaxed font-medium">
                Backlinks, also known as <span className="text-teal-600 font-bold">inbound links</span> or <span className="text-teal-600 font-bold">incoming links</span>, are links from other websites that point to a page on your website. 
              </p>
              <p>
                They are important for search engines because they help search engines understand the relevance and authority of your website, which can help improve your rankings in search engine results. Backlinks can also help to increase referral traffic to your site, as people who click on the links from other websites are directed to your site. This can help to increase your site’s visibility and engagement.
              </p>
            </div>
          </section>

          {/* Strategic Pillars */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div 
              whileHover={{ y: -5 }}
              className="p-8 rounded-[2.5rem] bg-white border border-slate-200 shadow-sm hover:shadow-xl transition-all"
            >
              <div className="w-12 h-12 bg-teal-500/10 text-teal-600 rounded-2xl flex items-center justify-center mb-6">
                <Target size={24} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-4">Domain Authority</h3>
              <p className="text-slate-600 leading-relaxed text-sm">
                Search engines view each backlink as a "vote of confidence." The more high-quality votes you have, the more authoritative your domain appears in the eyes of ranking algorithms.
              </p>
            </motion.div>

            <motion.div 
              whileHover={{ y: -5 }}
              className="p-8 rounded-[2.5rem] bg-white border border-slate-200 shadow-sm hover:shadow-xl transition-all"
            >
              <div className="w-12 h-12 bg-blue-500/10 text-blue-600 rounded-2xl flex items-center justify-center mb-6">
                <Globe size={24} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-4">Referral Ecosystem</h3>
              <p className="text-slate-600 leading-relaxed text-sm">
                Beyond SEO, backlinks create a network of referral traffic. They connect your brand to relevant communities, driving pre-qualified users directly to your high-value landing pages.
              </p>
            </motion.div>
          </div>

          {/* Bing Webmaster Tools Guide */}
          <section className="bg-slate-900 rounded-[3rem] p-10 md:p-16 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-teal-500/10 blur-[120px] rounded-full"></div>
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-teal-400 text-xs font-black uppercase tracking-widest mb-8 border border-white/10">
                <Zap size={14} className="fill-current" />
                Pro Strategy
              </div>
              <h2 className="text-3xl md:text-5xl font-black mb-8 leading-tight">Mastering Bing Webmaster Tools</h2>
              <p className="text-slate-400 text-lg mb-12 max-w-2xl leading-relaxed">
                To truly dominate your niche, you must <span className="text-white font-bold">review backlinks to your site</span> and <span className="text-white font-bold">compare backlinks to any other website</span>. Bing Webmaster Tools provides an elite suite for this precise analysis.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                {[
                  { title: "Backlink Report", desc: "View every unique domain pointing to your site with deep toxicity analysis." },
                  { title: "Competitor Comparison", desc: "Enter any competitor URL to see their inbound link profile vs yours." },
                  { title: "Anchor Text Analysis", desc: "Ensure your link profile is natural and optimized for your target keywords." }
                ].map((item, i) => (
                  <div key={i} className="p-6 rounded-2xl bg-white/5 border border-white/10">
                    <h4 className="font-bold text-teal-400 mb-2">{item.title}</h4>
                    <p className="text-xs text-slate-500 leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>

              <a 
                href="https://www.bing.com/webmasters/backlinks" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-10 py-5 bg-teal-500 text-slate-900 font-black rounded-2xl hover:scale-105 transition-transform"
              >
                Launch Bing Backlink Tool
                <ExternalLink size={20} />
              </a>
            </div>
          </section>

          {/* Actionable Checklist */}
          <section>
            <h3 className="text-2xl font-bold text-slate-900 mb-8">The High-Authority Checklist</h3>
            <div className="space-y-4">
              {[
                "Audit your existing backlink profile for 'Toxic' links.",
                "Identify high-authority industry blogs for guest contributions.",
                "Monitor competitor link acquisitions weekly.",
                "Ensure anchor text diversity across all incoming links.",
                "Create 'Linkable Assets'—high-value research or tools that earn links naturally."
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-4 p-6 bg-slate-50 border border-slate-100 rounded-2xl group hover:border-teal-200 transition-colors">
                  <div className="w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center shrink-0 group-hover:bg-teal-500 group-hover:border-teal-500 transition-all">
                    <ShieldCheck size={16} className="text-slate-400 group-hover:text-white transition-colors" />
                  </div>
                  <span className="text-slate-700 font-medium">{item}</span>
                </div>
              ))}
            </div>
          </section>

          {/* CTA Footer */}
          <div className="pt-16 border-t border-slate-200 text-center">
            <h3 className="text-3xl font-black text-slate-900 mb-6">Need an SEO Infrastructure?</h3>
            <p className="text-slate-600 mb-10 max-w-2xl mx-auto">
              Link building is only one part of the puzzle. Our engineering team builds platforms that are technically optimized for search engines from day one.
            </p>
            <div className="flex justify-center gap-4">
              <motion.button 
                whileHover={{ scale: 1.05 }}
                className="px-8 py-4 bg-slate-900 text-white font-bold rounded-xl flex items-center gap-2"
              >
                Let's Build It <ArrowRight size={18} />
              </motion.button>
            </div>
          </div>
        </div>
      }
    >
      <SEO 
        title="Backlink Analysis Guide — Boost SEO Authority & Referral Traffic"
        description="Learn how to monitor and compare backlinks to your site using Bing Webmaster Tools. Master the strategy behind inbound links and authority building."
      />

      <div className="relative group">
        <div className="absolute -inset-1 bg-gradient-to-r from-teal-500 to-blue-500 rounded-[2.5rem] blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
        <div className="relative bg-white dark:bg-slate-900 rounded-[2.5rem] p-10 md:p-16 border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-teal-500/10 rounded-bl-[100px]"></div>
          <div className="flex flex-col md:flex-row gap-12 items-center">
             <div className="w-24 h-24 bg-teal-500 text-white rounded-3xl flex items-center justify-center shrink-0 shadow-lg shadow-teal-500/30">
                <TrendingUp size={48} />
             </div>
             <div className="text-center md:text-left flex-grow">
                <h2 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white mb-6">Launch Your <span className="text-teal-500">Backlink Audit</span></h2>
                <p className="text-slate-600 dark:text-slate-400 text-lg font-medium leading-relaxed mb-8">
                  The most powerful way to track and compare backlinks is through the Bing Webmaster Portal. This guide explains why it's critical for your growth journey.
                </p>
                <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                   <div className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-sm font-bold flex items-center gap-2 border border-slate-200 dark:border-slate-700">
                      <Search size={16} />
                      Competitor Analysis
                   </div>
                   <div className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-sm font-bold flex items-center gap-2 border border-slate-200 dark:border-slate-700">
                      <Link2 size={16} />
                      Link Toxicity Scan
                   </div>
                </div>
             </div>
          </div>
        </div>
      </div>
    </ToolLayout>
  );
};

export default BacklinkChecker;

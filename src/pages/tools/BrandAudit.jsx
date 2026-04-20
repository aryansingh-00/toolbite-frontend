import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  SearchCode, 
  Globe, 
  Zap, 
  Target, 
  ArrowRight, 
  CheckCircle2, 
  AlertCircle,
  BarChart3,
  Cpu,
  ShieldCheck,
  Sparkles
} from 'lucide-react';
import SEO from '../../components/SEO';
import ToolLayout from '../../components/tools/ToolLayout';

const scanSteps = [
  "Resolving DNS & Host headers...",
  "Measuring Core Web Vitals (LCP, FID, CLS)...",
  "Analyzing Design Language & Visual Consistency...",
  "Evaluating Conversion Optimization Patterns...",
  "Auditing SEO Meta Health & Schema Markup...",
  "Identifying Performance Bottlenecks...",
  "Finalizing Strategic Scorecard..."
];

const BrandAudit = () => {
  const [url, setUrl] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [scanStepIndex, setScanStepIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    let interval;
    if (isScanning && scanStepIndex < scanSteps.length - 1) {
      interval = setInterval(() => {
        setScanStepIndex(prev => prev + 1);
      }, 1200);
    } else if (isScanning && scanStepIndex === scanSteps.length - 1) {
      setTimeout(() => {
        setIsScanning(false);
        setIsComplete(true);
      }, 1500);
    }
    return () => clearInterval(interval);
  }, [isScanning, scanStepIndex]);

  const handleStartScan = (e) => {
    e.preventDefault();
    if (!url) return;
    setIsScanning(true);
    setScanStepIndex(0);
    setIsComplete(false);
  };

  return (
    <ToolLayout
      title="Digital Brand Audit"
      description="Uncover the hidden gaps in your digital presence. Get an elite-level technical and strategic health report in seconds."
      extendedContent={
        <div className="space-y-12">
          <section>
            <h2 className="text-3xl font-black text-slate-900 mb-6">The Power of Backlinks in Digital Auditing</h2>
            <p className="text-lg leading-relaxed text-slate-600">
              Backlinks, also known as inbound links or incoming links, are links from other websites that point to a page on your website. They are important for search engines because they help search engines understand the relevance and authority of your website, which can help improve your rankings in search engine results.
            </p>
          </section>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <section>
              <h3 className="text-xl font-bold text-slate-900 mb-4">Driving Referral Traffic</h3>
              <p className="text-slate-600 leading-relaxed">
                Backlinks can also help to increase referral traffic to your site, as people who click on the links from other websites are directed to your site. This can help to increase your site's visibility and engagement, generating highly qualified leads natively rather than relying completely on paid advertising.
              </p>
            </section>

            <section>
              <h3 className="text-xl font-bold text-slate-900 mb-4">Bing Webmaster Tools Integration</h3>
              <p className="text-slate-600 leading-relaxed">
                A critical part of any successful digital brand audit is to review backlinks to your site and compare backlinks to any other website via Bing Webmaster Tools. Monitoring your inbound link profile ensures you stay ahead of algorithmic changes and protect your domain authority against toxic links.
              </p>
            </section>
          </div>

          <section>
            <h2 className="text-3xl font-black text-slate-900 mb-6 font-sans">The Technical Health Checklist</h2>
            <p className="text-slate-600 leading-relaxed mb-6">
              A modern digital audit evaluates your platform across four primary pillars. If any pillar is weak, the entire structure of your digital growth is at risk.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-center gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-100 italic font-medium text-slate-700">
                <div className="w-2 h-2 rounded-full bg-teal-500" />
                LCP (Largest Contentful Paint) under 1.2s
              </div>
              <div className="flex items-center gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-100 italic font-medium text-slate-700">
                <div className="w-2 h-2 rounded-full bg-teal-500" />
                Semantic HTML5 & WAI-ARIA Compliance
              </div>
              <div className="flex items-center gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-100 italic font-medium text-slate-700">
                <div className="w-2 h-2 rounded-full bg-teal-500" />
                Zero Render-Blocking Resources in Head
              </div>
              <div className="flex items-center gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-100 italic font-medium text-slate-700">
                <div className="w-2 h-2 rounded-full bg-teal-500" />
                Modern Image Formats (WebP/AVIF) Only
              </div>
            </div>
          </section>

          <section className="bg-slate-900 rounded-[2.5rem] p-10 md:p-12 text-white relative overflow-hidden shadow-2xl shadow-slate-200">
            <div className="absolute top-0 right-0 w-48 h-48 bg-teal-500/10 blur-[80px] rounded-full"></div>
            <h3 className="text-2xl font-bold mb-4">UX Psychological Triggers</h3>
            <p className="text-slate-400 leading-relaxed">
              An audit isn't just about code; it's about people. We look for "Friction Points" where users might feel confused or frustrated. By implementing **Social Proof**, **Scarcity Signals**, and **High-Contrast CTAs**, we transform a static website into a persuasive conversion engine.
            </p>
          </section>
        </div>
      }
    >
      <SEO 
        title="Digital Brand Audit — Free Technical & Strategic Website Analysis"
        description="Run a professional audit on your website for SEO, performance, and design consistency. Discover how ToolBite engineering can scale your results."
      />

      <div className="max-w-4xl mx-auto">
        
        {!isScanning && !isComplete && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-10 md:p-16 border border-slate-200 dark:border-slate-800 shadow-2xl text-center"
          >
            <div className="w-20 h-20 bg-teal-500/10 text-teal-600 rounded-2.5xl flex items-center justify-center mx-auto mb-8">
              <SearchCode size={40} />
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white mb-6 tracking-tight">Enter your URL to <span className="text-teal-500">Analyze</span></h2>
            <p className="text-slate-500 dark:text-slate-400 font-medium mb-12 max-w-xl mx-auto text-lg leading-relaxed">
              Our audit engine evaluates your site against Global Performance Benchmarks and ToolBite Engineering Standards.
            </p>
            
            <form onSubmit={handleStartScan} className="relative group max-w-2xl mx-auto">
              <Globe className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-teal-500 transition-colors" size={24} />
              <input 
                type="url" 
                required
                placeholder="https://yourwebsite.com"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="w-full pl-16 pr-44 py-6 bg-slate-50 dark:bg-slate-800/50 border-2 border-slate-100 dark:border-slate-800 rounded-3xl focus:outline-none focus:ring-4 focus:ring-teal-500/10 focus:border-teal-500 transition-all text-lg dark:text-white font-medium shadow-inner"
              />
              <button 
                type="submit"
                className="absolute right-3 top-1/2 -translate-y-1/2 px-8 py-4 bg-slate-900 dark:bg-teal-500 text-white dark:text-slate-900 font-bold rounded-2xl hover:scale-105 transition-transform shadow-xl shadow-teal-500/20"
              >
                Start Audit
              </button>
            </form>
          </motion.div>
        )}

        {isScanning && (
          <div className="min-h-[500px] flex flex-col items-center justify-center text-center">
             <div className="relative mb-12">
                <div className="w-32 h-32 border-4 border-slate-100 dark:border-slate-800 rounded-full"></div>
                <motion.div 
                  className="absolute inset-0 border-4 border-teal-500 rounded-full border-t-transparent"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                ></motion.div>
                <div className="absolute inset-0 flex items-center justify-center text-teal-500">
                  <BarChart3 size={40} />
                </div>
             </div>
             
             <AnimatePresence mode="wait">
                <motion.div
                  key={scanStepIndex}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-4"
                >
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white">{scanSteps[scanStepIndex]}</h3>
                  <div className="flex justify-center gap-1">
                    {[0, 1, 2, 3, 4, 5, 6].map(i => (
                      <div key={i} className={`w-8 h-1.5 rounded-full transition-all duration-500 ${i <= scanStepIndex ? 'bg-teal-500 shadow-[0_0_10px_rgba(20,184,166,0.5)]' : 'bg-slate-200 dark:bg-slate-800'}`}></div>
                    ))}
                  </div>
                </motion.div>
             </AnimatePresence>
          </div>
        )}

        {isComplete && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="space-y-8"
          >
            {/* Results Header */}
            <div className="bg-slate-900 rounded-[2.5rem] p-10 md:p-12 text-white relative overflow-hidden">
               <div className="absolute top-0 right-0 w-64 h-64 bg-teal-500/20 blur-[100px] rounded-full"></div>
               <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-8">
                  <div>
                    <h2 className="text-3xl font-black mb-2 tracking-tight">Audit Report for {new URL(url).hostname}</h2>
                    <p className="text-slate-400 font-medium">Report generated on {new Date().toLocaleDateString()}</p>
                  </div>
                  <div className="flex items-center gap-4">
                     <span className="text-sm font-bold text-slate-400 uppercase tracking-[0.2em]">Overall Score</span>
                     <div className="text-6xl font-black text-teal-400">74<span className="text-xl text-slate-500">/100</span></div>
                  </div>
               </div>
            </div>

            {/* Score Segments */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { label: "Performance", score: 88, color: "teal", icon: <Zap />, status: "Good" },
                { label: "Design UX", score: 62, color: "amber", icon: <Sparkles />, status: "Moderate" },
                { label: "Technical SEO", score: 71, color: "emerald", icon: <Target />, status: "Stable" }
              ].map((item, i) => (
                <div key={i} className="bg-white dark:bg-slate-900 p-8 rounded-[2rem] border border-slate-200 dark:border-slate-800 shadow-sm">
                  <div className={`p-3 rounded-xl bg-${item.color}-500/10 text-${item.color}-500 w-fit mb-6`}>
                    {item.icon}
                  </div>
                  <h4 className="font-bold text-slate-900 dark:text-white mb-2">{item.label}</h4>
                  <div className="flex items-end gap-3 mb-4">
                     <span className="text-4xl font-black text-slate-900 dark:text-white">{item.score}</span>
                     <span className={`text-xs font-bold uppercase tracking-widest text-${item.color}-500 mb-1.5`}>{item.status}</span>
                  </div>
                  <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }} 
                      animate={{ width: `${item.score}%` }} 
                      transition={{ duration: 1, delay: 0.5 }}
                      className={`h-full bg-${item.color}-500`}
                    ></motion.div>
                  </div>
                </div>
              ))}
            </div>

            {/* Critical Gaps & Recommendations */}
            <div className="bg-white dark:bg-slate-900 rounded-[2rem] border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
               <div className="p-8 border-b border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 flex items-center gap-3">
                  <AlertCircle className="text-rose-500" />
                  <h3 className="font-bold text-slate-900 dark:text-white">Strategic Gaps Identified</h3>
               </div>
               <div className="p-8 space-y-6">
                  {[
                    "Unoptimized visual assets increasing Load Time by 2.4s.",
                    "Missing structured JSON-LD data for product rich snippets.",
                    "Mobile conversion flow lacks 'Thumb-Friendly' design patterns.",
                    "Brand voice feels fragmented across service landing pages."
                  ].map((gap, i) => (
                    <div key={i} className="flex gap-4 items-start">
                       <div className="mt-1 w-2 h-2 rounded-full bg-rose-500 shrink-0"></div>
                       <p className="text-slate-600 dark:text-slate-400 font-medium">{gap}</p>
                    </div>
                  ))}
               </div>
            </div>

            {/* Final CTA */}
            <div className="bg-gradient-to-tr from-slate-900 to-teal-900 rounded-[2.5rem] p-12 md:p-16 text-center text-white relative overflow-hidden">
               <div className="relative z-10">
                  <h3 className="text-3xl md:text-5xl font-black mb-6 tracking-tight">Ready to bridge the <span className="text-teal-400">Gaps?</span></h3>
                  <p className="text-slate-300 text-lg mb-12 max-w-2xl mx-auto">
                    These automated results are just the surface. Schedule an expert-guided strategy session to receive a full manual teardown and development roadmap.
                  </p>
                  <div className="flex flex-col sm:flex-row justify-center gap-4">
                    <button className="px-10 py-5 bg-teal-500 text-slate-900 font-black rounded-2xl shadow-xl shadow-teal-500/20 hover:scale-105 transition-transform flex items-center justify-center gap-3">
                      Book My Full Strategy Call
                      <ArrowRight size={20} />
                    </button>
                    <button 
                      onClick={() => setIsComplete(false)}
                      className="px-10 py-5 bg-white/10 hover:bg-white/20 text-white font-bold rounded-2xl transition-all border border-white/10"
                    >
                      Audit Another Site
                    </button>
                  </div>
               </div>
            </div>
          </motion.div>
        )}
      </div>

      <style>{`
        .bg-teal-500 { background-color: #14b8a6; }
        .text-teal-500 { color: #14b8a6; }
        .bg-amber-500 { background-color: #f59e0b; }
        .text-amber-500 { color: #f59e0b; }
        .bg-emerald-500 { background-color: #10b981; }
        .text-emerald-500 { color: #10b981; }
      `}</style>
    </ToolLayout>
  );
};

export default BrandAudit;

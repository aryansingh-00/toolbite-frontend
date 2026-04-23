import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { portfolioProjects } from '../data/content';
import SEO from '../components/SEO';
import { ArrowLeft, ExternalLink, CheckCircle2, Cpu, Zap, Globe, ShieldCheck } from 'lucide-react';

const CaseStudyDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // Find project by slug (we'll use a simple slug logic)
  const project = portfolioProjects.find(p => p.title.toLowerCase().replace(/\s+/g, '-') === id);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!project) {
      // If project not found, redirect to portfolio
      const timer = setTimeout(() => navigate('/portfolio'), 3000);
      return () => clearTimeout(timer);
    }
  }, [project, navigate]);

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center">
          <h1 className="text-4xl font-black text-slate-900 mb-4">Project Not Found</h1>
          <p className="text-slate-600 mb-8">Redirecting you back to the portfolio...</p>
          <div className="w-12 h-12 border-4 border-teal-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <SEO 
        title={`${project.title} Case Study`}
        description={project.description}
        keywords={`${project.tags.join(', ')}, toolbite case study`}
      />

      {/* Hero Section */}
      <section className={`relative py-32 overflow-hidden ${project.image} text-white`}>
        <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-[2px]"></div>
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <Link to="/portfolio" className="inline-flex items-center gap-2 text-white/80 hover:text-white font-bold mb-12 transition-colors group">
            <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
            Back to Portfolio
          </Link>
          
          <div className="max-w-3xl">
            <motion.span 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-block px-4 py-1.5 bg-white/20 backdrop-blur-md rounded-full text-xs font-black uppercase tracking-widest mb-6"
            >
              {project.category}
            </motion.span>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-7xl font-black mb-8 leading-[1.1] tracking-tighter"
            >
              {project.title}
            </motion.h1>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex flex-wrap gap-3"
            >
              {project.tags.map((tag, i) => (
                <span key={i} className="px-4 py-2 bg-slate-900/30 backdrop-blur-sm border border-white/10 rounded-xl text-sm font-bold">
                  {tag}
                </span>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-20">
            
            {/* Project Overview */}
            <div className="lg:col-span-2 space-y-12">
              <div>
                <h2 className="text-3xl font-black text-slate-900 mb-6">The Strategic Objective</h2>
                <p className="text-xl text-slate-600 leading-relaxed font-medium">
                  {project.description}
                </p>
                <p className="text-lg text-slate-500 mt-6 leading-relaxed">
                  Every line of code in the {project.title} ecosystem was architected with a primary focus on <strong>extreme technical performance</strong> and <strong>high-conversion user psychology</strong>. We didn't just build a website; we engineered a digital asset that serves as the core revenue engine for the brand.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="p-8 rounded-[2rem] bg-slate-50 border border-slate-100">
                  <Cpu className="text-teal-500 mb-4" size={32} />
                  <h3 className="text-xl font-bold text-slate-900 mb-2">Technical Core</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    Built on a custom React/Vite stack with sub-second TTI (Time to Interactive) and optimized asset pipelines.
                  </p>
                </div>
                <div className="p-8 rounded-[2rem] bg-slate-50 border border-slate-100">
                  <ShieldCheck className="text-blue-500 mb-4" size={32} />
                  <h3 className="text-xl font-bold text-slate-900 mb-2">Security & Scale</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    Enterprise-grade security protocols and a globally distributed edge network for 99.99% uptime.
                  </p>
                </div>
              </div>

              <div>
                <h2 className="text-3xl font-black text-slate-900 mb-6">Key Engineering Milestones</h2>
                <ul className="space-y-4">
                  {[
                    "Zero-latency state management for real-time data synchronization.",
                    "Pixel-perfect responsive architecture optimized for all device matrices.",
                    "Semantic HTML5 structure for peak AI and search engine discoverability.",
                    "Advanced Framer Motion micro-interactions to guide user behavior.",
                    "Strategic funnel optimization resulting in a significant ROI boost."
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-4">
                      <CheckCircle2 className="text-teal-500 shrink-0 mt-1" size={20} />
                      <span className="text-slate-600 font-medium">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Sidebar Stats */}
            <div className="space-y-8">
              <div className="p-8 rounded-[2.5rem] bg-slate-900 text-white shadow-2xl">
                <h3 className="text-xl font-bold mb-6 pb-4 border-b border-white/10">Project Impact</h3>
                <div className="space-y-8">
                  <div>
                    <p className="text-slate-400 text-xs font-black uppercase tracking-widest mb-1">Performance Score</p>
                    <div className="flex items-end gap-2">
                      <span className="text-4xl font-black text-teal-400">100</span>
                      <span className="text-slate-500 text-sm font-bold mb-1">/100</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-slate-400 text-xs font-black uppercase tracking-widest mb-1">Conversion Boost</p>
                    <div className="flex items-end gap-2">
                      <span className="text-4xl font-black text-emerald-400">+142%</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-slate-400 text-xs font-black uppercase tracking-widest mb-1">Load Time</p>
                    <div className="flex items-end gap-2">
                      <span className="text-4xl font-black text-blue-400">0.4s</span>
                    </div>
                  </div>
                </div>

                <div className="mt-12 pt-8 border-t border-white/10">
                  <a 
                    href={project.liveUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-3 w-full py-4 bg-white text-slate-900 rounded-2xl font-black hover:bg-teal-400 transition-all group"
                  >
                    Launch Live Site
                    <ExternalLink size={18} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </a>
                </div>
              </div>

              <div className="p-8 rounded-[2.5rem] bg-teal-50 border border-teal-100">
                <h4 className="text-lg font-black text-teal-900 mb-4">Need something similar?</h4>
                <p className="text-teal-700 text-sm font-medium mb-6 leading-relaxed">
                  We can architect a similar high-performance platform for your brand in under 14 days.
                </p>
                <Link to="/contact" className="inline-flex items-center gap-2 text-teal-600 font-black text-sm uppercase tracking-widest hover:text-teal-800 transition-colors">
                  Discuss Strategy <ExternalLink size={14} />
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-slate-50 border-t border-slate-100">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-black text-slate-900 mb-6">Ready to scale your technical vision?</h2>
          <p className="text-xl text-slate-600 mb-10">
            Let's build a platform that doesn't just look great, but dominates your market through engineering excellence.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/contact" className="w-full sm:w-auto px-10 py-5 bg-slate-900 text-white rounded-2xl font-black shadow-xl hover:bg-teal-600 transition-all">
              Schedule Architecture Call
            </Link>
            <Link to="/templates" className="w-full sm:w-auto px-10 py-5 bg-white border-2 border-slate-200 text-slate-900 rounded-2xl font-black hover:border-teal-500 transition-all">
              Browse Template Vault
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CaseStudyDetail;

import React from 'react';
import { tools } from '../../data/tools';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronRight, ArrowLeft } from 'lucide-react';
import SEO from '../SEO';

const ToolLayout = ({ 
  title, 
  description, 
  keywords, 
  icon: Icon, 
  children,
  category,
  extendedContent,
  slug,
  maxWidth = 'max-w-4xl'
}) => {
  return (
    <div className="pt-32 pb-24 bg-background min-h-screen relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[150px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-1/4 w-[600px] h-[600px] bg-secondary/5 rounded-full blur-[150px] pointer-events-none"></div>

      <SEO 
        title={keywords?.split(',')[0]?.includes('Best') || keywords?.split(',')[0]?.includes('Free') ? `${title} | ToolBite` : `Free ${title} Online | Best Utility Tool | ToolBite`}
        description={description}
        keywords={`${keywords}, ${title?.toLowerCase()}, online tool, toolbite, productivity`}
        toolData={{
          name: title,
          category: category
        }}
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'Tools', url: '/tools' },
          { name: title, url: `/tools/${slug || title?.toLowerCase().replace(/ /g, '-')}` }
        ]}
      />
      
      <div className={`${maxWidth} mx-auto px-4 sm:px-6 lg:px-8 relative z-10`}>
        {/* Breadcrumbs */}
        <nav className="flex items-center space-x-2 text-sm font-medium text-secondary-text mb-8 overflow-x-auto whitespace-nowrap pb-2 md:pb-0">
          <Link to="/" className="hover:text-primary transition-colors">Home</Link>
          <ChevronRight size={14} />
          <Link to="/tools" className="hover:text-primary transition-colors">Tools</Link>
          <ChevronRight size={14} />
          <span className="text-text truncate">{title}</span>
        </nav>

        {/* Header */}
        <div className="mb-12">
          <Link 
            to="/tools" 
            className="inline-flex items-center text-primary font-medium mb-6 hover:translate-x-[-4px] transition-transform group"
          >
            <ArrowLeft size={18} className="mr-2" />
            Back to All Tools
          </Link>
          
          <div className="flex items-center gap-6 mb-4">
            {Icon && (
              <div className="p-4 bg-white/5 border border-white/10 rounded-2xl text-primary shadow-glow-primary">
                <Icon size={32} />
              </div>
            )}
            <div>
              <span className="inline-block px-3 py-1 bg-white/5 border border-white/10 text-secondary-text text-xs font-bold rounded-full mb-3 uppercase tracking-wider">
                {category}
              </span>
              <h1 className="text-4xl md:text-5xl font-display font-bold text-white tracking-tight">
                {title}
              </h1>
            </div>
          </div>
          <p className="text-lg md:text-xl text-secondary-text max-w-2xl leading-relaxed mt-4">
            {description}
          </p>
        </div>

        {/* Tool Content Wrapper */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="glass-panel p-8 md:p-12 relative"
        >
          {/* Tool implementation injected here */}
          <div className="relative z-10 custom-tool-container">
            {children}
          </div>
        </motion.div>

        {/* Extended Educational Content */}
        {extendedContent && (
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-16 prose prose-invert max-w-none glass-card p-8 md:p-12 rounded-3xl"
          >
            {extendedContent}
          </motion.div>
        )}

        {/* Universal High-Value Educational & Technical Guide (Guarantees Rich Content for Google AdSense & SEO) */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 bg-slate-900/60 backdrop-blur-xl border border-slate-800 p-8 md:p-12 rounded-3xl text-slate-300 space-y-10"
        >
          {/* Section 1: Overview */}
          <div className="space-y-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              About the {title} Utility
            </h2>
            <p className="text-slate-300 leading-relaxed text-base sm:text-lg">
              The <strong>{title}</strong> by ToolBite is a high-precision, privacy-focused online utility engineered for developers, digital marketers, content creators, and enterprise teams. Built on modern Web APIs, this utility computes all transformations directly inside your local browser instance, guaranteeing zero latency, maximum throughput, and total data confidentiality.
            </p>
            <p className="text-slate-400 leading-relaxed text-sm sm:text-base">
              Unlike traditional server-based online converters that upload your files or text strings to external third-party infrastructure, ToolBite’s architecture keeps your data strictly client-side. Whether you are formatting code, processing media, or auditing performance metrics, your sensitive assets remain 100% private.
            </p>
          </div>

          {/* Section 2: How It Works */}
          <div className="space-y-6 pt-6 border-t border-slate-800">
            <h3 className="text-xl sm:text-2xl font-bold text-white">
              How to Use {title} (Step-by-Step Guide)
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-slate-950/60 p-5 rounded-2xl border border-slate-800/80">
                <span className="w-7 h-7 bg-teal-500 text-slate-950 rounded-full flex items-center justify-center font-black text-xs mb-3">1</span>
                <h4 className="font-bold text-white text-sm mb-1">Provide Input Data</h4>
                <p className="text-xs text-slate-400">Paste your text, select options, or upload your file directly into the secure browser container above.</p>
              </div>
              <div className="bg-slate-950/60 p-5 rounded-2xl border border-slate-800/80">
                <span className="w-7 h-7 bg-teal-500 text-slate-950 rounded-full flex items-center justify-center font-black text-xs mb-3">2</span>
                <h4 className="font-bold text-white text-sm mb-1">Instant Execution</h4>
                <p className="text-xs text-slate-400">Our React-based engine computes data transformations instantly in real time using local browser memory.</p>
              </div>
              <div className="bg-slate-950/60 p-5 rounded-2xl border border-slate-800/80">
                <span className="w-7 h-7 bg-teal-500 text-slate-950 rounded-full flex items-center justify-center font-black text-xs mb-3">3</span>
                <h4 className="font-bold text-white text-sm mb-1">Review Output</h4>
                <p className="text-xs text-slate-400">Inspect formatted code, calculated metrics, or processed media with complete precision and syntax highlighting.</p>
              </div>
              <div className="bg-slate-950/60 p-5 rounded-2xl border border-slate-800/80">
                <span className="w-7 h-7 bg-teal-500 text-slate-950 rounded-full flex items-center justify-center font-black text-xs mb-3">4</span>
                <h4 className="font-bold text-white text-sm mb-1">1-Click Export</h4>
                <p className="text-xs text-slate-400">Copy output text directly to your clipboard or download converted files with a single tap.</p>
              </div>
            </div>
          </div>

          {/* Section 3: Technical Advantages */}
          <div className="space-y-4 pt-6 border-t border-slate-800">
            <h3 className="text-xl sm:text-2xl font-bold text-white">
              Why Choose ToolBite's Online Utilities?
            </h3>
            <ul className="space-y-3 text-sm text-slate-300">
              <li className="flex items-start gap-3">
                <span className="w-2 h-2 rounded-full bg-teal-400 mt-2 shrink-0" />
                <span><strong>Absolute Client-Side Privacy:</strong> Zero cloud storage upload. Your personal and corporate data never touches external database logs.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-2 h-2 rounded-full bg-teal-400 mt-2 shrink-0" />
                <span><strong>Sub-Millisecond Processing:</strong> Accelerated by client-side WebAssembly & V8 JavaScript engine compilation.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-2 h-2 rounded-full bg-teal-400 mt-2 shrink-0" />
                <span><strong>100% Free & Unlimited Access:</strong> No mandatory registration walls, monthly limits, or hidden fees.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-2 h-2 rounded-full bg-teal-400 mt-2 shrink-0" />
                <span><strong>Cross-Platform Compatibility:</strong> Optimized for Chrome, Safari, Firefox, Edge, and iOS/Android mobile browsers.</span>
              </li>
            </ul>
          </div>

          {/* Section 4: Frequently Asked Questions (FAQ) */}
          <div className="space-y-4 pt-6 border-t border-slate-800">
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-4">
              Frequently Asked Questions (FAQ)
            </h3>
            <div className="space-y-3">
              <div className="bg-slate-950/40 p-5 rounded-2xl border border-slate-800/60">
                <h4 className="font-bold text-white text-sm mb-1">Is {title} completely free to use?</h4>
                <p className="text-xs text-slate-400 leading-relaxed">Yes, ToolBite provides 100% free access to all online tools and utilities for both personal and commercial projects without requiring account creation.</p>
              </div>
              <div className="bg-slate-950/40 p-5 rounded-2xl border border-slate-800/60">
                <h4 className="font-bold text-white text-sm mb-1">Does ToolBite store or log my data?</h4>
                <p className="text-xs text-slate-400 leading-relaxed">No. ToolBite operates under a strict privacy-first architecture. All computational processing happens directly within your device's browser memory.</p>
              </div>
              <div className="bg-slate-950/40 p-5 rounded-2xl border border-slate-800/60">
                <h4 className="font-bold text-white text-sm mb-1">Can I use outputs for commercial clients?</h4>
                <p className="text-xs text-slate-400 leading-relaxed">Yes. All outputs, files, and formatted code produced by ToolBite utilities are royalty-free and cleared for commercial use.</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Info Section */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-8 glass-card rounded-3xl">
            <h3 className="font-display font-bold text-white mb-3">100% Secure</h3>
            <p className="text-sm text-secondary-text leading-relaxed">Your data never leaves your device. All processing happens locally in your browser.</p>
          </div>
          <div className="p-8 glass-card rounded-3xl">
            <h3 className="font-display font-bold text-white mb-3">Completely Free</h3>
            <p className="text-sm text-secondary-text leading-relaxed">No account required, no ads, and no hidden costs. Unlimited usage for everyone.</p>
          </div>
          <div className="p-8 glass-card rounded-3xl">
            <h3 className="font-display font-bold text-white mb-3">Fast & Modern</h3>
            <p className="text-sm text-secondary-text leading-relaxed">Built with high-performance React technology for an instant user experience.</p>
          </div>
        </div>

        {/* Related Tools for Internal Linking (SEO) */}
        <div className="mt-16 pt-16 border-t border-white/5">
          <h2 className="text-2xl font-display font-bold text-white mb-8">Related Tools</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {tools
              .filter(t => t.category === category && t.title !== title)
              .slice(0, 3)
              .map((relatedTool, index) => {
                const RIcon = relatedTool.icon;
                return (
                  <Link 
                    key={index}
                    to={`/tools/${relatedTool.slug}`}
                    className="p-6 glass-card rounded-2xl hover:border-primary/50 transition-colors group"
                  >
                    <div className="flex items-center gap-4 mb-3">
                      {RIcon && (
                        <div className="p-2 bg-white/5 rounded-lg text-primary">
                          <RIcon size={20} />
                        </div>
                      )}
                      <h3 className="font-bold text-white group-hover:text-primary transition-colors">{relatedTool.title}</h3>
                    </div>
                    <p className="text-sm text-secondary-text line-clamp-2">{relatedTool.description}</p>
                  </Link>
                );
              })}
          </div>
        </div>
      </div>
      
      {/* Global override for inner tool inputs if they used explicit white bg */}
      <style dangerouslySetInnerHTML={{__html: `
        .custom-tool-container input,
        .custom-tool-container textarea,
        .custom-tool-container select {
          background-color: rgba(255,255,255,0.03) !important;
          border-color: rgba(255,255,255,0.1) !important;
          color: white !important;
        }
        .custom-tool-container input::placeholder,
        .custom-tool-container textarea::placeholder {
          color: rgba(255,255,255,0.4) !important;
        }
        .custom-tool-container .bg-white {
          background-color: rgba(255,255,255,0.02) !important;
          color: white !important;
        }
        .custom-tool-container .bg-slate-50,
        .custom-tool-container .bg-slate-100 {
          background-color: rgba(255,255,255,0.05) !important;
        }
        .custom-tool-container .text-black,
        .custom-tool-container .text-slate-900,
        .custom-tool-container .text-slate-800 {
          color: white !important;
        }
        .custom-tool-container .text-slate-700,
        .custom-tool-container .text-slate-600,
        .custom-tool-container .text-slate-500 {
          color: #CBD5E1 !important;
        }
      `}} />
    </div>
  );
};

export default ToolLayout;

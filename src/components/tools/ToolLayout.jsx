import React from 'react';
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

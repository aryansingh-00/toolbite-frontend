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
  extendedContent
}) => {
  return (
    <div className="pt-32 pb-24 bg-slate-50 min-h-screen">
      <SEO 
        title={`${title} — Free Online Utility Tool`}
        description={description}
        keywords={`${keywords}, ${title.toLowerCase()}, online tool, toolbite, productivity`}
      />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumbs */}
        <nav className="flex items-center space-x-2 text-sm font-medium text-slate-500 mb-8 overflow-x-auto whitespace-nowrap pb-2 md:pb-0">
          <Link to="/" className="hover:text-teal-600 transition-colors">Home</Link>
          <ChevronRight size={14} />
          <Link to="/tools" className="hover:text-teal-600 transition-colors">Tools</Link>
          <ChevronRight size={14} />
          <span className="text-slate-900 truncate">{title}</span>
        </nav>

        {/* Header */}
        <div className="mb-12">
          <Link 
            to="/tools" 
            className="inline-flex items-center text-teal-600 font-bold mb-6 hover:translate-x-[-4px] transition-transform group"
          >
            <ArrowLeft size={18} className="mr-2" />
            Back to All Tools
          </Link>
          
          <div className="flex items-center gap-6 mb-4">
            {Icon && (
              <div className="p-4 bg-teal-500 rounded-2xl text-white shadow-lg shadow-teal-500/20">
                <Icon size={32} />
              </div>
            )}
            <div>
              <span className="inline-block px-3 py-1 bg-slate-200 text-slate-700 text-xs font-bold rounded-full mb-2 uppercase tracking-wider">
                {category}
              </span>
              <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
                {title}
              </h1>
            </div>
          </div>
          <p className="text-xl text-slate-600 max-w-2xl leading-relaxed">
            {description}
          </p>
        </div>

        {/* Tool Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm shadow-slate-200/50"
        >
          {children}
        </motion.div>

        {/* Extended Educational Content (AdSense Value) */}
        {extendedContent && (
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-16 prose prose-slate max-w-none bg-white rounded-3xl p-8 md:p-12 border border-slate-100 shadow-sm"
          >
            {extendedContent}
          </motion.div>
        )}

        {/* Info Section (For SEO value) */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 bg-white rounded-2xl border border-slate-100 shadow-sm">
            <h3 className="font-bold text-slate-900 mb-2">100% Secure</h3>
            <p className="text-sm text-slate-600">Your data never leaves your device. All processing happens locally in your browser.</p>
          </div>
          <div className="p-6 bg-white rounded-2xl border border-slate-100 shadow-sm">
            <h3 className="font-bold text-slate-900 mb-2">Completely Free</h3>
            <p className="text-sm text-slate-600">No account required, no ads, and no hidden costs. Unlimited usage for everyone.</p>
          </div>
          <div className="p-6 bg-white rounded-2xl border border-slate-100 shadow-sm">
            <h3 className="font-bold text-slate-900 mb-2">Fast & Modern</h3>
            <p className="text-sm text-slate-600">Built with high-performance React technology for an instant user experience.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ToolLayout;

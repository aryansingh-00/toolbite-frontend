import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ExternalLink, ShoppingCart, Check, Search } from 'lucide-react';
import staticTemplates from '../data/templates';
import SEO from '../components/SEO';

const TemplatesPage = () => {
  const [templates] = useState(staticTemplates);
  const [loading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Derive unique categories dynamically from the loaded database items
  const categories = useMemo(() => {
    const cats = templates.map(t => t.category);
    return ['All', ...new Set(cats)];
  }, [templates]);

  // Handle client-side filtering and search
  const filteredTemplates = useMemo(() => {
    return templates.filter((tpl) => {
      const matchSearch = tpl.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          tpl.shortDescription.toLowerCase().includes(searchTerm.toLowerCase());
      const matchCategory = activeCategory === 'All' || tpl.category === activeCategory;
      return matchSearch && matchCategory;
    });
  }, [templates, searchTerm, activeCategory]);

  return (
    <div className="pt-32 pb-24 bg-slate-50 min-h-screen">
      <SEO 
        title="Premium React Website Templates & Marketplace"
        description="Browse our collection of high-performance, ready-to-deploy React website templates. Perfect for SaaS, E-commerce, Portfolios, and Business sites."
        keywords="react templates, website marketplace, premium web templates, saas landing pages, ecommerce templates, tailwind css components"
      />
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Marketplace Header */}
        <div className="text-center max-w-4xl mx-auto mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-6xl font-extrabold text-slate-900 mb-6 tracking-tight"
          >
            Premium <span className="text-teal-600">Template Vault</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-slate-600"
          >
            Explore our catalog of high-converting React architectures. Ready to deploy instantly.
          </motion.p>
        </div>

        {/* Filter Bar */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200 mb-12 flex flex-col md:flex-row gap-4 justify-between items-center"
        >
          <div className="relative w-full md:w-96">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
            <input 
              type="text" 
              placeholder="Search by name or description..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all font-medium"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-hide">
            {categories.map((cat, i) => (
              <button 
                key={i} 
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2.5 rounded-full font-bold whitespace-nowrap transition-colors ${activeCategory === cat ? 'bg-slate-900 text-white shadow-md' : 'bg-slate-50 text-slate-600 hover:bg-slate-100 hover:text-slate-900 border border-slate-200'}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Templates Display */}
        {loading ? (
          <div className="flex flex-col justify-center items-center py-24">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600 mb-4"></div>
            <p className="text-slate-500 font-medium animate-pulse">Loading templates...</p>
          </div>
        ) : filteredTemplates.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-32 bg-white rounded-3xl border border-dashed border-slate-300">
            <Search className="h-16 w-16 text-slate-200 mb-4" />
            <h3 className="text-2xl font-bold text-slate-700 mb-2">No Templates Found</h3>
            <p className="text-slate-500 text-center max-w-md">
              We couldn't find any active templates matching your search criteria. Check back later or clear your filters!
            </p>
            {(searchTerm || activeCategory !== 'All') && (
              <button 
                onClick={() => { setSearchTerm(''); setActiveCategory('All'); }}
                className="mt-6 px-6 py-2 bg-slate-100 text-slate-700 font-semibold rounded-lg hover:bg-slate-200 transition"
              >
                Clear Filters
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredTemplates.map((tpl, i) => (
              <motion.div
                key={tpl._id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
                className="group bg-white rounded-3xl border border-slate-200 shadow-sm hover:shadow-2xl hover:shadow-slate-200/50 hover:border-teal-200 transition-all duration-300 flex flex-col overflow-hidden"
              >
                {/* Image Wrap (Real Database Display) */}
                <div className="aspect-[4/3] w-full relative bg-slate-100 overflow-hidden border-b border-slate-100">
                  <div className="absolute inset-0 bg-slate-900/5 group-hover:bg-transparent transition-colors duration-300 z-10"></div>
                  <img 
                    src={tpl.imageUrl} 
                    alt={tpl.title} 
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  
                  <div className="absolute top-4 left-4 z-20">
                    <span className="inline-block px-3 py-1 bg-white/95 backdrop-blur-sm text-xs font-extrabold text-slate-800 rounded-full shadow-sm uppercase tracking-wider">
                      {tpl.category}
                    </span>
                  </div>
                </div>
                
                {/* Card Content */}
                <div className="p-6 flex flex-col flex-1">
                  <div className="mb-3">
                    <h4 className="text-xl font-bold text-slate-900 leading-tight">{tpl.title}</h4>
                  </div>
                  
                  <p className="text-slate-600 text-sm mb-5 h-10 line-clamp-2" title={tpl.shortDescription}>
                    {tpl.shortDescription}
                  </p>

                  <div className="space-y-3 mb-8 flex-1 pt-4 border-t border-slate-50">
                    {/* Map up to 4 features locally */}
                    {tpl.features.slice(0, 4).map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-3 text-sm text-slate-600 font-medium">
                        <Check size={16} className="text-emerald-500 mt-0.5 flex-shrink-0" />
                        <span className="leading-tight">{feat}</span>
                      </div>
                    ))}
                    {tpl.features.length > 4 && (
                      <div className="text-xs font-bold text-teal-600 pl-7">+ {tpl.features.length - 4} more features</div>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="grid grid-cols-2 gap-3 mt-auto pt-4 border-t border-slate-100">
                    <Link 
                      to={`/template/${tpl._id}`} 
                      className="flex items-center justify-center gap-2 py-3 rounded-xl bg-slate-50 text-slate-700 font-semibold text-sm hover:bg-slate-100 transition-colors border border-slate-200 hover:border-slate-300"
                    >
                      <ExternalLink size={16} />
                      Preview
                    </Link>
                    <Link 
                      to={`/template/${tpl._id}`} 
                      className="flex items-center justify-center gap-2 py-3 rounded-xl bg-slate-900 text-white font-semibold text-sm hover:bg-teal-600 transition-all shadow-md hover:shadow-teal-500/25"
                    >
                      <ShoppingCart size={16} />
                      Buy Now
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
        
      </div>
    </div>
  );
};

export default TemplatesPage;

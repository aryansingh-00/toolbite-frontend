import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ExternalLink, ShoppingCart, Check, Search, ArrowRight } from 'lucide-react';
import staticTemplates from '../data/templates';
import SEO from '../components/SEO';
import TiltCard from '../components/TiltCard';

import { usePersona } from '../hooks/usePersona';

const TemplatesPage = () => {
  const { updatePersona } = usePersona();
  const [templates] = useState(staticTemplates);
  const [loading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    updatePersona('templates');
  }, [updatePersona]);

  // Derive unique categories dynamically from the loaded database items
  const categories = useMemo(() => {
    const cats = templates.map(t => t.category);
    return ['All', ...new Set(cats)];
  }, [templates]);

  // Handle client-side filtering and search
  const filteredTemplates = useMemo(() => {
    if (!templates) return [];
    
    return templates.filter((tpl) => {
      const search = searchTerm.toLowerCase().trim();
      
      const matchSearch = !search || 
                          (tpl.title?.toLowerCase().includes(search)) || 
                          (tpl.shortDescription?.toLowerCase().includes(search)) ||
                          (tpl.fullDescription?.toLowerCase().includes(search)) ||
                          (tpl.features?.some(f => f.toLowerCase().includes(search)));
                          
      const matchCategory = activeCategory === 'All' || tpl.category?.trim() === activeCategory?.trim();
      
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
        
        {/* Premium Search Navbar (Primary Focus) */}
        <div className="max-w-3xl mx-auto mb-12 relative z-30">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative"
          >
            <div className={`flex items-center bg-white rounded-full shadow-2xl border-2 transition-all duration-500 overflow-hidden px-2 ${isSearchFocused || searchTerm ? 'border-teal-500 ring-8 ring-teal-500/5' : 'border-slate-100 shadow-slate-200/50'}`}>
              <div className="pl-6 text-teal-600">
                <Search size={24} strokeWidth={3} />
              </div>
              <input 
                type="text" 
                placeholder="What type of template are you looking for?" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
                className="w-full py-6 px-6 text-xl font-bold text-slate-900 placeholder:text-slate-300 focus:outline-none bg-transparent"
              />
              <div className="flex items-center gap-2 pr-2">
                {(searchTerm || activeCategory !== 'All') && (
                  <button 
                    onClick={() => { setSearchTerm(''); setActiveCategory('All'); }}
                    className="p-3 hover:bg-slate-100 rounded-full text-slate-400 hover:text-red-500 transition-all active:scale-90"
                    title="Clear all filters"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeWidth="2.5" d="M6 18L18 6M6 6l12 12"></path></svg>
                  </button>
                )}
                <button 
                  onClick={() => {
                    const results = document.getElementById('templates-grid');
                    if (results) results.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }}
                  className="bg-teal-500 text-white px-8 py-4 rounded-full font-black uppercase text-xs tracking-widest hover:bg-slate-900 transition-all shadow-lg shadow-teal-500/20 active:scale-95"
                >
                  Search
                </button>
              </div>
            </div>

            {/* Recommendation Dropdown */}
            {isSearchFocused && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                className="absolute top-full left-0 right-0 mt-4 bg-white/95 backdrop-blur-xl rounded-[40px] shadow-[0_32px_64px_-12px_rgba(0,0,0,0.2)] border border-white/20 overflow-hidden"
              >
                <div className="p-8">
                  <div className="flex items-center justify-between mb-6">
                    <p className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400">Recommended Categories</p>
                    <span className="text-[10px] font-black text-white bg-slate-900 px-3 py-1 rounded-full uppercase">Instant Filter</span>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {categories.map((cat, i) => (
                      <button 
                        key={i} 
                        onMouseDown={(e) => {
                          e.preventDefault(); // Prevent input onBlur from firing too early
                          setActiveCategory(cat);
                          setSearchTerm(''); // Clear search for clean category view
                          setIsSearchFocused(false);
                        }}
                        className={`group flex items-center justify-between px-6 py-4 rounded-[24px] text-sm font-black transition-all ${activeCategory === cat ? 'bg-teal-500 text-white shadow-xl shadow-teal-500/30 scale-105' : 'bg-slate-50 text-slate-600 hover:bg-teal-50 hover:text-teal-600 hover:translate-x-1'}`}
                      >
                        {cat}
                        <Check size={16} className={`transition-opacity ${activeCategory === cat ? 'opacity-100' : 'opacity-0'}`} />
                      </button>
                    ))}
                  </div>
                </div>
                <div className="bg-slate-900/5 p-5 flex items-center justify-center gap-3 border-t border-slate-100">
                   <p className="text-xs font-bold text-slate-500">Need a custom solution?</p>
                   <Link to="/contact" className="text-xs font-black text-teal-600 uppercase hover:tracking-widest transition-all">Request Architecture <ArrowRight size={14} className="inline ml-1" /></Link>
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>

        {/* Minimal Header */}
        <div className="text-center max-w-4xl mx-auto mb-16 relative z-10">
          <motion.h1 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-4xl md:text-5xl font-black text-slate-900 mb-4 tracking-tighter"
          >
            Premium <span className="text-teal-500">Architecture Vault</span>
          </motion.h1>
          <p className="text-slate-500 font-medium">Explore high-converting React systems built for enterprise scale.</p>
        </div>


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
          <div id="templates-grid" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredTemplates.map((tpl, i) => (
              <TiltCard key={tpl._id}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: i * 0.05 }}
                  className="group bg-white rounded-3xl border border-slate-200 shadow-sm hover:shadow-2xl hover:shadow-slate-200/50 hover:border-teal-200 transition-all duration-300 flex flex-col h-full overflow-hidden"
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
              </TiltCard>
            ))}
          </div>
        )}
        
      </div>
    </div>
  );
};

export default TemplatesPage;

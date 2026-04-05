import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, ArrowRight, Zap } from 'lucide-react';
import { tools, categories } from '../../data/tools';
import SEO from '../../components/SEO';

const ToolsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredTools = useMemo(() => {
    try {
      return tools.filter((tool) => {
        if (!tool) return false;
        
        const searchTermLower = searchTerm.toLowerCase();
        const titleMatch = (tool.title || '').toLowerCase().includes(searchTermLower);
        const descMatch = (tool.description || '').toLowerCase().includes(searchTermLower);
        const tagsMatch = Array.isArray(tool.tags) && tool.tags.some(tag => (tag || '').toLowerCase().includes(searchTermLower));
        
        const matchSearch = titleMatch || descMatch || tagsMatch;
        const matchCategory = activeCategory === 'All' || tool.category === activeCategory;
        
        return matchSearch && matchCategory;
      });
    } catch (error) {
      console.error("Error filtering tools:", error);
      return [];
    }
  }, [searchTerm, activeCategory]);

  return (
    <div className="pt-32 pb-24 bg-slate-50 min-h-screen">
      <SEO 
        title="Free Online Utility Tools — Word Counter, Image Compressor & More"
        description="A curated collection of fast, secure, and privacy-focused online utility tools for developers, designers, and writers. 100% free with no tracking."
        keywords="free online tools, utility tools, word counter, image compressor, json formatter, qr generator, pdf to image, toolbite tools"
      />
      
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-4xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal-50 text-teal-700 font-bold text-sm mb-6 border border-teal-100"
          >
            <Zap size={16} fill="currentColor" />
            <span>Privacy-Focused Tools</span>
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-6xl font-extrabold text-slate-900 mb-6 tracking-tight"
          >
            Utility <span className="text-teal-600">Power Center</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed"
          >
            Fast, secure, and completely free. All tools run locally in your browser, keeping your data private and secure.
          </motion.p>
        </div>

        {/* Filter Bar */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200 mb-12 flex flex-col md:flex-row gap-6 justify-between items-center"
        >
          <div className="relative w-full md:w-96">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
            <input 
              type="text" 
              placeholder="Search tools (e.g., 'image', 'text')..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all font-medium placeholder:text-slate-400"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-hide no-scrollbar">
            {Array.isArray(categories) && categories.map((cat, i) => (
              <button 
                key={i} 
                onClick={() => setActiveCategory(cat)}
                className={`px-6 py-3 rounded-xl font-bold whitespace-nowrap transition-all duration-300 ${activeCategory === cat ? 'bg-teal-600 text-white shadow-lg shadow-teal-500/25 scale-105' : 'bg-slate-50 text-slate-600 hover:bg-slate-100'}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Tools Grid */}
        {filteredTools.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-32 bg-white rounded-[40px] border border-dashed border-slate-300">
            <div className="p-6 bg-slate-50 rounded-full mb-6">
              <Search className="h-12 w-12 text-slate-300" />
            </div>
            <h3 className="text-2xl font-bold text-slate-800 mb-2">No tools found</h3>
            <p className="text-slate-500 text-center max-w-md">
              We couldn't find any tools matching your search criteria. Try a different keyword or category.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredTools.map((tool, i) => {
              const Icon = tool.icon || Zap; // Use Zap as fallback
              return (
                <motion.div
                  key={tool.id || i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: i * 0.05 }}
                  className="group relative"
                >
                  <Link 
                    to={`/tools/${tool.slug}`}
                    className="block h-full bg-white rounded-3xl p-8 border border-slate-200 shadow-sm hover:shadow-2xl hover:shadow-slate-200/50 hover:border-teal-200 hover:-translate-y-2 transition-all duration-300"
                  >
                    <div className="flex items-start justify-between mb-8">
                      <div className={`p-4 rounded-2xl ${tool.popular ? 'bg-teal-600 text-white shadow-lg shadow-teal-500/20' : 'bg-slate-100 text-slate-600'}`}>
                        {typeof Icon === 'function' || (typeof Icon === 'object' && Icon !== null) ? <Icon size={32} /> : <Zap size={32} />}
                      </div>
                      {tool.popular && (
                        <span className="px-3 py-1 bg-amber-100 text-amber-700 text-[10px] font-extrabold rounded-full uppercase tracking-widest border border-amber-200">
                          Popular
                        </span>
                      )}
                    </div>

                    <h3 className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-teal-600 transition-colors">
                      {tool.title || 'Untitled Tool'}
                    </h3>
                    <p className="text-slate-600 mb-8 line-clamp-3 leading-relaxed">
                      {tool.description || 'No description available.'}
                    </p>

                    <div className="flex items-center text-teal-600 font-bold group-hover:gap-2 transition-all">
                      <span>Launch Tool</span>
                      <ArrowRight size={18} className="ml-2 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default ToolsPage;

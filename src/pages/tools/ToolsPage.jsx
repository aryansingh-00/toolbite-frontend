import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ArrowRight, Zap } from 'lucide-react';
import { tools, categories } from '../../data/tools';
import SEO from '../../components/SEO';

const ToolsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [showDropdown, setShowDropdown] = useState(false);

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
        description="Explore ToolBite's Utility Power Center. A curated collection of fast, privacy-focused online utility tools for developers, designers, and marketers. Free, secure, and browser-native."
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
            Free Online <span className="text-teal-600">Utility Tools</span> & Development Power Center
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
              onFocus={() => setShowDropdown(true)}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setShowDropdown(true);
              }}
              className="w-full pl-12 pr-4 py-4 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all font-medium placeholder:text-slate-400 dark:text-white"
            />
            
            {/* Autocomplete Dropdown */}
            <AnimatePresence>
              {showDropdown && searchTerm.trim() !== '' && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute left-0 right-0 mt-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl z-50 overflow-hidden max-h-[300px] overflow-y-auto"
                >
                  {filteredTools.length > 0 ? (
                    filteredTools.slice(0, 6).map((tool) => (
                      <Link
                        key={tool.slug}
                        to={`/tools/${tool.slug}`}
                        onClick={() => {
                          setSearchTerm(tool.title);
                          setShowDropdown(false);
                        }}
                        className="flex items-center gap-4 px-4 py-3 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors border-b border-slate-50 dark:border-slate-800 last:border-0"
                      >
                        <div className="w-8 h-8 rounded-lg bg-teal-50 dark:bg-teal-500/10 text-teal-600 flex items-center justify-center shrink-0">
                          {<tool.icon size={16} />}
                        </div>
                        <div>
                          <p className="text-sm font-bold text-slate-900 dark:text-white">{tool.title}</p>
                          <p className="text-[10px] text-slate-500 uppercase tracking-widest font-black">{tool.category}</p>
                        </div>
                      </Link>
                    ))
                  ) : (
                    <div className="px-4 py-6 text-center text-slate-400 text-sm">No exact matches found</div>
                  )}
                  <div className="p-2 bg-slate-50 dark:bg-slate-800/50 text-center">
                    <button onClick={() => setShowDropdown(false)} className="text-[10px] font-bold text-teal-600 dark:text-teal-400 uppercase tracking-widest hover:underline">Close Search</button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
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

        {/* SEO Educational Section */}
        <div className="mt-32 pt-24 border-t border-slate-200">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div className="space-y-12">
              <section>
                <h2 className="text-4xl font-black text-slate-900 mb-6 tracking-tight">The ToolBite Digital Ecosystem</h2>
                <p className="text-lg leading-relaxed text-slate-600 font-medium">
                  At ToolBite, we believe that professional-grade utility shouldn't come with a privacy tax. Our Power Center was architected to give developers, designers, and marketers the high-performance tools they need without the bloat, tracking, or data-collection common in the industry.
                </p>
              </section>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-sm">
                  <h3 className="text-xl font-bold text-slate-900 mb-4">Edge Processing</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    Unlike traditional "cloud" tools, 95% of our processing happens in your browser's local sandbox. This means faster speeds, offline capability, and absolute data privacy.
                  </p>
                </div>
                <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-sm">
                  <h3 className="text-xl font-bold text-slate-900 mb-4">Zero Data Retention</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    We don't store your logs, your images, or your converted files. Once you close the tab, all session data is permanently purged from your device cache.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-12 bg-slate-900 rounded-[3rem] p-12 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-teal-500/10 blur-[100px] rounded-full"></div>
              <h3 className="text-2xl font-bold mb-6">Why These Tools are Free</h3>
              <p className="text-slate-400 leading-relaxed mb-8">
                ToolBite is primarily a premium digital engineering agency. We offer these tools to help the community level up their workflows. We found that most daily tasks—like checking word counts or converting images—were handled by ad-riddled, slow-loading sites.
              </p>
              <div className="pt-8 border-t border-white/10">
                <p className="text-sm font-bold text-teal-400 uppercase tracking-widest mb-4 italic">"Scale Beyond the Basics"</p>
                <p className="text-slate-300 text-sm leading-relaxed mb-8">
                  If these tools help you manage your day-to-day, imagine what our custom engineering team can do for your entire platform infrastructure.
                </p>
                <Link to="/start-project" className="inline-flex items-center gap-2 text-white font-black hover:text-teal-400 transition-colors">
                  Discuss a Custom Engineering Project <ArrowRight size={18} />
                </Link>
              </div>
            </div>
          </div>

          <div className="mt-24 bg-teal-600 rounded-[3rem] p-12 md:p-16 text-center text-white">
            <h3 className="text-3xl md:text-5xl font-black mb-6 tracking-tight">Need a Custom Automation?</h3>
            <p className="text-teal-50 text-xl mb-12 max-w-3xl mx-auto leading-relaxed">
              If our current collection doesn't include the specific workflow you need, we can build custom internal tools or API integrations tailored for your brand's unique scale.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/contact" className="px-10 py-5 bg-slate-900 text-white font-black rounded-2xl shadow-xl hover:scale-105 transition-transform">
                Consult with our Engineers
              </Link>
              <Link to="/templates" className="px-10 py-5 bg-white text-teal-700 font-bold rounded-2xl hover:bg-teal-50 transition-all">
                Browse Ready-Made Vault
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ToolsPage;



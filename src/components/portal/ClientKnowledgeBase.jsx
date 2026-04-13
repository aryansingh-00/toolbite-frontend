import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Search, ChevronRight, PlayCircle, ExternalLink, Lightbulb } from 'lucide-react';

const categories = [
  { id: 'getting-started', label: 'Getting Started', count: 5 },
  { id: 'content-seo', label: 'Content & SEO', count: 8 },
  { id: 'technical', label: 'Technical Guide', count: 4 },
  { id: 'marketing', label: 'Marketing Tips', count: 6 },
];

const articles = [
  { id: 1, category: 'content-seo', title: "How to write content for conversion", time: "6 min read", icon: <BookOpen className="text-teal-500" /> },
  { id: 2, category: 'getting-started', title: "ToolBite Portal: Full Walkthrough", time: "Video Guide", icon: <PlayCircle className="text-blue-500" /> },
  { id: 3, category: 'technical', title: "Managing your new WordPress backend", time: "10 min read", icon: <BookOpen className="text-teal-500" /> },
  { id: 4, category: 'content-seo', title: "SEO Checklist for Launch Day", time: "15 min read", icon: <BookOpen className="text-teal-500" /> },
  { id: 5, category: 'marketing', title: "Setting up Google Analytics 4", time: "8 min read", icon: <BookOpen className="text-teal-500" /> },
];

const ClientKnowledgeBase = () => {
  const [activeCat, setActiveCat] = useState('getting-started');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredArticles = articles.filter(a => 
    (activeCat === 'all' || a.category === activeCat) &&
    a.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-8 pb-12">
      {/* Search Header */}
      <div className="bg-slate-900 rounded-[2.5rem] p-10 md:p-16 text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-teal-500/10 to-blue-500/10 z-0"></div>
        <div className="relative z-10">
          <h3 className="text-3xl md:text-5xl font-black text-white mb-6 tracking-tight">Client <span className="text-teal-500">Resource Hub</span></h3>
          <p className="text-slate-400 font-medium mb-10 max-w-xl mx-auto">Master your new digital platform with our exclusive guides, video tutorials, and industry-leading strategy articles.</p>
          
          <div className="max-w-xl mx-auto relative group">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-teal-500 transition-colors" size={24} />
            <input 
              type="text" 
              placeholder="Search for articles, guides..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-16 pr-8 py-5 bg-white/5 border border-white/10 rounded-2xl text-white focus:outline-none focus:ring-4 focus:ring-teal-500/20 focus:border-teal-500 transition-all text-lg backdrop-blur-md"
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar Nav */}
        <div className="space-y-2">
          <button 
            onClick={() => setActiveCat('all')}
            className={`w-full flex items-center justify-between px-6 py-4 rounded-2xl font-bold transition-all ${activeCat === 'all' ? 'bg-teal-500 text-slate-900 shadow-lg shadow-teal-500/20' : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800'}`}
          >
            All Articles
            <span className="text-xs opacity-60">{articles.length}</span>
          </button>
          <div className="h-px bg-slate-200 dark:bg-slate-800 my-4"></div>
          {categories.map((cat) => (
            <button 
              key={cat.id}
              onClick={() => setActiveCat(cat.id)}
              className={`w-full flex items-center justify-between px-6 py-4 rounded-2xl font-bold transition-all ${activeCat === cat.id ? 'bg-teal-500 text-slate-900 shadow-lg shadow-teal-500/20' : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800'}`}
            >
              {cat.label}
              <span className="text-xs opacity-60">{cat.count}</span>
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="lg:col-span-3 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredArticles.map((article) => (
              <motion.div
                key={article.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="group bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 hover:border-teal-500/50 hover:shadow-xl transition-all cursor-pointer"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-slate-50 dark:bg-slate-800 rounded-2xl flex items-center justify-center group-hover:bg-teal-500 group-hover:text-white transition-all">
                    {article.icon}
                  </div>
                  <div className="text-xs font-black uppercase tracking-widest text-slate-400">
                    {article.time}
                  </div>
                </div>
                <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-4 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
                  {article.title}
                </h4>
                <div className="flex items-center text-sm font-bold text-teal-600 dark:text-teal-400 gap-2">
                  Read Article <ChevronRight size={16} />
                </div>
              </motion.div>
            ))}
          </div>

          {filteredArticles.length === 0 && (
            <div className="py-20 text-center">
              <Lightbulb size={48} className="text-slate-300 mx-auto mb-4" />
              <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-2">No matching resources</h4>
              <p className="text-slate-500 max-w-xs mx-auto">We couldn't find any articles matching "{searchQuery}". Try different keywords.</p>
            </div>
          )}

          {/* Expert Contact CTA */}
          <div className="mt-12 p-8 rounded-[2rem] bg-teal-500 text-slate-900 flex flex-col md:flex-row justify-between items-center gap-6">
             <div>
                <h4 className="text-2xl font-black mb-1">Need specific help?</h4>
                <p className="font-medium opacity-80">Our strategists are ready to jump on a 1-on-1 call with you.</p>
             </div>
             <button className="px-8 py-4 bg-slate-900 text-white font-bold rounded-2xl shadow-xl flex items-center gap-2 hover:scale-105 transition-transform">
                <ExternalLink size={20} />
                Schedule Strategy Session
             </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientKnowledgeBase;

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Command, Wrench, Layout, FileText, Zap, Moon, Sun, ArrowRight, X, ChevronRight, Monitor, Settings, MessageCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { tools } from '../data/tools';
import { blogPosts } from '../data/blogPosts';

const CommandPalette = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const navigate = useNavigate();
  const inputRef = useRef(null);

  // Grouped search data
  const searchItems = [
    // Tools
    ...tools.map(t => ({
      id: t.id,
      title: t.title,
      desc: t.description,
      category: 'Tools',
      icon: t.icon || Zap,
      href: `/tools/${t.slug}`,
      tags: t.tags || []
    })),
    // Services (Manual map from navMenu)
    { id: 'web-design', title: 'Web Design & Development', desc: 'Custom high-performance websites', category: 'Services', icon: Layout, href: '/#services' },
    { id: 'landing-pages', title: 'Landing Pages', desc: 'Conversion-focused page builds', category: 'Services', icon: Zap, href: '/#services' },
    { id: 'mobile-apps', title: 'Mobile App Development', desc: 'iOS, Android & Cross-Platform', category: 'Services', icon: Monitor, href: '/#services' },
    { id: 'brand-strategy', title: 'Brand Strategy', desc: 'Authority & identity engineering', category: 'Services', icon: Settings, href: '/#services' },
    // Pages
    { id: 'pricing', title: 'Pricing & Plans', desc: 'Transparent tiered architecture pricing', category: 'Pages', icon: Command, href: '/pricing' },
    { id: 'about', title: 'About ToolBite', desc: 'Our mission and digital philosophy', category: 'Pages', icon: FileText, href: '/about' },
    { id: 'blog', title: 'Digital Insights Blog', desc: 'Strategy, design, and SEO updates', category: 'Pages', icon: FileText, href: '/blog' },
    { id: 'contact', title: 'Get in Touch', desc: 'Consult with our engineering team', category: 'Pages', icon: MessageCircle, href: '/contact' },
    // Blog Posts
    ...blogPosts.map(b => ({
      id: `blog-${b.id}`,
      title: b.title,
      desc: b.excerpt,
      category: 'Insights',
      icon: FileText,
      href: `/blog/${b.id}`
    }))
  ];

  // Filtering logic
  const filteredItems = query === '' 
    ? searchItems.filter(item => ['Pages', 'Services'].includes(item.category)).slice(0, 8)
    : searchItems.filter(item => 
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        item.desc.toLowerCase().includes(query.toLowerCase()) ||
        (item.tags && item.tags.some(t => t.toLowerCase().includes(query.toLowerCase())))
      );

  // Navigation handlers
  const onSelect = useCallback((item) => {
    if (item.href) {
      if (item.href.startsWith('/#')) {
        window.location.href = item.href;
      } else {
        navigate(item.href);
      }
      onClose();
    }
  }, [navigate, onClose]);

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen) return;

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex(prev => (prev + 1) % filteredItems.length);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex(prev => (prev - 1 + filteredItems.length) % filteredItems.length);
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (filteredItems[selectedIndex]) onSelect(filteredItems[selectedIndex]);
      } else if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, filteredItems, selectedIndex, onSelect, onClose]);

  // Auto-focus on open
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      setQuery('');
      setSelectedIndex(0);
    }
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-[100]"
          />

          {/* Dialog */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed top-24 left-1/2 -translate-x-1/2 w-full max-w-2xl px-4 z-[101]"
          >
            <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-2xl overflow-hidden border border-slate-200 dark:border-slate-800">
              
              {/* Search input */}
              <div className="relative flex items-center p-6 border-b border-slate-100 dark:border-slate-800">
                <Search className="text-slate-400 mr-4" size={24} />
                <input
                  ref={inputRef}
                  placeholder="Where would you like to go?"
                  value={query}
                  onChange={(e) => { setQuery(e.target.value); setSelectedIndex(0); }}
                  className="w-full bg-transparent border-none outline-none text-xl font-bold text-slate-800 dark:text-white placeholder:text-slate-400"
                />
                <div className="flex items-center gap-1.5 px-3 py-1 bg-slate-100 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
                  <span className="text-[10px] font-black uppercase text-slate-500">ESC</span>
                </div>
              </div>

              {/* Results */}
              <div className="max-h-[500px] overflow-y-auto no-scrollbar py-4 px-2">
                {filteredItems.length > 0 ? (
                  <div className="space-y-1">
                    {/* Categories for visual grouping */}
                    {['Services', 'Tools', 'Pages', 'Insights'].map((cat) => {
                      const items = filteredItems.filter(i => i.category === cat);
                      if (items.length === 0) return null;
                      
                      return (
                        <div key={cat} className="mb-4 last:mb-0">
                          <p className="px-4 py-2 text-[10px] font-black uppercase tracking-widest text-teal-600 dark:text-teal-400">{cat}</p>
                          {items.map((item) => {
                            const globalIndex = filteredItems.indexOf(item);
                            const active = selectedIndex === globalIndex;
                            const Icon = item.icon;

                            return (
                              <button
                                key={item.id}
                                onMouseEnter={() => setSelectedIndex(globalIndex)}
                                onClick={() => onSelect(item)}
                                className={`w-full flex items-center gap-4 px-4 py-3 rounded-2xl transition-all text-left ${
                                  active 
                                    ? 'bg-teal-50 dark:bg-teal-500/10 border-teal-100 dark:border-teal-500/20' 
                                    : 'hover:bg-slate-50 dark:hover:bg-slate-800/50'
                                }`}
                              >
                                <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                                  active 
                                    ? 'bg-teal-500 text-white' 
                                    : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400'
                                }`}>
                                  {typeof Icon === 'function' ? <Icon size={20} /> : <Zap size={20} />}
                                </div>
                                <div className="flex-grow">
                                  <p className={`text-sm font-bold ${active ? 'text-teal-600 dark:text-teal-400' : 'text-slate-800 dark:text-slate-100 uppercase'}`}>{item.title}</p>
                                  <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1">{item.desc}</p>
                                </div>
                                {active && (
                                  <ChevronRight size={18} className="text-teal-500" />
                                )}
                              </button>
                            );
                          })}
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="py-20 text-center">
                    <div className="w-16 h-16 bg-slate-50 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Search className="text-slate-300 dark:text-slate-600" size={32} />
                    </div>
                    <p className="text-lg font-bold text-slate-800 dark:text-white">No results for "{query}"</p>
                    <p className="text-sm text-slate-500 mt-2">Try searching for a tool name or a service.</p>
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="p-4 bg-slate-50 dark:bg-slate-800/50 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-2">
                    <span className="p-1 px-1.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded text-[10px] font-bold text-slate-500 shadow-sm">↓</span>
                    <span className="p-1 px-1.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded text-[10px] font-bold text-slate-500 shadow-sm">↑</span>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Navigate</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="p-1 px-1.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded text-[10px] font-bold text-slate-500 shadow-sm">↵</span>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Select</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Command size={14} className="text-slate-400" />
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">TOOLBITE OS</span>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CommandPalette;

import React, { useEffect } from 'react';
import { ArrowRight, Calendar, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import { blogPosts } from '../data/blogPosts';
import OptimizedImage from '../components/OptimizedImage';
const BlogPage = () => {
  const [activeCategory, setActiveCategory] = React.useState('All');
  const [searchTerm, setSearchTerm] = React.useState('');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const categories = ['All', ...new Set(blogPosts.map(post => post.category))];

  const filteredPosts = blogPosts.filter(post => {
    const matchesCategory = activeCategory === 'All' || post.category === activeCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-[1400px] mx-auto min-h-screen">
      <SEO 
        title="Web Design Blog & Digital Strategy Insights"
        description="Stay ahead with the ToolBite Digital Intelligence Feed. Expert insights on technical SEO, high-performance web engineering, conversion optimization, and modern digital strategy for brands."
        keywords="web design blog, digital strategy, SEO tips, e-commerce optimization, UI/UX trends 2026, website development insights"
      />
      <div className="text-center mb-12 px-4">
        <div className="inline-flex items-center gap-2 bg-teal-50 text-teal-800 font-bold px-4 py-1.5 rounded-full text-xs uppercase tracking-widest mb-6 border border-teal-100">
          <div className="w-2 h-2 bg-teal-500 rounded-full animate-pulse" />
          Insight Hub
        </div>
        <h1 className="text-4xl md:text-5xl lg:text-7xl font-black text-slate-900 mb-6 tracking-tight">
          The <span className="text-teal-500">ToolBite</span> Digital Feed
        </h1>
        <p className="text-xl text-slate-600 max-w-2xl mx-auto font-medium">
          Authoritative insights and high-performance strategies for modern digital brands.
        </p>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-16 bg-white p-6 rounded-[32px] border border-slate-100 shadow-xl shadow-slate-200/40">
        <div className="flex flex-wrap items-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-2.5 rounded-full text-sm font-black transition-all ${activeCategory === cat ? 'bg-slate-900 text-white shadow-lg' : 'bg-slate-50 text-slate-500 hover:bg-teal-50 hover:text-teal-600'}`}
            >
              {cat}
            </button>
          ))}
        </div>
        <div className="relative w-full md:w-80 group">
          <input
            type="text"
            placeholder="Search insights..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-6 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-teal-500/5 focus:border-teal-500 transition-all font-bold"
          />
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-teal-500 transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {filteredPosts.length > 0 ? filteredPosts.map((post) => (
          <article key={post.id} className="bg-white rounded-[40px] overflow-hidden shadow-2xl shadow-slate-200/50 border border-slate-100 group flex flex-col h-full hover:translate-y-[-8px] transition-all duration-500">
            <div className="relative aspect-[16/10] overflow-hidden">
              <OptimizedImage 
                src={post.image} 
                alt={post.title} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute top-6 left-6">
                <span className="bg-slate-900/90 backdrop-blur-md text-white text-xs font-black px-4 py-1.5 rounded-full uppercase tracking-widest">
                  {post.category}
                </span>
              </div>
            </div>
            <div className="p-8 md:p-10 flex-grow flex flex-col">
              <div className="flex items-center gap-4 text-sm text-slate-500 mb-6 font-bold">
                <div className="flex items-center gap-1.5">
                  <Calendar size={14} className="text-teal-500" />
                  {post.date}
                </div>
                <div className="flex items-center gap-1.5">
                  <User size={14} className="text-teal-500" />
                  {post.author}
                </div>
              </div>
              <h2 className="text-3xl font-black text-slate-900 mb-6 leading-tight group-hover:text-teal-600 transition-colors">
                <Link to={`/blog/${post.id}`}>{post.title}</Link>
              </h2>
              <p className="text-slate-600 mb-10 flex-grow leading-relaxed text-lg font-medium">
                {post.excerpt}
              </p>
              <div className="mt-auto">
                <Link 
                  to={`/blog/${post.id}`} 
                  className="inline-flex items-center gap-3 text-slate-900 font-black text-lg group/btn"
                >
                  <span className="bg-teal-500 group-hover/btn:bg-teal-400 p-2 rounded-xl transition-colors">
                    <ArrowRight size={20} />
                  </span>
                  Full Article
                </Link>
              </div>
            </div>
          </article>
        )) : (
          <div className="col-span-full py-32 text-center bg-white rounded-[40px] border border-dashed border-slate-300">
            <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
            </div>
            <h3 className="text-2xl font-black text-slate-900 mb-2">No matching insights found</h3>
            <p className="text-slate-500 font-medium">Try adjusting your search or filters to find what you're looking for.</p>
            <button 
              onClick={() => { setSearchTerm(''); setActiveCategory('All'); }}
              className="mt-8 px-8 py-3 bg-teal-500 text-slate-900 font-bold rounded-xl hover:bg-teal-400 transition-all"
            >
              Clear All Filters
            </button>
          </div>
        )}
      </div>

      <div className="mt-24 pt-12 border-t border-slate-100 flex flex-col items-center text-center">
        <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-6">
          <Calendar className="text-slate-300" size={24} />
        </div>
        <h3 className="text-xl font-bold text-slate-900 mb-2">Weekly Strategy Dispatches</h3>
        <p className="text-slate-500 max-w-sm mb-8">
          Join 5,000+ architects and founders receiving our weekly breakdown on high-performance design, SEO, and conversion engineering.
        </p>
        <Link 
          to="/contact" 
          className="px-8 py-4 bg-slate-900 text-white font-bold rounded-2xl hover:scale-105 active:scale-95 transition-all shadow-xl shadow-slate-900/10"
        >
          Subscribe to Insights
        </Link>
      </div>
    </div>
  );
};

export default BlogPage;

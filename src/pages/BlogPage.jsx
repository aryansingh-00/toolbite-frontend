import React, { useEffect } from 'react';
import { ArrowRight, Calendar, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import { blogPosts } from '../data/blogPosts';

const BlogPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-[1400px] mx-auto min-h-screen">
      <SEO 
        title="Web Design Blog & Digital Strategy Insights"
        description="Stay ahead of the curve with the ToolBite blog. We share insights on modern web design, SEO, e-commerce optimization, and digital growth strategies."
        keywords="web design blog, digital strategy, SEO tips, e-commerce optimization, UI/UX trends 2026, website development insights"
      />
      <div className="text-center mb-16 px-4">
        <div className="inline-flex items-center gap-2 bg-teal-50 text-teal-800 font-bold px-4 py-1.5 rounded-full text-xs uppercase tracking-widest mb-6">
          <div className="w-2 h-2 bg-teal-500 rounded-full animate-pulse" />
          Insight Hub
        </div>
        <h1 className="text-4xl md:text-5xl lg:text-7xl font-black text-slate-900 mb-6 tracking-tight">Our <span className="text-teal-500">Blog</span></h1>
        <p className="text-xl text-slate-600 max-w-2xl mx-auto font-medium">
          Authoritative insights and high-performance strategies for modern digital brands.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {blogPosts.map((post) => (
          <article key={post.id} className="bg-white rounded-[40px] overflow-hidden shadow-2xl shadow-slate-200/50 border border-slate-100 group flex flex-col h-full hover:translate-y-[-8px] transition-all duration-500">
            <div className="relative aspect-[16/10] overflow-hidden">
              <img 
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
        ))}
      </div>

      <div className="mt-20 flex flex-col items-center gap-6">
        <div className="w-12 h-1 bg-slate-200 rounded-full" />
        <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">More articles coming soon</p>
      </div>
    </div>
  );
};

export default BlogPage;

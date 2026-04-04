import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, User, Share2 } from 'lucide-react';
import { blogPosts } from '../data/blogPosts';
import SEO from '../components/SEO';

const BlogDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const post = blogPosts.find(p => p.id === parseInt(id));

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!post) {
      navigate('/blog');
    }
  }, [post, navigate]);

  if (!post) return null;

  return (
    <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-[900px] mx-auto min-h-screen">
      <SEO 
        title={`${post.title} | ToolBite Blog`}
        description={post.excerpt}
        keywords={`${post.category}, web design tips, toolbite blog, ${post.title}`}
      />

      <Link 
        to="/blog" 
        className="inline-flex items-center gap-2 text-teal-600 font-bold mb-10 hover:translate-x-[-4px] transition-transform"
      >
        <ArrowLeft size={18} />
        Back to Blog
      </Link>

      <article className="bg-white rounded-[40px] overflow-hidden shadow-2xl shadow-slate-200/50 border border-slate-100">
        <header className="p-8 md:p-12 pb-6">
          <div className="flex items-center gap-3 mb-6">
            <span className="bg-teal-500 text-slate-900 text-xs font-black uppercase tracking-widest px-4 py-1.5 rounded-full">
              {post.category}
            </span>
            <div className="flex items-center gap-4 text-sm text-slate-500">
              <div className="flex items-center gap-1.5">
                <Calendar size={14} className="text-teal-500" />
                {post.date}
              </div>
              <div className="flex items-center gap-1.5">
                <User size={14} className="text-teal-500" />
                {post.author}
              </div>
            </div>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 leading-[1.1] mb-8">
            {post.title}
          </h1>
          
          <div className="aspect-[21/9] rounded-[32px] overflow-hidden mb-12 shadow-inner bg-slate-100">
            <img 
              src={post.image} 
              alt={post.title} 
              className="w-full h-full object-cover"
            />
          </div>
        </header>

        <section 
          className="px-8 md:px-12 pb-16 prose prose-slate prose-lg max-w-none 
          prose-headings:text-slate-900 prose-headings:font-black
          prose-p:text-slate-600 prose-p:leading-relaxed
          prose-strong:text-slate-900
          prose-a:text-teal-600 prose-a:no-underline hover:prose-a:underline"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        <footer className="px-8 md:px-12 pb-12 border-t border-slate-50 pt-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-teal-500 flex items-center justify-center text-slate-900 font-bold selection:bg-none">
                {post.author.charAt(0)}
              </div>
              <div>
                <p className="text-sm text-slate-400 font-medium">Published by</p>
                <p className="text-slate-900 font-bold">{post.author}</p>
              </div>
            </div>
            <button className="flex items-center gap-2 px-6 py-3 bg-slate-900 text-white font-bold rounded-2xl hover:bg-slate-800 transition-colors">
              <Share2 size={18} />
              Share Article
            </button>
          </div>
        </footer>
      </article>

      <div className="mt-16 bg-gradient-to-br from-teal-500 to-emerald-600 rounded-[40px] p-10 md:p-16 text-center shadow-xl shadow-teal-500/20">
        <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-6">Ready to transform your brand?</h2>
        <p className="text-slate-900/80 text-lg font-bold mb-10 max-w-xl mx-auto">
          We bring enterprise-grade web solutions to businesses that are ready to scale and dominate their niche.
        </p>
        <Link 
          to="/contact" 
          className="inline-block px-10 py-5 bg-slate-900 text-white font-black rounded-2xl hover:translate-y-[-2px] transition-all hover:shadow-2xl shadow-slate-900/40"
        >
          Let's Build Something Great
        </Link>
      </div>
    </div>
  );
};

export default BlogDetail;

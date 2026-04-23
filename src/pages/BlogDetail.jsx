import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, User, Share2 } from 'lucide-react';
import { blogPosts } from '../data/blogPosts';
import SEO from '../components/SEO';

const BlogDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const post = blogPosts.find(p => p.id === parseInt(id));

  const [scrollProgress, setScrollProgress] = React.useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!post) {
      navigate('/blog');
    }

    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.pageYOffset / totalHeight) * 100;
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [post, navigate]);

  if (!post) return null;

  return (
    <div className="min-h-screen bg-slate-50/50">
      <SEO 
        title={`${post.title} | ToolBite Blog`}
        description={post.excerpt}
        keywords={`${post.category}, web design tips, toolbite blog, ${post.title}`}
      />

      {/* Reading Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1.5 bg-slate-100 z-[100]">
        <div 
          className="h-full bg-teal-500 transition-all duration-100 ease-out shadow-[0_0_10px_rgba(20,184,166,0.5)]"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-[950px] mx-auto">
        <Link 
          to="/blog" 
          className="inline-flex items-center gap-2 text-slate-500 font-bold mb-10 hover:text-teal-600 transition-colors group"
        >
          <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
          Back to Insights
        </Link>

        <article className="bg-white rounded-[40px] overflow-hidden shadow-2xl shadow-slate-200/50 border border-slate-100">
          <header className="p-8 md:p-16 pb-6">
            <div className="flex flex-wrap items-center gap-4 mb-8">
              <span className="bg-teal-50 text-teal-700 text-xs font-black uppercase tracking-widest px-4 py-1.5 rounded-full border border-teal-100">
                {post.category}
              </span>
              <div className="flex items-center gap-6 text-sm text-slate-400 font-bold">
                <div className="flex items-center gap-1.5">
                  <Calendar size={16} className="text-teal-500" />
                  {post.date}
                </div>
                <div className="flex items-center gap-1.5">
                  <User size={16} className="text-teal-500" />
                  {post.author}
                </div>
              </div>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-black text-slate-900 leading-[1] mb-10 tracking-tighter">
              {post.title}
            </h1>
            
            <div className="aspect-[21/9] rounded-[32px] overflow-hidden mb-12 shadow-2xl bg-slate-100 group">
              <img 
                src={post.image} 
                alt={post.title} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
              />
            </div>
          </header>

          <section 
            className="px-8 md:px-16 pb-16 prose prose-slate prose-xl max-w-none 
            prose-headings:text-slate-900 prose-headings:font-black prose-headings:tracking-tight
            prose-p:text-slate-600 prose-p:leading-relaxed prose-p:font-medium
            prose-strong:text-slate-900 prose-strong:font-black
            prose-blockquote:border-l-4 prose-blockquote:border-teal-500 prose-blockquote:bg-teal-50/50 prose-blockquote:py-2 prose-blockquote:rounded-r-2xl
            prose-a:text-teal-600 prose-a:no-underline hover:prose-a:underline"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          <footer className="px-8 md:px-16 pb-16 border-t border-slate-50 pt-12">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8 p-8 bg-slate-50 rounded-[32px]">
              <div className="flex items-center gap-5">
                <div className="w-16 h-16 rounded-full bg-teal-500 flex items-center justify-center text-slate-900 text-xl font-black shadow-lg">
                  {post.author.charAt(0)}
                </div>
                <div>
                  <p className="text-xs text-slate-400 font-black uppercase tracking-widest mb-1">Architected by</p>
                  <p className="text-xl text-slate-900 font-black">{post.author}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <button className="flex items-center gap-2 px-8 py-4 bg-slate-900 text-white font-black rounded-2xl hover:bg-teal-600 transition-all shadow-xl hover:shadow-teal-500/20">
                  <Share2 size={18} />
                  Share Insight
                </button>
              </div>
            </div>
          </footer>
        </article>

        {/* Related Posts */}
        <div className="mt-24">
          <h2 className="text-3xl font-black text-slate-900 mb-10 flex items-center gap-4">
            Related Intelligence
            <div className="h-1 flex-grow bg-slate-100 rounded-full" />
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {blogPosts
              .filter(p => p.id !== post.id)
              .slice(0, 2)
              .map(related => (
                <Link 
                  key={related.id} 
                  to={`/blog/${related.id}`}
                  className="group bg-white p-6 rounded-[32px] border border-slate-100 shadow-xl shadow-slate-200/30 hover:border-teal-200 transition-all"
                >
                  <div className="aspect-video rounded-2xl overflow-hidden mb-6">
                    <img src={related.image} alt={related.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  </div>
                  <span className="text-teal-600 text-xs font-black uppercase tracking-widest mb-3 block">{related.category}</span>
                  <h3 className="text-xl font-black text-slate-900 leading-tight group-hover:text-teal-600 transition-colors">{related.title}</h3>
                </Link>
              ))
            }
          </div>
        </div>

        <div className="mt-24 bg-slate-900 rounded-[48px] p-10 md:p-20 text-center relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_right,rgba(20,184,166,0.2),transparent)] pointer-events-none" />
          <h2 className="text-4xl md:text-6xl font-black text-white mb-8 tracking-tighter leading-[1]">Ready to engineer your <span className="text-teal-400">Digital Legacy?</span></h2>
          <p className="text-slate-400 text-xl font-medium mb-12 max-w-2xl mx-auto">
            We bring enterprise-grade web solutions to businesses that are ready to scale and dominate their niche.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link 
              to="/contact" 
              className="w-full sm:w-auto px-12 py-5 bg-teal-500 text-slate-900 font-black rounded-2xl hover:bg-teal-400 transition-all shadow-xl shadow-teal-500/20"
            >
              Start Architecture Call
            </Link>
            <Link 
              to="/portfolio" 
              className="w-full sm:w-auto px-12 py-5 bg-white/10 text-white font-black rounded-2xl hover:bg-white/20 transition-all backdrop-blur-md"
            >
              Explore Success Stories
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetail;

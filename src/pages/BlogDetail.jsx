import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, User, Share2, TrendingUp, AlertTriangle, Zap, Calculator as CalcIcon } from 'lucide-react';
import { motion } from 'framer-motion';
import { blogPosts } from '../data/blogPosts';
import SEO from '../components/SEO';

const BlogCalculatorWidget = () => {
  const [traffic, setTraffic] = React.useState(10000);
  const [convRate, setConvRate] = React.useState(1.5);
  const [aov, setAov] = React.useState(75);

  const currentRevenue = traffic * (convRate / 100) * aov;
  const optimizedRevenue = currentRevenue * 1.35 * 1.15;
  const monthlyLeak = optimizedRevenue - currentRevenue;
  const annualLeak = monthlyLeak * 12;

  return (
    <div className="bg-slate-900 text-white rounded-[32px] p-6 md:p-8 border border-slate-800 shadow-2xl relative overflow-hidden my-12 not-prose">
      <div className="absolute top-0 right-0 w-64 h-64 bg-teal-500/5 rounded-full blur-[80px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/5 rounded-full blur-[80px] pointer-events-none" />

      <div className="relative z-10 space-y-6">
        <div className="flex items-center gap-2 text-teal-400 text-xs font-black uppercase tracking-widest">
          <CalcIcon size={14} />
          Interactive Revenue Leak Calculator
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Sliders */}
          <div className="space-y-6">
            {/* Traffic */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-sm">
                <span className="font-bold text-slate-400">Monthly Traffic</span>
                <span className="font-black text-teal-400">{traffic.toLocaleString()}</span>
              </div>
              <input
                type="range" min="1000" max="100000" step="1000"
                value={traffic} onChange={(e) => setTraffic(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-teal-500"
              />
            </div>

            {/* Conv Rate */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-sm">
                <span className="font-bold text-slate-400">Conversion Rate</span>
                <span className="font-black text-teal-400">{convRate}%</span>
              </div>
              <input
                type="range" min="0.1" max="10" step="0.1"
                value={convRate} onChange={(e) => setConvRate(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-teal-500"
              />
            </div>

            {/* AOV */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-sm">
                <span className="font-bold text-slate-400">Average Order Value ($)</span>
                <span className="font-black text-teal-400">${aov}</span>
              </div>
              <input
                type="range" min="10" max="500" step="5"
                value={aov} onChange={(e) => setAov(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-teal-500"
              />
            </div>
          </div>

          {/* Results */}
          <div className="bg-slate-950/60 p-6 rounded-2xl border border-slate-800/80 text-center space-y-4">
            <div className="flex items-center justify-center gap-2 text-rose-500 text-xs font-black uppercase tracking-widest">
              <AlertTriangle size={14} className="animate-pulse" />
              Annual Revenue Leak
            </div>
            
            <div>
              <motion.span
                key={annualLeak}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-4xl md:text-5xl font-black text-white tracking-tighter block"
              >
                ${Math.round(annualLeak).toLocaleString()}
              </motion.span>
              <span className="text-slate-500 text-xs font-bold block mt-1">Lost to suboptimal speed & conversion funnel</span>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2 border-t border-slate-800">
              <div className="text-left">
                <span className="text-[10px] font-black text-slate-500 uppercase tracking-wider block">Speed Boost</span>
                <span className="text-sm font-black text-emerald-400">+${Math.round(currentRevenue * 0.15 * 12).toLocaleString()}/yr</span>
              </div>
              <div className="text-left">
                <span className="text-[10px] font-black text-slate-500 uppercase tracking-wider block">CRO Lift (35%)</span>
                <span className="text-sm font-black text-teal-400">+${Math.round(currentRevenue * 0.35 * 12).toLocaleString()}/yr</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

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

  const renderContent = () => {
    if (!post.content) return null;
    const parts = post.content.split('[ROI_CALCULATOR_WIDGET]');
    if (parts.length > 1) {
      return (
        <section 
          className="px-8 md:px-16 pb-16 prose prose-slate prose-xl max-w-none 
          prose-headings:text-black prose-headings:font-black prose-headings:tracking-tight
          prose-p:text-black prose-p:leading-relaxed prose-p:font-medium
          prose-strong:text-black prose-strong:font-black
          prose-blockquote:border-l-4 prose-blockquote:border-teal-500 prose-blockquote:bg-teal-50/50 prose-blockquote:py-2 prose-blockquote:rounded-r-2xl
          prose-a:text-teal-600 prose-a:no-underline hover:prose-a:underline"
        >
          <div dangerouslySetInnerHTML={{ __html: parts[0] }} />
          <BlogCalculatorWidget />
          <div dangerouslySetInnerHTML={{ __html: parts[1] }} />
        </section>
      );
    }
    return (
      <section 
        className="px-8 md:px-16 pb-16 prose prose-slate prose-xl max-w-none 
        prose-headings:text-black prose-headings:font-black prose-headings:tracking-tight
        prose-p:text-black prose-p:leading-relaxed prose-p:font-medium
        prose-strong:text-black prose-strong:font-black
        prose-blockquote:border-l-4 prose-blockquote:border-teal-500 prose-blockquote:bg-teal-50/50 prose-blockquote:py-2 prose-blockquote:rounded-r-2xl
        prose-a:text-teal-600 prose-a:no-underline hover:prose-a:underline"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
    );
  };

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
            
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-black text-black leading-[1] mb-10 tracking-tighter">
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



          {renderContent()}

          <footer className="px-8 md:px-16 pb-16 border-t border-slate-50 pt-12">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8 p-8 bg-slate-50 rounded-[32px]">
              <div className="flex items-center gap-5">
                <div className="w-16 h-16 rounded-full bg-teal-500 flex items-center justify-center text-black text-xl font-black shadow-lg">
                  {post.author.charAt(0)}
                </div>
                <div>
                  <p className="text-xs text-slate-400 font-black uppercase tracking-widest mb-1">Architected by</p>
                  <p className="text-xl text-black font-black">{post.author}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <button title="Interactive Button" aria-label="Interactive Button" className="flex items-center gap-2 px-8 py-4 bg-slate-900 text-white font-black rounded-2xl hover:bg-teal-600 transition-all shadow-xl hover:shadow-teal-500/20">
                  <Share2 size={18} />
                  Share Insight
                </button>
              </div>
            </div>
          </footer>
        </article>



        {/* Related Posts */}
        <div className="mt-16">
          <h2 className="text-3xl font-black text-black mb-10 flex items-center gap-4">
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
                  <h3 className="text-xl font-black text-black leading-tight group-hover:text-teal-600 transition-colors">{related.title}</h3>
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
              className="w-full sm:w-auto px-12 py-5 bg-teal-500 text-black font-black rounded-2xl hover:bg-teal-400 transition-all shadow-xl shadow-teal-500/20"
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

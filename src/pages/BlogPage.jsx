import React, { useEffect } from 'react';
import { ArrowRight, Calendar, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';

const BlogPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const posts = [
    {
      id: 1,
      title: "10 Reasons Your Business Needs a Custom Website in 2026",
      excerpt: "Discover why relying solely on social media is no longer enough and how a custom web presence can exponentially grow your brand.",
      date: "Oct 12, 2026",
      author: "Alex Morgan",
      category: "Strategy",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 2,
      title: "The Ultimate Guide to E-commerce Conversion Optimization",
      excerpt: "Learn the psychological triggers and UI/UX patterns that turn casual browsers into loyal, paying customers.",
      date: "Oct 05, 2026",
      author: "Sam Rivera",
      category: "E-commerce",
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 3,
      title: "Why Website Performance is Crucial for SEO",
      excerpt: "Google's Core Web Vitals are more important than ever. Here is how to ensure your site passes with flying colors.",
      date: "Sep 28, 2026",
      author: "Jamie Lee",
      category: "SEO",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 4,
      title: "Modern Web Design Trends You Cant Ignore",
      excerpt: "From glassmorphism to scrollytelling, explore the aesthetic shifts defining the best websites of the year.",
      date: "Sep 15, 2026",
      author: "Alex Morgan",
      category: "Design",
      image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    }
  ];

  return (
    <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-[1400px] mx-auto min-h-screen">
      <SEO 
        title="Web Design Blog & Digital Strategy Insights"
        description="Stay ahead of the curve with the ToolBite blog. We share insights on modern web design, SEO, e-commerce optimization, and digital growth strategies."
        keywords="web design blog, digital strategy, SEO tips, e-commerce optimization, UI/UX trends 2026, website development insights"
      />
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">Our <span className="text-teal-500">Blog</span></h1>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
          Insights, strategies, and industry news to help you navigate the digital landscape and scale your business.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {posts.map((post) => (
          <article key={post.id} className="bg-white rounded-3xl overflow-hidden shadow-xl shadow-slate-200/50 border border-slate-100 group flex flex-col h-full">
            <div className="relative aspect-[16/9] overflow-hidden">
              <img 
                src={post.image} 
                alt={post.title} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute top-4 left-4">
                <span className="bg-slate-900/80 backdrop-blur-md text-white text-xs font-bold px-3 py-1 rounded-full">
                  {post.category}
                </span>
              </div>
            </div>
            <div className="p-8 flex-grow flex flex-col">
              <div className="flex items-center gap-4 text-sm text-slate-500 mb-4">
                <div className="flex items-center gap-1.5">
                  <Calendar size={14} className="text-teal-500" />
                  {post.date}
                </div>
                <div className="flex items-center gap-1.5">
                  <User size={14} className="text-teal-500" />
                  {post.author}
                </div>
              </div>
              <h2 className="text-2xl font-bold text-slate-900 mb-4 group-hover:text-teal-600 transition-colors">
                <Link to="#">{post.title}</Link>
              </h2>
              <p className="text-slate-600 mb-8 flex-grow leading-relaxed">
                {post.excerpt}
              </p>
              <div className="mt-auto">
                <Link to="#" className="inline-flex items-center gap-2 text-teal-600 font-bold hover:text-teal-700 transition-colors">
                  Read Article
                  <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-20 flex justify-center">
        <div className="inline-flex items-center justify-center px-8 py-4 border border-slate-200 rounded-full bg-white text-slate-600 font-bold hover:bg-slate-50 transition-colors cursor-pointer shadow-sm">
          Load More Articles
        </div>
      </div>
    </div>
  );
};

export default BlogPage;

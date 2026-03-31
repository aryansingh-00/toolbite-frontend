/* eslint-disable */
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ExternalLink, ShoppingCart, Check, ShieldCheck, Zap, Server, Monitor, Tablet, Smartphone } from 'lucide-react';
import staticTemplates from '../data/templates';
import SEO from '../components/SEO';

const TemplateDetails = () => {
  const { id } = useParams();
  const [template, setTemplate] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [deviceView, setDeviceView] = useState('desktop');

  useEffect(() => {
    window.scrollTo(0, 0);
    // Look up from static data — no backend required
    const found = staticTemplates.find((t) => t._id === id);
    if (found) {
      setTemplate(found);
    } else {
      setError('Template not found.');
    }
  }, [id]);

  if (loading) {
    return (
      <div className="pt-32 pb-24 min-h-screen bg-slate-50 flex flex-col justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600 mb-4"></div>
        <p className="text-slate-500 font-medium animate-pulse">Loading template details...</p>
      </div>
    );
  }

  if (error || !template) {
    return (
      <div className="pt-32 pb-24 min-h-screen bg-slate-50 flex flex-col justify-center items-center px-4">
        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm text-center max-w-md w-full">
          <Server className="w-16 h-16 text-slate-300 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-slate-800 mb-2">Not Found</h2>
          <p className="text-slate-500 mb-6">{error || 'This template could not be loaded.'}</p>
          <Link to="/templates" className="inline-flex items-center justify-center px-6 py-3 bg-teal-600 text-white font-semibold rounded-xl hover:bg-teal-700 transition">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Marketplace
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-24 bg-slate-50 min-h-screen">
      <SEO 
        title={`${template.title} Template`}
        description={template.shortDescription}
        image={template.imageUrl}
        type="article"
        keywords={`${template.title}, ${template.category} template, react website, premium web design, toolbite marketplace`}
      />
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb / Back Navigation */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-8"
        >
          <Link to="/templates" className="inline-flex items-center text-sm font-semibold text-slate-500 hover:text-teal-600 transition-colors group">
            <ArrowLeft className="w-4 h-4 mr-2 transform group-hover:-translate-x-1 transition-transform" />
            Back to All Templates
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          
          {/* Left Column: Image & Preview */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col gap-6 sticky top-28"
          >
            <div className="relative flex flex-col bg-white rounded-[2rem] p-2 border border-slate-200 shadow-xl overflow-hidden group">
              {/* Device Toggle Header */}
              {template.previewLink && (
                <div className="flex items-center justify-between px-4 py-3 bg-slate-50 rounded-t-[1.5rem] border-b border-slate-100 mb-2">
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => setDeviceView('desktop')}
                      className={`p-2 rounded-lg transition-colors ${deviceView === 'desktop' ? 'bg-teal-100 text-teal-700' : 'text-slate-400 hover:text-slate-600 hover:bg-slate-200'}`}
                      title="Desktop View"
                    >
                      <Monitor className="w-5 h-5" />
                    </button>
                    <button 
                      onClick={() => setDeviceView('tablet')}
                      className={`p-2 rounded-lg transition-colors ${deviceView === 'tablet' ? 'bg-teal-100 text-teal-700' : 'text-slate-400 hover:text-slate-600 hover:bg-slate-200'}`}
                      title="Tablet View"
                    >
                      <Tablet className="w-5 h-5" />
                    </button>
                    <button 
                      onClick={() => setDeviceView('mobile')}
                      className={`p-2 rounded-lg transition-colors ${deviceView === 'mobile' ? 'bg-teal-100 text-teal-700' : 'text-slate-400 hover:text-slate-600 hover:bg-slate-200'}`}
                      title="Mobile View"
                    >
                      <Smartphone className="w-5 h-5" />
                    </button>
                  </div>
                  <div className="flex gap-2">
                    <span className="px-3 py-1 bg-white text-slate-800 text-xs font-black uppercase rounded-full shadow-sm border border-slate-200">
                      {template.category}
                    </span>
                  </div>
                </div>
              )}

              {/* Preview Container */}
              <div className="relative bg-slate-100 rounded-[1.5rem] overflow-hidden flex justify-center items-start min-h-[400px]">
                {template.previewLink ? (
                  <div 
                    className={`transition-all duration-500 ease-in-out h-[600px] overflow-hidden shadow-2xl bg-white mx-auto ${
                      deviceView === 'desktop' ? 'w-full' : 
                      deviceView === 'tablet' ? 'w-full max-w-[768px]' : 'w-full max-w-[375px]'
                    }`}
                  >
                    <iframe
                      src={template.previewLink}
                      title={`${template.title} preview`}
                      className="w-full h-full border-0"
                    />
                  </div>
                ) : (
                  <>
                    <div className="absolute inset-0 bg-gradient-to-tr from-teal-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                    <img 
                      src={template.imageUrl} 
                      alt={template.title} 
                      className="w-full h-auto aspect-[4/3] object-cover"
                    />
                    <div className="absolute top-4 left-4 flex gap-2">
                      <span className="px-4 py-1.5 bg-white/90 backdrop-blur-md text-slate-800 text-xs font-black tracking-widest uppercase rounded-full shadow-sm">
                        {template.category}
                      </span>
                    </div>
                  </>
                )}
              </div>
            </div>

            <div className="flex gap-4">
               {template.previewLink && (
                  <a 
                    href={template.previewLink} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 py-4 bg-white border-2 border-slate-200 text-slate-700 font-bold rounded-2xl hover:border-teal-400 hover:text-teal-700 transition shadow-sm group"
                  >
                    <ExternalLink className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                    Live Preview
                  </a>
               )}
            </div>
          </motion.div>

          {/* Right Column: Details & Actions */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="flex flex-col"
          >
            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4 tracking-tight">
              {template.title}
            </h1>
            
            <p className="text-xl text-slate-600 mb-8 font-medium leading-relaxed">
              {template.shortDescription}
            </p>

            <div className="flex items-center gap-6 mb-8 pb-8 border-b border-slate-200">
              <a
                href={`https://wa.me/919598037255?text=${encodeURIComponent(`Hi ToolBite! 👋\n\nI'm interested in purchasing the *${template.title}* template.\n\n📦 *Category:* ${template.category}\n\nCould you please guide me through the next steps?`)}`}
                target="_blank"
                rel="noreferrer"
                className="flex-1 flex items-center justify-center gap-2 py-4 px-8 bg-slate-900 text-white font-bold text-lg rounded-2xl hover:bg-teal-600 transition-all shadow-xl hover:shadow-teal-500/30 transform hover:-translate-y-1"
              >
                <ShoppingCart className="w-5 h-5" />
                Buy Now — Instant Delivery
              </a>
            </div>

            {template.fullDescription && (
              <div className="mb-10 text-slate-600 leading-relaxed text-lg prose prose-slate">
                <h3 className="text-xl font-bold text-slate-900 mb-4">About the Template</h3>
                <p>{template.fullDescription}</p>
              </div>
            )}

            <div className="mb-10">
              <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                <Zap className="w-5 h-5 text-teal-500" />
                Core Features
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-6">
                {template.features.map((feat, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <div className="mt-1 bg-teal-100 p-1 rounded-full text-teal-600 shrink-0">
                      <Check size={14} className="stroke-[3px]" />
                    </div>
                    <span className="text-slate-700 font-medium">{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-slate-100 rounded-2xl p-6 flex items-start gap-4 border border-slate-200">
              <ShieldCheck className="w-8 h-8 text-emerald-500 shrink-0 mt-1" />
              <div>
                <h4 className="font-bold text-slate-900 mb-1">Guaranteed Premium Quality</h4>
                <p className="text-sm text-slate-600">
                  Includes full source code access, free updates for 6 months, and completely scalable architecture built by senior engineers.
                </p>
              </div>
            </div>
            
          </motion.div>

        </div>

        {/* User Reviews & Comments Section */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-20 pt-16 border-t border-slate-200"
        >
          <div className="max-w-3xl">
            <h3 className="text-3xl font-extrabold text-slate-900 mb-8 flex items-center gap-3">
              User Reviews & Comments
              <span className="bg-teal-100 text-teal-700 text-sm py-1 px-3 rounded-full">3</span>
            </h3>
            
            <div className="space-y-8 mb-12">
              {[
                { name: "Sarah Jenkins", role: "Agency Owner", date: "2 days ago", comment: "We used this template for a client last week and the conversion rates have already jumped by 22%. The code quality is absolutely pristine. Highly recommend!" },
                { name: "Marcus Torres", role: "Freelance Developer", date: "1 week ago", comment: "The design is gorgeous, but what really sold me was how easy it was to customize. The Tailwind structure is very logical. Saved me at least 40 hours of work." },
                { name: "Elena Rostova", role: "Marketing Director", date: "3 weeks ago", comment: "Beautiful animations and the responsive design works flawlessly on all devices we tested. Support was also very quick to answer a minor question I had." }
              ].map((review, i) => (
                <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex gap-4 items-start">
                  <div className="w-12 h-12 bg-slate-900 text-white rounded-full flex items-center justify-center font-bold text-lg shrink-0">
                    {review.name.charAt(0)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-bold text-slate-900">{review.name}</h4>
                      <span className="text-xs text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">{review.role}</span>
                    </div>
                    <div className="text-xs text-slate-400 mb-3">{review.date}</div>
                    <p className="text-slate-600 leading-relaxed">{review.comment}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-slate-50 p-8 rounded-3xl border border-slate-200">
              <h4 className="text-xl font-bold text-slate-900 mb-6">Leave a Reply</h4>
              <p className="text-sm text-slate-500 mb-6">Your email address will not be published. Required fields are marked *</p>
              <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); alert("Thanks for your comment! It is pending moderation."); }}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Name *</label>
                    <input type="text" required className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Email *</label>
                    <input type="email" required className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Comment *</label>
                  <textarea required rows={4} className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 resize-none"></textarea>
                </div>
                <button type="submit" className="mt-4 bg-slate-900 hover:bg-teal-600 text-white font-bold py-3 px-8 rounded-xl transition-all shadow-md">
                  Post Comment
                </button>
              </form>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default TemplateDetails;

/* eslint-disable */
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ExternalLink, ShoppingCart, Check, ShieldCheck, Zap, Server, Monitor, Tablet, Smartphone, Palette, Mail, MessageCircle, Send } from 'lucide-react';
import staticTemplates from '../data/templates';
import SEO from '../components/SEO';
import DesignLab from '../components/DesignLab';

const TemplateDetails = () => {
  const { id } = useParams();
  const template = React.useMemo(() => staticTemplates.find((t) => t._id === id), [id]);
  const [loading] = useState(false);
  const [error, setError] = useState(template ? '' : 'Template not found.');
  const [deviceView, setDeviceView] = useState('desktop');
  const [isLabOpen, setIsLabOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!template) {
      setError('Template not found.');
    } else {
      setError('');
    }
  }, [id, template]);

  const handleIframeLoad = (e) => {
    try {
      const doc = e.target.contentDocument || e.target.contentWindow?.document;
      if (doc) {
        const style = doc.createElement('style');
        style.textContent = `
          ::-webkit-scrollbar {
            display: none !important;
            width: 0 !important;
            height: 0 !important;
          }
          html, body {
            scrollbar-width: none !important;
            -ms-overflow-style: none !important;
          }
        `;
        doc.head.appendChild(style);
      }
    } catch (err) {
      console.warn("Could not style iframe scrollbars:", err);
    }
  };

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
          <h2 className="text-2xl font-bold text-black mb-2">Not Found</h2>
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
    <div className="pt-24 pb-24 bg-slate-50 min-h-screen relative overflow-hidden z-0">
      {/* Decorative Radial Background Blobs */}
      <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-gradient-to-tr from-teal-300/15 to-indigo-300/10 rounded-full blur-[100px] pointer-events-none -translate-x-1/2 z-0"></div>
      <div className="absolute bottom-1/4 right-0 w-[550px] h-[550px] bg-gradient-to-br from-emerald-300/15 to-blue-300/15 rounded-full blur-[120px] pointer-events-none translate-x-1/3 z-0"></div>
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
            {/* Device Switcher Buttons (Only shown if previewLink is available) */}
            {template.previewLink && !isLabOpen && (
              <div className="flex justify-center items-center gap-1.5 p-1.5 bg-slate-100 rounded-2xl border border-slate-200/80 w-fit mx-auto shadow-inner">
                {[
                  { id: 'desktop', label: 'Desktop', icon: Monitor },
                  { id: 'tablet', label: 'Tablet', icon: Tablet },
                  { id: 'smartphone', label: 'Mobile', icon: Smartphone }
                ].map((dev) => {
                  const Icon = dev.icon;
                  const isActive = deviceView === dev.id;
                  return (
                    <button
                      key={dev.id}
                      onClick={() => setDeviceView(dev.id)}
                      className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all duration-300 ${
                        isActive
                          ? 'bg-white text-teal-600 shadow-md border border-slate-200'
                          : 'text-slate-500 hover:text-slate-800'
                      }`}
                    >
                      <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-teal-600' : 'text-slate-400'}`} />
                      <span>{dev.label}</span>
                    </button>
                  );
                })}
              </div>
            )}

            {/* Device Frame Chassis Wrapper */}
            <div className="w-full flex justify-center items-center">
              <div 
                className="transition-all duration-500 ease-in-out w-full"
                style={{
                  maxWidth: (isLabOpen || deviceView === 'desktop' || !template.previewLink) 
                    ? '100%' 
                    : deviceView === 'tablet' 
                      ? '420px' 
                      : '310px'
                }}
              >
                {isLabOpen ? (
                  /* Design Lab Preview Card */
                  <div className="relative flex flex-col bg-white rounded-[2rem] p-2 border border-slate-200 shadow-xl overflow-hidden h-[480px] w-full">
                    <div className="h-12 border-b border-slate-100 dark:border-slate-800 flex items-center px-6 gap-4">
                      <div className="flex gap-1">
                        <div className="w-2.5 h-2.5 rounded-full bg-rose-400"></div>
                        <div className="w-2.5 h-2.5 rounded-full bg-amber-400"></div>
                        <div className="w-2.5 h-2.5 rounded-full bg-emerald-400"></div>
                      </div>
                      <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Live Customization Preview</span>
                    </div>
                    <div className="flex-1 p-10 flex flex-col bg-white dark:bg-slate-900">
                      <nav className="flex justify-between items-center mb-16">
                        <div className="text-xl font-black tracking-tighter" style={{ color: 'var(--design-accent, #0f172a)' }}>
                          <span className="text-xl inline-block brand-text after:content-[attr(data-brand)]" data-brand="My Brand" id="preview-brand-name"></span>
                        </div>
                        <div className="flex gap-4">
                          <div className="w-8 h-2 rounded-full bg-slate-100 dark:bg-slate-800"></div>
                          <div className="w-8 h-2 rounded-full bg-slate-100 dark:bg-slate-800"></div>
                        </div>
                      </nav>
                      <div className="space-y-6">
                        <div className="w-20 h-2 bg-teal-500 rounded-full" style={{ backgroundColor: 'var(--design-primary, #14b8a6)' }}></div>
                        <h2 className="text-4xl font-black max-w-sm leading-tight text-slate-900 dark:text-white" style={{ color: 'var(--design-accent, #0f172a)' }}>
                          The future of your brand starts here.
                        </h2>
                        <div className="w-40 h-12 rounded-xl flex items-center justify-center font-bold text-white shadow-xl" style={{ backgroundColor: 'var(--design-primary, #14b8a6)' }}>
                          Get Started
                        </div>
                      </div>
                      <div className="mt-auto grid grid-cols-3 gap-4">
                         <div className="aspect-video rounded-2xl bg-slate-50 dark:bg-slate-800"></div>
                         <div className="aspect-video rounded-2xl bg-slate-50 dark:bg-slate-800"></div>
                         <div className="aspect-video rounded-2xl bg-slate-50 dark:bg-slate-800"></div>
                      </div>
                    </div>
                  </div>
                ) : (
                  /* Simulator Chassis Selection */
                  <>
                    {(deviceView === 'desktop' || !template.previewLink) && (
                      /* Desktop Browser Frame */
                      <div className="w-full bg-white rounded-[2rem] p-2 border border-slate-200 shadow-xl overflow-hidden flex flex-col group">
                        <div className="bg-slate-50 rounded-[1.8rem] overflow-hidden flex flex-col border border-slate-150">
                          {/* Browser Top Bar */}
                          <div className="h-10 bg-slate-100/80 px-4 flex items-center justify-between border-b border-slate-200">
                            <div className="flex gap-1.5 items-center">
                              <div className="w-2.5 h-2.5 rounded-full bg-rose-400"></div>
                              <div className="w-2.5 h-2.5 rounded-full bg-amber-400"></div>
                              <div className="w-2.5 h-2.5 rounded-full bg-emerald-400"></div>
                            </div>
                            <div className="flex-1 max-w-[280px] mx-auto bg-slate-200/50 text-[10px] text-slate-500 py-1 rounded-md text-center truncate font-medium flex items-center justify-center gap-1">
                              <span className="text-[8px]">🔒</span>
                              <span>toolbite.io{template.previewLink || `/templates/${template._id}`}</span>
                            </div>
                            <div className="w-10"></div>
                          </div>
                          
                          {/* Viewport */}
                          <div className="relative bg-white h-[450px] overflow-hidden">
                            {template.previewLink ? (
                              <iframe 
                                src={template.previewLink} 
                                title={`${template.title} Live Preview`}
                                className="w-full h-full border-0 hide-scrollbar"
                                sandbox="allow-scripts allow-same-origin"
                                onLoad={handleIframeLoad}
                              />
                            ) : (
                              <div className="relative w-full h-full overflow-hidden flex justify-center items-center bg-slate-100">
                                <div className="absolute inset-0 bg-gradient-to-tr from-teal-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                                <img 
                                  src={template.imageUrl} 
                                  alt={template.title} 
                                  className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
                                />
                                <div className="absolute top-6 left-6 flex gap-2">
                                  <span className="px-4 py-1.5 bg-white/95 backdrop-blur-md text-black text-xs font-black tracking-widest uppercase rounded-full shadow-md border border-slate-100">
                                    {template.category}
                                  </span>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    )}

                    {template.previewLink && deviceView === 'tablet' && (
                      /* Tablet Chassis */
                      <div className="w-full bg-slate-950 p-3 rounded-[2.5rem] border-[4px] border-slate-800 shadow-2xl flex flex-col relative">
                        {/* Speaker slot notch */}
                        <div className="absolute top-2 left-1/2 -translate-x-1/2 w-16 h-1.5 bg-slate-800 rounded-full"></div>
                        
                        {/* Screen Viewport */}
                        <div className="relative bg-white h-[520px] rounded-[1.8rem] overflow-hidden border border-slate-900">
                          <iframe 
                            src={template.previewLink} 
                            title={`${template.title} Live Tablet Preview`}
                            className="w-full h-full border-0 hide-scrollbar"
                            sandbox="allow-scripts allow-same-origin"
                            onLoad={handleIframeLoad}
                          />
                        </div>
                      </div>
                    )}

                    {template.previewLink && deviceView === 'smartphone' && (
                      /* Smartphone Chassis */
                      <div className="w-full bg-slate-950 p-3.5 rounded-[3.2rem] border-[4px] border-slate-800 shadow-2xl flex flex-col relative">
                        {/* Dynamic Island Notch */}
                        <div className="absolute top-3.5 left-1/2 -translate-x-1/2 w-28 h-5 bg-black rounded-full flex items-center justify-between px-3.5 z-30 shadow-inner">
                          <div className="w-1.5 h-1.5 rounded-full bg-slate-900/60 border border-slate-800/40"></div>
                          <div className="w-3.5 h-1 bg-slate-900/40 rounded-full"></div>
                        </div>
                        
                        {/* Screen Viewport */}
                        <div className="relative bg-white h-[550px] rounded-[2.4rem] overflow-hidden border border-slate-900">
                          <iframe 
                            src={template.previewLink} 
                            title={`${template.title} Live Smartphone Preview`}
                            className="w-full h-full border-0 hide-scrollbar"
                            sandbox="allow-scripts allow-same-origin"
                            onLoad={handleIframeLoad}
                          />
                        </div>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>

            <div className="flex gap-4">
               <button title={isLabOpen ? "Close Design Lab" : "Open Design Lab"} aria-label={isLabOpen ? "Close Design Lab" : "Open Design Lab"} 
                 onClick={() => setIsLabOpen(!isLabOpen)}
                 className={`flex-1 flex items-center justify-center gap-2 py-4 font-bold rounded-2xl transition shadow-xl group ${
                   isLabOpen 
                     ? 'bg-slate-800 hover:bg-slate-700 text-white shadow-slate-800/20' 
                     : 'bg-teal-500 hover:bg-teal-600 text-white shadow-teal-500/20'
                 }`}
               >
                 <Palette className={`w-5 h-5 transition-transform ${isLabOpen ? 'rotate-180' : 'group-hover:rotate-12'}`} />
                 {isLabOpen ? 'Close Design Lab' : 'Open Design Lab'}
               </button>
               {template.previewLink && (
                  <a 
                    href={template.previewLink} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 py-4 bg-white border-2 border-slate-200 text-black font-bold rounded-2xl hover:border-teal-400 hover:text-teal-700 transition shadow-sm group"
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
            className="flex flex-col relative z-10"
          >
            {/* Category tag */}
            <div className="inline-flex mb-3">
              <span className="px-3.5 py-1 bg-teal-50 text-teal-700 text-[10px] font-black tracking-widest uppercase rounded-full border border-teal-200/50 shadow-sm">
                {template.category}
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl font-black mb-4 tracking-tight leading-tight bg-gradient-to-r from-slate-900 via-teal-950 to-slate-900 bg-clip-text text-transparent">
              {template.title}
            </h1>
            
            <p className="text-lg text-slate-700 mb-8 font-medium leading-relaxed">
              {template.shortDescription}
            </p>

            {/* ── Buy / Contact Section ────────────────────────────── */}
            <div className="mb-8 pb-8 border-b border-slate-200/80">

              {/* Primary WhatsApp CTA */}
              <a
                href={`https://wa.me/919598037255?text=${encodeURIComponent(`Hi ToolBite! 👋\n\nI'm interested in purchasing the *${template.title}* template.\n\n📦 *Category:* ${template.category}\n\n💡 *Description:* ${template.shortDescription}\n\nCould you please guide me through the next steps?`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-3 py-4 px-8 bg-gradient-to-r from-teal-600 via-emerald-500 to-teal-600 text-white font-black text-lg rounded-2xl hover:scale-[1.02] transform transition-all duration-300 shadow-xl shadow-teal-500/20 hover:shadow-teal-500/35 border border-teal-500/30 group mb-3"
              >
                <ShoppingCart className="w-5 h-5 group-hover:scale-110 transition-transform" />
                Buy Now — Instant Delivery
              </a>

              {/* Secondary contact options */}
              <p className="text-center text-xs text-slate-400 font-semibold uppercase tracking-widest mb-3">Or reach us via</p>
              <div className="w-full">

                {/* Email → opens Gmail compose with pre-filled details */}
                <a
                  href={`https://mail.google.com/mail/?view=cm&fs=1&to=hello.toolbite@gmail.com&su=${encodeURIComponent(`Order: ${template.title} Template`)}&body=${encodeURIComponent(`Hi ToolBite Team,\n\nI'd like to purchase the following template:\n\n🔹 Template: ${template.title}\n🔹 Category: ${template.category}\n🔹 Template ID: ${template._id}\n\nDescription:\n${template.shortDescription}\n\nPlease let me know the payment details and delivery process.\n\nThank you!`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2.5 py-3.5 px-5 bg-white border-2 border-slate-200 text-slate-800 font-bold rounded-2xl hover:border-blue-400 hover:text-blue-700 hover:bg-blue-50 transition-all duration-300 shadow-sm group"
                >
                  <Mail className="w-4.5 h-4.5 group-hover:scale-110 transition-transform text-blue-500" />
                  <span className="text-sm">Email Us</span>
                </a>

              </div>
            </div>


            {template.fullDescription && (
              <div className="mb-10 text-slate-700 leading-relaxed text-base prose prose-slate">
                <h3 className="text-xl font-bold text-slate-900 mb-4">About the Template</h3>
                <p>{template.fullDescription}</p>
              </div>
            )}

            <div className="mb-10">
              <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                <Zap className="w-5 h-5 text-teal-500" />
                Core Features
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {template.features.map((feat, idx) => (
                  <div 
                    key={idx} 
                    className="bg-white/70 backdrop-blur-md border border-slate-200/60 p-4.5 rounded-2xl flex items-center gap-3.5 shadow-sm hover:scale-[1.02] hover:shadow-md transition-all duration-300 relative overflow-hidden group"
                  >
                    <div className="absolute top-0 left-0 w-[3px] h-full bg-gradient-to-b from-teal-500 to-indigo-500 opacity-60 group-hover:opacity-100 transition-opacity"></div>
                    <div className="bg-teal-50 text-teal-600 p-1.5 rounded-xl group-hover:bg-teal-500 group-hover:text-white transition-colors duration-300">
                      <Check size={14} className="stroke-[3px]" />
                    </div>
                    <span className="text-slate-800 font-bold text-sm leading-snug">{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white/60 backdrop-blur-xl rounded-2xl p-6 flex items-start gap-4 border border-teal-500/10 shadow-sm relative overflow-hidden group hover:border-teal-500/25 transition-colors">
              <div className="absolute top-0 left-0 w-[4px] h-full bg-gradient-to-b from-teal-500 to-emerald-400"></div>
              <ShieldCheck className="w-6 h-6 text-teal-600 shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-slate-900 mb-1 text-base">Guaranteed Premium Quality</h4>
                <p className="text-sm text-slate-600 leading-relaxed">
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
          className="mt-20 pt-16 border-t border-slate-200 relative z-10"
        >
          <div className="max-w-3xl">
            <h3 className="text-3xl font-extrabold text-slate-900 mb-8 flex items-center gap-3">
              User Reviews & Comments
              <span className="bg-teal-100 text-teal-700 text-xs font-extrabold py-1 px-3 rounded-full uppercase tracking-wider">3 Reviews</span>
            </h3>
            
            <div className="space-y-6 mb-12">
              {[
                { name: "Sarah Jenkins", role: "Agency Owner", date: "2 days ago", comment: "We used this template for a client last week and the conversion rates have already jumped by 22%. The code quality is absolutely pristine. Highly recommend!", grad: "from-pink-500 to-rose-500" },
                { name: "Marcus Torres", role: "Freelance Developer", date: "1 week ago", comment: "The design is gorgeous, but what really sold me was how easy it was to customize. The Tailwind structure is very logical. Saved me at least 40 hours of work.", grad: "from-blue-500 to-indigo-600" },
                { name: "Elena Rostova", role: "Marketing Director", date: "3 weeks ago", comment: "Beautiful animations and the responsive design works flawlessly on all devices we tested. Support was also very quick to answer a minor question I had.", grad: "from-emerald-400 to-teal-600" }
              ].map((review, i) => (
                <div 
                  key={i} 
                  className="bg-white/80 backdrop-blur-xl p-6 rounded-3xl shadow-sm border border-slate-200/60 flex gap-5 items-start hover:shadow-md hover:border-slate-300 transition-all duration-300"
                >
                  <div className={`w-12 h-12 bg-gradient-to-br ${review.grad} text-white rounded-full flex items-center justify-center font-black text-lg shrink-0 shadow-md`}>
                    {review.name.charAt(0)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center flex-wrap gap-2 mb-1">
                      <h4 className="font-bold text-slate-900 text-base">{review.name}</h4>
                      <span className="text-[10px] text-teal-700 bg-teal-50 border border-teal-150 px-2.5 py-0.5 rounded-full font-extrabold uppercase tracking-wider">{review.role}</span>
                    </div>
                    <div className="text-[11px] font-semibold text-slate-400 mb-3">{review.date}</div>
                    <p className="text-slate-700 text-sm leading-relaxed font-medium">{review.comment}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-white/80 backdrop-blur-xl p-8 rounded-[2rem] border border-slate-200/80 shadow-md">
              <h4 className="text-xl font-bold text-slate-950 mb-1">Leave a Reply</h4>
              <p className="text-xs text-slate-500 mb-6">Your email address will not be published. Required fields are marked *</p>
              <form className="space-y-5" onSubmit={(e) => { e.preventDefault(); alert("Thanks for your comment! It is pending moderation."); }}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-black uppercase tracking-wider text-slate-500 mb-2">Name *</label>
                    <input 
                      type="text" 
                      required 
                      className="w-full px-4 py-3 rounded-xl bg-slate-50/50 border border-slate-200 text-sm font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all" 
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-black uppercase tracking-wider text-slate-500 mb-2">Email *</label>
                    <input 
                      type="email" 
                      required 
                      className="w-full px-4 py-3 rounded-xl bg-slate-50/50 border border-slate-200 text-sm font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all" 
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-black uppercase tracking-wider text-slate-500 mb-2">Comment *</label>
                  <textarea 
                    required 
                    rows={4} 
                    className="w-full px-4 py-3 rounded-xl bg-slate-50/50 border border-slate-200 text-sm font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all resize-none"
                  ></textarea>
                </div>
                <button 
                  title="Post Comment" 
                  aria-label="Post Comment" 
                  type="submit" 
                  className="mt-2 w-full sm:w-auto bg-slate-900 hover:bg-teal-600 text-white font-bold py-3.5 px-8 rounded-xl transition-all shadow-md hover:scale-[1.01] transform"
                >
                  Post Comment
                </button>
              </form>
            </div>
          </div>
        </motion.div>
      </div>

      <DesignLab 
        template={template} 
        isOpen={isLabOpen} 
        onClose={() => setIsLabOpen(false)} 
      />
    </div>
  );
};

export default TemplateDetails;

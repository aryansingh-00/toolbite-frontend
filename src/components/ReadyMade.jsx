import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, ShoppingCart, Check } from 'lucide-react';
import { Link } from 'react-router-dom';
import api from '../services/api';

const ReadyMade = () => {
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTemplates();
  }, []);

  const fetchTemplates = async () => {
    try {
      const { data } = await api.get('/templates?status=active');
      setTemplates(data.slice(0, 8));
    } catch (error) {
      console.error("Failed to fetch templates:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="ready-made" className="py-24 bg-slate-50 relative">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-teal-600 font-semibold tracking-wide uppercase text-sm mb-3">Template Marketplace</h2>
          <h3 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6 tracking-tight">Launch Your Premium Website Today.</h3>
          <p className="text-lg text-slate-600">
            Browse our collection of high-converting, fully customized templates designed for specific industries. Install instantly, customize easily.
          </p>
        </div>

        {loading ? (
          <div className="flex flex-col justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600 mb-4"></div>
            <p className="text-slate-500 font-medium animate-pulse">Loading templates...</p>
          </div>
        ) : templates.length === 0 ? (
          <p className="text-center py-12 text-slate-500">No active templates available at the moment.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {templates.map((tpl, i) => (
              <motion.div
                key={tpl._id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="group bg-white rounded-3xl border border-slate-200 shadow-sm hover:shadow-2xl hover:shadow-slate-200/50 hover:border-teal-200 transition-all duration-300 flex flex-col overflow-hidden"
              >
                {/* Image Wrap (Real Database Display) */}
                <div className="aspect-[4/3] w-full relative bg-slate-100 overflow-hidden border-b border-slate-100">
                  <div className="absolute inset-0 bg-slate-900/5 group-hover:bg-transparent transition-colors duration-300 z-10"></div>
                  <img 
                    src={tpl.imageUrl} 
                    alt={tpl.title} 
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  
                  <div className="absolute top-4 left-4 z-20">
                    <span className="inline-block px-3 py-1 bg-white/95 backdrop-blur-sm text-xs font-extrabold text-slate-800 rounded-full shadow-sm uppercase tracking-wider">
                      {tpl.category}
                    </span>
                  </div>
                </div>
                
                {/* Card Content */}
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex justify-between items-start mb-3 gap-2">
                    <h4 className="text-xl font-bold text-slate-900 leading-tight">{tpl.title}</h4>
                    <span className="text-lg font-extrabold text-teal-700 bg-teal-50 px-3 py-1 rounded-lg shrink-0">${tpl.price}</span>
                  </div>
                  
                  <p className="text-slate-600 text-sm mb-5 h-10 line-clamp-2" title={tpl.shortDescription}>
                    {tpl.shortDescription}
                  </p>

                  <div className="space-y-3 mb-8 flex-1 pt-4 border-t border-slate-50">
                    {/* Map up to 4 features */}
                    {tpl.features && tpl.features.slice(0, 4).map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-3 text-sm text-slate-600 font-medium">
                        <Check size={16} className="text-emerald-500 mt-0.5 flex-shrink-0" />
                        <span className="leading-tight">{feat}</span>
                      </div>
                    ))}
                  </div>

                  {/* Buttons */}
                  <div className="grid grid-cols-2 gap-3 mt-auto pt-4 border-t border-slate-100">
                    <Link 
                      to={`/template/${tpl._id}`} 
                      className="flex items-center justify-center gap-2 py-3 rounded-xl bg-slate-50 text-slate-700 font-semibold text-sm hover:bg-slate-100 transition-colors border border-slate-200 hover:border-slate-300"
                    >
                      <ExternalLink size={16} />
                      Preview
                    </Link>
                    <a
                      href={`https://wa.me/919598037255?text=${encodeURIComponent(`Hi ToolBite! 👋\n\nI'm interested in purchasing the *${tpl.title}* template.\n\n📦 *Category:* ${tpl.category}\n💰 *Price:* $${tpl.price}\n\nCould you please guide me through the next steps?`)}`}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center justify-center gap-2 py-3 rounded-xl bg-slate-900 text-white font-semibold text-sm hover:bg-teal-600 transition-all shadow-md hover:shadow-teal-500/25"
                    >
                      <ShoppingCart size={16} />
                      Buy Now
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
        
        <div className="mt-16 text-center">
          <Link to="/templates" className="inline-flex items-center justify-center gap-2 px-10 py-5 rounded-full border-2 border-teal-100 bg-teal-50 text-teal-700 font-bold hover:bg-teal-600 hover:text-white hover:border-teal-600 transition-all">
            Explore All 50+ Templates
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ReadyMade;

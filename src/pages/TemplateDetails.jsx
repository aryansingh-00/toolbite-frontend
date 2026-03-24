import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ExternalLink, ShoppingCart, Check, ShieldCheck, Zap, Server } from 'lucide-react';
import api from '../services/api';

const TemplateDetails = () => {
  const { id } = useParams();
  const [template, setTemplate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchTemplate();
  }, [id]);

  const fetchTemplate = async () => {
    try {
      const { data } = await api.get(`/templates/${id}`);
      setTemplate(data);
    } catch (err) {
      console.error('Failed to load template:', err);
      setError('Template not found or an error occurred.');
    } finally {
      setLoading(false);
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
            <div className="relative group bg-white rounded-[2rem] p-2 border border-slate-200 shadow-xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-tr from-teal-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
              <img 
                src={template.imageUrl} 
                alt={template.title} 
                className="w-full h-auto aspect-[4/3] object-cover rounded-[1.5rem] transform transition-transform duration-700 hover:scale-[1.02]"
              />
              <div className="absolute top-6 left-6 flex gap-2">
                <span className="px-4 py-1.5 bg-white/90 backdrop-blur-md text-slate-800 text-xs font-black tracking-widest uppercase rounded-full shadow-sm">
                  {template.category}
                </span>
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
              <div className="text-4xl font-black text-teal-600">
                ${template.price}
              </div>
              <a
                href={`https://wa.me/919598037255?text=${encodeURIComponent(`Hi ToolBite! 👋\n\nI'm interested in purchasing the *${template.title}* template.\n\n📦 *Category:* ${template.category}\n💰 *Price:* $${template.price}\n\nCould you please guide me through the next steps?`)}`}
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
      </div>
    </div>
  );
};

export default TemplateDetails;

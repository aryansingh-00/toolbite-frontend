 
import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, ShoppingCart, Check } from 'lucide-react';
import { Link } from 'react-router-dom';
import staticTemplates from '../data/templates';
import TiltCard from './TiltCard';

const ReadyMade = () => {
  // Use the first 8 from static data — no backend required
  const templates = staticTemplates.slice(0, 8);

  return (
    <section id="ready-made" className="py-12 bg-slate-50 relative">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-teal-600 font-semibold tracking-wide uppercase text-sm mb-3">Template Marketplace</p>
          <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6 tracking-tight">Launch Your Premium Website Today.</h2>
          <p className="text-lg text-slate-600">
            Browse our collection of high-converting, fully customized templates designed for specific industries. Install instantly, customize easily.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {templates.map((tpl, i) => (
            <TiltCard key={tpl._id}>
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="group bg-white rounded-3xl border border-slate-200 shadow-sm hover:shadow-2xl hover:shadow-slate-200/50 hover:border-teal-200 transition-all duration-300 flex flex-col h-full overflow-hidden"
              >
                {/* Image */}
                <div className="aspect-[4/3] w-full relative bg-slate-100 overflow-hidden border-b border-slate-100">
                  <div className="absolute inset-0 bg-slate-900/5 group-hover:bg-transparent transition-colors duration-300 z-10" />
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
                  <div className="mb-3">
                    <h4 className="text-xl font-bold text-slate-900 leading-tight">{tpl.title}</h4>
                  </div>

                  <p className="text-slate-600 text-sm mb-5 h-10 line-clamp-2" title={tpl.shortDescription}>
                    {tpl.shortDescription}
                  </p>

                  <div className="space-y-3 mb-8 flex-1 pt-4 border-t border-slate-50">
                    {tpl.features && tpl.features.slice(0, 4).map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-3 text-sm text-slate-600 font-medium">
                        <Check size={16} className="text-emerald-500 mt-0.5 flex-shrink-0" />
                        <span className="leading-tight">{feat}</span>
                      </div>
                    ))}
                    {tpl.features && tpl.features.length > 4 && (
                      <div className="text-xs font-bold text-teal-600 pl-7">+ {tpl.features.length - 4} more features</div>
                    )}
                  </div>

                  {/* Buttons */}
                  <div className="grid grid-cols-2 gap-3 mt-auto pt-4 border-t border-slate-100">
                    <Link
                      to={`/template/${tpl._id}`}
                      className="flex items-center justify-center gap-2 py-3 rounded-xl bg-slate-50 text-slate-700 font-semibold text-sm hover:bg-slate-100 transition-colors border border-slate-200 hover:border-slate-300"
                    >
                      <ExternalLink size={16} />
                      Details
                    </Link>
                    <a
                      href={`https://wa.me/919598037255?text=${encodeURIComponent(`Hi ToolBite! 👋\n\nI'm interested in purchasing the *${tpl.title}* template.\n\n📦 *Category:* ${tpl.category}\n\nCould you please guide me through the next steps?`)}`}
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
            </TiltCard>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Link
            to="/templates"
            className="inline-flex items-center justify-center gap-2 px-10 py-5 rounded-full border-2 border-teal-100 bg-teal-50 text-teal-700 font-bold hover:bg-teal-600 hover:text-white hover:border-teal-600 transition-all"
          >
            Explore All 20 Templates →
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ReadyMade;

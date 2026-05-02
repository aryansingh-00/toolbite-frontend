import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, FileText, Star, Zap, Edit3, Eye, X 
} from 'lucide-react';

const TemplateGallery = ({ 
  setCurrentStep = () => {}, 
  setSelectedTemplate = () => {} 
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeStyleFilter, setActiveStyleFilter] = useState('All');
  const [activeExpFilter, setActiveExpFilter] = useState('All');
  const [previewModalOpen, setPreviewModalOpen] = useState(false);
  const [previewTemplate, setPreviewTemplate] = useState(null);

  const templatesList = [
    { id: 'minimalist', name: 'Minimal', desc: 'Optimized for Academic & Exec', style: 'Simple', exp: 'Experienced', isPopular: true, tags: ['ATS Friendly', 'Clean', 'Classic'] },
    { id: 'modern', name: 'Astral', desc: 'Optimized for Tech & Design', style: 'Creative', exp: 'Experienced', isRecommended: true, tags: ['Tech', 'Modern', 'Sleek'] },
    { id: 'corporate', name: 'Astralis', desc: 'Optimized for Finance & Law', style: 'Professional', exp: 'Experienced', tags: ['Finance', 'Law', 'Formal'] },
    { id: 'creative', name: 'Pulsar', desc: 'Optimized for Media & Arts', style: 'Creative', exp: 'Fresher', tags: ['Arts', 'Media', 'Vibrant'] },
    { id: 'elegant', name: 'Aura', desc: 'Optimized for Management', style: 'Professional', exp: 'Experienced', isPopular: true, tags: ['Management', 'Executive', 'Luxury'] },
    { id: 'developer', name: 'Eclipse', desc: 'Optimized for Engineers & OSS', style: 'Simple', exp: 'Fresher', tags: ['Engineering', 'Coding', 'GitHub'] }
  ];

  const filteredTemplates = templatesList.filter(t => {
    const matchSearch = t.name.toLowerCase().includes(searchQuery.toLowerCase()) || t.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchStyle = activeStyleFilter === 'All' || t.style === activeStyleFilter;
    const matchExp = activeExpFilter === 'All' || t.exp === activeExpFilter;
    return matchSearch && matchStyle && matchExp;
  });

  return (
    <motion.div key="templates" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="w-full bg-[#1e293b] min-h-screen pb-20 pt-8 overflow-y-auto">
      
      {/* Gallery Header & Navigation */}
      <div className="max-w-7xl mx-auto px-6 mb-12">
        <button onClick={() => setCurrentStep('choice')} className="flex items-center gap-2 text-slate-400 font-bold hover:text-white transition-colors mb-8">
          <ArrowLeft size={20} /> Back to Choice
        </button>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div>
            <h2 className="text-4xl font-black text-white mb-2">Template Gallery</h2>
            <p className="text-slate-400">Select a professionally designed template to get started.</p>
          </div>
          
          {/* Search Bar */}
          <div className="relative w-full md:w-72">
            <input 
              type="text" 
              placeholder="Search templates or tags..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-800/50 border border-slate-700 rounded-full px-6 py-3 pl-12 text-white placeholder:text-slate-500 focus:outline-none focus:border-teal-500 transition-colors"
            />
            <FileText className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="max-w-7xl mx-auto px-6 mb-12 flex flex-col md:flex-row gap-8 border-b border-slate-800 pb-8">
        <div className="space-y-3">
          <h4 className="text-xs font-black text-slate-500 uppercase tracking-widest">By Style</h4>
          <div className="flex flex-wrap gap-2">
            {['All', 'Simple', 'Creative', 'Professional'].map(style => (
              <button 
                key={style}
                onClick={() => setActiveStyleFilter(style)}
                className={`px-5 py-2 rounded-full text-sm font-bold transition-all ${activeStyleFilter === style ? 'bg-teal-500 text-white' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'}`}
              >
                {style}
              </button>
            ))}
          </div>
        </div>
        <div className="space-y-3">
          <h4 className="text-xs font-black text-slate-500 uppercase tracking-widest">By Experience Level</h4>
          <div className="flex flex-wrap gap-2">
            {['All', 'Fresher', 'Experienced'].map(exp => (
              <button 
                key={exp}
                onClick={() => setActiveExpFilter(exp)}
                className={`px-5 py-2 rounded-full text-sm font-bold transition-all ${activeExpFilter === exp ? 'bg-sky-500 text-white' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'}`}
              >
                {exp}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Template Grid */}
      <div className="max-w-7xl mx-auto px-6">
        {filteredTemplates.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-20 h-20 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-600"><FileText size={32} /></div>
            <h3 className="text-xl font-bold text-white mb-2">No templates found</h3>
            <p className="text-slate-400">Try adjusting your filters or search query.</p>
            <button onClick={() => { setSearchQuery(''); setActiveExpFilter('All'); setActiveStyleFilter('All'); }} className="mt-6 px-6 py-2 bg-slate-800 text-white rounded-full font-bold hover:bg-slate-700 transition-colors">Clear Filters</button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredTemplates.map((t) => (
              <div key={t.id} className="group relative bg-slate-900 rounded-[2rem] border border-slate-800 overflow-hidden hover:border-slate-600 transition-all shadow-xl">
                
                {/* Badges */}
                <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
                  {t.isPopular && <span className="px-3 py-1 bg-rose-500 text-white text-[10px] font-black uppercase tracking-widest rounded-full shadow-lg flex items-center gap-1"><Star size={10} /> Most Popular</span>}
                  {t.isRecommended && <span className="px-3 py-1 bg-amber-500 text-white text-[10px] font-black uppercase tracking-widest rounded-full shadow-lg flex items-center gap-1"><Zap size={10} /> Recommended</span>}
                </div>

                {/* Image Wrapper */}
                <div className="aspect-[1/1.4] w-full bg-slate-800 overflow-hidden relative">
                  <img src={`/images/templates/${t.id}.png`} alt={`${t.name} template`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  
                  {/* Hover Overlay Actions */}
                  <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-4 p-8">
                    <button 
                      onClick={() => {
                        setSelectedTemplate(t.id);
                        setCurrentStep('editor');
                      }}
                      className="w-full py-4 bg-teal-500 text-white font-black rounded-xl shadow-xl hover:bg-teal-400 transition-all flex items-center justify-center gap-2 transform translate-y-4 group-hover:translate-y-0 duration-300"
                    >
                      <Edit3 size={18} /> Use Template
                    </button>
                    <button 
                      onClick={() => {
                        setPreviewTemplate(t);
                        setPreviewModalOpen(true);
                      }}
                      className="w-full py-4 bg-white/10 text-white font-black rounded-xl hover:bg-white/20 transition-all flex items-center justify-center gap-2 transform translate-y-4 group-hover:translate-y-0 duration-300 delay-75"
                    >
                      <Eye size={18} /> Preview
                    </button>
                  </div>
                </div>

                {/* Card Footer */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-1">{t.name}</h3>
                  <p className="text-slate-400 text-sm mb-4">{t.desc}</p>
                  <div className="flex flex-wrap gap-2">
                    {t.tags.map(tag => (
                      <span key={tag} className="px-2.5 py-1 bg-slate-800 text-slate-300 text-xs rounded-md font-medium">{tag}</span>
                    ))}
                  </div>
                </div>

              </div>
            ))}
          </div>
        )}
      </div>

      {/* Full-Screen Preview Modal */}
      <AnimatePresence>
        {previewModalOpen && previewTemplate && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-slate-900/95 backdrop-blur-xl p-4 md:p-8 flex items-center justify-center overflow-y-auto"
          >
            <button 
              onClick={() => setPreviewModalOpen(false)} 
              aria-label="Close preview"
              className="absolute top-6 right-6 p-3 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors z-[110]"
            >
              <X size={24} />
            </button>

            <div className="max-w-6xl w-full flex flex-col lg:flex-row gap-8 items-center justify-center relative min-h-full py-12">
              <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.1 }} className="w-full max-w-2xl bg-white rounded-lg overflow-hidden shadow-2xl">
                <img src={`/images/templates/${previewTemplate.id}.png`} alt={previewTemplate.name} className="w-full h-auto" />
              </motion.div>

              <motion.div initial={{ x: 50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.2 }} className="w-full max-w-sm shrink-0 lg:sticky lg:top-20 text-center lg:text-left">
                <h2 className="text-5xl font-black text-white mb-2">{previewTemplate.name}</h2>
                <p className="text-xl text-teal-400 font-medium mb-8">{previewTemplate.desc}</p>
                
                <div className="space-y-6 mb-12">
                  <div>
                    <h4 className="text-slate-500 font-bold uppercase tracking-widest text-xs mb-3">Ideal For</h4>
                    <div className="flex flex-wrap justify-center lg:justify-start gap-2">
                      <span className="px-3 py-1.5 bg-slate-800 text-slate-300 rounded-lg text-sm">{previewTemplate.style} Style</span>
                      <span className="px-3 py-1.5 bg-slate-800 text-slate-300 rounded-lg text-sm">{previewTemplate.exp} Level</span>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-slate-500 font-bold uppercase tracking-widest text-xs mb-3">Features</h4>
                    <div className="flex flex-wrap justify-center lg:justify-start gap-2">
                      {previewTemplate.tags.map(tag => (
                        <span key={tag} className="px-3 py-1.5 bg-sky-500/10 text-sky-400 rounded-lg text-sm border border-sky-500/20">{tag}</span>
                      ))}
                    </div>
                  </div>
                </div>

                <button 
                  onClick={() => {
                    setSelectedTemplate(previewTemplate.id);
                    setPreviewModalOpen(false);
                    setCurrentStep('editor');
                  }}
                  className="w-full py-5 bg-teal-500 text-white font-black text-lg rounded-2xl shadow-[0_0_40px_rgba(20,184,166,0.3)] hover:bg-teal-400 hover:scale-105 transition-all"
                >
                  Start with {previewTemplate.name}
                </button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </motion.div>
  );
};

export default TemplateGallery;

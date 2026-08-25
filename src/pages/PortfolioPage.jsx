import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, ArrowRight } from 'lucide-react';
import { portfolioProjects } from '../data/content';
import TiltCard from '../components/TiltCard';
import SEO from '../components/SEO';
import OptimizedImage from '../components/OptimizedImage';
import { usePersona } from '../hooks/usePersona';
import { Link } from 'react-router-dom';

const PortfolioPage = () => {
  const projects = portfolioProjects;

  const { updatePersona } = usePersona();

  useEffect(() => {
    window.scrollTo(0, 0);
    updatePersona('custom');
  }, [updatePersona]);

  return (
    <div className="pt-24 pb-20 bg-slate-50 min-h-screen">
      <SEO 
        title="Our Portfolio | Featured Client Projects"
        description="Explore our elite collection of custom-built websites, mobile applications, and SaaS platforms engineered for high-performance brands."
        keywords="web design portfolio, client projects, SaaS development, mobile apps, digital agency work"
      />
      
      {/* Header */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-teal-600 font-bold tracking-widest uppercase text-sm mb-4"
          >
            Our Work
          </motion.p>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-black text-black mb-6 tracking-tight"
          >
            Explore All <span className="text-teal-500">Client Projects</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-black max-w-2xl mx-auto leading-relaxed"
          >
            A curated showcase of premium digital architectures we've engineered to help ambitious brands dominate their industries.
          </motion.p>
        </div>
      </section>

      {/* Grid */}
      <section className="px-4 pb-20">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, i) => (
              <TiltCard key={i}>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.05 }}
                  className="group flex flex-col bg-white border border-slate-200 rounded-3xl h-full overflow-hidden hover:shadow-2xl hover:shadow-teal-500/10 hover:border-teal-200 transition-all duration-500"
                >
                  {/* Image Thumbnail */}
                  <div className={`aspect-[4/3] w-full relative ${project.thumbnail ? 'bg-slate-100' : project.image} overflow-hidden`}>
                    {project.thumbnail ? (
                      <OptimizedImage 
                        src={project.thumbnail} 
                        alt={project.title} 
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                      />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center">
                         {project.isPlayStore ? (
                           <div className="space-y-3 flex flex-col items-center">
                             <div className="w-14 h-14 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center shadow-lg border border-white/30">
                               <svg className="w-8 h-8 fill-white" viewBox="0 0 24 24">
                                 <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L14.81,13.12L4.96,22.97C5.17,23 5.4,23 5.63,22.88L16.81,15.12M16.81,8.88L5.63,1.12C5.4,1 5.17,1 4.96,1.03L14.81,10.88L16.81,8.88M20.16,10.81C20.7,11.12 21,11.54 21,12C21,12.46 20.7,12.88 20.16,13.19L17.81,14.12L15.69,12L17.81,9.88L20.16,10.81Z" />
                               </svg>
                             </div>
                             <span className="text-white text-xs font-black uppercase tracking-widest bg-black/40 px-3 py-1 rounded-full border border-white/20">Google Play App</span>
                           </div>
                         ) : (
                           <p className="text-white/50 text-xs font-bold uppercase tracking-widest">Mockup Preview</p>
                         )}
                      </div>
                    )}
                    
                    {/* Play Store Tag Badge on Image */}
                    {project.isPlayStore && (
                      <div className="absolute top-4 left-4 bg-slate-950/90 text-amber-400 backdrop-blur-md px-3 py-1.5 rounded-xl border border-amber-500/30 text-[10px] font-black uppercase tracking-wider flex items-center gap-1.5 shadow-lg">
                        <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                          <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L14.81,13.12L4.96,22.97C5.17,23 5.4,23 5.63,22.88L16.81,15.12M16.81,8.88L5.63,1.12C5.4,1 5.17,1 4.96,1.03L14.81,10.88L16.81,8.88M20.16,10.81C20.7,11.12 21,11.54 21,12C21,12.46 20.7,12.88 20.16,13.19L17.81,14.12L15.69,12L17.81,9.88L20.16,10.81Z" />
                        </svg>
                        Play Store Live
                      </div>
                    )}

                    <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                        <a 
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-5 py-2.5 bg-white text-black font-bold rounded-full flex items-center gap-2 hover:scale-105 transition-transform shadow-xl text-xs uppercase tracking-wider"
                        >
                            {project.isPlayStore ? 'Get App on Play Store' : 'View Live Project'}
                            <ExternalLink size={16} />
                        </a>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-8 flex flex-col flex-1">
                    <div className="mb-4">
                      <span className="text-teal-600 font-bold text-[10px] tracking-widest uppercase mb-2 block">
                        {project.category}
                      </span>
                      <h4 className="text-xl font-bold text-black leading-tight group-hover:text-teal-600 transition-colors">{project.title}</h4>
                    </div>
                    
                    <p className="text-black text-sm leading-relaxed mb-6 flex-1">
                      {project.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-8">
                      {project.tags.slice(0, 4).map((tag, idx) => (
                        <span key={idx} className="px-3 py-1 bg-slate-50 border border-slate-100 text-slate-500 text-[10px] font-bold uppercase tracking-wider rounded-full">
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="mt-auto pt-6 border-t border-slate-50">
                      {project.isPlayStore ? (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full py-3 bg-gradient-to-r from-teal-500 to-emerald-500 text-slate-950 font-extrabold rounded-xl flex items-center justify-center gap-2 hover:from-teal-400 hover:to-emerald-400 transition-all text-xs uppercase tracking-wider shadow-md"
                        >
                          <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                            <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L14.81,13.12L4.96,22.97C5.17,23 5.4,23 5.63,22.88L16.81,15.12M16.81,8.88L5.63,1.12C5.4,1 5.17,1 4.96,1.03L14.81,10.88L16.81,8.88M20.16,10.81C20.7,11.12 21,11.54 21,12C21,12.46 20.7,12.88 20.16,13.19L17.81,14.12L15.69,12L17.81,9.88L20.16,10.81Z" />
                          </svg>
                          Download on Google Play
                          <ExternalLink size={14} />
                        </a>
                      ) : (
                        <Link
                          to={`/portfolio/${project.title.toLowerCase().replace(/\s+/g, '-')}`}
                          className="inline-flex items-center gap-2 text-black text-sm font-bold hover:text-teal-600 transition-colors group/btn"
                        >
                          View Case Study
                          <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
                        </Link>
                      )}
                    </div>
                  </div>
                </motion.div>
              </TiltCard>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-slate-900">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-5xl font-black text-white mb-8">Ready to build your <span className="text-teal-400 italic font-serif">next success?</span></h2>
          <p className="text-slate-400 text-lg mb-10">
            Join the ranks of these elite brands. Let's discuss your custom digital architecture.
          </p>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block"
          >
            <a
              href="/start-project"
              className="px-10 py-5 rounded-full bg-teal-500 text-black font-black text-lg hover:bg-teal-400 transition-all shadow-xl shadow-teal-500/20"
            >
              Start Your Project Now
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default PortfolioPage;

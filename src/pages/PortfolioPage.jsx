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
            className="text-4xl md:text-6xl font-black text-slate-900 mb-6 tracking-tight"
          >
            Explore All <span className="text-teal-500">Client Projects</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed"
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
                      <div className="w-full h-full flex items-center justify-center">
                         <p className="text-white/50 text-xs font-bold uppercase tracking-widest">Mockup Preview</p>
                      </div>
                    )}
                    
                    <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                        <a 
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-slate-900 hover:scale-110 transition-transform shadow-xl"
                        >
                            <ExternalLink size={20} />
                        </a>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-8 flex flex-col flex-1">
                    <div className="mb-4">
                      <span className="text-teal-600 font-bold text-[10px] tracking-widest uppercase mb-2 block">
                        {project.category}
                      </span>
                      <h4 className="text-xl font-bold text-slate-900 leading-tight group-hover:text-teal-600 transition-colors">{project.title}</h4>
                    </div>
                    
                    <p className="text-slate-600 text-sm leading-relaxed mb-6 flex-1">
                      {project.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-8">
                      {project.tags.slice(0, 3).map((tag, idx) => (
                        <span key={idx} className="px-3 py-1 bg-slate-50 border border-slate-100 text-slate-500 text-[10px] font-bold uppercase tracking-wider rounded-full">
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="mt-auto pt-6 border-t border-slate-50">
                      <Link
                        to={`/portfolio/${project.title.toLowerCase().replace(/\s+/g, '-')}`}
                        className="inline-flex items-center gap-2 text-slate-900 text-sm font-bold hover:text-teal-600 transition-colors group/btn"
                      >
                        View Case Study
                        <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
                      </Link>
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
              className="px-10 py-5 rounded-full bg-teal-500 text-slate-900 font-black text-lg hover:bg-teal-400 transition-all shadow-xl shadow-teal-500/20"
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

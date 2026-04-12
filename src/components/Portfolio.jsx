 
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { portfolioProjects } from '../data/content';
import TiltCard from './TiltCard';

const Portfolio = () => {
  const projects = portfolioProjects;

  return (
    <section id="portfolio" className="py-12 bg-white relative">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-teal-600 font-semibold tracking-wide uppercase text-sm mb-3">Our Work</h2>
          <h3 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6 tracking-tight">Featured Client Projects</h3>
          <p className="text-lg text-slate-600">
            Take a look at some of the premium websites and custom applications we've built for ambitious brands worldwide.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {projects.map((project, i) => (
            <TiltCard key={i}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group flex flex-col bg-white border border-slate-200 rounded-3xl h-full overflow-hidden hover:shadow-2xl hover:shadow-slate-200/50 hover:border-teal-200 transition-all duration-500"
              >
                {/* Image Thumbnail */}
                <div className={`aspect-[16/9] w-full relative ${project.thumbnail ? 'bg-slate-100' : project.image} overflow-hidden`}>
                  {project.thumbnail ? (
                    <img src={project.thumbnail} alt={project.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  ) : (
                    <>
                      <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-transparent transition-colors duration-500"></div>
                      
                      {/* Abstract Mockup Elements tailored to the project style */}
                      <div className={`absolute bottom-0 ${project.mockup === 'left' ? 'left-8' : project.mockup === 'right' ? 'right-8' : 'left-1/2 -translate-x-1/2'} w-3/4 h-5/6 bg-white/10 backdrop-blur-md rounded-t-xl border border-white/30 shadow-2xl transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 flex flex-col`}>
                        <div className="h-8 border-b border-white/20 flex items-center px-4 gap-1.5 opacity-70">
                          <div className="w-2.5 h-2.5 rounded-full bg-slate-100"></div>
                          <div className="w-2.5 h-2.5 rounded-full bg-slate-100"></div>
                          <div className="w-2.5 h-2.5 rounded-full bg-slate-100"></div>
                        </div>
                        <div className="flex-1 p-4 flex flex-col gap-3">
                          <div className="w-1/3 h-4 bg-white/20 rounded-md"></div>
                          <div className="flex gap-2">
                            <div className="w-1/2 h-20 bg-white/10 rounded-md"></div>
                            <div className="w-1/2 h-20 bg-white/10 rounded-md"></div>
                          </div>
                          <div className="w-full h-8 bg-white/10 rounded-md mt-auto"></div>
                        </div>
                      </div>
                    </>
                  )}
                  
                  <div className="absolute inset-0 bg-slate-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                  <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-slate-900 shadow-xl hover:scale-110 transition-transform cursor-pointer">
                      <ArrowUpRight size={24} />
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-8 flex flex-col flex-1">
                  <div className="mb-4">
                    <span className="text-teal-600 font-semibold text-sm tracking-wide uppercase mb-2 block">
                      {project.category}
                    </span>
                    <h4 className="text-2xl font-bold text-slate-900 leading-tight">{project.title}</h4>
                  </div>
                  
                  <p className="text-slate-600 leading-relaxed mb-6 flex-1">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-8">
                    {project.tags.map((tag, idx) => (
                      <span key={idx} className="px-3 py-1 bg-slate-50 border border-slate-200 text-slate-600 text-xs font-semibold uppercase tracking-wider rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="mt-auto pt-6 border-t border-slate-100">
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-slate-900 font-bold hover:text-teal-600 transition-colors group/btn"
                    >
                      View Live Project
                      <ArrowUpRight size={18} className="group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                    </a>
                  </div>
                </div>
              </motion.div>
            </TiltCard>
          ))}
        </div>

        <div className="mt-16 text-center">
          <button className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-slate-900 text-white font-bold hover:bg-teal-600 transition-all shadow-lg hover:shadow-teal-500/25">
            Discuss Your Custom Project
          </button>
        </div>
      </div>
    </section>
  );
};

export default Portfolio;


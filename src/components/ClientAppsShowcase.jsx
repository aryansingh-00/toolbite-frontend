import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Smartphone, Globe, Sparkles, Check, ArrowRight } from 'lucide-react';

const CATEGORIES = [
  { id: 'all', label: 'All Projects' },
  { id: 'mobile', label: 'Mobile Apps (Play Store)' },
  { id: 'web', label: 'Web Applications' },
  { id: 'ai', label: 'AI & SaaS' }
];

const SHOWCASE_PROJECTS = [
  {
    id: 'dailyspark',
    title: 'DailySpark — Motivation, Mindfulness & Quote Generator',
    category: 'mobile',
    categoryLabel: 'Live Android & Web App',
    isPlayStore: true,
    desc: 'DailySpark is a modern, high-performance daily motivation, mindfulness, and quote image generator app built for Android and Web. It features daily curated quotes, interactive image card creation, gamified user streaks & achievements, ambient soundscapes, and native mobile sharing.',
    tags: ['Daily Motivation', 'Quote Generator', 'Mindfulness', 'Android & Web', 'Ambient Soundscapes'],
    link: 'https://play.google.com/store/apps/details?id=com.aryansingh.dailyspark&pcampaignid=web_share',
    buttonText: 'Download on Google Play',
    bgGradient: 'from-amber-500 via-orange-600 to-red-600'
  },
  {
    id: 'stylekat',
    title: 'Stylekat Salon — Appointment Booking Platform',
    category: 'web',
    categoryLabel: 'Live Client Booking Ecosystem',
    isPlayStore: false,
    desc: 'An elegant, high-conversion booking ecosystem authored by Aryan Singh for Stylekat. Features real-time appointment scheduling, stylist slot management, and seamless client reservations.',
    tags: ['Booking Engine', 'Salon Platform', 'Custom UX', 'Live Domain'],
    link: 'https://stylekat.in/',
    buttonText: 'Visit Live Platform (stylekat.in)',
    bgGradient: 'from-pink-500 via-rose-500 to-red-500'
  },
  {
    id: 'bytesool',
    title: 'Bytesool — Software & AI Tool Builder',
    category: 'ai',
    categoryLabel: 'Live AI & Software Platform',
    isPlayStore: false,
    desc: 'A powerful, high-tech platform engineered by Aryan Singh for building cutting-edge software, apps, and AI tools. Features a robust architecture and sleek interface designed for enterprise-scale creation.',
    tags: ['AI Tool Builder', 'SaaS Platform', 'Software Dev', 'Live Domain'],
    link: 'https://www.bytesool.com/',
    buttonText: 'Visit Live Platform (bytesool.com)',
    bgGradient: 'from-indigo-900 via-blue-800 to-purple-900'
  },
  {
    id: 'nexus',
    title: 'Nexus Financial Operating System',
    category: 'web',
    categoryLabel: 'Fintech Web Application',
    isPlayStore: false,
    desc: 'A massively scalable banking interface engineered to process millions in daily transactional volume with absolute zero-latency analytics integration.',
    tags: ['SaaS Architecture', 'Dashboard UX', 'React/Node'],
    link: '/demos/nexus-finance/index.html',
    buttonText: 'View Demo Project',
    bgGradient: 'from-blue-900 via-indigo-800 to-blue-600'
  }
];

const ClientAppsShowcase = () => {
  const [activeTab, setActiveTab] = useState('all');

  const filteredProjects = activeTab === 'all' 
    ? SHOWCASE_PROJECTS 
    : SHOWCASE_PROJECTS.filter(p => p.category === activeTab);

  return (
    <section className="py-24 bg-white text-black relative overflow-hidden border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-900 text-white rounded-full text-xs font-bold uppercase tracking-widest mb-4">
            <Sparkles size={14} className="text-teal-400" />
            Verified Client Implementations
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-black tracking-tight mb-4">
            Featured Live <span className="text-teal-600">Client Projects</span>
          </h2>
          <p className="text-slate-600 text-base leading-relaxed">
            Real production applications engineered by ToolBite deployed on Google Play Store and active web domains.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {CATEGORIES.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-5 py-2.5 rounded-full text-xs font-bold tracking-wider uppercase transition-all ${
                activeTab === tab.id
                  ? 'bg-slate-900 text-white shadow-lg scale-105'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <AnimatePresence mode="wait">
            {filteredProjects.map((project, idx) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, delay: idx * 0.05 }}
                className="bg-slate-900 text-white rounded-3xl p-8 border border-slate-800 flex flex-col justify-between hover:shadow-2xl transition-all group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] font-black uppercase tracking-wider text-teal-400 bg-teal-500/10 border border-teal-500/20 px-3 py-1 rounded-full">
                      {project.categoryLabel}
                    </span>
                    {project.isPlayStore && (
                      <span className="text-[10px] font-bold text-amber-400 flex items-center gap-1">
                        <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                          <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L14.81,13.12L4.96,22.97C5.17,23 5.4,23 5.63,22.88L16.81,15.12M16.81,8.88L5.63,1.12C5.4,1 5.17,1 4.96,1.03L14.81,10.88L16.81,8.88M20.16,10.81C20.7,11.12 21,11.54 21,12C21,12.46 20.7,12.88 20.16,13.19L17.81,14.12L15.69,12L17.81,9.88L20.16,10.81Z" />
                        </svg>
                        Play Store App
                      </span>
                    )}
                  </div>

                  <h3 className="text-xl sm:text-2xl font-black text-white mb-3 tracking-tight group-hover:text-teal-400 transition-colors">
                    {project.title}
                  </h3>

                  <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-6">
                    {project.desc}
                  </p>

                  <div className="flex flex-wrap gap-1.5 mb-8">
                    {project.tags.map(tag => (
                      <span key={tag} className="text-[10px] font-bold text-slate-300 bg-white/10 px-2.5 py-1 rounded-md">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-800">
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold transition-all flex items-center justify-center gap-2 text-xs uppercase tracking-wider shadow-md group/btn"
                  >
                    {project.isPlayStore && (
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                        <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L14.81,13.12L4.96,22.97C5.17,23 5.4,23 5.63,22.88L16.81,15.12M16.81,8.88L5.63,1.12C5.4,1 5.17,1 4.96,1.03L14.81,10.88L16.81,8.88M20.16,10.81C20.7,11.12 21,11.54 21,12C21,12.46 20.7,12.88 20.16,13.19L17.81,14.12L15.69,12L17.81,9.88L20.16,10.81Z" />
                      </svg>
                    )}
                    <span>{project.buttonText}</span>
                    <ExternalLink size={14} className="group-hover/btn:translate-x-0.5 transition-transform" />
                  </a>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
};

export default ClientAppsShowcase;

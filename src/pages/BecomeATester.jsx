import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Sparkles, UserCheck, Smartphone, Send, ArrowRight, ExternalLink, Users, Download } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';

const BecomeATester = () => {
  return (
    <div className="pt-32 pb-24 bg-slate-950 text-white min-h-screen relative overflow-hidden">
      <SEO 
        title="Become a Tester | ToolBite Beta & QA Community"
        description="Join the ToolBite beta testing network. Access Google Groups tester link and download apps for testing."
        keywords="become a tester, beta testing, QA tester, mobile app testing, ToolBite tester, groot tester"
      />

      {/* Ambient Background Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-teal-500/10 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Badge & Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-teal-500/10 text-teal-400 font-bold text-xs uppercase tracking-widest mb-6 border border-teal-500/20"
          >
            <ShieldCheck size={14} />
            ToolBite QA & Beta Testing Community
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight leading-tight mb-6"
          >
            Become a <span className="text-teal-400">ToolBite Tester</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-slate-300 text-lg sm:text-xl leading-relaxed max-w-2xl mx-auto"
          >
            Join our official testing group, download pre-release mobile applications, and help us test, evaluate, and refine early-stage Android & iOS apps before public release.
          </motion.p>
        </div>

        {/* Step 1: Join Google Testing Group Card */}
        <div className="mb-12 bg-gradient-to-r from-slate-900 via-slate-900 to-slate-950 border border-teal-500/40 p-8 sm:p-10 rounded-3xl relative overflow-hidden shadow-2xl">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
            <div className="space-y-3 max-w-xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-teal-500/10 text-teal-400 rounded-full text-xs font-bold uppercase tracking-wider border border-teal-500/20">
                <Users size={14} /> Step 1: Join Official Google Group
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white">Join Groot Tester Group</h2>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                Join our Google Group to get official closed testing permissions on Google Play Store for our pre-release mobile apps.
              </p>
              <a 
                href="https://groups.google.com/g/groot-tester" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-teal-400 text-xs sm:text-sm font-mono break-all hover:underline block"
              >
                https://groups.google.com/g/groot-tester
              </a>
            </div>

            <a
              href="https://groups.google.com/g/groot-tester"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full md:w-auto px-8 py-4 rounded-2xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-extrabold text-xs uppercase tracking-wider transition-all shadow-xl flex items-center justify-center gap-2 shrink-0"
            >
              Join Google Group <ExternalLink size={16} />
            </a>
          </div>
        </div>

        {/* Step 2: Apps Available for Testing Section */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-400">
              <Smartphone size={20} />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">Apps Available for Testing</h2>
              <p className="text-slate-400 text-xs sm:text-sm">Download pre-release builds and test new features on your device.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* App Card 1: DailySpark */}
            <div className="bg-slate-900/80 backdrop-blur-xl border border-slate-800 p-6 sm:p-8 rounded-3xl flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] font-black uppercase tracking-wider text-teal-400 bg-teal-500/10 border border-teal-500/20 px-3 py-1 rounded-full">
                    Active Android App
                  </span>
                  <span className="text-xs text-slate-400 font-medium">v1.0</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">DailySpark — Motivation App</h3>
                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-6">
                  Test daily curated motivation quotes, interactive image card generator, mindfulness soundscapes, and streak achievements.
                </p>
              </div>

              <a
                href="https://play.google.com/store/apps/details?id=com.aryansingh.dailyspark&pcampaignid=web_share"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-teal-400 font-bold text-xs uppercase tracking-wider transition-all border border-slate-700 flex items-center justify-center gap-2"
              >
                <Download size={16} /> Test DailySpark on Play Store
              </a>
            </div>

            {/* App Card 2: MedAlert Beta Test */}
            <div className="bg-slate-900/80 backdrop-blur-xl border border-teal-500/40 p-6 sm:p-8 rounded-3xl flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] font-black uppercase tracking-wider text-teal-400 bg-teal-500/10 border border-teal-500/20 px-3 py-1 rounded-full">
                    Active Beta Test
                  </span>
                  <span className="text-xs text-slate-400 font-medium">medalert</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">MedAlert — Health Reminder</h3>
                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-6">
                  Test pill reminders, health notification triggers, recurring dosage alerts, and user health schedule tracking.
                </p>
              </div>

              <a
                href="https://play.google.com/apps/testing/com.aryansingh.medalert"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-lg"
              >
                <Download size={16} /> Join MedAlert Beta Test
              </a>
            </div>

            {/* App Card 3: Neon Snake */}
            <div className="bg-slate-900/80 backdrop-blur-xl border border-purple-500/40 p-6 sm:p-8 rounded-3xl flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] font-black uppercase tracking-wider text-purple-400 bg-purple-500/10 border border-purple-500/20 px-3 py-1 rounded-full">
                    Active Android Game
                  </span>
                  <span className="text-xs text-slate-400 font-medium">neonsnake</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Neon Snake — Arcade Game</h3>
                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-6">
                  Test high-speed retro arcade snake mechanics, vibrant neon visual themes, touch controls, and high-score rankings.
                </p>
              </div>

              <a
                href="https://play.google.com/store/apps/details?id=com.aistudio.neonsnake.qrvxkp"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-lg"
              >
                <Download size={16} /> Download & Test Neon Snake
              </a>
            </div>

          </div>
        </div>

        {/* Support & Email Contact Section */}
        <div className="bg-slate-900/60 border border-slate-800 p-8 rounded-3xl text-center space-y-4">
          <h3 className="text-xl font-bold text-white">Need Help or Have Bug Reports?</h3>
          <p className="text-slate-300 text-sm max-w-xl mx-auto leading-relaxed">
            Send bug reports, screenshots, or feedback directly to our engineering team at <a href="mailto:hello.toolbite@gmail.com" className="text-teal-400 font-bold underline">hello.toolbite@gmail.com</a>.
          </p>
          <div className="pt-2">
            <a
              href="mailto:hello.toolbite@gmail.com?subject=Tester%20Feedback%20-%20ToolBite"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs uppercase tracking-wider border border-slate-700 transition-all"
            >
              Send Tester Feedback <Send size={14} />
            </a>
          </div>
        </div>

      </div>
    </div>
  );
};

export default BecomeATester;

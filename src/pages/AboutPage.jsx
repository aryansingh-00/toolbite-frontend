import React, { useEffect } from 'react';
import { Target, Users, Zap, Award, BarChart3, Globe, ShieldCheck, Heart, Handshake } from 'lucide-react';
import { Link } from 'react-router-dom';
import teamImg from '../assets/team_identity.png';
import SEO from '../components/SEO';

const AboutPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-[1400px] mx-auto min-h-screen">
      <SEO 
        title="About ToolBite — Premier Web Design & Strategy Agency"
        description="Discover ToolBite's mission to architect the future of digital innovation. Explore our high-performance engineering philosophy, design-first mindset, and our commitment to building elite digital assets."
        keywords="about toolbite, web design story, premium digital agency india, architectural web development"
      />
      
      <div className="text-center mb-24">
        <div className="inline-flex items-center gap-2 bg-teal-50 text-teal-800 font-bold px-4 py-1.5 rounded-full text-xs uppercase tracking-widest mb-6">
          Architectural Precision
        </div>
        <h1 className="text-4xl md:text-5xl lg:text-7xl font-black text-slate-900 mb-8 tracking-tight">
          Architecting the Future of <span className="text-teal-500">Digital Innovation</span>
        </h1>
        <p className="text-xl text-slate-600 max-w-3xl mx-auto font-medium leading-relaxed">
          At ToolBite, we don't just build websites; we engineer digital assets that serve as the foundation for your brand's global expansion.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-32">
        <div className="order-2 lg:order-1">
          <h2 className="text-4xl font-black text-slate-900 mb-8">The ToolBite Genesis</h2>
          <div className="space-y-6 text-lg text-slate-600 font-medium leading-relaxed">
            <p>
              Founded in 2026 by <strong>Aryan Singh</strong>, ToolBite emerged from a glaring gap in the market: the divide between aesthetic beauty and technical performance. Most agencies offered one or the other; we decided to pioneer both.
            </p>
            <p>
              What started as a vision by Aryan Singh in New Delhi has evolved into a full-scale architectural digital agency. Our name, ToolBite, signifies our dual approach—providing the tools businesses need to succeed and the "bite" or competitive edge required to dominate their market.
            </p>
            <p>
              We specialize in high-performance React frameworks, native and cross-platform mobile apps, server-side rendering, and ultra-fast deployment cycles. Every template in our vault and every custom project we undertake is subjected to rigorous SEO and Core Web Vitals auditing before it ever reaches a client.
            </p>
          </div>
        </div>
        <div className="order-1 lg:order-2 relative px-6 md:px-0">
          <div className="aspect-square md:aspect-[4/5] rounded-[48px] overflow-hidden shadow-2xl rotate-2 hover:rotate-0 transition-transform duration-700">
            <img 
              src={teamImg} 
              alt="ToolBite Team High-Five" 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-teal-500/20 rounded-full blur-3xl -z-10"></div>
          <div className="absolute top-10 -left-10 w-48 h-48 bg-emerald-500/10 rounded-full blur-2xl -z-10"></div>
        </div>
      </div>

      {/* Partner CTA Section (from Image) */}
      <div className="bg-[#0f172a] rounded-[48px] overflow-hidden relative mb-32 shadow-2xl">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-blue-500/10 via-transparent to-transparent" />
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-3/5 p-8 md:p-16 lg:p-24 relative z-10">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-6">Not a developer?</h2>
            <p className="text-lg md:text-xl text-slate-400 font-medium mb-10 leading-relaxed">
              View the Partner Showcase to find a partner tailored to fit your business needs.
            </p>
            <Link to="/partners" className="inline-flex px-10 py-5 rounded-full bg-[#0070f3] text-white font-bold text-lg hover:bg-blue-600 transition-all shadow-xl shadow-blue-500/25">
              Find a partner
            </Link>
          </div>
          <div className="md:w-2/5 relative h-[300px] md:h-[500px] w-full bg-gradient-to-br from-indigo-500/20 to-purple-500/20 flex items-center justify-center">
             <div className="relative">
               <div className="absolute inset-0 bg-white/10 rounded-full blur-3xl" />
               <Handshake size={120} className="text-blue-500/80 relative z-10" strokeWidth={1} />
             </div>
          </div>
        </div>
      </div>

      <div className="mb-32">
        <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-16">
          <div className="max-w-2xl">
            <h2 className="text-4xl font-black text-slate-900 mb-4">Core Philosophy</h2>
            <p className="text-xl text-slate-600 font-medium">The four pillars that define every ToolBite project.</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { icon: <Target className="w-8 h-8 text-teal-600" />, title: "Market Intent", desc: "We study your competitors and audience before writing a single line of code." },
            { icon: <ShieldCheck className="w-8 h-8 text-teal-600" />, title: "Enterprise Security", desc: "Robust data protection and standard compliance are built-in from day one." },
            { icon: <BarChart3 className="w-8 h-8 text-teal-600" />, title: "Conversion DNA", desc: "Beautiful design is useless unless it guides users toward your business goals." },
            { icon: <Globe className="w-8 h-8 text-teal-600" />, title: "Global Scaling", desc: "Our infrastructure is built to handle traffic from 1 to 1 million users seamlessly." }
          ].map((item, i) => (
            <div key={i} className="bg-white p-10 rounded-[32px] shadow-xl shadow-slate-200/40 border border-slate-100 hover:border-teal-500/30 transition-all group">
              <div className="w-16 h-16 bg-teal-50 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                {item.icon}
              </div>
              <h3 className="text-2xl font-black text-slate-900 mb-4">{item.title}</h3>
              <p className="text-slate-500 font-medium leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-slate-900 rounded-[50px] p-12 md:p-24 text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-teal-500/20 via-transparent to-transparent" />
        <Heart className="w-16 h-16 text-teal-500 mx-auto mb-10 animate-pulse" />
        <h2 className="text-3xl md:text-5xl font-black text-white mb-8">Our Commitment to Excellence</h2>
        <p className="text-xl text-slate-400 font-bold max-w-3xl mx-auto leading-relaxed mb-12">
          We don't settle for "good enough." Every project that leaves the ToolBite studio must pass our rigorous 50-point quality check spanning accessibility, performance, and cross-browser resilience.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <div className="px-6 py-2 rounded-full border border-slate-700 text-slate-300 font-bold text-sm">99+ Google PageSpeed</div>
          <div className="px-6 py-2 rounded-full border border-slate-700 text-slate-300 font-bold text-sm">W3C Compliant</div>
          <div className="px-6 py-2 rounded-full border border-slate-700 text-slate-300 font-bold text-sm">SEO Optimized</div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;

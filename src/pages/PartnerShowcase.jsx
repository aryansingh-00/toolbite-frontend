import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Handshake, Users, Globe, Zap, ArrowRight, Mail, Phone, MapPin, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';

const PartnerShowcase = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const partners = [
    {
      name: "Stellar Design Systems",
      type: "Creative Agency",
      desc: "Specializing in high-fidelity brand identities and interactive web experiences.",
      tags: ["UI/UX", "Branding", "Webflow"],
      logo: "https://images.unsplash.com/photo-1572044162444-ad60f128bdea?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    },
    {
      name: "Quantum Cloud Ops",
      type: "Technical Partner",
      desc: "Architecting scalable cloud infrastructure and secure API integrations.",
      tags: ["DevOps", "Security", "AWS"],
      logo: "https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    },
    {
      name: "Vanguard Marketing",
      type: "Growth Partner",
      desc: "Data-driven growth strategies and SEO optimization for global brands.",
      tags: ["SEO", "Analytics", "Strategy"],
      logo: "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    }
  ];

  return (
    <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-[1400px] mx-auto min-h-screen">
      <SEO 
        title="Partner Showcase | Elite Network of Digital Architects | ToolBite"
        description="Connect with ToolBite's vetted network of creative and technical partners. Find the right agency tailored to fit your specific business needs."
        keywords="partner showcase, digital agencies, web design partners, technical consultants, growth partners"
      />

      {/* Hero Section */}
      <div className="text-center mb-24">
        <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 font-bold px-4 py-1.5 rounded-full text-xs uppercase tracking-widest mb-6 border border-blue-100">
          <Handshake size={14} /> The Elite Network
        </div>
        <h1 className="text-5xl md:text-7xl font-black text-slate-900 mb-8 tracking-tight">
          Find Your Perfect <span className="text-blue-600">Growth Partner</span>
        </h1>
        <p className="text-xl text-slate-600 max-w-2xl mx-auto font-medium leading-relaxed">
          We've curated a global network of digital architects, technical consultants, and creative specialists tailored to fit your business goals.
        </p>
      </div>

      {/* Partners Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-32">
        {partners.map((partner, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="group bg-white rounded-[40px] overflow-hidden border border-slate-100 shadow-xl shadow-slate-200/40 hover:border-blue-500/30 transition-all flex flex-col"
          >
            <div className="relative aspect-video overflow-hidden">
              <img src={partner.logo} alt={partner.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute top-4 left-4">
                <span className="bg-slate-900/90 backdrop-blur-md text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest">
                  {partner.type}
                </span>
              </div>
            </div>
            <div className="p-8 flex-grow">
              <h3 className="text-2xl font-black text-slate-900 mb-4">{partner.name}</h3>
              <p className="text-slate-500 font-medium mb-6 leading-relaxed">{partner.desc}</p>
              <div className="flex flex-wrap gap-2 mb-8">
                {partner.tags.map(tag => (
                  <span key={tag} className="px-3 py-1 bg-slate-50 text-slate-500 text-[10px] font-black rounded-lg uppercase tracking-wider">{tag}</span>
                ))}
              </div>
              <button className="w-full py-4 rounded-2xl bg-slate-950 text-white font-bold hover:bg-blue-600 transition-all flex items-center justify-center gap-2">
                View Profile <ArrowRight size={18} />
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Call to Action Banner (Design from Image) */}
      <div className="bg-[#0f172a] rounded-[48px] overflow-hidden relative mb-32 shadow-2xl">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-blue-500/10 via-transparent to-transparent" />
        <div className="flex flex-col lg:flex-row items-center">
          <div className="lg:w-1/2 p-12 lg:p-24 relative z-10">
            <h2 className="text-4xl md:text-5xl font-black text-white mb-6">Not a developer?</h2>
            <p className="text-xl text-slate-400 font-medium mb-10 leading-relaxed">
              View the Partner Showcase to find a partner tailored to fit your business needs.
            </p>
            <button className="px-10 py-5 rounded-full bg-[#0070f3] text-white font-bold text-lg hover:bg-blue-600 transition-all shadow-xl shadow-blue-500/25">
              Become a partner
            </button>
          </div>
          <div className="lg:w-1/2 relative min-h-[400px] w-full bg-gradient-to-br from-indigo-500/20 to-purple-500/20 flex items-center justify-center">
             {/* Simple Abstract Handshake Illustration */}
             <div className="relative w-64 h-64">
               <motion.div 
                 animate={{ scale: [1, 1.05, 1], rotate: [0, 2, 0] }}
                 transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                 className="absolute inset-0 bg-white/10 rounded-full blur-3xl" 
               />
               <Handshake size={160} className="text-blue-500/80 mx-auto relative z-10" strokeWidth={1} />
             </div>
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        <div>
          <h2 className="text-4xl font-black text-slate-900 mb-8">Let's Build the <span className="text-blue-600">Future Together.</span></h2>
          <p className="text-xl text-slate-500 font-medium mb-12 leading-relaxed">
            Whether you're looking for a partner or want to join our elite network, our team is here to engineer the connection.
          </p>
          <div className="space-y-8">
            <div className="flex items-start gap-6">
              <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center shrink-0">
                <Mail className="text-blue-600" size={24} />
              </div>
              <div>
                <p className="text-sm font-black text-slate-400 uppercase tracking-widest mb-1">Email Our Ecosystem</p>
                <a href="mailto:partners@toolbite.io" className="text-2xl font-bold text-slate-900 hover:text-blue-600 transition-colors">partners@toolbite.io</a>
              </div>
            </div>
            <div className="flex items-start gap-6">
              <div className="w-14 h-14 bg-emerald-50 rounded-2xl flex items-center justify-center shrink-0">
                <Phone className="text-emerald-600" size={24} />
              </div>
              <div>
                <p className="text-sm font-black text-slate-400 uppercase tracking-widest mb-1">Global Support</p>
                <a href="tel:+919598037255" className="text-2xl font-bold text-slate-900 hover:text-emerald-600 transition-colors">+91 9598037255</a>
              </div>
            </div>
            <div className="flex items-start gap-6">
              <div className="w-14 h-14 bg-indigo-50 rounded-2xl flex items-center justify-center shrink-0">
                <MapPin className="text-indigo-600" size={24} />
              </div>
              <div>
                <p className="text-sm font-black text-slate-400 uppercase tracking-widest mb-1">India Headquarters</p>
                <p className="text-2xl font-bold text-slate-900">Aryan Singh, New Delhi, IN</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white p-12 rounded-[48px] border border-slate-100 shadow-2xl shadow-slate-200/50">
          <form className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-black text-slate-900 uppercase tracking-widest">Full Name</label>
                <input type="text" placeholder="John Doe" className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 font-bold" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-black text-slate-900 uppercase tracking-widest">Company</label>
                <input type="text" placeholder="Acme Corp" className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 font-bold" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-black text-slate-900 uppercase tracking-widest">Inquiry Type</label>
              <select className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 font-bold appearance-none">
                <option>Looking for a Partner</option>
                <option>Apply to Join Network</option>
                <option>Other Inquiry</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-black text-slate-900 uppercase tracking-widest">Message</label>
              <textarea rows="4" placeholder="Tell us about your project or agency..." className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 font-bold resize-none"></textarea>
            </div>
            <button className="w-full py-5 rounded-2xl bg-blue-600 text-white font-black uppercase tracking-widest hover:bg-blue-700 transition-all shadow-xl shadow-blue-500/25">
              Submit Inquiry
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PartnerShowcase;

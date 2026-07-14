import React, { useEffect } from 'react';
import { Target, Users, Zap, Award, BarChart3, Globe, ShieldCheck, Heart, Handshake, BookOpen, ShieldAlert, BadgeCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import teamImg from '../assets/team_identity.png';
import SEO from '../components/SEO';

const AboutPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#030712] transition-colors duration-300 relative overflow-hidden">
      {/* Background Decorative Blur Blobs */}
      <div className="absolute top-20 -left-20 w-[600px] h-[600px] bg-teal-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-20 -right-20 w-[600px] h-[600px] bg-indigo-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-[1400px] mx-auto relative z-10">
        <SEO 
          title="About ToolBite | Our Mission, Vision & Expert Team"
          description="Discover the story behind ToolBite. Learn how our expert team delivers cutting-edge web, app, and AI solutions to empower your brand. Meet us today!"
          keywords="about ToolBite"
        />
        
        {/* Header Hero */}
        <div className="text-center mb-24 max-w-5xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-teal-50 dark:bg-teal-950/30 text-teal-800 dark:text-teal-400 font-bold px-4 py-1.5 rounded-full text-xs uppercase tracking-widest mb-6 border border-teal-100 dark:border-teal-900/50">
            Architectural Precision & Trust
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-black text-black dark:text-white mb-8 tracking-tight">
            Architecting the Future of <span className="text-teal-500">Digital Innovation</span>
          </h1>
          <p className="text-xl text-black/80 dark:text-slate-400 max-w-4xl mx-auto font-medium leading-relaxed">
            At ToolBite, we don't just build websites; we engineer secure, fast, and high-converting digital assets that serve as the foundation for your brand's global expansion.
          </p>
        </div>

        {/* Narrative Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-32">
          <div className="order-2 lg:order-1">
            <h2 className="text-3xl md:text-4xl font-black text-black dark:text-white mb-8 border-l-4 border-teal-500 pl-4">The ToolBite Genesis</h2>
            <div className="space-y-6 text-base text-slate-700 dark:text-slate-400 font-medium leading-relaxed">
              <p>
                Founded in 2026 by senior software engineer and UI architect <strong>Aryan Singh</strong>, ToolBite emerged from a glaring gap in the market: the divide between aesthetic beauty and technical performance. Most web agencies offered visually striking designs that loaded slowly and ranked poorly, or fast websites that lacked brand soul and user engagement. We decided to pioneer both.
              </p>
              <p>
                What started as a digital studio in New Delhi has evolved into a global utility power center and architectural agency. Our name, ToolBite, signifies our dual approach: providing the free, secure utility tools developers and creators need for daily workflows, combined with the technical "bite" or competitive edge required for businesses to dominate search engine results and market conversions.
              </p>
              <p>
                We specialize in high-performance React frameworks, server-side pre-compilation, WebAssembly, and local edge processing. Every template in our vault, article on our blog, and utility in our tool center is subjected to a rigorous 50-point checklist before release, guaranteeing peak core web vitals and compliant accessibility standards.
              </p>
            </div>
          </div>
          <div className="order-1 lg:order-2 relative px-6 md:px-0">
            <div className="aspect-square md:aspect-[4/5] rounded-[48px] overflow-hidden shadow-2xl rotate-2 hover:rotate-0 transition-transform duration-700 bg-white">
              <img 
                src={teamImg} 
                alt="ToolBite Team High-Five" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-teal-500/10 rounded-full blur-3xl -z-10"></div>
            <div className="absolute top-10 -left-10 w-48 h-48 bg-emerald-500/5 rounded-full blur-2xl -z-10"></div>
          </div>
        </div>

        {/* Detailed Engineering Stack & E-E-A-T Framework Section */}
        <div className="mb-32">
          <h2 className="text-3xl md:text-4xl font-black text-black dark:text-white mb-12 text-center">Our Technical Infrastructure & E-E-A-T Compliance</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="bg-white dark:bg-slate-900 p-8 md:p-12 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-sm">
              <h3 className="text-2xl font-bold text-black dark:text-white mb-6 flex items-center gap-3">
                <Zap className="text-teal-500" /> Technology Stack & Sandboxing
              </h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
                Most online tools process user data by uploading documents and files to remote servers, exposing users to security breaches and database leaks. At ToolBite, we architected our platform to run <strong>locally inside the user's browser sandbox</strong>.
              </p>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
                Utilizing client-side memory execution and WebAssembly modules, files such as PDFs, images, and text inputs are parsed entirely within your browser's local RAM. Your data never touches our servers. To ensure lightning-fast loading speeds, our entire site is compiled statically using Puppeteer prerendering and deployed on global Edge CDNs, bypassing server latency completely.
              </p>
              <ul className="space-y-3 text-slate-700 dark:text-slate-400 font-semibold text-sm">
                <li className="flex items-center gap-2.5"><BadgeCheck className="text-teal-500" size={16} /> Client-side RAM sandboxing for all 29 tools.</li>
                <li className="flex items-center gap-2.5"><BadgeCheck className="text-teal-500" size={16} /> Decoupled React / Vite SPA architecture.</li>
                <li className="flex items-center gap-2.5"><BadgeCheck className="text-teal-500" size={16} /> Puppeteer static route pre-compilation (SEO ready).</li>
              </ul>
            </div>

            <div className="bg-white dark:bg-slate-900 p-8 md:p-12 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-sm">
              <h3 className="text-2xl font-bold text-black dark:text-white mb-6 flex items-center gap-3">
                <Award className="text-teal-500" /> High-Authority E-E-A-T Framework
              </h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
                Google's Search Quality Evaluator Guidelines prioritize Experience, Expertise, Authoritativeness, and Trustworthiness (E-E-A-T). We actively align our platform with these benchmarks:
              </p>
              <div className="space-y-4 text-slate-700 dark:text-slate-400 text-sm leading-relaxed">
                <p>
                  <strong>Experience & Expertise:</strong> Led by founder Aryan Singh, our engineering team brings years of hands-on experience in full-stack React systems, conversion rate optimization, and web accessibility.
                </p>
                <p>
                  <strong>Authoritativeness:</strong> Every template and utility tool is peer-reviewed, open-source audited, and rigorously tested against Google PageSpeed benchmarks to meet the highest market standards.
                </p>
                <p>
                  <strong>Trustworthiness:</strong> ToolBite is built on a transparent data protocol. We have a clear Privacy Policy, Terms of Service, Cookie Policy, and Disclaimer. Our local edge processing model guarantees that user privacy is protected by default.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Pillars Section */}
        <div className="mb-32">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-black text-black dark:text-white mb-4">Core Philosophy</h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 font-medium">The four pillars that define every ToolBite project and resource.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: <Target className="w-8 h-8 text-teal-600" />, title: "Market Intent", desc: "We study your competitors and audience before writing a single line of code, ensuring each design has strategic business alignment." },
              { icon: <ShieldCheck className="w-8 h-8 text-teal-600" />, title: "Privacy First", desc: "Robust client-side encryption and standard-compliant data handling are built into all ToolBite modules by default." },
              { icon: <BarChart3 className="w-8 h-8 text-teal-600" />, title: "Conversion DNA", desc: "Aesthetic appeal is only half the battle. We architect visual user paths that guide visitors toward your commercial business goals." },
              { icon: <Globe className="w-8 h-8 text-teal-600" />, title: "Global Scaling", desc: "Our pre-rendered static assets are optimized to handle massive traffic volume seamlessly on high-performance Edge networks." }
            ].map((item, i) => (
              <div key={i} className="bg-white dark:bg-slate-900 p-10 rounded-[32px] shadow-xl shadow-slate-200/40 dark:shadow-none border border-slate-100 dark:border-slate-800 hover:border-teal-500/30 transition-all group">
                <div className="w-16 h-16 bg-teal-50 dark:bg-teal-900/20 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                  {item.icon}
                </div>
                <h3 className="text-2xl font-black text-black dark:text-white mb-4">{item.title}</h3>
                <p className="text-slate-500 dark:text-slate-400 font-medium leading-relaxed text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* FAQs Section (AdSense Value addition) */}
        <div className="mb-32 max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-black text-black dark:text-white mb-12 text-center">Frequently Asked Questions</h2>
          <div className="space-y-6">
            <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800">
              <h4 className="text-lg font-bold text-black dark:text-white mb-3">How does ToolBite guarantee PageSpeed performance?</h4>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm">
                We achieve near-perfect performance scores (95+ LCP/CLS) by decoupling the presentation layer from the database, pre-rendering React components via Puppeteer build hooks, serving assets over Vercel Edge CDNs, and optimizing images using automatic compression pipelines.
              </p>
            </div>
            
            <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800">
              <h4 className="text-lg font-bold text-black dark:text-white mb-3">Are my documents and files safe when using ToolBite's utility tools?</h4>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm">
                Yes, absolutely. Unlike other online tools that process file uploads on third-party cloud servers, ToolBite utilizes browser-native sandboxing. All text calculations, image compressions, and PDF conversions run inside your local browser's memory. Your files are never uploaded to our servers and are completely secure.
              </p>
            </div>

            <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800">
              <h4 className="text-lg font-bold text-black dark:text-white mb-3">Can I customize the ready-made templates in the vault?</h4>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm">
                Yes. Our ready-made templates are built using modular CSS variables and Tailwind configuration parameters. This separates the design structures from the layout styles, letting you update colors, typography, brand assets, and custom sections in minutes without modifying the underlying high-performance codebase.
              </p>
            </div>

            <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800">
              <h4 className="text-lg font-bold text-black dark:text-white mb-3">What kind of support is included with template purchases?</h4>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm">
                All template purchases include 6 months of free technical updates, licensing documentation, access to our development vault, and direct email troubleshooting support with our Delhi-based engineering staff.
              </p>
            </div>

            <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800">
              <h4 className="text-lg font-bold text-black dark:text-white mb-3">Do you provide custom app store deployment services?</h4>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm">
                Yes. When ordering custom mobile app development (iOS and Android), our agency scoping includes full support for Apple App Store Connect and Google Play Console publishing compliance, ensuring your product meets all review guidelines for immediate approval.
              </p>
            </div>
          </div>
        </div>

        {/* Commitment Banner */}
        <div className="bg-slate-900 rounded-[50px] p-12 md:p-24 text-center relative overflow-hidden shadow-2xl">
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
    </div>
  );
};

export default AboutPage;

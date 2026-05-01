import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Mail, Phone, MapPin, ArrowRight } from 'lucide-react';
import { FiTwitter as Twitter, FiInstagram as Instagram, FiLinkedin as Linkedin, FiGithub as Github, FiFacebook as Facebook, FiYoutube as Youtube } from 'react-icons/fi';

const Footer = () => {
  const location = useLocation();
  const hideMarketing = location.pathname.startsWith('/tools') || 
                        location.pathname.includes('-policy') || 
                        location.pathname.includes('terms-') ||
                        location.pathname.startsWith('/template');

  return (
    <footer className="bg-slate-950 text-slate-300 pt-20 pb-10 border-t border-slate-900 relative overflow-hidden">
      {/* Decorative Blur */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-teal-500/5 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {!hideMarketing && (
          <>
            {/* Top CTA Banner */}
        <div className="bg-gradient-to-r from-slate-900 to-slate-800 border border-slate-700/50 rounded-3xl p-8 md:p-12 mb-16 flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-teal-400 via-emerald-400 to-blue-500"></div>
          <div>
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">Ready to grow your business?</h3>
            <p className="text-slate-400">Join 500+ ambitious brands launching premium websites today.</p>
          </div>
          <div className="flex shrink-0">
            <Link to="/start-project" className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-teal-500 text-slate-900 font-bold hover:bg-teal-400 transition-all shadow-lg hover:shadow-teal-500/25">
              Order Your Website
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>

        {/* Newsletter / Lead Magnet Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-24 p-10 bg-slate-900/50 dark:bg-slate-900/30 rounded-[40px] border border-slate-800/50 backdrop-blur-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-teal-500/10 rounded-full blur-[80px] -z-10"></div>
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-teal-500/10 text-teal-400 rounded-lg text-[10px] font-black uppercase tracking-widest mb-4">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-500"></span>
              </span>
              Weekly Insights
            </div>
            <h3 className="text-3xl font-black text-white mb-4">Get the <span className="text-teal-500">Web ROI</span> Checklist.</h3>
            <p className="text-slate-400 font-medium leading-relaxed max-w-md">
              Join 5,000+ founders receiving our weekly breakdown on high-performance design, SEO secrets, and conversion engineering.
            </p>
          </div>
          <form action="https://formsubmit.co/hello.toolbite@gmail.com" method="POST" className="relative group">
            <input type="hidden" name="_subject" value="New ToolBite Newsletter Subscriber!" />
            <input type="hidden" name="_next" value={window.location.href} />
            <div className="flex flex-col sm:flex-row gap-3">
              <input 
                type="email" 
                name="email" 
                placeholder="your@email.com" 
                required 
                className="flex-grow px-6 py-4 bg-slate-950 border border-slate-800 rounded-2xl focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all text-white font-medium" 
              />
              <button type="submit" className="px-8 py-4 bg-white text-slate-900 font-bold rounded-2xl hover:bg-teal-500 transition-all group-hover:shadow-glow-slate">
                Get Access
              </button>
            </div>
            <p className="mt-4 text-[10px] text-slate-500 font-medium italic">
              * By subscribing, you agree to receive technical updates and high-performance strategy guides.
            </p>
          </form>
        </div>
          </>
        )}

        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-16">
          
          {/* Brand Column */}
          <div className="lg:col-span-3">
            <Link to="/" className="inline-flex items-center gap-2 mb-6 group">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 80 80"
                fill="none"
                className="w-8 h-8 group-hover:scale-110 transition-transform duration-300"
              >
                <path 
                  d="M 68,32 L68,23 L 40,5 L 10,22 L 10,58 L 40,75 L 68,57 L 68,48" 
                  stroke="#ffffffff" 
                  strokeWidth="4.5" 
                />
                <path 
                  d="M 61,32 L 61,26 L 40,12 L 16,26 L 16,54 L 40,68 L 61,54 L 61,48" 
                  stroke="#ffffffff" 
                  strokeWidth="4" 
                />
                <polygon 
                  points="30,28 30,52 52,40" 
                  fill="white" 
                />
              </svg>
              <span className="text-3xl font-bold tracking-tight text-white">Tool<span className="text-teal-500">Bite</span></span>
            </Link>
            <p className="text-slate-400 leading-relaxed mb-6 max-w-sm">
              The ultimate agency platform delivering ready-made premium templates and high-performance custom web applications for modern businesses.
            </p>
            <div className="flex gap-4">
              <a href="https://www.threads.com/@hello.toolbite" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-teal-500 hover:text-white transition-all">
                <Twitter size={18} />
              </a>
              <a href="https://www.facebook.com/share/1AsB5SJevf/" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-blue-600 hover:text-white transition-all">
                <Facebook size={18} />
              </a>
              <a href="https://www.instagram.com/hello.toolbite?igsh=MThncHh4ejk5YzQzdg==" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-rose-500 hover:text-white transition-all">
                <Instagram size={18} />
              </a>
              <a href="https://www.linkedin.com/in/tool-bite-16ab8b3ba?utm_source=share_via&utm_content=profile&utm_medium=member_android" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-blue-600 hover:text-white transition-all">
                <Linkedin size={18} />
              </a>
              <a href="https://github.com/aryansingh-00" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-slate-700 hover:text-white transition-all">
                <Github size={18} />
              </a>
              <a href="https://www.youtube.com/@tool-bite" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-red-600 hover:text-white transition-all" aria-label="YouTube">
                <Youtube size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2">
            <h4 className="text-white font-bold mb-6">Quick Links</h4>
            <ul className="space-y-4">
              <li><a href="/#ready-made" className="text-slate-400 hover:text-teal-400 transition-colors">Templates</a></li>
              <li><a href="/#portfolio" className="text-slate-400 hover:text-teal-400 transition-colors">Portfolio</a></li>
              <li><Link to="/pricing" className="text-slate-400 hover:text-teal-400 transition-colors">Pricing</Link></li>
              <li><Link to="/about" className="text-slate-400 hover:text-teal-400 transition-colors">About Us</Link></li>
              <li><Link to="/blog" className="text-slate-400 hover:text-teal-400 transition-colors">Blog</Link></li>
              <li><a href="/#faq" className="text-slate-400 hover:text-teal-400 transition-colors">FAQ</a></li>
              <li><Link to="/contact" className="text-slate-400 hover:text-teal-400 transition-colors">Contact</Link></li>
              <li><Link to="/partners" className="text-blue-500 hover:text-blue-400 font-bold transition-colors">Partner Showcase</Link></li>
              <li><Link to="/client-login" className="text-teal-500 hover:text-teal-400 font-bold transition-colors">Client Login</Link></li>
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h4 className="text-white font-bold mb-6">Our Services</h4>
            <ul className="space-y-4 text-sm">
              <li><Link to="/services/mobile-app-development" className="text-slate-400 hover:text-teal-400 transition-colors">Mobile App Dev</Link></li>
              <li><Link to="/services/corporate-web-design" className="text-slate-400 hover:text-teal-400 transition-colors">Corporate Websites</Link></li>
              <li><Link to="/services/ecommerce-development" className="text-slate-400 hover:text-teal-400 transition-colors">E-commerce Stores</Link></li>
              <li><Link to="/services/ux-ui-redesign" className="text-slate-400 hover:text-teal-400 transition-colors">UI/UX Redesign</Link></li>
              <li><Link to="/services/saas-development" className="text-slate-400 hover:text-teal-400 transition-colors">SaaS Architecture</Link></li>
              <li><Link to="/services/landing-page-design" className="text-slate-400 hover:text-teal-400 transition-colors">Landing Pages</Link></li>
              <li><Link to="/services/api-integration" className="text-slate-400 hover:text-teal-400 transition-colors">API Integration</Link></li>
            </ul>
          </div>

          {/* Popular Tools */}
          <div className="lg:col-span-2">
            <h4 className="text-white font-bold mb-6">Popular Tools</h4>
            <ul className="space-y-4">
              <li><Link to="/tools/resume-builder" className="text-slate-400 hover:text-teal-400 transition-colors font-bold text-teal-500/80">AI Resume Builder</Link></li>
              <li><Link to="/tools/pdf-converter" className="text-slate-400 hover:text-teal-400 transition-colors">PDF Converter</Link></li>
              <li><Link to="/tools/word-counter" className="text-slate-400 hover:text-teal-400 transition-colors">Word Counter</Link></li>
              <li><Link to="/tools/image-compressor" className="text-slate-400 hover:text-teal-400 transition-colors">Image Compressor</Link></li>
              <li><Link to="/tools" className="text-teal-500 font-bold hover:text-teal-400 transition-colors mt-2 block italic underline underline-offset-4">All Tools</Link></li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="lg:col-span-3">
            <h4 className="text-white font-bold mb-6">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin size={20} className="text-teal-500 shrink-0 mt-0.5" />
                <span className="text-slate-400">New Delhi <br/>India</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={20} className="text-teal-500 shrink-0" />
                <a href="tel:+919598037255" className="text-slate-400 hover:text-white transition-colors">+91 9598037255</a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={20} className="text-teal-500 shrink-0" />
                <a href="mailto:hello.toolbite@gmail.com" className="text-slate-400 hover:text-white transition-colors">hello.toolbite@gmail.com</a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-slate-500 text-sm">
            © {new Date().getFullYear()} ToolBite Inc. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm">
            <Link to="/privacy-policy" className="text-slate-500 hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="/terms-of-service" className="text-slate-500 hover:text-white transition-colors">Terms of Service</Link>
            <Link to="/cookie-policy" className="text-slate-500 hover:text-white transition-colors">Cookie Policy</Link>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;


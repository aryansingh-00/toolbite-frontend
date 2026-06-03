import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Mail, Phone, MapPin, ArrowRight, CheckCircle2 } from 'lucide-react';
import { FiTwitter as Twitter, FiInstagram as Instagram, FiLinkedin as Linkedin, FiGithub as Github, FiFacebook as Facebook } from 'react-icons/fi';
import { submitForm } from '../lib/formSubmitter';

const Footer = () => {
  const location = useLocation();
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterStatus, setNewsletterStatus] = useState('idle'); // idle, sending, success, error

  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    setNewsletterStatus('sending');
    try {
      const isSuccess = await submitForm({
        _subject: 'New ToolBite Newsletter Subscriber - Web ROI Checklist Request',
        email: newsletterEmail,
        source: 'Footer Newsletter',
        type: 'Web ROI Checklist Request'
      });
      if (isSuccess) {
        setNewsletterStatus('success');
        setNewsletterEmail('');
      } else {
        setNewsletterStatus('error');
      }
    } catch (err) {
      console.error(err);
      setNewsletterStatus('error');
    }
  };
  const hideMarketing = location.pathname.startsWith('/tools') || 
                        location.pathname.includes('-policy') || 
                        location.pathname.includes('terms-') ||
                        location.pathname.startsWith('/template');

  return (
    <footer className="bg-white text-black pt-20 pb-10 border-t border-slate-200 relative overflow-hidden">

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {!hideMarketing && (
          <>
            {/* Top CTA Banner */}
        <div className="bg-black text-white border border-slate-800 rounded-3xl p-8 md:p-12 mb-16 flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl relative overflow-hidden">
          <div>
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">Ready to grow your business?</h3>
            <p className="text-slate-400">Join 500+ ambitious brands launching premium websites today.</p>
          </div>
          <div className="flex shrink-0">
            <Link to="/start-project" className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white text-black border border-slate-200 font-bold hover:bg-slate-50 transition-all shadow-lg">
              Order Your Website
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>

        {/* Newsletter / Lead Magnet Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-24 p-10 bg-white rounded-[40px] border border-slate-200 shadow-xl relative overflow-hidden">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-black text-white rounded-lg text-[10px] font-black uppercase tracking-widest mb-4">
              Weekly Insights
            </div>
            <h3 className="text-3xl font-black text-black mb-4">Get the <span className="underline">Web ROI</span> Checklist.</h3>
            <p className="text-black/80 font-medium leading-relaxed max-w-md">
              Join 5,000+ founders receiving our weekly breakdown on high-performance design, SEO secrets, and conversion engineering.
            </p>
          </div>
          <div className="relative">
            {newsletterStatus === 'success' ? (
              <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6 text-center">
                <CheckCircle2 className="text-emerald-500 mx-auto mb-3 animate-bounce" size={36} />
                <h4 className="text-xl font-bold text-emerald-900 mb-1">Checklist Request Sent!</h4>
                <p className="text-sm text-emerald-700">
                  Check your inbox! We've sent the **Web ROI Checklist** directly to your email.
                </p>
              </div>
            ) : (
              <form onSubmit={handleNewsletterSubmit} className="relative group">
                <div className="flex flex-col sm:flex-row gap-3">
                  <input 
                    type="email" 
                    placeholder="your@email.com" 
                    required 
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    className="flex-grow px-6 py-4 bg-white border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-black transition-all text-black font-medium" 
                    style={{ color: '#000000' }}
                    disabled={newsletterStatus === 'sending'}
                  />
                  <button 
                    title="Interactive Button" 
                    aria-label="Interactive Button" 
                    type="submit" 
                    disabled={newsletterStatus === 'sending'}
                    className="px-8 py-4 bg-black text-white font-bold rounded-2xl hover:bg-black/90 transition-all disabled:opacity-50"
                  >
                    {newsletterStatus === 'sending' ? 'Sending...' : 'Get Access'}
                  </button>
                </div>
                {newsletterStatus === 'error' && (
                  <p className="mt-2 text-xs text-red-500 font-semibold">
                    Submission failed. Please try again.
                  </p>
                )}
                <p className="mt-4 text-[10px] text-slate-500 font-medium italic">
                  * By subscribing, you agree to receive technical updates and high-performance strategy guides.
                </p>
              </form>
            )}
          </div>
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
                  stroke="#000000" 
                  strokeWidth="4.5" 
                />
                <path 
                  d="M 61,32 L 61,26 L 40,12 L 16,26 L 16,54 L 40,68 L 61,54 L 61,48" 
                  stroke="#000000" 
                  strokeWidth="4" 
                />
                <polygon 
                  points="30,28 30,52 52,40" 
                  fill="black" 
                />
              </svg>
              <span className="text-3xl font-bold tracking-tight text-black">Tool<span className="text-black font-black">Bite</span></span>
            </Link>
            <p className="text-black/70 leading-relaxed mb-6 max-w-sm">
              The ultimate agency platform delivering ready-made premium templates and high-performance custom web applications for modern businesses.
            </p>
            <div className="flex gap-4">
              <a href="https://www.threads.com/@hello.toolbite" aria-label="Threads" title="Threads" className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-black hover:bg-black hover:text-white transition-all">
                <Twitter size={18} />
              </a>
              <a href="https://www.facebook.com/share/1AsB5SJevf/" aria-label="Facebook" title="Facebook" className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-black hover:bg-black hover:text-white transition-all">
                <Facebook size={18} />
              </a>
              <a href="https://www.instagram.com/hello.toolbite?igsh=MThncHh4ejk5YzQzdg==" aria-label="Instagram" title="Instagram" className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-black hover:bg-black hover:text-white transition-all">
                <Instagram size={18} />
              </a>
              <a href="https://www.linkedin.com/in/tool-bite-16ab8b3ba?utm_source=share_via&utm_content=profile&utm_medium=member_android" aria-label="LinkedIn" title="LinkedIn" className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-black hover:bg-black hover:text-white transition-all">
                <Linkedin size={18} />
              </a>
              <a href="https://github.com/aryansingh-00" aria-label="GitHub" title="GitHub" className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-black hover:bg-black hover:text-white transition-all">
                <Github size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2">
            <h4 className="text-black font-extrabold mb-6">Quick Links</h4>
            <ul className="space-y-4">
              <li><a href="/#ready-made" className="text-black/75 hover:text-black hover:underline transition-colors">Templates</a></li>
              <li><a href="/#portfolio" className="text-black/75 hover:text-black hover:underline transition-colors">Portfolio</a></li>
              <li><Link to="/about" className="text-black/75 hover:text-black hover:underline transition-colors">About Us</Link></li>
              <li><Link to="/blog" className="text-black/75 hover:text-black hover:underline transition-colors">Blog</Link></li>
              <li><a href="/#faq" className="text-black/75 hover:text-black hover:underline transition-colors">FAQ</a></li>
              <li><Link to="/contact" className="text-black/75 hover:text-black hover:underline transition-colors">Contact</Link></li>
              <li><Link to="/partners" className="text-black font-extrabold hover:underline transition-colors">Partner Showcase</Link></li>
              <li><Link to="/client-login" className="text-black font-extrabold hover:underline transition-colors">Client Login</Link></li>
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h4 className="text-black font-extrabold mb-6">Our Services</h4>
            <ul className="space-y-4 text-sm">
              <li><Link to="/services/mobile-app-development" className="text-black/75 hover:text-black hover:underline transition-colors">Mobile App Dev</Link></li>
              <li><Link to="/services/corporate-web-design" className="text-black/75 hover:text-black hover:underline transition-colors">Corporate Websites</Link></li>
              <li><Link to="/services/ecommerce-development" className="text-black/75 hover:text-black hover:underline transition-colors">E-commerce Stores</Link></li>
              <li><Link to="/services/ux-ui-redesign" className="text-black/75 hover:text-black hover:underline transition-colors">UI/UX Redesign</Link></li>
              <li><Link to="/services/saas-development" className="text-black/75 hover:text-black hover:underline transition-colors">SaaS Architecture</Link></li>
              <li><Link to="/services/landing-page-design" className="text-black/75 hover:text-black hover:underline transition-colors">Landing Pages</Link></li>
              <li><Link to="/services/api-integration" className="text-black/75 hover:text-black hover:underline transition-colors">API Integration</Link></li>
            </ul>
          </div>

          {/* Popular Tools */}
          <div className="lg:col-span-2">
            <h4 className="text-black font-extrabold mb-6">Popular Tools</h4>
            <ul className="space-y-4">
              <li><Link to="/tools/resume-builder" className="text-black font-extrabold hover:underline transition-colors">AI Resume Builder</Link></li>
              <li><Link to="/tools/pdf-converter" className="text-black/75 hover:text-black hover:underline transition-colors">PDF Converter</Link></li>
              <li><Link to="/tools/word-counter" className="text-black/75 hover:text-black hover:underline transition-colors">Word Counter</Link></li>
              <li><Link to="/tools/image-compressor" className="text-black/75 hover:text-black hover:underline transition-colors">Image Compressor</Link></li>
              <li><Link to="/tools" className="text-black font-extrabold hover:underline transition-colors mt-2 block italic">All Tools</Link></li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="lg:col-span-3">
            <h4 className="text-black font-extrabold mb-6">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin size={20} className="text-black shrink-0 mt-0.5" />
                <span className="text-black/80">New Delhi <br/>India</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={20} className="text-black shrink-0" />
                <a href="tel:+919598037255" className="text-black/80 hover:text-black hover:underline transition-colors">+91 9598037255</a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={20} className="text-black shrink-0" />
                <a href="mailto:hello.toolbite@gmail.com" className="text-black/80 hover:text-black hover:underline transition-colors">hello.toolbite@gmail.com</a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-200 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-black/60 text-sm">
            © {new Date().getFullYear()} ToolBite Inc. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm">
            <Link to="/privacy-policy" className="text-black/60 hover:text-black hover:underline transition-colors">Privacy Policy</Link>
            <Link to="/terms-of-service" className="text-black/60 hover:text-black hover:underline transition-colors">Terms of Service</Link>
            <Link to="/cookie-policy" className="text-black/60 hover:text-black hover:underline transition-colors">Cookie Policy</Link>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;


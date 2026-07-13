import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Mail, Phone, MapPin, ArrowRight, CheckCircle2 } from 'lucide-react';
import { FiTwitter as Twitter, FiInstagram as Instagram, FiLinkedin as Linkedin, FiGithub as Github, FiFacebook as Facebook } from 'react-icons/fi';
import { submitForm } from '../lib/formSubmitter';

const Footer = () => {
  const location = useLocation();
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterStatus, setNewsletterStatus] = useState('idle');

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
    <footer className="bg-background text-text pt-24 pb-12 border-t border-border relative overflow-hidden">
      
      {/* Background Glows for Footer */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {!hideMarketing && (
          <div className="mb-24 space-y-8">
            {/* Top CTA Banner */}
            <div className="glass-panel p-10 md:p-14 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent pointer-events-none"></div>
              <div className="relative z-10 max-w-xl">
                <h3 className="text-3xl md:text-4xl font-display font-bold text-white mb-4 tracking-tight">Ready to scale your business?</h3>
                <p className="text-secondary-text text-lg">Join 500+ ambitious brands launching premium, high-performance websites with ToolBite.</p>
              </div>
              <div className="relative z-10 flex shrink-0">
                <Link to="/start-project" className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-white text-background font-bold hover:scale-105 transition-all shadow-glow-primary">
                  Start Your Project
                  <ArrowRight size={18} />
                </Link>
              </div>
            </div>

            {/* Newsletter Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center p-10 md:p-14 glass-panel border border-border relative overflow-hidden">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 text-primary border border-primary/20 rounded-full text-[11px] font-bold uppercase tracking-widest mb-6">
                  Weekly Insights
                </div>
                <h3 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">Get the <span className="text-gradient">Web ROI</span> Checklist.</h3>
                <p className="text-secondary-text text-lg leading-relaxed max-w-md">
                  Join 5,000+ founders receiving our weekly breakdown on high-performance design, SEO secrets, and conversion engineering.
                </p>
              </div>
              <div className="relative">
                {newsletterStatus === 'success' ? (
                  <div className="bg-success/10 border border-success/20 rounded-2xl p-8 text-center backdrop-blur-sm">
                    <CheckCircle2 className="text-success mx-auto mb-4 animate-bounce" size={40} />
                    <h4 className="text-xl font-bold text-success mb-2">Request Sent!</h4>
                    <p className="text-success/80">
                      Check your inbox! We've sent the Web ROI Checklist directly to your email.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleNewsletterSubmit} className="relative group bg-card/50 backdrop-blur-md p-2 rounded-2xl border border-white/10">
                    <div className="flex flex-col sm:flex-row gap-2">
                      <input 
                        type="email" 
                        placeholder="your@email.com" 
                        required 
                        value={newsletterEmail}
                        onChange={(e) => setNewsletterEmail(e.target.value)}
                        className="flex-grow px-6 py-4 bg-transparent border-none focus:outline-none focus:ring-0 text-white placeholder-secondary-text font-medium" 
                        disabled={newsletterStatus === 'sending'}
                      />
                      <button 
                        type="submit" 
                        disabled={newsletterStatus === 'sending'}
                        className="px-8 py-4 bg-primary text-white font-medium rounded-xl hover:bg-primary/90 transition-all disabled:opacity-50"
                      >
                        {newsletterStatus === 'sending' ? 'Sending...' : 'Subscribe'}
                      </button>
                    </div>
                  </form>
                )}
                <p className="mt-4 text-xs text-secondary-text/70 italic text-center lg:text-left">
                  * By subscribing, you agree to receive technical updates and high-performance strategy guides.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-16">
          
          {/* Brand Column */}
          <div className="lg:col-span-4 lg:pr-8">
            <Link to="/" className="inline-flex items-center gap-2 mb-6 group">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 80 80"
                fill="none"
                className="w-8 h-8 text-white group-hover:scale-110 transition-transform duration-300"
              >
                <path 
                  d="M 68,32 L68,23 L 40,5 L 10,22 L 10,58 L 40,75 L 68,57 L 68,48" 
                  stroke="currentColor" 
                  strokeWidth="4.5" 
                />
                <path 
                  d="M 61,32 L 61,26 L 40,12 L 16,26 L 16,54 L 40,68 L 61,54 L 61,48" 
                  stroke="currentColor" 
                  strokeWidth="4" 
                />
                <polygon 
                  points="30,28 30,52 52,40" 
                  fill="currentColor" 
                />
              </svg>
              <span className="text-2xl font-display font-bold tracking-tight text-white">ToolBite</span>
            </Link>
            <p className="text-secondary-text leading-relaxed mb-8 text-sm">
              The ultimate agency platform delivering ready-made premium templates and high-performance custom web applications for modern businesses.
            </p>
            <div className="flex gap-4">
              <a href="https://www.threads.com/@hello.toolbite" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-secondary-text hover:text-white hover:bg-white/10 transition-all">
                <Twitter size={16} />
              </a>
              <a href="https://www.facebook.com/share/1AsB5SJevf/" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-secondary-text hover:text-white hover:bg-white/10 transition-all">
                <Facebook size={16} />
              </a>
              <a href="https://www.instagram.com/hello.toolbite?igsh=MThncHh4ejk5YzQzdg==" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-secondary-text hover:text-white hover:bg-white/10 transition-all">
                <Instagram size={16} />
              </a>
              <a href="https://www.linkedin.com/in/tool-bite-16ab8b3ba" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-secondary-text hover:text-white hover:bg-white/10 transition-all">
                <Linkedin size={16} />
              </a>
              <a href="https://github.com/aryansingh-00" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-secondary-text hover:text-white hover:bg-white/10 transition-all">
                <Github size={16} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2">
            <h4 className="text-white font-medium mb-6">Product</h4>
            <ul className="space-y-4 text-sm">
              <li><Link to="/#ready-made" className="text-secondary-text hover:text-white transition-colors">Templates</Link></li>
              <li><Link to="/portfolio" className="text-secondary-text hover:text-white transition-colors">Portfolio</Link></li>
              <li><Link to="/about" className="text-secondary-text hover:text-white transition-colors">About Us</Link></li>
              <li><Link to="/blog" className="text-secondary-text hover:text-white transition-colors">Blog</Link></li>
              <li><Link to="/#faq" className="text-secondary-text hover:text-white transition-colors">FAQ</Link></li>
              <li><Link to="/contact" className="text-secondary-text hover:text-white transition-colors">Contact</Link></li>
              <li><Link to="/partners" className="text-secondary-text hover:text-white transition-colors">Partners</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div className="lg:col-span-3">
            <h4 className="text-white font-medium mb-6">Services</h4>
            <ul className="space-y-4 text-sm">
              <li><Link to="/services/mobile-app-development" className="text-secondary-text hover:text-white transition-colors">Mobile App Development</Link></li>
              <li><Link to="/services/corporate-web-design" className="text-secondary-text hover:text-white transition-colors">Corporate Web Design</Link></li>
              <li><Link to="/services/ecommerce-development" className="text-secondary-text hover:text-white transition-colors">E-commerce Stores</Link></li>
              <li><Link to="/services/saas-development" className="text-secondary-text hover:text-white transition-colors">SaaS Architecture</Link></li>
              <li><Link to="/services/landing-page-design" className="text-secondary-text hover:text-white transition-colors">Landing Pages</Link></li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="lg:col-span-3">
            <h4 className="text-white font-medium mb-6">Contact</h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-secondary-text shrink-0 mt-0.5" />
                <span className="text-secondary-text">New Delhi, India</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-secondary-text shrink-0" />
                <a href="tel:+919598037255" className="text-secondary-text hover:text-white transition-colors">+91 9598037255</a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-secondary-text shrink-0" />
                <a href="mailto:hello.toolbite@gmail.com" className="text-secondary-text hover:text-white transition-colors">hello.toolbite@gmail.com</a>
              </li>
            </ul>
            <div className="mt-8">
              <Link to="/client-login" className="inline-flex items-center justify-center w-full py-2.5 rounded-lg border border-white/10 text-secondary-text hover:text-white hover:bg-white/5 transition-all text-sm font-medium">
                Client Portal Login
              </Link>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-secondary-text/60 text-sm">
            © {new Date().getFullYear()} ToolBite Inc. All rights reserved.
          </p>
          <div className="flex flex-wrap gap-4 md:gap-6 text-sm">
            <Link to="/privacy-policy" className="text-secondary-text/60 hover:text-white transition-colors">Privacy</Link>
            <Link to="/terms-of-service" className="text-secondary-text/60 hover:text-white transition-colors">Terms</Link>
            <Link to="/cookie-policy" className="text-secondary-text/60 hover:text-white transition-colors">Cookies</Link>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;

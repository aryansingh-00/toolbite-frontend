import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, ArrowRight } from 'lucide-react';
import { FiTwitter as Twitter, FiInstagram as Instagram, FiLinkedin as Linkedin, FiGithub as Github } from 'react-icons/fi';

const Footer = () => {
  return (
    <footer className="bg-slate-950 text-slate-300 pt-20 pb-10 border-t border-slate-900 relative overflow-hidden">
      {/* Decorative Blur */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-teal-500/5 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top CTA Banner */}
        <div className="bg-gradient-to-r from-slate-900 to-slate-800 border border-slate-700/50 rounded-3xl p-8 md:p-12 mb-16 flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-teal-400 via-emerald-400 to-blue-500"></div>
          <div>
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">Ready to grow your business?</h3>
            <p className="text-slate-400">Join 500+ ambitious brands launching premium websites today.</p>
          </div>
          <div className="flex shrink-0">
            <a href="/start-project" className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-teal-500 text-slate-900 font-bold hover:bg-teal-400 transition-all shadow-lg hover:shadow-teal-500/25">
              Order Your Website
              <ArrowRight size={18} />
            </a>
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-16">
          
          {/* Brand Column */}
          <div className="lg:col-span-4">
            <a href="/#" className="inline-block mb-6">
              <span className="text-3xl font-bold tracking-tight text-white">Tool<span className="text-teal-500">Bite</span></span>
            </a>
            <p className="text-slate-400 leading-relaxed mb-6 max-w-sm">
              The ultimate agency platform delivering ready-made premium templates and high-performance custom web applications for modern businesses.
            </p>
            <div className="flex gap-4">
              <a href="https://www.threads.com/@hello.toolbite" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-teal-500 hover:text-white transition-all">
                <Twitter size={18} />
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
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2 lg:col-start-6">
            <h4 className="text-white font-bold mb-6">Quick Links</h4>
            <ul className="space-y-4">
              <li><a href="/#ready-made" className="text-slate-400 hover:text-teal-400 transition-colors">Templates</a></li>
              <li><a href="/#portfolio" className="text-slate-400 hover:text-teal-400 transition-colors">Portfolio</a></li>
              <li><a href="/#pricing" className="text-slate-400 hover:text-teal-400 transition-colors">Pricing</a></li>
              <li><a href="/#testimonials" className="text-slate-400 hover:text-teal-400 transition-colors">Reviews</a></li>
              <li><a href="/#faq" className="text-slate-400 hover:text-teal-400 transition-colors">FAQ</a></li>
            </ul>
          </div>

          {/* Services */}
          <div className="lg:col-span-2">
            <h4 className="text-white font-bold mb-6">Our Services</h4>
            <ul className="space-y-4">
              <li><a href="/#services" className="text-slate-400 hover:text-teal-400 transition-colors">Custom Websites</a></li>
              <li><a href="/#services" className="text-slate-400 hover:text-teal-400 transition-colors">E-commerce Stores</a></li>
              <li><a href="/#services" className="text-slate-400 hover:text-teal-400 transition-colors">Landing Pages</a></li>
              <li><a href="/#services" className="text-slate-400 hover:text-teal-400 transition-colors">UI/UX Redesign</a></li>
              <li><a href="/#services" className="text-slate-400 hover:text-teal-400 transition-colors">Web Maintenance</a></li>
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
                <a href="mailto:hello@toolbite.com" className="text-slate-400 hover:text-white transition-colors">hello@toolbite.com</a>
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


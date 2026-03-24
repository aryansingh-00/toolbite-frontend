import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Services', href: '#services' },
    { name: 'Templates', href: '#ready-made' },
    { name: 'Portfolio', href: '#portfolio' },
    { name: 'Pricing', href: '#pricing' },
    { name: 'FAQ', href: '#faq' },
  ];

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'py-4' : 'py-6'}`}>
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`flex items-center justify-between px-6 py-4 rounded-full transition-all duration-500 ${isScrolled ? 'glass-card' : 'bg-transparent'}`}>
          {/* Logo */}
          <div className="flex-shrink-0">
            <a href="/#" className="flex items-center">
              <img
                src="/logo.svg"
                alt="ToolBite"
                className="h-14 w-auto object-contain"
              />
            </a>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <div className="flex gap-8">
              {navLinks.map((link) => (
                <a key={link.name} href={link.href} className="text-sm font-bold text-slate-600 hover:text-teal-600 transition-colors">
                  {link.name}
                </a>
              ))}
            </div>
            
            <a href="/#custom-order" className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-slate-900 text-white text-sm font-bold hover:bg-teal-500 transition-all shadow-glow-slate hover:shadow-glow hover:-translate-y-0.5 group">
              Start Project
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-slate-900 p-2">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full px-4 pt-2 md:hidden"
          >
            <div className="glass-card rounded-3xl p-6 flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="text-lg font-bold text-slate-800 hover:text-teal-600 transition-colors py-2 border-b border-slate-100/50"
                >
                  {link.name}
                </a>
              ))}
              <a href="/#custom-order" onClick={() => setIsOpen(false)} className="w-full mt-4 py-4 text-center rounded-xl bg-slate-900 text-white font-bold text-lg hover:bg-teal-600 transition-all">
                Start Project
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;


/* eslint-disable */
import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

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

  useEffect(() => {
    import('https://esm.sh/animejs').then(({ animate, svg, stagger }) => {
      if (typeof svg?.createDrawable === 'function') {
        animate(svg.createDrawable('.logo-line'), {
          draw: ['0 0', '0 1', '1 1'],
          ease: 'inOutQuad',
          duration: 2000,
          delay: stagger(100),
          loop: true
        });
      }
    }).catch(err => console.error("Failed to jumpstart animejs:", err));
  }, []);

  const navLinks = [
    { name: 'Services', href: '/#services' },
    { name: 'Templates', href: '/#ready-made' },
    { name: 'Portfolio', href: '/#portfolio' },
    { name: 'About', href: '/about' },
    { name: 'Blog', href: '/blog' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'py-4' : 'py-6'}`}>
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`flex items-center justify-between px-6 py-4 rounded-full transition-all duration-500 ${isScrolled ? 'glass-card' : 'bg-transparent'}`}>
          {/* Logo */}
          <div className="flex-shrink-0">
            <a href="/#" className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 295 80" fill="none" className="h-14 w-auto object-contain">
                <path
                  className="logo-line"
                  d="M 57,10 L 23,10 L 6,39 L 23,68 L 57,68"
                  stroke="#0f172a"
                  strokeWidth="4.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                />
                <path
                  className="logo-line"
                  d="M 52,19 L 27,19 L 15,39 L 27,59 L 52,59"
                  stroke="#0f172a"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                />
                <polygon points="22,26 22,52 56,39" fill="#0f172a" />
                <text
                  x="80"
                  y="53"
                  fontFamily="'Arial Black', 'Impact', 'Helvetica Neue', Arial, sans-serif"
                  fontWeight="900"
                  fontSize="34"
                  fill="#0f172a"
                  letterSpacing="1"
                >TOOL</text>
                <text
                  x="180"
                  y="53"
                  fontFamily="'Arial Black', 'Impact', 'Helvetica Neue', Arial, sans-serif"
                  fontWeight="900"
                  fontSize="34"
                  fill="#14b8a6"
                  letterSpacing="1"
                >BITE</text>
              </svg>
            </a>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <div className="flex gap-8">
              {navLinks.map((link) => (
                <Link key={link.name} to={link.href} className="text-sm font-bold text-slate-600 hover:text-teal-600 transition-colors">
                  {link.name}
                </Link>
              ))}
            </div>
            
            <Link to="/start-project" className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-slate-900 text-white text-sm font-bold hover:bg-teal-500 transition-all shadow-glow-slate hover:shadow-glow hover:-translate-y-0.5 group">
              Start Project
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
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
                <Link
                  key={link.name}
                  to={link.href}
                  onClick={() => setIsOpen(false)}
                  className="text-lg font-bold text-slate-800 hover:text-teal-600 transition-colors py-2 border-b border-slate-100/50"
                >
                  {link.name}
                </Link>
              ))}
              <Link to="/start-project" onClick={() => setIsOpen(false)} className="w-full mt-4 py-4 text-center rounded-xl bg-slate-900 text-white font-bold text-lg hover:bg-teal-600 transition-all">
                Start Project
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;


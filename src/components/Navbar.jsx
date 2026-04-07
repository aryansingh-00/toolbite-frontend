 
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

  const navLinks = [
    { name: 'Home', href: '/#home', isHash: true },
    { name: 'Templates', href: '/#ready-made', isHash: true },
    { name: 'Tools', href: '/tools' },
    { name: 'Portfolio', href: '/#portfolio', isHash: true },
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
            <Link to="/" className="flex items-center group">
              <motion.svg 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 295 80" 
                fill="none" 
                className="h-14 w-auto object-contain"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
              >
                {/* Outer Hexagon Shape (Professional Dark) */}
                <motion.path
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 1.5, ease: 'easeInOut' }}
                  d="M 68,32 L68,23 L 40,5 L 10,22 L 10,58 L 40,75 L 68,57 L 68,48 "
                  stroke="#0f172a"
                  strokeWidth="4.5"
                />
                {/* Inner Hexagon Shape (Unified Dark) */}
                <motion.path
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 1.2, delay: 0.5, ease: 'easeInOut' }}
                  d="M 61,32 L 61,26 L 40,12 L 16,26 L 16,54 L 40,68 L 61,54 L 61,48"
                  stroke="#0f172a"
                  strokeWidth="4"
                />
                {/* Triangle Play/Bite Mark (Centered) */}
                <motion.polygon 
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 1, type: 'spring', stiffness: 200 }}
                  points="30,28 30,52 52,40" 
                  fill="#0f172a" 
                />
                {/* TOOL Text */}
                <motion.text
                  initial={{ x: 60, opacity: 0 }}
                  animate={{ x: 80, opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.8, ease: 'easeOut' }}
                  y="53"
                  fontFamily="'Arial Black', 'Impact', 'Helvetica Neue', Arial, sans-serif"
                  fontWeight="900"
                  fontSize="34"
                  fill="#0f172a"
                  letterSpacing="1"
                >TOOL</motion.text>
                {/* BITE Text */}
                <motion.text
                  initial={{ x: 210, opacity: 0 }}
                  animate={{ x: 180, opacity: 1 }}
                  transition={{ duration: 0.6, delay: 1, ease: 'easeOut' }}
                  y="53"
                  fontFamily="'Arial Black', 'Impact', 'Helvetica Neue', Arial, sans-serif"
                  fontWeight="900"
                  fontSize="34"
                  fill="#14b8a6"
                  letterSpacing="1"
                >BITE</motion.text>
              </motion.svg>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <div className="flex gap-8">
              {navLinks.map((link) => (
                link.isHash ? (
                  <a key={link.name} href={link.href} className="text-sm font-bold text-slate-600 hover:text-teal-600 transition-colors">
                    {link.name}
                  </a>
                ) : (
                  <Link key={link.name} to={link.href} className="text-sm font-bold text-slate-600 hover:text-teal-600 transition-colors">
                    {link.name}
                  </Link>
                )
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
                link.isHash ? (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="text-lg font-bold text-slate-800 hover:text-teal-600 transition-colors py-2 border-b border-slate-100/50"
                  >
                    {link.name}
                  </a>
                ) : (
                  <Link
                    key={link.name}
                    to={link.href}
                    onClick={() => setIsOpen(false)}
                    className="text-lg font-bold text-slate-800 hover:text-teal-600 transition-colors py-2 border-b border-slate-100/50"
                  >
                    {link.name}
                  </Link>
                )
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


 
import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowRight, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';

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
    { name: 'Templates', href: '/#ready-made', isHash: true },
    { name: 'Tools', href: '/tools' },
    { name: 'Portfolio', href: '/#portfolio', isHash: true },
    { name: 'About', href: '/about' },
    { name: 'Blog', href: '/blog' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'py-1' : 'py-3'}`}>
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`flex items-center justify-between px-4 md:px-6 py-2 md:py-2.5 rounded-full transition-all duration-500 ${isScrolled ? 'glass-card shadow-sm border border-slate-200/50 dark:border-slate-800/50' : 'bg-transparent'}`}>
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center group">
              <motion.svg 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 295 80" 
                fill="none" 
                className="h-10 md:h-11 w-auto object-contain"
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

          {/* Right Section Actions & Menu Toggle */}
          <div className="flex items-center">
            {/* Hamburger Button (All Screens) */}
            <button onClick={() => setIsOpen(!isOpen)} className="text-slate-900 dark:text-slate-100 p-2 transition-transform hover:scale-110 flex items-center justify-center rounded-full hover:bg-slate-100 dark:hover:bg-slate-800/50">
              {isOpen ? <X size={26} /> : <Menu size={26} strokeWidth={2.5} />}
            </button>
          </div>
        </div>
      </div>

      {/* Dropdown Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full right-4 md:right-8 w-[calc(100%-2rem)] md:w-72 pt-3 origin-top-right z-50"
          >
            <div className="glass-card shadow-2xl border border-slate-200/50 dark:border-slate-700/50 rounded-3xl p-6 flex flex-col gap-1">
              {navLinks.map((link) => (
                link.isHash ? (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="text-lg md:text-base font-bold text-slate-800 dark:text-slate-100 hover:text-teal-600 dark:hover:text-teal-400 transition-colors py-3 md:py-2.5 border-b last:border-0 border-slate-100/50 dark:border-slate-800/50 flex items-center"
                  >
                    {link.name}
                  </a>
                ) : (
                  <Link
                    key={link.name}
                    to={link.href}
                    onClick={() => setIsOpen(false)}
                    className="text-lg md:text-base font-bold text-slate-800 dark:text-slate-100 hover:text-teal-600 dark:hover:text-teal-400 transition-colors py-3 md:py-2.5 border-b last:border-0 border-slate-100/50 dark:border-slate-800/50 flex items-center"
                  >
                    {link.name}
                  </Link>
                )
              ))}
              
              <div className="flex items-center justify-between mt-4 pb-2">
                <span className="text-sm font-bold text-slate-500">Switch Theme</span>
                <ThemeToggle />
              </div>
              <Link to="/client-login" onClick={() => setIsOpen(false)} className="w-full mb-2 mt-2 py-3 flex items-center justify-center gap-2 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 font-bold text-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-all shadow-sm">
                <User size={20} />
                Client Login
              </Link>
              <Link to="/start-project" onClick={() => setIsOpen(false)} className="w-full py-4 text-center rounded-xl bg-slate-900 text-white font-bold text-lg hover:bg-teal-600 transition-all shadow-md">
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

